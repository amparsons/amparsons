/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['freelance-frontend.ddev.site'], // adjust for your Craft CMS image domain
  },
  experimental: {
    serverActions: true, // optional: only if you're using server actions
  },
};

module.exports = nextConfig;