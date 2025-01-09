/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    domains: ['picsum.photos'],
    unoptimized: true,
  },
};

export default nextConfig;
