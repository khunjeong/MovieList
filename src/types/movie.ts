import { TDate } from './global';

export interface IMovieModel {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: TDate;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
  runtime: number;
  status: string;
  tagline: string;
}
