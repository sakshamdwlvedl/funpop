import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  imports: [CommonModule],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent implements OnInit {
  @Input() rating!: number | string;

  ngOnInit(): void {
    this.rating = this.rating?.toString() ?? '0';
  }

  getRatingClass() {
    if (parseFloat(this.rating as string) >= 7) return 'good';

    if (parseFloat(this.rating as string) >= 5) return 'avg';

    return 'bad';
  }
}
