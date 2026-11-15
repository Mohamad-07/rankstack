export default function robots() {
  const baseUrl = 'https://rankstack.dev';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Backend API endpoints — not crawlable pages (client fetches are
        // unaffected by robots.txt).
        disallow: ['/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
