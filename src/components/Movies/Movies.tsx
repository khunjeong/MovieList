'use client';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useGetMovies, useGetSearchMovies } from '@/services';
import { MovieCard } from '../MovieCard';

interface Props {
  mode: 'default' | 'search';
  queryValue?: string;
}

export default function Movies({ mode = 'default', queryValue }: Props) {
  const {
    contents: movies,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = mode === 'default' ? useGetMovies() : useGetSearchMovies({ query: queryValue });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && movies.length) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, movies]);

  return (
    <div className={'w-full'}>
      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px] w-full'}>
        {status === 'loading' && !isFetchingNextPage && <h3 className={'text-2xl text-center'}>로딩중~~</h3>}
        {status === 'error' && !isFetchingNextPage && <h3 className={'text-2xl text-center'}>영화목록을 불러오지 못하고 있어요 😭😭😭</h3>}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movieItem={movie} />
        ))}
      </div>
      {isFetchingNextPage ? <h3 className={'text-2xl text-center'}>로딩중~~</h3> : <div ref={ref}></div>}
      {hasNextPage === false && status === 'success' && <div className={'text-2xl text-center'}>모든 영화를 불러왔어요 🎉🎉🎉</div>}
    </div>
  );
}
