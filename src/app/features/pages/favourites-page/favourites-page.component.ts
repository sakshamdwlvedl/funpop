import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiCallService } from '../../../core/services/api-call.service';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-favourites-page',
  standalone: true,
  imports: [CommonModule, MovieCardComponent],
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss']
})
export class FavouritesPageComponent implements OnInit {
  favourites: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiCallService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.updateMeta('My Favourites - FunPop', 'Your personal collection of top picks.');
    this.fetchFavourites();
  }

  fetchFavourites() {
    this.loading = true;
    this.apiService.getFavorites().subscribe({
      next: (res) => {
        this.favourites = res.map((item: any) => ({
          ...item,
          id: item.mediaId,
          poster_path: item.posterPath,
          title: item.title,
          media_type: item.mediaType,
          vote_average: item.voteAverage,
          release_date: item.releaseDate
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
