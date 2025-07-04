// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'etrndhxojcyimlyuryec.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**', // This path matches Supabase public URLs
      },
    ],
  },
  // Any other Next.js configurations you might have
};

module.exports = nextConfig;