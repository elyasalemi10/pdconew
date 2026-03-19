-- PDCON Blog Migration
-- Safe to run on a database with existing email_signups and blog_posts tables

-- PDCON Blog Posts table (prefixed to avoid collision with existing blog_posts)
CREATE TABLE IF NOT EXISTS pdcon_blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  meta_title VARCHAR(60) NOT NULL,
  meta_description VARCHAR(160) NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  excerpt VARCHAR(160),
  featured_image_url TEXT,
  featured_image_alt TEXT,
  category TEXT NOT NULL CHECK (category IN (
    'Pre-Sale Renovations',
    'Cost Guides',
    'Suburb Guides',
    'Developer Tips',
    'Case Studies',
    'Home Building',
    'Industry News'
  )),
  tags TEXT[] DEFAULT '{}',
  author_name TEXT NOT NULL DEFAULT 'Peter Dalamaras',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reading_time INTEGER DEFAULT 1,
  focus_keyword TEXT,
  old_slugs TEXT[] DEFAULT '{}'
);

-- PDCON Images table
CREATE TABLE IF NOT EXISTS pdcon_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text TEXT,
  original_filename TEXT,
  size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  post_id UUID REFERENCES pdcon_blog_posts(id) ON DELETE SET NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_pdcon_blog_posts_slug ON pdcon_blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_pdcon_blog_posts_status ON pdcon_blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_pdcon_blog_posts_category ON pdcon_blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_pdcon_blog_posts_published_at ON pdcon_blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_pdcon_blog_posts_old_slugs ON pdcon_blog_posts USING GIN(old_slugs);
CREATE INDEX IF NOT EXISTS idx_pdcon_images_post_id ON pdcon_images(post_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION pdcon_update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_pdcon_blog_posts_updated_at
  BEFORE UPDATE ON pdcon_blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION pdcon_update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE pdcon_blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdcon_images ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can read published pdcon posts" ON pdcon_blog_posts
  FOR SELECT USING (status = 'published');

-- Service role has full access (used by API)
CREATE POLICY "Service role full access pdcon posts" ON pdcon_blog_posts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access pdcon images" ON pdcon_images
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can read pdcon images" ON pdcon_images
  FOR SELECT USING (true);
