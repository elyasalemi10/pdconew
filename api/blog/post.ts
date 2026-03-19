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

  const { slug } = req.query;
  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Slug is required' });
  }

  try {
    // First try to find by current slug
    let { data, error } = await supabase
      .from('pdcon_blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (!data) {
      // Check if it's an old slug (redirect)
      const { data: redirectPost } = await supabase
        .from('pdcon_blog_posts')
        .select('slug')
        .contains('old_slugs', [slug])
        .eq('status', 'published')
        .single();

      if (redirectPost) {
        return res.status(301).json({ redirect: `/blog/${redirectPost.slug}` });
      }

      return res.status(404).json({ error: 'Post not found' });
    }

    if (error) throw error;

    // Get related posts from same category
    const { data: related } = await supabase
      .from('pdcon_blog_posts')
      .select('id, title, slug, excerpt, featured_image_url, featured_image_alt, category, published_at, reading_time')
      .eq('status', 'published')
      .eq('category', data.category)
      .neq('id', data.id)
      .order('published_at', { ascending: false })
      .limit(3);

    return res.status(200).json({ post: data, related: related || [] });
  } catch (error) {
    console.error('Error fetching post:', error);
    return res.status(500).json({ error: 'Failed to fetch post' });
  }
}
