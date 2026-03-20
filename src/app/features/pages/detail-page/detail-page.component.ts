import { Component, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../../interfaces/movie-detail.interface';
import { environment } from '../../../../environments/environment';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../../core/services/common.service';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-detail-page',
  imports: [CommonModule],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export class DetailPageComponent implements AfterViewInit {
  details!: MovieDetails;
  imageBase = environment.TMDB_IMG_BASE;

  constructor(
    private activateRoute: ActivatedRoute,
    public commonService: CommonService,
  ) {}

  ngOnInit() {
    this.details = this.activateRoute.snapshot.data['details'];
  }

  ngAfterViewInit() {
    if (!this.commonService.isMobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero-spacer',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // 1️⃣ Image scales and blurs
      tl.to(
        '.backdrop img',
        {
          scale: 0.95,
          filter: 'blur(6px)',
        },
        0,
      );

      // 2️⃣ Title moves to top of screen
      tl.to(
        '.movie-title',
        {
          top: '130px',
          left: '50%',
          // transform: 'translateX(-50%)',
          ease: 'power1.out',
        },
        0,
      );
    }
  }
}
