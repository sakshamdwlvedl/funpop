import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from '../../interfaces/movie-detail.interface';
import { environment } from '../../../../environments/environment';
import { CommonModule, DatePipe, CurrencyPipe } from '@angular/common';
import { CommonService } from '../../../core/services/common.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { ScrollIndicatorComponent } from '../../../shared/components/scroll-indicator/scroll-indicator.component';
import { ProfileCardComponent } from '../../../shared/components/profile-card/profile-card.component';
import { ChipComponent } from '../../../shared/components/chip/chip.component';
import { SeoService } from '../../../core/services/seo.service';
import { VideoPlayerComponent } from '../../../shared/components/video-player/video-player.component';
import { ImageViewerComponent } from '../../../shared/components/image-viewer/image-viewer.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CarouselComponent } from '../../../shared/components/carousel/carousel.component';
import { COMMON_CONFIG } from '../../../core/configs/common.config';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { FormsModule } from '@angular/forms';
import { ApiCallService } from '../../../core/services/api-call.service';

@Component({
  selector: 'app-detail-page',
  imports: [
    CommonModule,
    FormsModule,
    RatingComponent,
    ScrollIndicatorComponent,
    ProfileCardComponent,
    ChipComponent,
    VideoPlayerComponent,
    ImageViewerComponent,
    ButtonComponent,
    CarouselComponent,
    MovieCardComponent,
  ],
  providers: [DatePipe, CurrencyPipe],
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
})
export class DetailPageComponent implements AfterViewInit, OnDestroy {
  details!: MovieDetails;
  imageBase = environment.TMDB_IMG_BASE;
  selectedSeason: any;
  castNames: string = '';
  languageNames: string = '';
  runtime: string = '';
  mediaType: string = '';
  director: any;
  accordion = {
    plot: false,
    seasonPlot: false,
  };

  videoPlayer = {
    visible: false,
    keys: [] as string[],
    currentIndex: 0,
  };

  imageViewer = {
    visible: false,
    images: [] as string[],
    currentIndex: 0,
    caption: '',
  };

  COMMON_CONFIG: typeof COMMON_CONFIG = COMMON_CONFIG;

  inWishlist = false;
  inFavorites = false;
  userReview = '';
  userRating = 0;
  reviews: any[] = [];
  isSubmittingReview = false;
  showReviewPopup = false;

  @ViewChild('posterCard') posterCard!: ElementRef;
  @ViewChild('movieTitle') movieTitle!: ElementRef;

  constructor(
    private activateRoute: ActivatedRoute,
    public commonService: CommonService,
    private readonly router: Router,
    private readonly apiService: ApiCallService,
    private readonly seo: SeoService,
  ) {}

  ngOnInit() {
    this.mediaType = this.activateRoute.snapshot.paramMap.get('type') || '';
    this.details = this.activateRoute.snapshot.data['details'];

    this.castNames =
      this.details?.credits?.cast
        ?.slice(0, 3)
        .map((c) => c.name)
        .join(', ') || '';
    this.languageNames =
      this.details?.spoken_languages?.map((l) => l.english_name).join(', ') ||
      '';

    const hours = Math.floor(this.details.runtime / 60);
    const minutes = this.details.runtime % 60;

    this.runtime = `${hours}h ${minutes}m`;

    this.selectedSeason = this.details?.seasons?.find(
      (season: any) => season.season_number === 1,
    );

    this.getDirector();

    this.seo.updateMeta(
      this.details.title || this.details.name,
      this.details.overview.substring(0, 160),
    );

    this.getInteractionStatus();
    this.getReviews();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.commonService.isMobile) {
        this.initPosterTilt();
      }
      this.initAnimations();
    }, 100);
  }

  initPosterTilt() {
    if (!this.posterCard) return;

    const el = this.posterCard.nativeElement;

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 4;
      const centerY = rect.height / 4;

      const rotateX = -(y - centerY) / 20;
      const rotateY = (x - centerX) / 20;

      gsap.to(el, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        transformOrigin: 'center',
        duration: 0.4,
        ease: 'power2.out',
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power3.out',
      });
    });
  }

  initAnimations() {
    let split;

    if (!this.commonService.isMobile) {
      split = new SplitText(this.movieTitle.nativeElement, {
        type: 'words,chars',
      });

      gsap.fromTo(
        split.words,
        {
          y: -100,
          opacity: 1,
          ease: 'power2.out',
        },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          stagger: 0.02,
        },
      );
    } else {
      gsap.to('.movie-details', {
        opacity: 1,
        duration: 2,
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-spacer',
        start: 'top top',
        end: this.commonService.isMobile ? '20% top' : '160% top',
        scrub: this.commonService.isMobile ? true : 2,
      },
    });

    // TITLE container shift
    tl.to('.movie-title', { top: '60%', opacity: 0 }, 0);

    // BACKDROP animations
    tl.to(
      '.backdrop',
      {
        width: this.commonService.isMobile
          ? 'calc(100% - 20px)'
          : 'calc(100% - 40px)',
        left: this.commonService.isMobile ? '10px' : '20px',
      },
      0,
    );
    tl.to('.backdrop img', { scale: 1.1, filter: 'blur(10px)' }, 0);
    tl.fromTo(
      '.backdrop .black-overlay',
      {
        opacity: this.commonService.isMobile ? 0 : 0.6,
      },
      {
        opacity: 0.7,
        backgroundColor: 'white',
      },
      0,
    );

    // WORD LAG EFFECT like GSAP SplitText demo
    if (!this.commonService.isMobile) {
      tl.to(
        split!.words,
        {
          opacity: 0,
          rotation: 'random(-100,100)',
          scale: 10,
          ease: 'power1.out',
          stagger: {
            each: 0.04,
            from: 'end',
          },
        },
        0,
      );
    }

    // Optional: hide container after animation
    tl.set('.movie-title', { display: 'none' }, '>');

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: '.movie-details',
        start: 'top 8%',
        end:
          this.commonService.isMobile || this.commonService.isTablet
            ? '+=80%'
            : '+=500%',
        scrub: this.commonService.isMobile ? true : 2,
        pin: true,
      },
    });

    /* 1️⃣ Right section intro */
    tl2.from(
      '.right-section',
      {
        y: 80,
        opacity: 0,
        duration: 1,
      },
      0.2,
    );

    /* 2️⃣ Poster appears AFTER pin starts */
    tl2.from(
      '.movie-details .poster',
      {
        y: 120,
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
      },
      0.6,
    );

    //animating genre before the plot section for mobile case
    if (this.commonService.isMobile) {
      tl2.from(
        '.genre-section.small-screen',
        {
          y: 40,
          opacity: 0,
          duration: 0.8,
        },
        1,
      );
    }

    /* 3️⃣ Plot section animation */
    tl2.from(
      '.section',
      {
        y: 60,
        opacity: 0,
        duration: 1,
      },
      1.2,
    );

    /* 4️⃣ Info grid animation */
    tl2.from(
      '.stagger-item',
      {
        y: 40,
        opacity: 0,
        stagger: 0.9,
        duration: 0.8,
      },
      1.6,
    );

    ScrollTrigger.refresh();
  }

  getInteractionStatus() {
    this.apiService
      .getInteractionStatus(this.details.id.toString(), this.mediaType)
      .subscribe((status) => {
        this.inWishlist = status.inWishlist;
        this.inFavorites = status.inFavorites;
        if (status.userReview) {
          this.userRating = status.userReview.rating;
          this.userReview = status.userReview.review;
        }
      });
  }

  getReviews() {
    this.apiService
      .getReviews(this.mediaType, this.details.id.toString())
      .subscribe((reviews) => {
        this.reviews = reviews;
      });
  }

  toggleWishlist() {
    this.apiService
      .toggleWishlist(this.details, this.mediaType)
      .subscribe((res) => {
        this.inWishlist = res.added;
      });
  }

  toggleFavorite() {
    this.apiService
      .toggleFavorite(this.details, this.mediaType)
      .subscribe((res) => {
        this.inFavorites = res.added;
      });
  }

  submitReview() {
    if (this.userRating === 0 || !this.userReview.trim()) {
      return;
    }

    this.isSubmittingReview = true;
    this.apiService
      .addReview(
        this.details.id.toString(),
        this.mediaType,
        this.userRating,
        this.userReview,
      )
      .subscribe({
        next: () => {
          this.isSubmittingReview = false;
          this.getReviews();
          this.closeReviewPopup();
        },
        error: () => {
          this.isSubmittingReview = false;
        },
      });
  }

  toggleReviewPopup() {
    this.showReviewPopup = !this.showReviewPopup;
    if (this.showReviewPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  closeReviewPopup() {
    setTimeout(() => {
      this.showReviewPopup = false;
    }, 1000);
    document.body.style.overflow = '';
  }

  getStarClass() {
    if (this.userRating >= 7) return 'good';
    if (this.userRating >= 5) return 'avg';
    return this.userRating > 0 ? 'bad' : '';
  }

  setRating(rating: number) {
    this.userRating = rating;
  }

  getDirector() {
    if (this.details?.created_by?.length) {
      this.director = this.details.created_by;
      return;
    }

    if (this.mediaType === 'movie') {
      this.director = this.details.credits.crew.filter(
        (crew) => crew.job === 'Director',
      );
    } else {
      this.director = this.details.credits.crew.filter(
        (crew) =>
          (crew.job === 'Executive Producer' ||
            crew.job === 'Original Concept' ||
            crew.job === 'Original Story') &&
          crew.known_for_department === 'Writing',
      );
    }
  }

  navigateToGenre(genreId: number): void {
    this.router.navigate(['/explore'], { queryParams: { genre: genreId } });
  }

  navigateToKeyword(keywordId: number): void {
    this.router.navigate(['/explore'], { queryParams: { keyword: keywordId } });
  }

  navigateToFullCast(): void {
    // param format expected by PEOPLE strategy: "<mediaType>-<id>"
    const param = `${this.mediaType}-${this.details.id}`;
    this.router.navigate(['/explore'], { queryParams: { people: param } });
  }

  navigateToPerson(id: string): void {
    if (id) {
      this.router.navigate(['/details/person', id]);
    }
  }

  toggleAccordion(key: any) {
    (this.accordion as any)[key] = !(this.accordion as any)[key];
  }

  onSeasonClick(season: any) {
    this.selectedSeason = season;
  }



  getCollectionClass() {
    return this.details.revenue > this.details.budget ? 'profit' : 'loss';
  }

  watchTrailer() {
    const trailerIndex = this.details.videos.results.findIndex(
      (v) => v.type === 'Trailer' && v.site === 'YouTube',
    );
    if (trailerIndex !== -1) {
      this.playVideo(trailerIndex);
    } else if (this.details.videos.results.length > 0) {
      this.playVideo(0);
    }
  }

  playVideo(index: number) {
    this.videoPlayer.keys = this.details.videos.results.map((v) => v.key || '');
    this.videoPlayer.currentIndex = index;
    this.videoPlayer.visible = true;
  }

  viewImage(index: number, caption: string = '') {
    this.imageViewer.images = this.details.images.backdrops.map(
      (img) => img.file_path,
    );
    this.imageViewer.currentIndex = index;
    this.imageViewer.caption = caption;
    this.imageViewer.visible = true;
  }

  navigateToMediaGallery(mediaType: 'images' | 'videos') {
    this.router.navigate(
      ['/details', this.mediaType, this.details.id, 'media-gallery'],
      {
        queryParams: { galleryType: mediaType },
      },
    );
  }

  onMediaClick(item: any) {
    this.router.navigate(['/details', this.mediaType, item.id]).then(() => {
      window.scrollTo(0, 0);
      window.location.reload();
    });
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t: any) => t.kill());
  }
}
