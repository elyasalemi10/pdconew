import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const BASE_URL = 'https://pdcon.com.au';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function categorySlug(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { slug } = req.query;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).send('Slug required');
  }

  try {
    // Check for old slug redirect
    const { data: redirectPost } = await supabase
      .from('blog_posts')
      .select('slug')
      .contains('old_slugs', [slug])
      .eq('status', 'published')
      .single();

    if (redirectPost) {
      res.setHeader('Location', `${BASE_URL}/blog/${redirectPost.slug}`);
      return res.status(301).send('');
    }

    const { data: post } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!post) {
      return res.status(404).send(generateNotFoundHtml());
    }

    const html = generatePostHtml(post);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
    return res.status(200).send(html);
  } catch (error) {
    console.error('Render error:', error);
    return res.status(500).send('Server error');
  }
}

function generatePostHtml(post: Record<string, unknown>): string {
  const title = post.title as string;
  const metaTitle = post.meta_title as string;
  const metaDesc = post.meta_description as string;
  const slug = post.slug as string;
  const content = post.content as string;
  const category = post.category as string;
  const authorName = post.author_name as string;
  const publishedAt = post.published_at as string;
  const updatedAt = post.updated_at as string;
  const featuredImageUrl = post.featured_image_url as string | null;
  const featuredImageAlt = post.featured_image_alt as string | null;
  const readingTime = post.reading_time as number;
  const excerpt = post.excerpt as string | null;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: metaDesc,
    image: featuredImageUrl || `${BASE_URL}/landing.webp`,
    author: { '@type': 'Person', name: authorName, url: `${BASE_URL}/about` },
    publisher: {
      '@type': 'Organization',
      name: 'PDCON',
      logo: { '@type': 'ImageObject', url: `${BASE_URL}/pdcon-logo-dark.webp` },
    },
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${slug}` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: category, item: `${BASE_URL}/blog?category=${categorySlug(category)}` },
      { '@type': 'ListItem', position: 4, name: title },
    ],
  };

  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metaTitle)} | PDCON</title>
  <meta name="description" content="${escapeHtml(metaDesc)}">
  <link rel="canonical" href="${BASE_URL}/blog/${slug}">
  <meta name="robots" content="index, follow">
  <meta name="geo.region" content="AU-VIC">
  <meta name="geo.placename" content="Melbourne">
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${featuredImageUrl || `${BASE_URL}/landing.webp`}">
  <meta property="og:url" content="${BASE_URL}/blog/${slug}">
  <meta property="og:type" content="article">
  <meta property="og:site_name" content="PDCON">
  <meta property="article:published_time" content="${publishedAt}">
  <meta property="article:modified_time" content="${updatedAt || publishedAt}">
  <meta property="article:section" content="${escapeHtml(category)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${featuredImageUrl || `${BASE_URL}/landing.webp`}">
  <link rel="alternate" type="application/rss+xml" title="PDCON Blog" href="${BASE_URL}/blog/rss.xml">
  <script type="application/ld+json">${JSON.stringify(articleSchema)}</script>
  <script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}</script>
</head>
<body>
  <header>
    <nav>
      <a href="${BASE_URL}">PDCON</a>
      <a href="${BASE_URL}/blog">Blog</a>
    </nav>
  </header>
  <main>
    <article>
      <nav aria-label="Breadcrumb">
        <a href="${BASE_URL}">Home</a> &gt;
        <a href="${BASE_URL}/blog">Blog</a> &gt;
        <a href="${BASE_URL}/blog?category=${categorySlug(category)}">${escapeHtml(category)}</a> &gt;
        <span>${escapeHtml(title)}</span>
      </nav>
      <span>${escapeHtml(category)}</span>
      <h1>${escapeHtml(title)}</h1>
      <div>
        <span>By ${escapeHtml(authorName)}</span>
        <time datetime="${publishedAt}">${new Date(publishedAt).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</time>
        <span>${readingTime} min read</span>
      </div>
      ${featuredImageUrl ? `<img src="${featuredImageUrl}" alt="${escapeHtml(featuredImageAlt || title)}" width="1200" loading="eager">` : ''}
      <div>${content}</div>
    </article>
    <section>
      <h2>Ready to Transform Your Property?</h2>
      <p>Get a free renovation assessment from Melbourne's pre-sale renovation specialists.</p>
      <a href="tel:0408255259">0408 255 259</a>
      <a href="${BASE_URL}/consultation">Get a Free Quote</a>
    </section>
  </main>
  <script>window.location.href="${BASE_URL}/blog/${slug}";</script>
</body>
</html>`;
}

function generateNotFoundHtml(): string {
  return `<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Post Not Found | PDCON Blog</title>
  <meta name="robots" content="noindex">
</head>
<body>
  <h1>Post Not Found</h1>
  <p>The blog post you're looking for doesn't exist.</p>
  <a href="${BASE_URL}/blog">Browse all posts</a>
  <a href="${BASE_URL}">Go home</a>
</body>
</html>`;
}
