import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../core/services/api-call.service';
import { CarouselComponent } from '../../shared/components/carousel/carousel.component';
import { HeroCarouselComponent } from '../../shared/components/hero-carousel/hero-carousel.component';
import { MovieCardComponent } from '../../shared/components/movie-card/movie-card.component';
import { DASHBOARD_CONFIG } from './dashboard.config';
import { SkeletonLoaderComponent } from '../../shared/components/skeleton-loader/skeleton-loader.component';

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
export class DashboardComponent implements OnInit {
  heroCarouselData: any[] = [];
  data: any = {};
  sections = DASHBOARD_CONFIG.sections;

  DASHBOARD_CONFIG: typeof DASHBOARD_CONFIG = DASHBOARD_CONFIG;

  constructor(private apiService: ApiCallService) {}

  ngOnInit() {
    this.loadHomeData();
  }

  loadHomeData() {
    this.apiService.getHomeData(this.sections, 'IN').subscribe({
      next: (res: any) => {
        this.heroCarouselData = [
          ...res.trendingMovies.results.slice(0, 10),
          ...res.trendingTV.results.slice(0, 10),
        ];
        Object.keys(res).forEach((key) => {
          const section = this.sections.find((s) => s.key === key);
          if (section?.type === 'mixed') {
            const movies = res[key].movies.results || [];
            const tv = res[key].tv.results || [];
            this.data[key] = [...movies, ...tv];
          } else {
            this.data[key] = res[key].results;
          }
        });
      },
    });
  }

  showSkeleton(): boolean {
    return Object.keys(this.data).length === 0;
  }

  trackById(index: number, item: any) {
    return item.id;
  }
}
