import { ApiCallService } from '../../../core/services/api-call.service';

export const DASHBOARD_CONFIG = {
  sections: [
    {
      key: 'trendingMovies',
      title: 'Trending Movies',
      mediaType: 'movie',
      typeKey: 'trending-movies',
      apiFunction: (api: ApiCallService) => api.getTrending('movie'),
    },
    {
      key: 'trendingTV',
      title: 'Trending TV Shows',
      mediaType: 'tv',
      typeKey: 'trending-tv',
      apiFunction: (api: ApiCallService) => api.getTrending('tv'),
    },
    {
      key: 'topRatedMovies',
      title: 'Top Rated Movies',
      mediaType: 'movie',
      typeKey: 'top-rated-movies',
      apiFunction: (api: ApiCallService) => api.getTopRated('movie'),
    },
    {
      key: 'topRatedTV',
      title: 'Top Rated TV Shows',
      mediaType: 'tv',
      typeKey: 'top-rated-tv',
      apiFunction: (api: ApiCallService) => api.getTopRated('tv'),
    },
    {
      key: 'popularMovies',
      title: 'Popular Movies',
      mediaType: 'movie',
      typeKey: 'popular-movies',
      apiFunction: (api: ApiCallService) => api.getPopular('movie'),
    },
    {
      key: 'popularTV',
      title: 'Popular TV Shows',
      mediaType: 'tv',
      typeKey: 'popular-tv',
      apiFunction: (api: ApiCallService) => api.getPopular('tv'),
    },
    {
      key: 'nowPlaying',
      title: 'Now Playing',
      mediaType: 'movie',
      typeKey: 'now-playing',
      apiFunction: (api: ApiCallService) => api.getNewReleasedMovies(),
    },
    {
      key: 'onTheAir',
      title: 'On The Air',
      mediaType: 'tv',
      typeKey: 'on-the-air',
      apiFunction: (api: ApiCallService) => api.getNewReleasedTV(),
    },
  ],
};
