import Axios from 'axios';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IPaginationResponse, IMovieModel } from '@/types';

/**
 * [API] GET 영화 목록 불러오기
 * @param { number } page 페이지
 */
export async function getMovies({ page }: { page: number }) {
  const res = await Axios.get<IPaginationResponse<IMovieModel>>(`http://localhost:3000/api/proxy/movies`, {
    params: {
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
    staleTime: 10000,
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
    const res = await Axios.get<IMovieModel>(`http://localhost:3000/api/proxy/movieDetail`, {
      params: {
        id,
      },
    });
    return res.data;
  } catch (error) {
    console.log({ error });
    return false;
  }
}

/**
 * [API] GET 영화 검색 목록 불러오기
 * @param { string | undefined} query 검색
 * @param { number } page 페이지
 */
export async function getSearchMovies({ query, page }: { query?: string; page: number }) {
  const res = await Axios.get<IPaginationResponse<IMovieModel>>(`http://localhost:3000/api/proxy/moviesSearch`, {
    params: {
      page,
      query,
    },
  });

  return res.data;
}

/**
 * [react-query] 영화 목록 InfinityScroll
 * @param { string | undefined} query 검색
 */
export const useGetSearchMovies = ({ query }: { query?: string }) => {
  const res = useInfiniteQuery(['getSearchMovies', query], ({ pageParam = 1 }) => getSearchMovies({ query, page: pageParam }), {
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return lastPage.results.length !== 0 ? nextPage : undefined;
    },
    staleTime: 10000,
  });
  const { data } = res;

  const contents = data ? data.pages.map((page) => page.results).reduce((mergedList, currentlist) => [...mergedList, ...(currentlist || [])], []) : [];

  return { ...res, contents };
};
