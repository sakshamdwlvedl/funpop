const withPrefix = (prefix: string) => (path: string) =>
  `${prefix}${path.startsWith('/') ? path : '/' + path}`;

const tmdb = withPrefix('/tmdb');
const api = withPrefix('/api');

export const ENDPOINTS = {
  TMDB: {
    TRENDING_MOVIES: tmdb('/trending/movie/week'),
    TRENDING_TV: tmdb('/trending/tv/week'),

    POPULAR_MOVIES: tmdb('/movie/popular'),
    POPULAR_TV: tmdb('/tv/popular'),

    NOW_PLAYING: tmdb('/movie/now_playing'),
    NOW_PLAYING_TV: tmdb('/tv/on_the_air'),

    TOP_RATED: tmdb('/movie/top_rated'),
    TOP_RATED_TV: tmdb('/tv/top_rated'),

    SEARCH_MOVIE: tmdb('/search/movie'),
    SEARCH_TV: tmdb('/search/tv'),

    GENRE_LIST: tmdb('/genre/movie/list'),
    DISCOVER: tmdb('/discover/movie'),

    RECOMMENDATIONS: (movieId: number) =>
      tmdb(`/movie/${movieId}/recommendations`),

    VIDEOS: (type: 'movie' | 'tv', id: number) => tmdb(`/${type}/${id}/videos`),

    GENRE: {
      ACTION: tmdb('/discover/movie?with_genres=28'),
      COMEDY: tmdb('/discover/movie?with_genres=35'),
      HORROR: tmdb('/discover/movie?with_genres=27'),
      ROMANCE: tmdb('/discover/movie?with_genres=10749'),
      SCIFI: tmdb('/discover/movie?with_genres=878'),
    },
  },

  BACKEND: {
    LOGIN: api('/auth/login'),
    REGISTER: api('/auth/register'),
    PROFILE: api('/user/profile'),
    CONTINUE_WATCHING: api('/user/continue-watching'),
    WATCHLIST: api('/user/watchlist'),
  },
};
