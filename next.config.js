/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      // Supabase storage domains
      'iocyggibgtvsujxmajhn.supabase.co',
      // Add your Supabase project ID here after setup

      // External image sources (add as needed)
      'jewishphiladelphia.org',
      'phillyjewisharchives.org',
      'i.imgur.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  
  // Optimize builds
  swcMinify: true,
  
  // Environment variables available to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Philadelphia Historical Synagogues',
  },
};

module.exports = nextConfig;
