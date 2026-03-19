import { NextRequest, NextResponse } from 'next/server';

const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'whatsapp',
  'telegrambot',
  'applebot',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'dotbot',
  'rogerbot',
  'screaming frog',
];

export const config = {
  matcher: '/blog/:slug*',
};

export default function middleware(req: NextRequest) {
  const ua = req.headers.get('user-agent')?.toLowerCase() || '';
  const isBot = BOT_USER_AGENTS.some(bot => ua.includes(bot));

  // Only intercept bot requests to individual blog posts (not the listing page)
  const pathname = req.nextUrl.pathname;
  const slugMatch = pathname.match(/^\/blog\/([^/]+)$/);

  if (isBot && slugMatch) {
    const slug = slugMatch[1];
    // Skip static assets and known non-slug paths
    if (slug === 'rss.xml' || slug.includes('.')) {
      return NextResponse.next();
    }
    // Rewrite to the render API for full HTML
    const renderUrl = new URL(`/api/blog/render?slug=${encodeURIComponent(slug)}`, req.url);
    return NextResponse.rewrite(renderUrl);
  }

  return NextResponse.next();
}
