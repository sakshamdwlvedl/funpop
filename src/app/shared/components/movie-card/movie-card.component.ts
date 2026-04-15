import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CommonService } from '../../../core/services/common.service';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() type!: 'movie' | 'tv';
  @Input() movie: any = {};
  @Input() isWishlist: boolean = false;
  @Input() isFavorite: boolean = false;
  @Input() rank?: number;

  constructor(public commonService: CommonService) {}
}
