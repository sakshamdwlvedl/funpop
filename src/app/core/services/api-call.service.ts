import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ENDPOINTS } from '../api/endpoints';
import { map, Observable } from 'rxjs';
import { MovieDetails } from '../../features/interfaces/movie-detail.interface';
import { PersonDetail } from '../../features/interfaces/person-detail.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpService) {}

  getTrending(mediaType: 'movie' | 'tv') {
    return this.http.get({ url: ENDPOINTS.TMDB.TRENDING(mediaType) }).pipe(
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
    return this.http.get({ url: ENDPOINTS.TMDB.TOP_RATED(mediaType) }).pipe(
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
    return this.http.get({ url: ENDPOINTS.TMDB.POPULAR(mediaType) }).pipe(
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
    return this.http.get({ url: ENDPOINTS.TMDB.NOW_PLAYING_MOVIE }).pipe(
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
    return this.http.get({ url: ENDPOINTS.TMDB.NOW_PLAYING_TV }).pipe(
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
    return this.http.get({ url: ENDPOINTS.TMDB.DETAILS(mediaType, id) });
  }

  getVideos(id: number, type: 'movie' | 'tv') {
    return this.http.get({
      url: ENDPOINTS.TMDB.VIDEOS(type, id),
      showLoader: false,
    });
  }

  searchAll(query: string) {
    return this.http.get({ url: ENDPOINTS.TMDB.MULTI_SEARCH(query) }).pipe(
      map((res: any) => ({
        movies: res.results.filter((x: any) => x.media_type === 'movie'),

        tv: res.results.filter((x: any) => x.media_type === 'tv'),

        people: res.results.filter((x: any) => x.media_type === 'person'),
      })),
    );
  }

  getTrendingPaginated(mediaType: 'movie' | 'tv', page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.TRENDING_PAGINATED(mediaType, page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        })),
      );
  }

  getTopRatedPaginated(mediaType: 'movie' | 'tv', page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.TOP_RATED_PAGINATED(mediaType, page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        })),
      );
  }

  getPopularPaginated(mediaType: 'movie' | 'tv', page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.POPULAR_PAGINATED(mediaType, page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        })),
      );
  }

  getNowPlayingPaginated(page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.NOW_PLAYING_PAGINATED(page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: 'movie',
          })),
        })),
      );
  }

  getOnTheAirPaginated(page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.ON_THE_AIR_PAGINATED(page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: 'tv',
          })),
        })),
      );
  }

  discoverByGenre(mediaType: 'movie' | 'tv', genreId: number, page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.DISCOVER_BY_GENRE(mediaType, genreId, page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        })),
      );
  }

  discoverByKeyword(mediaType: 'movie' | 'tv', keywordId: number, page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.DISCOVER_BY_KEYWORD(mediaType, keywordId, page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: mediaType,
          })),
        })),
      );
  }

  searchMovie(query: string, page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.SEARCH_MOVIE(query, page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: 'movie',
          })),
        })),
      );
  }

  searchTV(query: string, page = 1) {
    return this.http
      .get({
        url: ENDPOINTS.TMDB.SEARCH_TV(query, page),
        showLoader: page === 1,
      })
      .pipe(
        map((res) => ({
          ...res,
          results: res.results.map((item: any) => ({
            ...item,
            media_type: 'tv',
          })),
        })),
      );
  }

  searchPeople(query: string, page = 1) {
    return this.http.get({
      url: ENDPOINTS.TMDB.SEARCH_PEOPLE(query, page),
      showLoader: page === 1,
    });
  }

  popularPeople(page = 1) {
    return this.http.get({
      url: ENDPOINTS.TMDB.POPULAR_PEOPLE(page),
      showLoader: page === 1,
    });
  }

  getPeopleByMedia(mediaType: 'movie' | 'tv', id: string) {
    return this.http
      .get({ url: ENDPOINTS.TMDB.CAST_BY_MEDIA(mediaType, id) })
      .pipe(
        map((res: any) => ({
          results: [...(res?.cast ?? []), ...(res?.crew || [])],
          total_pages: 1,
        })),
      );
  }

  getPersonDetails(id: string): Observable<PersonDetail> {
    return this.http.get({ url: ENDPOINTS.TMDB.PERSON_DETAILS(id) });
  }

  private readonly baseUrl = environment.BACKEND_URL + '/interactions';
  private readonly userId = 'funpop_user_123';

  toggleWishlist(item: any, mediaType: string): Observable<any> {
    const body = {
      userId: this.userId,
      mediaId: item.id.toString(),
      mediaType,
      title: item.title || item.name,
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
      releaseDate: item.release_date || item.first_air_date,
    };
    return this.http.post({
      url: ENDPOINTS.BACKEND.TOGGLE_WISHLIST,
      body,
      showLoader: false,
    });
  }

  getWishlist(mediaType?: string): Observable<any> {
    return this.http.get({
      url: ENDPOINTS.BACKEND.GET_WISHLIST(this.userId, mediaType),
    });
  }

  toggleFavorite(item: any, mediaType: string): Observable<any> {
    const body = {
      userId: this.userId,
      mediaId: item.id.toString(),
      mediaType,
      title: item.title || item.name,
      posterPath: item.poster_path,
      voteAverage: item.vote_average,
      releaseDate: item.release_date || item.first_air_date,
    };
    return this.http.post({
      url: ENDPOINTS.BACKEND.TOGGLE_FAVOURITE,
      body,
      showLoader: false,
    });
  }

  updateWishlistOrder(mediaIds: string[]): Observable<any> {
    return this.http.post({
      url: ENDPOINTS.BACKEND.REORDER_WISHLIST,
      body: { userId: this.userId, mediaIds },
      showLoader: false,
    });
  }

  getFavorites(mediaType?: string): Observable<any> {
    return this.http.get({
      url: ENDPOINTS.BACKEND.GET_FAVOURITE(this.userId, mediaType),
    });
  }

  addReview(
    mediaId: string,
    mediaType: string,
    rating: number,
    review: string,
  ): Observable<any> {
    const body = {
      userId: this.userId,
      username: 'FunPop User',
      mediaId: mediaId.toString(),
      mediaType,
      rating,
      review,
    };
    return this.http.post({ url: ENDPOINTS.BACKEND.ADD_REVIEW, body });
  }

  getReviews(mediaType: string, mediaId: string): Observable<any> {
    return this.http.get({
      url: ENDPOINTS.BACKEND.GET_REVIEWS(mediaType, mediaId),
    });
  }

  getInteractionStatus(mediaId: string, mediaType: string): Observable<any> {
    return this.http.get({
      url: ENDPOINTS.BACKEND.GET_INTERACTION_STATUS,
      params: {
        userId: this.userId,
        mediaId: mediaId.toString(),
        mediaType,
      },
    });
  }
}
