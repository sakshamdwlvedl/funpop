import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ENDPOINTS } from '../api/endpoints';
import { forkJoin, map, Observable } from 'rxjs';
import { MovieDetails } from '../../features/interfaces/movie-detail.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpService) {}

  getTrending(mediaType: 'movie' | 'tv') {
    return this.http.get(ENDPOINTS.TMDB.TRENDING(mediaType)).pipe(
      map((res) => {
        return {
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        };
      }),
    );
  }

  getTopRated(mediaType: 'movie' | 'tv') {
    return this.http.get(ENDPOINTS.TMDB.TOP_RATED(mediaType)).pipe(
      map((res) => {
        return {
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        };
      }),
    );
  }

  getPopular(mediaType: 'movie' | 'tv') {
    return this.http.get(ENDPOINTS.TMDB.POPULAR(mediaType)).pipe(
      map((res) => {
        return {
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        };
      }),
    );
  }

  getNewReleasedMovies() {
    return this.http.get(ENDPOINTS.TMDB.NOW_PLAYING_MOVIE).pipe(
      map((res) => {
        return {
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: 'movie',
          })),
        };
      }),
    );
  }

  getNewReleasedTV() {
    return this.http.get(ENDPOINTS.TMDB.NOW_PLAYING_TV).pipe(
      map((res) => {
        return {
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: 'tv',
          })),
        };
      }),
    );
  }

  getDetails(mediaType: 'movie' | 'tv', id: string): Observable<MovieDetails> {
    return this.http.get(ENDPOINTS.TMDB.DETAILS(mediaType, id));
  }

  getVideos(id: number, type: 'movie' | 'tv') {
    return this.http.get(ENDPOINTS.TMDB.VIDEOS(type, id));
  }
}
