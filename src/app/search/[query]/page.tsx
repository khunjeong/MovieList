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

  const searchValue = decodeURI(query);

  await queryClient.prefetchInfiniteQuery(['getSearchMovies', searchValue], () => getSearchMovies({ query: searchValue, page: 1 }), { staleTime: 10000 });
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className={'flex flex-nowrap'}>
      <Hydrate state={dehydratedState}>
        <Movies mode={'search'} queryValue={searchValue} />
      </Hydrate>
    </div>
  );
}
