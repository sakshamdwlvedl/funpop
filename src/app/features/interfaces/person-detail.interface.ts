// src/app/features/interfaces/person-detail.interface.ts

export interface PersonDetail {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  place_of_birth: string | null;
  profile_path: string | null;
  known_for_department: string;
  gender: number; // 0=unknown, 1=female, 2=male, 3=non-binary
  popularity: number;
  also_known_as: string[];

  combined_credits: {
    cast: CreditItem[];
    crew: CreditItem[];
  };

  images: {
    profiles: ProfileImage[];
  };

  external_ids: {
    imdb_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    facebook_id: string | null;
    tiktok_id: string | null;
    youtube_id: string | null;
    wikidata_id: string | null;
  };
}

export interface CreditItem {
  id: number;
  title?: string; // movie
  name?: string; // tv
  media_type: 'movie' | 'tv';
  character?: string;
  job?: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date?: string;
  first_air_date?: string;
  popularity: number;
  episode_count?: number;
}

export interface ProfileImage {
  file_path: string;
  width: number;
  height: number;
  vote_average: number;
}
