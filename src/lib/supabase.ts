import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const BLOG_CATEGORIES = [
  'Pre-Sale Renovations',
  'Cost Guides',
  'Suburb Guides',
  'Developer Tips',
  'Case Studies',
  'Home Building',
  'Industry News',
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  meta_title: string;
  meta_description: string;
  content: string;
  excerpt: string | null;
  featured_image_url: string | null;
  featured_image_alt: string | null;
  category: BlogCategory;
  tags: string[];
  author_name: string;
  status: 'draft' | 'published';
  published_at: string | null;
  updated_at: string;
  created_at: string;
  reading_time: number;
  focus_keyword: string | null;
  old_slugs: string[];
}

export interface BlogImage {
  id: string;
  url: string;
  alt_text: string | null;
  original_filename: string | null;
  size_bytes: number | null;
  width: number | null;
  height: number | null;
  uploaded_at: string;
  post_id: string | null;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function calculateReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, '');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function generateExcerpt(html: string, maxLength = 155): string {
  const text = html.replace(/<[^>]*>/g, '');
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}
