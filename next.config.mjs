/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  images: {
    unoptimized: true,
    domains: ['res.cloudinary.com'],
  },

  // ----------- Redirects -----------
  async redirects() {
    return [
      {
        source: '/ads.txt',
        destination: 'https://srv.adstxtmanager.com/19390/rankstack.dev',
        permanent: true,
      },
      // Removed thin locale hubs -> English blog index (no article-level
      // equivalents exist, so locale articles intentionally return 404).
      {
        source: '/blogs/br',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blogs/sa',
        destination: '/blogs',
        permanent: true,
      },
      // Legacy uppercase slug -> lowercase canonical
      {
        source: '/blogs/JetHost-review-can-it-really-beat-bluehost-hostinger',
        destination: '/blogs/jethost-review-can-it-really-beat-bluehost-hostinger',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
