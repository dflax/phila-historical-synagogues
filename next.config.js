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

  // ═══════════════════════════════════════════════════════════════════
  // CUTOVER COMPLETE - Permanent redirects from old URLs to new
  // Old /rabbis URLs now permanently redirect to /leadership
  // ═══════════════════════════════════════════════════════════════════
  async redirects() {
    return [
      {
        source: '/rabbis',
        destination: '/leadership',
        permanent: true,  // Migration complete - permanent redirect
      },
      {
        source: '/rabbis/:slug',
        destination: '/leadership/:slug',
        permanent: true,  // Migration complete - permanent redirect
      },
    ]
  },
};

module.exports = nextConfig;
