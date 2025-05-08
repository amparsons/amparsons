/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['amparsons.frb.io'], // adjust for your Craft CMS image domain
  },
  experimental: {
    appDir: true, // If you're using the new app directory feature in Next.js 15
  },
};

module.exports = nextConfig;