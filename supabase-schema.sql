-- Blog Posts table
CREATE TABLE IF NOT EXISTS blog_posts (
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

-- Images table
CREATE TABLE IF NOT EXISTS images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_text TEXT,
  original_filename TEXT,
  size_bytes INTEGER,
  width INTEGER,
  height INTEGER,
  uploaded_at TIMESTAMPTZ DEFAULT NOW(),
  post_id UUID REFERENCES blog_posts(id) ON DELETE SET NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_old_slugs ON blog_posts USING GIN(old_slugs);
CREATE INDEX IF NOT EXISTS idx_images_post_id ON images(post_id);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE images ENABLE ROW LEVEL SECURITY;

-- Public read access for published posts
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Service role has full access (used by API)
CREATE POLICY "Service role full access posts" ON blog_posts
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access images" ON images
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public can read images" ON images
  FOR SELECT USING (true);
