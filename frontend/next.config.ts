/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['amparsons.frb.io'], // adjust for your Craft CMS image domain
  },
  reactStrictMode: true,
  experimental: {
    appDir: true, // Ensure this is enabled for app directory support in Next.js 13+ and 15
    serverComponents: true, // Enable Server Components if needed
  },
  // Optional: You can include rewrites or redirects if necessary
};

module.exports = nextConfig;