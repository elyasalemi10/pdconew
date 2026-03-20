import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Clock, User, CalendarDays, ArrowRight, ChevronDown, Phone } from 'lucide-react';
import type { BlogPost } from '@/lib/supabase';

const BASE_URL = 'https://pdcon.com.au';

function categorySlug(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatDateShort(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

// Generate heading ID from text
function headingId(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').trim();
}

// Extract headings from HTML
interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractHeadings(html: string): TocItem[] {
  const regex = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  const headings: TocItem[] = [];
  let match;
  while ((match = regex.exec(html)) !== null) {
    const text = match[2].replace(/<[^>]*>/g, '');
    headings.push({ id: headingId(text), text, level: parseInt(match[1], 10) });
  }
  return headings;
}

// Add IDs to headings in HTML content
function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (_, level, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, '');
    const id = headingId(text);
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

// Table of Contents component
function TableOfContents({ headings }: { headings: TocItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  if (headings.length === 0) return null;

  return (
    <nav className="bg-muted/50 border border-border rounded-sm mb-8" aria-label="Table of contents">
      {/* Mobile: accordion */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 sm:hidden text-left"
      >
        <span className="text-sm font-bold uppercase tracking-widest text-primary">Table of Contents</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`sm:block ${isOpen ? 'block' : 'hidden'}`}>
        <p className="text-sm font-bold uppercase tracking-widest text-primary px-5 pt-4 pb-2 hidden sm:block">
          Table of Contents
        </p>
        <ul className="px-5 pb-4 space-y-1">
          {headings.map((h, i) => (
            <li key={i} style={{ paddingLeft: h.level === 3 ? '16px' : '0' }}>
              <a
                href={`#${h.id}`}
                className="text-sm text-muted-foreground hover:text-secondary transition-colors block py-1"
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

// Related post card
function RelatedCard({ post }: { post: Partial<BlogPost> }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {post.featured_image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featured_image_url}
            alt={post.featured_image_alt || post.title || ''}
            loading="lazy"
            decoding="async"
            width={400}
            height={225}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <span className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">{post.category}</span>
        <h3 className="text-base font-heading font-bold text-primary leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          {post.published_at && <span>{formatDateShort(post.published_at)}</span>}
          {post.reading_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.reading_time} min</span>}
        </div>
      </div>
    </Link>
  );
}

export function BlogPostPage() {
  const params = useParams({ strict: false }) as Record<string, string>;
  const slug = params.slug || '';
  const navigate = useNavigate();

  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<Partial<BlogPost>[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setNotFound(false);
      try {
        const res = await fetch(`/api/blog/post?slug=${encodeURIComponent(slug)}`);
        const data = await res.json();

        if (res.status === 301 && data.redirect) {
          navigate({ to: data.redirect, replace: true });
          return;
        }

        if (res.status === 404) {
          setNotFound(true);
          setLoading(false);
          return;
        }

        setPost(data.post);
        setRelated(data.related || []);
      } catch {
        setNotFound(true);
      }
      setLoading(false);
    };
    if (slug) fetchPost();
  }, [slug, navigate]);

  const headings = useMemo(() => post ? extractHeadings(post.content) : [], [post]);
  const processedContent = useMemo(() => post ? addHeadingIds(post.content) : '', [post]);

  // Update document head with SEO tags
  useEffect(() => {
    if (!post) return;

    const fullTitle = `${post.meta_title} | PDCON`;
    document.title = fullTitle;

    const setMeta = (attr: string, attrVal: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${attrVal}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('name', 'description', post.meta_description);
    setMeta('name', 'robots', 'index, follow');
    setMeta('property', 'og:title', post.meta_title);
    setMeta('property', 'og:description', post.meta_description);
    setMeta('property', 'og:image', post.featured_image_url || `${BASE_URL}/landing.webp`);
    setMeta('property', 'og:url', `${BASE_URL}/blog/${post.slug}`);
    setMeta('property', 'og:type', 'article');
    setMeta('property', 'og:site_name', 'PDCON');
    setMeta('property', 'article:published_time', post.published_at || '');
    setMeta('property', 'article:modified_time', post.updated_at || '');
    setMeta('property', 'article:section', post.category);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', post.meta_title);
    setMeta('name', 'twitter:description', post.meta_description);
    setMeta('name', 'twitter:image', post.featured_image_url || `${BASE_URL}/landing.webp`);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `${BASE_URL}/blog/${post.slug}`);

    // Preload featured image
    if (post.featured_image_url) {
      let preload = document.querySelector(`link[rel="preload"][href="${post.featured_image_url}"]`);
      if (!preload) {
        preload = document.createElement('link');
        preload.setAttribute('rel', 'preload');
        preload.setAttribute('as', 'image');
        preload.setAttribute('href', post.featured_image_url);
        document.head.appendChild(preload);
      }
    }

    // Structured Data — Article
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.meta_description,
      image: post.featured_image_url || `${BASE_URL}/landing.webp`,
      author: { '@type': 'Person', name: post.author_name, url: `${BASE_URL}/about` },
      publisher: {
        '@type': 'Organization',
        name: 'PDCON',
        logo: { '@type': 'ImageObject', url: `${BASE_URL}/pdcon-logo-dark.webp` },
      },
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE_URL}/blog/${post.slug}` },
    };

    // Structured Data — Breadcrumb
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.category, item: `${BASE_URL}/blog?category=${categorySlug(post.category)}` },
        { '@type': 'ListItem', position: 4, name: post.title },
      ],
    };

    // Inject or update JSON-LD
    let articleLd = document.getElementById('article-jsonld');
    if (!articleLd) {
      articleLd = document.createElement('script');
      articleLd.id = 'article-jsonld';
      articleLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(articleLd);
    }
    articleLd.textContent = JSON.stringify(articleSchema);

    let breadcrumbLd = document.getElementById('breadcrumb-jsonld');
    if (!breadcrumbLd) {
      breadcrumbLd = document.createElement('script');
      breadcrumbLd.id = 'breadcrumb-jsonld';
      breadcrumbLd.setAttribute('type', 'application/ld+json');
      document.head.appendChild(breadcrumbLd);
    }
    breadcrumbLd.textContent = JSON.stringify(breadcrumbSchema);

    // FAQ schema if content has FAQ-like patterns
    const faqMatches = post.content.match(/<h[23][^>]*>(.*?)<\/h[23]>\s*<p[^>]*>(.*?)<\/p>/gi);
    if (faqMatches && faqMatches.length >= 3) {
      const faqItems = faqMatches
        .map(block => {
          const question = block.match(/<h[23][^>]*>(.*?)<\/h[23]>/i)?.[1]?.replace(/<[^>]*>/g, '') || '';
          const answer = block.match(/<p[^>]*>(.*?)<\/p>/i)?.[1]?.replace(/<[^>]*>/g, '') || '';
          if (question.includes('?')) {
            return { '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } };
          }
          return null;
        })
        .filter(Boolean);

      if (faqItems.length > 0) {
        let faqLd = document.getElementById('faq-jsonld');
        if (!faqLd) {
          faqLd = document.createElement('script');
          faqLd.id = 'faq-jsonld';
          faqLd.setAttribute('type', 'application/ld+json');
          document.head.appendChild(faqLd);
        }
        faqLd.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqItems });
      }
    }

    return () => {
      document.getElementById('article-jsonld')?.remove();
      document.getElementById('breadcrumb-jsonld')?.remove();
      document.getElementById('faq-jsonld')?.remove();
    };
  }, [post]);

  // Hydrate before/after sliders with vanilla JS drag interaction
  useEffect(() => {
    if (!post) return;
    const sliders = document.querySelectorAll<HTMLElement>('[data-before-after]');
    const cleanups: (() => void)[] = [];

    sliders.forEach(slider => {
      const before = slider.querySelector<HTMLElement>('.ba-before');
      const handle = slider.querySelector<HTMLElement>('.ba-handle');
      if (!before || !handle) return;

      let dragging = false;

      const move = (clientX: number) => {
        const rect = slider.getBoundingClientRect();
        const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
        before.style.width = `${pct}%`;
        handle.style.left = `${pct}%`;
        // Set the inner image width to match the full container
        const img = before.querySelector('img');
        if (img) img.style.width = `${rect.width}px`;
      };

      const onDown = (e: MouseEvent | TouchEvent) => {
        dragging = true;
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        move(x);
      };
      const onMove = (e: MouseEvent | TouchEvent) => {
        if (!dragging) return;
        if ('touches' in e) e.preventDefault();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        move(x);
      };
      const onUp = () => { dragging = false; };

      slider.addEventListener('mousedown', onDown);
      slider.addEventListener('touchstart', onDown, { passive: true });
      document.addEventListener('mousemove', onMove);
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('mouseup', onUp);
      document.addEventListener('touchend', onUp);

      // Set initial inner image width
      const img = before.querySelector('img');
      if (img) img.style.width = `${slider.offsetWidth}px`;

      cleanups.push(() => {
        slider.removeEventListener('mousedown', onDown);
        slider.removeEventListener('touchstart', onDown);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('mouseup', onUp);
        document.removeEventListener('touchend', onUp);
      });
    });

    return () => cleanups.forEach(fn => fn());
  }, [post, processedContent]);

  if (loading) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-white">
        <Container className="max-w-3xl px-4 animate-pulse space-y-6 pt-8">
          <div className="h-4 bg-muted rounded w-64" />
          <div className="h-8 bg-muted rounded w-3/4" />
          <div className="h-4 bg-muted rounded w-48" />
          <div className="aspect-video bg-muted rounded" />
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded" />
            <div className="h-4 bg-muted rounded w-5/6" />
            <div className="h-4 bg-muted rounded w-4/6" />
          </div>
        </Container>
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-primary mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <div className="flex gap-4 justify-center">
            <Button asChild className="bg-primary text-white rounded-none"><Link to="/blog">Browse Blog</Link></Button>
            <Button asChild className="bg-muted text-primary rounded-none"><Link to="/">Go Home</Link></Button>
          </div>
        </div>
      </div>
    );
  }

  const showUpdatedDate = post.updated_at && post.published_at &&
    new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > 86400000;

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Breadcrumbs */}
      <div className="bg-muted border-b border-border pt-20 sm:pt-24">
        <Container className="py-3 px-4 sm:px-6">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-muted-foreground overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
            <span>&gt;</span>
            <Link to="/blog" className="hover:text-secondary transition-colors">Blog</Link>
            <span>&gt;</span>
            <Link to={`/blog?category=${post.category}`} className="hover:text-secondary transition-colors">{post.category}</Link>
            <span>&gt;</span>
            <span className="text-primary font-medium truncate max-w-[200px]">{post.title}</span>
          </nav>
        </Container>
      </div>

      {/* Article Header */}
      <Container className="max-w-3xl px-4 sm:px-6 pt-8 sm:pt-12">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic mb-6">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-8">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {post.author_name}</span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" /> {post.published_at ? formatDate(post.published_at) : ''}
          </span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {post.reading_time} min read</span>
          {showUpdatedDate && (
            <span className="text-xs bg-muted px-2 py-1 rounded">Updated: {formatDate(post.updated_at)}</span>
          )}
        </div>
      </Container>

      {/* Featured Image */}
      {post.featured_image_url && (
        <div className="sm:px-0 mb-8">
          <Container className="max-w-3xl px-0 sm:px-6">
            <img
              src={post.featured_image_url}
              alt={post.featured_image_alt || post.title}
              width={1200}
              height={675}
              loading="eager"
              decoding="async"
              className="w-full aspect-video object-cover sm:rounded-sm"
            />
          </Container>
        </div>
      )}

      {/* Table of Contents + Content */}
      <Container className="max-w-3xl px-4 sm:px-6">
        <TableOfContents headings={headings} />

        {/* Post Body */}
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </Container>

      {/* CTA Section */}
      <section className="bg-muted py-12 sm:py-16 mt-12">
        <Container className="max-w-3xl px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-primary mb-4 italic">
            Ready to Transform Your Property?
          </h2>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            Get a free renovation assessment from Melbourne's pre-sale renovation specialists.
          </p>
          <a href="tel:0408255259" className="text-2xl font-bold text-secondary hover:underline block mb-6">
            0408 255 259
          </a>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-6 text-lg font-bold rounded-none shadow-elegant group">
            <Link to="/consultation" className="flex items-center gap-3">
              Get a Free Quote <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </Button>
        </Container>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <Container className="px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-primary mb-8 italic text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {related.map(r => (
                <RelatedCard key={r.id} post={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Author Box */}
      <section className="border-t border-border py-10">
        <Container className="max-w-3xl px-4 sm:px-6">
          <div className="flex items-start gap-5">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-heading font-bold text-xl shrink-0">
              {post.author_name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Written by</p>
              <p className="text-lg font-heading font-bold text-primary">{post.author_name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Director at PDCON with over a decade of experience in strategic property renovations across Melbourne. Registered builder specialising in pre-sale transformations that maximise property value.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary border-t border-white/10 p-3 flex items-center justify-between sm:hidden z-40">
        <span className="text-white text-sm font-medium">Need renovation advice?</span>
        <a
          href="tel:0408255259"
          className="bg-secondary text-primary px-4 py-2 text-sm font-bold rounded-none flex items-center gap-2"
        >
          <Phone className="w-4 h-4" /> Call Now
        </a>
      </div>
    </div>
  );
}
