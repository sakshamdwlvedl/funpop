import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-scroll-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-indicator.component.html',
  styleUrls: ['./scroll-indicator.component.scss'],
})
export class ScrollIndicatorComponent implements AfterViewInit {
  @Input() color = '#ffffff';
  @Input() bottom = '40px';
  @Input() size = '28px';

  ngAfterViewInit(): void {
    setTimeout(() => {
      ScrollTrigger.refresh();
      this.initAnimation();
    }, 100);
  }

  initAnimation() {
    gsap.to('.glass-arrow', {
      y: 140,
      opacity: 0,
      ease: 'none',
      pointerEvents: 'none',
      scrollTrigger: {
        start: 0,
        end: 200,
        scrub: true,
      },
    });
  }
}
