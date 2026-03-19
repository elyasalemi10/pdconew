import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

function generateExcerpt(html: string, maxLength = 155): string {
  const text = html.replace(/<[^>]*>/g, '');
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (authHeader !== `Bearer ${process.env.ADMIN_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const body = req.body;
    const {
      id,
      title,
      slug: providedSlug,
      meta_title,
      meta_description,
      content,
      excerpt: providedExcerpt,
      featured_image_url,
      featured_image_alt,
      category,
      tags,
      author_name,
      status,
      published_at,
      focus_keyword,
    } = body;

    const slug = providedSlug || slugify(title);
    const reading_time = calculateReadingTime(content || '');
    const excerpt = providedExcerpt || generateExcerpt(content || '');

    const postData = {
      title,
      slug,
      meta_title,
      meta_description,
      content,
      excerpt,
      featured_image_url,
      featured_image_alt,
      category,
      tags: tags || [],
      author_name: author_name || 'Peter Dalamaras',
      status: status || 'draft',
      published_at: status === 'published' ? (published_at || new Date().toISOString()) : published_at,
      reading_time,
      focus_keyword,
    };

    if (id) {
      // Update — check if slug changed, store old slug for redirects
      const { data: existing } = await supabase
        .from('pdcon_blog_posts')
        .select('slug, old_slugs')
        .eq('id', id)
        .single();

      const updateData: Record<string, unknown> = { ...postData };

      if (existing && existing.slug !== slug) {
        const oldSlugs = existing.old_slugs || [];
        if (!oldSlugs.includes(existing.slug)) {
          oldSlugs.push(existing.slug);
        }
        updateData.old_slugs = oldSlugs;
      }

      const { data, error } = await supabase
        .from('pdcon_blog_posts')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return res.status(200).json({ post: data });
    } else {
      // Create
      const { data, error } = await supabase
        .from('pdcon_blog_posts')
        .insert(postData)
        .select()
        .single();

      if (error) throw error;
      return res.status(201).json({ post: data });
    }
  } catch (error) {
    console.error('Error saving post:', error);
    const message = error instanceof Error ? error.message : 'Failed to save post';
    return res.status(500).json({ error: message });
  }
}
