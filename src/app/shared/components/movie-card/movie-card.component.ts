import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-movie-card',
  imports: [CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  @Input() type!: 'movie' | 'tv';
  @Input() movie: any = {};

  hoveredId: number | null = null;
  trailers: { [key: number]: string } = {};

  imageBase = environment.TMDB_IMG_BASE + '/w342';

  constructor() {}
}
