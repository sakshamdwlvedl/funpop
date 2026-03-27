// src/app/features/pages/explore/explore.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ApiCallService } from '../../../core/services/api-call.service';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { ProfileCardComponent } from '../../../shared/components/profile-card/profile-card.component';
import {
  EXPLORE_STRATEGIES,
  ExploreStrategy,
  ExploreTab,
  TabConfig,
} from '../explore/explore.config';

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [CommonModule, MovieCardComponent, ProfileCardComponent],
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit, AfterViewInit, OnDestroy {
  // ── State ──────────────────────────────────────────────────────────────────

  heading = '';
  showTabs = false;
  tabs: TabConfig[] = [];
  activeTab!: TabConfig;

  results: any[] = [];
  page = 1;
  totalPages = 1;
  loading = false;
  initialLoad = true;

  // Raw params
  private strategyKey = '';
  private param = '';

  private strategy!: ExploreStrategy;
  private destroy$ = new Subject<void>();

  @ViewChild('sentinel') sentinel!: ElementRef<HTMLDivElement>;
  private observer!: IntersectionObserver;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiCallService,
    private ngZone: NgZone,
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const resolved = this.resolveStrategy(params);
        if (!resolved) {
          this.router.navigate(['/']);
          return;
        }

        const { strategyKey, param } = resolved;
        this.strategyKey = strategyKey;
        this.param = param;
        this.strategy = EXPLORE_STRATEGIES[strategyKey];

        this.showTabs = this.strategy.showTabs;
        this.tabs = this.strategy.tabs;
        this.heading = this.strategy.heading(param);

        // For `type` strategy, derive tab from the param suffix (movie/tv)
        const defaultTab = this.pickDefaultTab(strategyKey, param);
        this.switchTab(defaultTab, false);
      });
  }

  ngAfterViewInit(): void {
    this.setupIntersectionObserver();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.observer?.disconnect();
  }

  // ── Strategy resolution ────────────────────────────────────────────────────

  private resolveStrategy(
    params: import('@angular/router').ParamMap,
  ): { strategyKey: string; param: string } | null {
    // Priority order — first match wins
    const priority = ['query', 'genre', 'keyword', 'type', 'people'];
    for (const key of priority) {
      const val = params.get(key);
      if (val) return { strategyKey: key, param: val };
    }
    return null;
  }

  private pickDefaultTab(strategyKey: string, param: string): ExploreTab {
    if (strategyKey === 'type') {
      if (param.endsWith('-tv') || param === 'on-the-air') return 'tv';
      return 'movies';
    }
    if (strategyKey === 'people') return 'people';
    return this.tabs[0]?.key ?? 'movies';
  }

  switchTab(tabKey: ExploreTab, scrollToTop = true): void {
    const tab = this.tabs.find((t) => t.key === tabKey);
    if (!tab) return;

    this.activeTab = tab;
    this.reset();
    this.loadPage();

    if (scrollToTop) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private reset(): void {
    this.results = [];
    this.page = 1;
    this.totalPages = 1;
    this.initialLoad = true;
    this.observer?.disconnect();
  }

  private loadPage(): void {
    if (this.loading || this.page > this.totalPages) return;
    this.loading = true;

    this.activeTab
      .apiFn(this.api, this.page, this.param)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res: any) => {
          const raw: any[] = res.results ?? [];
          const transformed = this.activeTab.transform
            ? raw.map(this.activeTab.transform)
            : raw;

          this.results = [...this.results, ...transformed];
          this.totalPages = res.total_pages ?? 1;
          this.page++;
          this.loading = false;
          this.initialLoad = false;

          // Re-observe sentinel after DOM update
          setTimeout(() => this.observeSentinel(), 100);
        },
        error: () => {
          this.loading = false;
          this.initialLoad = false;
        },
      });
  }

  // ── Infinite scroll ────────────────────────────────────────────────────────

  private setupIntersectionObserver(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !this.loading) {
          this.ngZone.run(() => this.loadPage());
        }
      },
      { rootMargin: '200px' }, // trigger 200px before sentinel hits viewport
    );
    this.observeSentinel();
  }

  private observeSentinel(): void {
    if (this.sentinel?.nativeElement) {
      this.observer.disconnect();
      this.observer.observe(this.sentinel.nativeElement);
    }
  }

  // ── Template helpers ───────────────────────────────────────────────────────

  isPeopleTab(): boolean {
    return this.activeTab?.key === 'people';
  }

  isMovieOrTvTab(): boolean {
    return this.activeTab?.key === 'movies' || this.activeTab?.key === 'tv';
  }

  hasMore(): boolean {
    return this.page <= this.totalPages;
  }

  navigateToDetails(item: any): void {
    this.router.navigate(['/details', item.media_type, item.id]);
  }

  trackById(_: number, item: any): any {
    return item.id;
  }
}
