import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../../core/services/api-call.service';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { HeroCarouselComponent } from '../../../shared/components/hero-carousel/hero-carousel.component';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { DASHBOARD_CONFIG } from './dashboard.config';
import { sortByPopularity } from '../../../core/utilities/common.util';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CommonService } from '../../../core/services/common.service';
import { SECTION_TYPE_KEY_MAP } from '../explore/explore.config';
import { SeoService } from '../../../core/services/seo.service';
import { NavigationData } from '../../../shared/interfaces/common.interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CarouselComponent,
    HeroCarouselComponent,
    MovieCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  data: any = {};
  activeFilter: 'movie' | 'tv' | null = null;
  sections = DASHBOARD_CONFIG.sections;

  DASHBOARD_CONFIG: typeof DASHBOARD_CONFIG = DASHBOARD_CONFIG;

  @ViewChildren('sectionRef') sectionsRef!: QueryList<ElementRef>;

  constructor(
    private readonly apiService: ApiCallService,
    private readonly commonService: CommonService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly seo: SeoService,
  ) {}

  ngOnInit() {
    this.seo.resetMeta();
    this.route.queryParamMap.subscribe((params) => {
      const filter = params.get('filter') as 'movie' | 'tv' | null;
      this.activeFilter = filter;
    });
    this.getSectionsData();
  }

  seeMore(sectionKey: string): void {
    const typeKey = SECTION_TYPE_KEY_MAP[sectionKey];
    if (typeKey) {
      this.router.navigate(['/explore'], { queryParams: { type: typeKey } });
    }
  }

  isVisible(section: any): boolean {
    if (!this.activeFilter) return true;
    return section.mediaType === this.activeFilter;
  }

  ngAfterViewInit() {
    this.animateSections();
    this.animateHero();
    ScrollTrigger.refresh();
  }

  animateSections() {
    this.sectionsRef.forEach((section, i) => {
      gsap.from(section.nativeElement, {
        y:
          i === 0 &&
          !this.commonService.isMobile &&
          !this.commonService.isTablet
            ? 1
            : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section.nativeElement,
          start: 'top 100%',
          end: 'top 40%',
        },
      });
    });
  }

  animateHero() {
    gsap.to('.hero-carousel', {
      opacity: 0,
      scrollTrigger: {
        trigger: '.hero-carousel',
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });
  }

  getSectionsData() {
    this.sections.forEach((section) => {
      section.apiFunction(this.apiService).subscribe((res) => {
        this.data[section.key] = sortByPopularity(res.results);
        if (section.key === 'trendingMovies' || section.key === 'trendingTV') {
          this.data['heroCarousel'] = [
            ...sortByPopularity(this.data['trendingMovies'] ?? []).slice(0, 10),
            ...sortByPopularity(this.data['trendingTV'] ?? []).slice(0, 10),
          ];
        }
      });
    });
  }

  navigateToDetailsPage(item: any) {
    this.commonService.navigateTo({
      route: `/details/${item.media_type}/${item.id}`,
    } as NavigationData);
  }

  showSkeleton(): boolean {
    return Object.keys(this.data).length === 0;
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }
}
