import Axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IPaginationResponse, IMovieModel } from '@/types';

/**
 * [API] GET 영화 목록 불러오기
 * @param { number } page 페이지 number
 */
export async function getMovies({ page }: { page: number }) {
  const res = await Axios.get<IPaginationResponse<IMovieModel>>(`/movie/3/discover/movie`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_MOVIE_API,
      language: 'ko',
      page,
    },
  });

  return res.data;
}
