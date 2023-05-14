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
    <div className={'flex flex-nowrap justify-center items-center p-4 gap-4 '}>
      <Image src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`} alt={movieData.title} width={300} height={200} />
      <div className={'text-white w-1/2'}>
        <h3 className={'text-4xl text-center text-[700]'}>{`${movieData.title} (${dayjs(movieData.release_date).format('YYYY')})`}</h3>
        <p className={'text-1xl text-right text-[400] pt-2'}>{dayjs(movieData.release_date).format('YYYY/MM/DD')}</p>
        <h3 className={'text-2xl text-left text-[500] pt-4'}>{movieData.tagline}</h3>
        <h3 className={'text-2xl text-left text-[600] pt-4'}>개요</h3>
        <p className={'text-1xl text-left text-[500] pt-2'}>{movieData.overview}</p>
      </div>
    </div>
  );
}
