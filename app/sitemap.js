import { blogData } from '@/content/blogs';
import { SITE_URL } from '@/lib/seo';
import { modifiedDate, toIso } from '@/lib/blog-dates';

export default function sitemap() {
  // Date-only timestamp (matches blog lastModified format; Google ignores
  // time components in sitemap lastmod anyway).
  const currentDate = new Date().toISOString().slice(0, 10);

  const staticRoutes = [
    { path: '/', changeFrequency: 'weekly', priority: 1.0 },
    { path: '/about', changeFrequency: 'yearly', priority: 0.8 },
    { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
    { path: '/portfolio', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/hosting', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/domain', changeFrequency: 'weekly', priority: 0.8 },
    { path: '/courses', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/blogs', changeFrequency: 'daily', priority: 0.9 },
    { path: '/free-tools', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/contact', changeFrequency: 'yearly', priority: 0.6 },
    { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/disclaimer', changeFrequency: 'yearly', priority: 0.3 },
  ].map((route) => ({
    ...route,
    lastModified: currentDate,
  }));

  const toolRoutes = [
    { path: '/free-tools/ipchecker', changeFrequency: 'weekly', priority: 0.95 },
    { path: '/free-tools/iplookup', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/free-tools/whois-lookup', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/free-tools/domain-age-checker', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/free-tools/dns-propagation', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/free-tools/image-compressor', changeFrequency: 'weekly', priority: 0.9 },
    { path: '/free-tools/hosting-recommender', changeFrequency: 'weekly', priority: 0.85 },
  ].map((route) => ({
    ...route,
    lastModified: currentDate,
  }));

  const seen = new Set();
  const englishBlogRoutes = blogData
    .filter((blog) => blog && blog.slug)
    .filter((blog) => {
      const key = `/blogs/${blog.slug}`.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((blog) => ({
      path: `/blogs/${blog.slug}`,
      lastModified: (toIso(modifiedDate(blog)) || currentDate).slice(0, 10),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  const allRoutes = [...staticRoutes, ...toolRoutes, ...englishBlogRoutes];

  return allRoutes.map(({ path, ...route }) => ({
    url: `${SITE_URL}${path}`,
    ...route,
  }));
}
