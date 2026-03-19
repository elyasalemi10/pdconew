import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_URL = 'https://pdcon.com.au';

const staticPages = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/services/pre-sale', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/bathroom', priority: '0.9', changefreq: 'monthly' },
  { loc: '/services/improvements', priority: '0.9', changefreq: 'monthly' },
  { loc: '/past-projects', priority: '0.8', changefreq: 'monthly' },
  { loc: '/blog', priority: '0.9', changefreq: 'daily' },
  { loc: '/showroom', priority: '0.7', changefreq: 'monthly' },
  { loc: '/agents', priority: '0.7', changefreq: 'monthly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/consultation', priority: '0.8', changefreq: 'monthly' },
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { data: posts } = await supabase
      .from('pdcon_blog_posts')
      .select('slug, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    for (const page of staticPages) {
      xml += `
  <url>
    <loc>${BASE_URL}${page.loc}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
    }

    if (posts) {
      for (const post of posts) {
        const publishedDate = new Date(post.published_at);
        const isRecent = publishedDate > thirtyDaysAgo;
        xml += `
  <url>
    <loc>${BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${post.updated_at ? new Date(post.updated_at).toISOString().split('T')[0] : new Date(post.published_at).toISOString().split('T')[0]}</lastmod>
    <changefreq>${isRecent ? 'weekly' : 'monthly'}</changefreq>
    <priority>0.8</priority>
  </url>`;
      }
    }

    xml += `
</urlset>`;

    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap error:', error);
    return res.status(500).send('Error generating sitemap');
  }
}
