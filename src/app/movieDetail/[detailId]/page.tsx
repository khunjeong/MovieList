import Image from 'next/image';
import dayjs from 'dayjs';
import { getMoviesDetail } from '@/services';

interface Props {
  params: {
    detailId: string;
  };
}

export default async function MovieDetail({ params: { detailId } }: Props) {
  const movieData = await getMoviesDetail({ id: Number(detailId) });

  if (!movieData) return null;

  return (
    <div className={'flex flex-nowrap bg-purple-500'}>
      <Image className="w-full" src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} width={300} height={200} />
      <div className={'text-white'}>
        <h3>{`${movieData.title} (${dayjs(movieData.release_date).format('YYYY')})`}</h3>
        <p>{dayjs(movieData.release_date).format('YYYY/MM/DD')}</p>
        <h3>{movieData.tagline}</h3>
        <h3>개요</h3>
        <p>{movieData.overview}</p>
      </div>
    </div>
  );
}
