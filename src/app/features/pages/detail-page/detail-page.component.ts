import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetails } from '../../interfaces/movie-detail.interface';

@Component({
  selector: 'app-detail-page',
  imports: [],
  templateUrl: './detail-page.component.html',
  styleUrl: './detail-page.component.scss',
})
export class DetailPageComponent {
  details!: MovieDetails;

  constructor(private activateRoute: ActivatedRoute) {}

  ngOnInit() {
    this.details = this.activateRoute.snapshot.data['details'];
  }
}
