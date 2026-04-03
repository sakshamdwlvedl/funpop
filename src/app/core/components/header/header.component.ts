// src/app/core/components/header/header.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  filter,
} from 'rxjs';
import { CommonModule } from '@angular/common';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CommonService } from '../../services/common.service';

interface NavLink {
  label: string;
  icon: string;
  filter?: string; // for dashboard links
  route?: string; // for direct route links
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    InputComponent,
    ReactiveFormsModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  activeFilter: string | null = null;
  currentRoute = '';

  private destroy$ = new Subject<void>();

  // Desktop nav — filter links only
  navLinks: NavLink[] = [
    { label: 'Movies', icon: 'pi pi-video', filter: 'movie' },
    { label: 'TV Shows', icon: 'pi pi-desktop', filter: 'tv' },
  ];

  // Bottom bar — all destinations including Home
  allNavLinks: NavLink[] = [
    { label: 'Home', icon: 'pi pi-home', route: '/dashboard' },
    { label: 'Movies', icon: 'pi pi-video', filter: 'movie' },
    { label: 'TV Shows', icon: 'pi pi-desktop', filter: 'tv' },
    // { label: 'Explore', icon: 'pi pi-compass', route: '/explore' },
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.subscribeToSearchFilterClear();

    this.form = this.fb.group({ search: [''] });

    // Track active route for bottom bar highlight
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntil(this.destroy$),
      )
      .subscribe((e: any) => {
        this.currentRoute = e.urlAfterRedirects;
        // Sync activeFilter from URL
        const url = new URL(e.urlAfterRedirects, 'http://x');
        this.activeFilter = url.searchParams.get('filter');
      });

    // Debounced search → navigate to explore
    this.form
      .get('search')!
      .valueChanges.pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
      )
      .subscribe((query: string) => {
        const trimmed = query?.trim();
        if (trimmed) {
          this.commonService.navigateTo({
            route: '/explore',
            queryParams: { query: trimmed },
            replaceUrl: this.router.url.startsWith('/explore'),
          });
        }
      });
  }

  subscribeToSearchFilterClear() {
    this.commonService.onSearchFilterClear$.subscribe(() => {
      this.form.get('search')?.reset();
    });
  }

  navigateToDashboard(filter: any, replaceUrl: boolean = false): void {
    // Toggle off if already active
    if (this.activeFilter === filter) {
      this.activeFilter = null;
      this.commonService.navigateTo({ route: '/dashboard', replaceUrl });
    } else {
      this.activeFilter = filter;
      this.commonService.navigateTo({
        route: '/dashboard',
        replaceUrl,
        queryParams: { filter },
      });
    }
  }

  navigateTo(route: string, replaceUrl: boolean = false): void {
    this.commonService.navigateTo({ route, replaceUrl });
  }

  onTabClick(link: NavLink, replaceUrl: boolean = false): void {
    if (link.filter) {
      this.navigateToDashboard(link.filter, replaceUrl);
    } else if (link.route) {
      this.navigateTo(link.route, replaceUrl);
    }
  }

  isTabActive(link: NavLink): boolean {
    if (link.filter) {
      return (
        this.activeFilter === link.filter &&
        this.currentRoute.startsWith('/dashboard')
      );
    }
    if (link.route) {
      // Exact match for home, prefix for others
      if (link.route === '/dashboard') {
        return this.currentRoute.startsWith('/dashboard') && !this.activeFilter;
      }
      return this.currentRoute.startsWith(link.route);
    }
    return false;
  }

  onSearchClear() {
    this.commonService.navigateBack();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
