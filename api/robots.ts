import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const robotsTxt = `User-agent: *
Allow: /
Disallow: /admin

Sitemap: https://pdcon.com.au/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Cache-Control', 'public, s-maxage=86400');
  return res.status(200).send(robotsTxt);
}
