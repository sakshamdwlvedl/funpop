import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
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

  hoveredId: number | null = null;
  trailers: { [key: number]: string } = {};

  constructor(public commonService: CommonService) {}
}
