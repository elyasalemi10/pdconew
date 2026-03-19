import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_URL = 'https://pdcon.com.au';

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .limit(20);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>PDCON Blog — Melbourne Renovation &amp; Building Insights</title>
    <link>${BASE_URL}/blog</link>
    <description>Expert renovation guides, cost breakdowns, and suburb-specific advice for Melbourne homeowners and property developers.</description>
    <language>en-au</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>
    <image>
      <url>${BASE_URL}/pdcon-logo-dark.webp</url>
      <title>PDCON</title>
      <link>${BASE_URL}</link>
    </image>`;

    if (posts) {
      for (const post of posts) {
        xml += `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>
      <description>${escapeXml(post.excerpt || post.meta_description)}</description>
      <content:encoded><![CDATA[${post.content}]]></content:encoded>
      <pubDate>${new Date(post.published_at).toUTCString()}</pubDate>
      <category>${escapeXml(post.category)}</category>
      ${post.featured_image_url ? `<enclosure url="${escapeXml(post.featured_image_url)}" type="image/webp"/>` : ''}
    </item>`;
      }
    }

    xml += `
  </channel>
</rss>`;

    res.setHeader('Content-Type', 'application/rss+xml');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(xml);
  } catch (error) {
    console.error('RSS error:', error);
    return res.status(500).send('Error generating RSS feed');
  }
}
