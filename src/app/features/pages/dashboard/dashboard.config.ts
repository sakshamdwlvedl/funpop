import { ApiCallService } from '../../../core/services/api-call.service';

export const DASHBOARD_CONFIG = {
  sections: [
    {
      key: 'trendingMovies',
      label: 'Trending Movies',
      apiFunction: (apiService: ApiCallService) =>
        apiService.getTrending('movie'),
    },
    {
      key: 'trendingTV',
      label: 'Trending TV Shows',
      apiFunction: (apiService: ApiCallService) => apiService.getTrending('tv'),
    },
    {
      key: 'popularMovies',
      label: 'Popular Movies',
      apiFunction: (apiService: ApiCallService) =>
        apiService.getPopular('movie'),
    },
    {
      key: 'popularTV',
      label: 'Popular TV Shows',
      apiFunction: (apiService: ApiCallService) => apiService.getPopular('tv'),
    },
    {
      key: 'topRatedMovies',
      label: 'Top Rated Movies',
      apiFunction: (apiService: ApiCallService) =>
        apiService.getTopRated('movie'),
    },
    {
      key: 'topRatedTV',
      label: 'Top Rated TV Shows',
      apiFunction: (apiService: ApiCallService) => apiService.getTopRated('tv'),
    },
    {
      key: 'newMovies',
      label: 'New Releases (Movies)',
      apiFunction: (apiService: ApiCallService) =>
        apiService.getNewReleasedMovies(),
    },
    {
      key: 'newTV',
      label: 'New Releases (TV)',
      apiFunction: (apiService: ApiCallService) =>
        apiService.getNewReleasedTV(),
    },
  ],
};
