import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { gsap } from 'gsap';
import { COMMON } from '../../../core/constants/common.constant';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss'],
})
export class SplashComponent implements AfterViewInit {
  @ViewChild('logoImg') logoImg!: ElementRef<HTMLImageElement>;
  @ViewChild('splashContainer') splashContainer!: ElementRef<HTMLDivElement>;

  @Output() finished = new EventEmitter<void>();

  appNameLetters = COMMON.APP_NAME.split('');

  COMMON: typeof COMMON = COMMON;

  ngAfterViewInit() {
    this.playIntroAnimation();
  }

  playIntroAnimation() {
    const logo = this.logoImg.nativeElement;
    const container = this.splashContainer.nativeElement;

    const tl = gsap.timeline({
      onComplete: () => this.finished.emit(),
    });

    tl.from(
      '.bg-text .letter',
      {
        y: 80,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.13,
      },
      0.5,
    );

    tl.to(
      logo,
      {
        scale: 5,
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
      },
      1.5,
    );

    tl.to(container, {
      opacity: 0,
      duration: 0.6,
      ease: 'power1.out',
    });
  }
}
