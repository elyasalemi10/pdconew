import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { category, status, page = '1', limit = '12' } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const offset = (pageNum - 1) * limitNum;

    let query = supabase
      .from('blog_posts')
      .select('*', { count: 'exact' });

    // Public requests only see published posts unless admin token is provided
    const authHeader = req.headers.authorization;
    const isAdmin = authHeader === `Bearer ${process.env.ADMIN_SECRET}`;

    if (!isAdmin) {
      query = query.eq('status', 'published');
    } else if (status && status !== 'all') {
      query = query.eq('status', status as string);
    }

    if (category && category !== 'all') {
      query = query.eq('category', category as string);
    }

    query = query
      .order('published_at', { ascending: false, nullsFirst: false })
      .range(offset, offset + limitNum - 1);

    const { data, error, count } = await query;

    if (error) throw error;

    return res.status(200).json({
      posts: data || [],
      total: count || 0,
      page: pageNum,
      totalPages: Math.ceil((count || 0) / limitNum),
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ error: 'Failed to fetch posts' });
  }
}
