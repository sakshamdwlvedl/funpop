import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() type: 'movie' | 'tv' = 'movie';
  @Input() movie: any = {};

  hoveredId: number | null = null;
  trailers: { [key: number]: string } = {};

  imageBase = 'https://image.tmdb.org/t/p/w500';

  constructor() {}
}
