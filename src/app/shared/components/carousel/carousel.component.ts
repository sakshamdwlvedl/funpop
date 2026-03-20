import {
  AfterContentInit,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule, SkeletonLoaderComponent],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterContentInit {
  @Input() title: string = '';
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;

  @ContentChildren(MovieCardComponent)
  movieCards!: QueryList<MovieCardComponent>;

  hasContent = false;
  showLeftFade: boolean = false;
  showRightFade: boolean = false;

  constructor(public commonService: CommonService) {}

  ngAfterContentInit() {
    this.hasContent = this.movieCards.length > 0;

    this.movieCards.changes.subscribe((list: QueryList<MovieCardComponent>) => {
      this.hasContent = list.length > 0;
    });
  }

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
    const el = this.scrollContainer?.nativeElement;

    this.showLeftFade = el?.scrollLeft > 0;
    this.showRightFade = el?.scrollLeft + el?.clientWidth < el?.scrollWidth - 1;
  }
}
