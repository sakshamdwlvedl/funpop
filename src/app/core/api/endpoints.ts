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

    MULTI_SEARCH: (query: string) => tmdb(`/search/multi?query=${query}`),

    SEARCH_MOVIE: (query: string, page = 1) =>
      tmdb(`/search/movie?query=${encodeURIComponent(query)}&page=${page}`),

    SEARCH_TV: (query: string, page = 1) =>
      tmdb(`/search/tv?query=${encodeURIComponent(query)}&page=${page}`),

    SEARCH_PEOPLE: (query: string, page = 1) =>
      tmdb(`/search/person?query=${encodeURIComponent(query)}&page=${page}`),

    DISCOVER_BY_GENRE: (mediaType: 'movie' | 'tv', genreId: number, page = 1) =>
      tmdb(`/discover/${mediaType}?with_genres=${genreId}&page=${page}`),

    DISCOVER_BY_KEYWORD: (
      mediaType: 'movie' | 'tv',
      keywordId: number,
      page = 1,
    ) => tmdb(`/discover/${mediaType}?with_keywords=${keywordId}&page=${page}`),

    CAST_BY_MEDIA: (mediaType: 'movie' | 'tv', id: string) =>
      tmdb(`/${mediaType}/${id}/credits`),

    SEARCH_PEOPLE_BY_KEYWORD: (keywordId: number, page = 1) =>
      tmdb(`/discover/person?with_keywords=${keywordId}&page=${page}`),

    POPULAR_PEOPLE: (page = 1) => tmdb(`/person/popular?page=${page}`),

    TRENDING_PAGINATED: (mediaType: 'movie' | 'tv', page = 1) =>
      tmdb(`/trending/${mediaType}/week?page=${page}`),

    TOP_RATED_PAGINATED: (mediaType: 'movie' | 'tv', page = 1) =>
      tmdb(`/${mediaType}/top_rated?page=${page}`),

    POPULAR_PAGINATED: (mediaType: 'movie' | 'tv', page = 1) =>
      tmdb(`/${mediaType}/popular?page=${page}`),

    NOW_PLAYING_PAGINATED: (page = 1) =>
      tmdb(`/movie/now_playing?page=${page}`),

    ON_THE_AIR_PAGINATED: (page = 1) => tmdb(`/tv/on_the_air?page=${page}`),

    PERSON_DETAILS: (id: string) =>
      tmdb(
        `/person/${id}?append_to_response=combined_credits,images,external_ids`,
      ),
  },

  BACKEND: {
    LOGIN: api('/auth/login'),
    TOGGLE_WISHLIST: api('/interactions/wishlist'),
    GET_WISHLIST: (mediaType?: string) =>
      api(
        `/interactions/wishlist${mediaType ? '?mediaType=' + mediaType : ''}`,
      ),
    TOGGLE_FAVOURITE: api('/interactions/favorites'),
    GET_FAVOURITE: (mediaType?: string) =>
      api(
        `/interactions/favorites${mediaType ? '?mediaType=' + mediaType : ''}`,
      ),
    REORDER_WISHLIST: api('/interactions/wishlist/reorder'),
    REORDER_FAVOURITE: api('/interactions/favorites/reorder'),
    ADD_REVIEW: api('/interactions/reviews'),
    GET_REVIEWS: (mediaType: string, mediaId: string) =>
      api(`/interactions/reviews/${mediaType}/${mediaId}`),
    GET_INTERACTION_STATUS: api('/interactions/status'),
  },
};
