import { NextRequest, NextResponse } from 'next/server';
import Axios from 'axios';

export async function GET(request: NextRequest) {
  const page_str = Number(request.nextUrl.searchParams.get('page'));

  return Axios.get(`${process.env.NEXT_PUBLIC_API_MOVIE_URL}/3/discover/movie`, {
    params: {
      api_key: process.env.NEXT_PUBLIC_MOVIE_API,
      language: 'ko',
      page: page_str,
    },
  }).then((res) => NextResponse.json(res.data));
}
