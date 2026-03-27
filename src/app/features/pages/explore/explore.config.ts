import { ApiCallService } from '../../../core/services/api-call.service';
import { Observable } from 'rxjs';

export type ExploreTab = 'movies' | 'tv' | 'people';

export interface TabConfig {
  key: ExploreTab;
  label: string;
  apiFn: (api: ApiCallService, page: number, param: string) => Observable<any>;
  /** Transform raw results if needed (e.g. add media_type) */
  transform?: (item: any) => any;
}

export interface ExploreStrategy {
  heading: (param: string) => string;
  showTabs: boolean;
  tabs: TabConfig[];
  /**
   * For strategies where a single param maps to a named label
   * (e.g. genre name). Supply a resolver fn or leave undefined.
   */
  labelResolver?: (api: ApiCallService, param: string) => Observable<string>;
}

const movieTab = (apiFn: TabConfig['apiFn']): TabConfig => ({
  key: 'movies',
  label: 'Movies',
  apiFn,
  transform: (item) => ({ ...item, media_type: 'movie' }),
});

const tvTab = (apiFn: TabConfig['apiFn']): TabConfig => ({
  key: 'tv',
  label: 'TV Shows',
  apiFn,
  transform: (item) => ({ ...item, media_type: 'tv' }),
});

const peopleTab = (apiFn: TabConfig['apiFn']): TabConfig => ({
  key: 'people',
  label: 'People',
  apiFn,
});

/**
 * Strategy map keyed by the query param name.
 *
 * URL examples:
 *   /explore?genre=28          → GENRE strategy
 *   /explore?keyword=1234      → KEYWORD strategy
 *   /explore?query=batman      → SEARCH strategy
 *   /explore?type=trending-movies → TYPE strategy
 *   /explore?people=550        → PEOPLE strategy  (movie/tv id)
 */
export const EXPLORE_STRATEGIES: Record<string, ExploreStrategy> = {
  // ── Genre (/explore?genre=28) ─────────────────────────────────────────────
  genre: {
    heading: (param) => `Genre #${param}`,
    showTabs: true,
    tabs: [
      movieTab((api, page, param) =>
        api.discoverByGenre('movie', +param, page),
      ),
      tvTab((api, page, param) => api.discoverByGenre('tv', +param, page)),
    ],
  },

  // ── Keyword (/explore?keyword=1234) ──────────────────────────────────────
  keyword: {
    heading: (param) => `Keyword #${param}`,
    showTabs: true,
    tabs: [
      movieTab((api, page, param) =>
        api.discoverByKeyword('movie', +param, page),
      ),
      tvTab((api, page, param) => api.discoverByKeyword('tv', +param, page)),
    ],
  },

  // ── Search (/explore?query=batman) ───────────────────────────────────────
  query: {
    heading: (param) => `Results for "${param}"`,
    showTabs: true,
    tabs: [
      movieTab((api, page, param) => api.searchMovie(param, page)),
      tvTab((api, page, param) => api.searchTV(param, page)),
      peopleTab((api, page, param) => api.searchPeople(param, page)),
    ],
  },

  // ── Dashboard "See More" — specific list (/explore?type=trending-movies) ─
  type: {
    heading: (param) => TYPE_LABELS[param] ?? param,
    showTabs: false,
    tabs: [
      movieTab(
        (api, page, param) =>
          TYPE_API_MAP[param]?.(api, page) ??
          api.getPopularPaginated('movie', page),
      ),
      tvTab(
        (api, page, param) =>
          TYPE_API_MAP[param]?.(api, page) ??
          api.getPopularPaginated('tv', page),
      ),
    ],
  },

  // ── Cast list for a movie/tv (/explore?people=550&mediaType=movie) ────────
  people: {
    heading: (_param) => 'Full Cast & Crew',
    showTabs: false,
    tabs: [
      peopleTab((api, page, param) => {
        // param format: "<mediaType>-<id>"  e.g. "movie-550"
        const [mediaType, id] = param.split('-') as ['movie' | 'tv', string];
        return api.getPeopleByMedia(mediaType, id);
      }),
    ],
  },
};

// ─── TYPE strategy helpers ────────────────────────────────────────────────────

export const TYPE_LABELS: Record<string, string> = {
  'trending-movies': 'Trending Movies',
  'trending-tv': 'Trending TV Shows',
  'top-rated-movies': 'Top Rated Movies',
  'top-rated-tv': 'Top Rated TV Shows',
  'popular-movies': 'Popular Movies',
  'popular-tv': 'Popular TV Shows',
  'now-playing': 'Now Playing',
  'on-the-air': 'On The Air',
};

type ApiFactory = (api: ApiCallService, page: number) => Observable<any>;

export const TYPE_API_MAP: Record<string, ApiFactory> = {
  'trending-movies': (api, page) => api.getTrendingPaginated('movie', page),
  'trending-tv': (api, page) => api.getTrendingPaginated('tv', page),
  'top-rated-movies': (api, page) => api.getTopRatedPaginated('movie', page),
  'top-rated-tv': (api, page) => api.getTopRatedPaginated('tv', page),
  'popular-movies': (api, page) => api.getPopularPaginated('movie', page),
  'popular-tv': (api, page) => api.getPopularPaginated('tv', page),
  'now-playing': (api, page) => api.getNowPlayingPaginated(page),
  'on-the-air': (api, page) => api.getOnTheAirPaginated(page),
};

// ─── Dashboard section → type key map (used in dashboard template) ───────────
// Each DASHBOARD_CONFIG section should have a `typeKey` matching TYPE_API_MAP
export const SECTION_TYPE_KEY_MAP: Record<string, string> = {
  trendingMovies: 'trending-movies',
  trendingTV: 'trending-tv',
  topRatedMovies: 'top-rated-movies',
  topRatedTV: 'top-rated-tv',
  popularMovies: 'popular-movies',
  popularTV: 'popular-tv',
  nowPlaying: 'now-playing',
  onTheAir: 'on-the-air',
};
