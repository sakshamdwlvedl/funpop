import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent {
  @Input() title: string = '';
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  showLeftFade: boolean = false;
  showRightFade: boolean = false;

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkFade();
    });
    this.showRightFade = true;
  }

  onScroll() {
    this.checkFade();
  }

  checkFade() {
    const el = this.scrollContainer.nativeElement;

    this.showLeftFade = el.scrollLeft > 0;
    this.showRightFade = el.scrollLeft + el.clientWidth < el.scrollWidth - 1;
  }
}
