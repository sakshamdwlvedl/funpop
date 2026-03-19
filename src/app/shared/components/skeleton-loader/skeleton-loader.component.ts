import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SkeletonConfig } from '../../interfaces/common.interface';

@Component({
  selector: 'app-skeleton-loader',
  imports: [CommonModule],
  templateUrl: './skeleton-loader.component.html',
  styleUrls: ['./skeleton-loader.component.scss'],
})
export class SkeletonLoaderComponent {
  @Input() config: SkeletonConfig = { items: [] };
}
