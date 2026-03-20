const withPrefix = (prefix: string) => (path: string) =>
  `${prefix}${path.startsWith('/') ? path : '/' + path}`;

const tmdb = withPrefix('/tmdb');
const api = withPrefix('/api');

export const ENDPOINTS = {
  TMDB: {
    NOW_PLAYING_MOVIE: tmdb('/movie/now_playing'),
    NOW_PLAYING_TV: tmdb('/tv/on_the_air'),
    GENRE_LIST: tmdb('/genre/movie/list'),

    DISCOVER: (mediaType: 'movie' | 'tv') => tmdb(`/discover/${mediaType}`),

    TRENDING: (mediaType: 'movie' | 'tv') =>
      tmdb(`/trending/${mediaType}/week`),

    TOP_RATED: (mediaType: 'movie' | 'tv') => tmdb(`/${mediaType}/top_rated`),

    POPULAR: (mediaType: 'movie' | 'tv') => tmdb(`/${mediaType}/popular`),

    DETAILS: (mediaType: 'movie' | 'tv', id: string) =>
      tmdb(
        `/${mediaType}/${id}?append_to_response=credits,videos,images,reviews,similar,recommendations,external_ids,keywords,watch/providers`,
      ),

    SEARCH: (mediaType: 'movie' | 'tv') => tmdb(`/search/${mediaType}`),

    VIDEOS: (type: 'movie' | 'tv', id: number) => tmdb(`/${type}/${id}/videos`),
  },

  BACKEND: {
    LOGIN: api('/auth/login'),
  },
};
