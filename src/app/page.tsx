import { QueryClient, dehydrate } from '@tanstack/react-query';
import { Movies } from '@/components';
import { getMovies } from '@/services';

import Hydrate from '@/providers/Hydrate';

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(['getMovies'], () => getMovies({ page: 1, url: process.env.NEXT_PUBLIC_API_MOVIE_URL }), { staleTime: 10000 });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-auto">
      <h1>영화 목록</h1>
      <Hydrate state={dehydratedState}>
        <Movies mode={'default'} />
      </Hydrate>
    </main>
  );
}
