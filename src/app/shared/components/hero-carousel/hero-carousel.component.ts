import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiCallService } from '../../../core/services/api-call.service';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent, NgOptimizedImage],
  templateUrl: './hero-carousel.component.html',
  styleUrls: ['./hero-carousel.component.scss'],
})
export class HeroCarouselComponent implements OnInit, OnDestroy {
  @Input() items: any[] = [];

  currentIndex = 0;
  interval: any;
  trailers: { [key: number]: any } = {};
  imageBase = environment.TMDB_IMG_BASE;
  hoveredId: number | null = null;

  constructor(
    private apiService: ApiCallService,
    private sanitizer: DomSanitizer,
    public commonService: CommonService,
  ) {}

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (!this.hoveredId) {
        this.next(false);
      }
    }, 5000);
  }

  next(resetTimer = true) {
    this.currentIndex = (this.currentIndex + 1) % this.items.length;
    if (resetTimer) this.startAutoSlide();
  }

  prev(resetTimer = true) {
    this.currentIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;
    if (resetTimer) this.startAutoSlide();
  }

  setSlide(index: number) {
    this.currentIndex = index;
    this.startAutoSlide();
  }

  loadTrailer(item: any) {
    if (this.trailers[item.id]) return;
    this.apiService
      .getVideos(item.id, item.media_type || 'movie')
      .subscribe((res) => {
        const video =
          res.results.find(
            (v: any) => v.site === 'YouTube' && v.type === 'Trailer',
          ) || res.results.find((v: any) => v.site === 'YouTube');
        if (video) {
          const url = `https://www.youtube.com/embed/${video.key}?autoplay=1&mute=1&controls=0`;
          this.trailers[item.id] =
            this.sanitizer.bypassSecurityTrustResourceUrl(url);
        }
      });
  }

  onHover(item: any, index: number) {
    if (index === this.currentIndex) {
      this.hoveredId = item.id;
      if (!this.trailers[item.id]) {
        this.loadTrailer(item);
      }
    }
  }

  onLeave() {
    this.hoveredId = null;
  }

  getSlideClass(index: number) {
    if (index === this.currentIndex) return 'center';
    if (index === this.getPrevIndex()) return 'left';
    if (index === this.getNextIndex()) return 'right';
    return 'hidden';
  }

  getPrevIndex() {
    return (this.currentIndex - 1 + this.items.length) % this.items.length;
  }

  getNextIndex() {
    return (this.currentIndex + 1) % this.items.length;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
