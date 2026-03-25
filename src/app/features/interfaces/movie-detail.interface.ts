export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection | null;
  budget: number;
  credits: Credits;
  created_by?: any;
  external_ids: ExternalIds;
  genres: Genre[];
  homepage: string;
  id: number;
  images: Images;
  imdb_id: string;
  keywords: Keywords;
  name: string;
  number_of_seasons?: string;
  seasons?: any;
  first_air_date?: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  recommendations: RecommendationResponse;
  release_date: string;
  revenue: number;
  reviews: ReviewResponse;
  runtime: number;
  similar: RecommendationResponse;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  videos: VideoResponse;
  vote_average: number;
  vote_count: number;
  watch_providers: WatchProviders;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface Crew {
  id: number;
  name: string;
  known_for_department?: string;
  job: string;
  department: string;
  profile_path: string;
}

export interface ExternalIds {
  imdb_id: string;
  wikidata_id: string;
  facebook_id: string;
  instagram_id: string;
  twitter_id: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Images {
  backdrops: Image[];
  posters: Image[];
}

export interface Image {
  aspect_ratio: number;
  height: number;
  width: number;
  file_path: string;
  iso_639_1: string | null;
}

export interface Keywords {
  keywords: Keyword[];
  results: Keyword[];
}

export interface Keyword {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface RecommendationResponse {
  page: number;
  results: MovieSummary[];
  total_pages: number;
  total_results: number;
}

export interface MovieSummary {
  id: number;
  title?: string;
  name?: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
}

export interface ReviewResponse {
  page: number;
  results: Review[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface VideoResponse {
  results: Video[];
}

export interface Video {
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface WatchProviders {
  results: any;
}
