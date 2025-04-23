import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  //output: 'export',
  images: {
    domains: ['freelance-frontend.ddev.site'], // due to using remote images we need to accept the domain
  },
};

export default nextConfig;
