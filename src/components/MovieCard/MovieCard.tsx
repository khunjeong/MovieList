import Image from 'next/image';
import Link from 'next/link';
import dayjs from 'dayjs';
import { IMovieModel } from '@/types';

interface Props {
  movieItem: IMovieModel;
}

export default function MovieCard({ movieItem }: Props) {
  return (
    <li className={'bg-white border-4 border-darkBlue overflow-hidden rounded-lg shadow-lg list-none'}>
      <Link href={`/movieDetail/${movieItem.id}`}>
        <Image className="w-full" src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`} alt={movieItem.title} width={300} height={200} />
        <div className="px-[8px]">
          <p className="font-bold text-center text-black">{movieItem.title}</p>
          <p className="text-left text-[rgba(0,0,0,0.6)]">{dayjs(movieItem.release_date).format('MM월 DD, YYYY')}</p>
        </div>
      </Link>
    </li>
  );
}
