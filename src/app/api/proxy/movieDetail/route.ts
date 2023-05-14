import { NextRequest, NextResponse } from 'next/server';
import Axios from 'axios';

export async function GET(request: NextRequest) {
  const id_str = Number(request.nextUrl.searchParams.get('id'));

  return Axios.get(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/3/movie/${id_str}`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_MOVIE_API,
      language: 'ko',
    },
  }).then((res) => NextResponse.json(res.data));
}
