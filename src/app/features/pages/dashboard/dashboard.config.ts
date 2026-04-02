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
  franchises: [
    {
      name: 'Marvel',
      keywordId: 180547,
      bgColor: '#ed1d24',
    },
    {
      name: 'DC',
      keywordId: 180552,
      bgColor: '#0078f0',
    },
    {
      name: 'Star Wars',
      keywordId: 161176,
      bgColor: '#000000',
    },
    {
      name: 'Disney',
      keywordId: 210024,
      bgColor: '#113ccf',
    },
    {
      name: 'Pixar',
      keywordId: 179430,
      bgColor: '#ff9c00',
    },
    {
      name: 'Harry Potter',
      keywordId: 198940,
      bgColor: '#740001',
    },
  ],
};
