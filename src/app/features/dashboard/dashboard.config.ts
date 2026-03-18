export const DASHBOARD_CONFIG = {
  sections: [
    {
      key: 'trendingMovies',
      label: 'Trending Movies',
      endpoint: 'TRENDING_MOVIES',
    },
    { key: 'trendingTV', label: 'Trending TV Shows', endpoint: 'TRENDING_TV' },

    {
      key: 'popularMovies',
      label: 'Popular Movies',
      endpoint: 'POPULAR_MOVIES',
    },
    { key: 'popularTV', label: 'Popular TV Shows', endpoint: 'POPULAR_TV' },

    { key: 'topRatedMovies', label: 'Top Rated Movies', endpoint: 'TOP_RATED' },
    {
      key: 'topRatedTV',
      label: 'Top Rated TV Shows',
      endpoint: 'TOP_RATED_TV',
    },

    {
      key: 'newMovies',
      label: 'New Releases (Movies)',
      endpoint: 'NOW_PLAYING',
    },
    { key: 'newTV', label: 'New Releases (TV)', endpoint: 'NOW_PLAYING_TV' },

    { key: 'action', label: 'Action', type: 'mixed', genre: 28 },
    { key: 'comedy', label: 'Comedy', type: 'mixed', genre: 35 },
    { key: 'horror', label: 'Horror', type: 'mixed', genre: 27 },
    { key: 'romance', label: 'Romance', type: 'mixed', genre: 10749 },
    { key: 'scifi', label: 'Sci-Fi', type: 'mixed', genre: 878 },
  ],
};
