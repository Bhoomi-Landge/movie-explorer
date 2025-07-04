/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['image.tmdb.org'], // ✅ allow TMDB images
  },
};

module.exports = nextConfig;
