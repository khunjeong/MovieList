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

/**
 * [react-query] 영화 목록 InfinityScroll
 */
export const useGetMovies = () => {
  const res = useInfiniteQuery(['getMovies'], ({ pageParam = 1 }) => getMovies({ page: pageParam }), {
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return lastPage.results.length !== 0 ? nextPage : undefined;
    },
  });
  const { data } = res;

  const contents = data ? data.pages.map((page) => page.results).reduce((mergedList, currentlist) => [...mergedList, ...(currentlist || [])], []) : [];

  return { ...res, contents };
};

/**
 * [API] GET 영화 상세 불러오기
 * @param { number } id 영화 id
 */
export async function getMoviesDetail({ id }: { id: number }) {
  try {
    const res = await Axios.get<IMovieModel>(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/3/movie/${id}`, {
      params: {
        api_key: process.env.NEXT_PUBLIC_MOVIE_API,
        language: 'ko',
      },
    });
    return res.data;
  } catch (error) {
    console.log({ error });
    return false;
  }
}
