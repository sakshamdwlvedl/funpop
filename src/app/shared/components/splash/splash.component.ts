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

  ngAfterViewInit() {
    this.playIntroAnimation();
  }

  playIntroAnimation() {
    const logo = this.logoImg.nativeElement;
    const container = this.splashContainer.nativeElement;

    const tl = gsap.timeline({
      onComplete: () => this.finished.emit(),
    });

    /* slight hold */
    tl.to({}, { duration: 0.3 });

    /* logo exit */
    tl.to(logo, {
      scale: 0,
      opacity: 0,
      duration: 0.45,
      ease: 'power3.in',
    });

    /* screen fade */
    tl.to(container, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.out',
    });
  }
}
