import {
  Component,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../../interfaces/movie-detail.interface';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../core/services/common.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import { ScrollIndicatorComponent } from '../../../shared/components/scroll-indicator/scroll-indicator.component';
import { ProfileCardComponent } from '../../../shared/components/profile-card/profile-card.component';

gsap.registerPlugin(ScrollTrigger, SplitText);

@Component({
  selector: 'app-detail-page',
  imports: [
    CommonModule,
    RatingComponent,
    ScrollIndicatorComponent,
    ProfileCardComponent,
  ],
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

  @ViewChild('posterCard') posterCard!: ElementRef;
  @ViewChild('movieTitle') movieTitle!: ElementRef;

  constructor(
    private activateRoute: ActivatedRoute,
    public commonService: CommonService,
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
  }

  ngAfterViewInit() {
    setTimeout(() => {
      ScrollTrigger.refresh();
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
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-spacer',
        start: 'top top',
        end: '160% top',
        scrub: 2,
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
        start: 'top 10%',
        end:
          this.commonService.isMobile || this.commonService.isTablet
            ? '+=150%'
            : '+=500%',
        scrub: 2,
        pin: true,
      },
    });

    /* 1️⃣ Right section intro */
    tl2.from(
      '.details-right-section',
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
        stagger: 0.08,
        duration: 0.8,
      },
      1.6,
    );
  }

  onSeasonClick(season: any) {
    this.selectedSeason = season;
  }

  getCollectionClass() {
    return this.details.revenue > this.details.budget ? 'profit' : 'loss';
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t: any) => t.kill());
  }
}
