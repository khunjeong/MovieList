import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getSearchMovies } from '@/services';
import { Movies } from '@/components';
import Hydrate from '@/providers/Hydrate';

interface Props {
  params: {
    query: string;
  };
}

export default async function Search({ params: { query } }: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    ['getSearchMovies', decodeURI(query)],
    () => getSearchMovies({ query: decodeURI(query), page: 1, url: process.env.NEXT_PUBLIC_API_MOVIE_URL }),
    { staleTime: 10000 },
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={'flex flex-nowrap'}>
      <Hydrate state={dehydratedState}>
        <Movies mode={'search'} queryValue={decodeURI(query)} />
      </Hydrate>
    </div>
  );
}
