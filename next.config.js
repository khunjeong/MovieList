/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
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
