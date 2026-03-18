import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ENDPOINTS } from '../api/endpoints';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpService) {}

  getTrendingMovies() {
    return this.http.get(ENDPOINTS.TMDB.TRENDING_MOVIES);
  }

  getTopRatedMovies() {
    return this.http.get(ENDPOINTS.TMDB.TOP_RATED);
  }

  getMoviesByRegion(region: string) {
    return this.http.get(ENDPOINTS.TMDB.DISCOVER, {
      region,
      sort_by: 'popularity.desc',
    });
  }

  searchMovies(query: string) {
    return this.http.get(ENDPOINTS.TMDB.SEARCH_MOVIE, { query });
  }

  getIndianMovies(language: string) {
    return this.http.get(ENDPOINTS.TMDB.DISCOVER, {
      with_original_language: language,
      sort_by: 'popularity.desc',
    });
  }

  getTrendingTV() {
    return this.http.get(ENDPOINTS.TMDB.TRENDING_TV);
  }

  searchTV(query: string) {
    return this.http.get(ENDPOINTS.TMDB.SEARCH_TV, { query });
  }

  getVideos(id: number, type: 'movie' | 'tv') {
    return this.http.get(ENDPOINTS.TMDB.VIDEOS(type, id));
  }

  getHomeData(sections: any, region: any) {
    const requests: any = {};

    sections.forEach((section: any) => {
      if (section.endpoint) {
        requests[section.key] = this.http.get(
          (ENDPOINTS as any).TMDB[section.endpoint],
        );
      }

      if (section.type === 'mixed' && section.genre) {
        requests[section.key] = forkJoin({
          movies: this.http.get(
            `${ENDPOINTS.TMDB.DISCOVER}?with_genres=${section.genre}&region=${region}`,
          ),
          tv: this.http.get(
            `${ENDPOINTS.TMDB.DISCOVER.replace('/movie', '/tv')}?with_genres=${section.genre}`,
          ),
        });
      }
    });

    return forkJoin(requests);
  }
}
