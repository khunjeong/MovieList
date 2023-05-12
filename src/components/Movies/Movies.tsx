'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useGetMovies } from '@/services';
import { MovieCard } from '../MovieCard';
export default function Movies() {
  const { contents: movies, status, fetchNextPage, isFetchingNextPage, hasNextPage } = useGetMovies();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && movies.length) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, movies]);

  return (
    <div>
      <h1>Movies List</h1>
      <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[16px]'}>
        {status === 'loading' && !isFetchingNextPage && <h3>로딩중~~</h3>}
        {status === 'error' && !isFetchingNextPage && <h3>영화목록을 불러오지 못하고 있어요 😭😭😭</h3>}
        {movies.map((movie) => (
          <MovieCard key={movie.id} movieItem={movie} />
        ))}
      </div>
      {isFetchingNextPage ? <h3>로딩중~~</h3> : <div ref={ref}></div>}
      {hasNextPage === false && status === 'success' && <div>모든 영화를 불러왔어요 🎉🎉🎉</div>}
    </div>
  );
}
