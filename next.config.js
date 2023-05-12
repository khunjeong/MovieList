/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/movie/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_MOVIE_URL}/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
