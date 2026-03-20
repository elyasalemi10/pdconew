import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/button';
import { Clock, User, CalendarDays, ArrowRight } from 'lucide-react';
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

// Add IDs to headings in HTML content
function addHeadingIds(html: string): string {
  return html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (_, level, attrs, content) => {
    const text = content.replace(/<[^>]*>/g, '');
    const id = headingId(text);
    return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
  });
}

// Related post card
function RelatedCard({ post }: { post: Partial<BlogPost> }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: post.slug! }}
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
    // Small delay to ensure DOM is rendered from dangerouslySetInnerHTML
    const timer = setTimeout(() => {
      const sliders = document.querySelectorAll<HTMLElement>('[data-before-after]');
      const cleanups: (() => void)[] = [];

      sliders.forEach(slider => {
        const before = slider.querySelector<HTMLElement>('.ba-before');
        const handle = slider.querySelector<HTMLElement>('.ba-handle');
        if (!before || !handle) return;

        // Prevent native image drag on all images inside the slider
        slider.querySelectorAll('img').forEach(img => {
          img.draggable = false;
          img.style.pointerEvents = 'none';
        });

        // Ensure before image width matches container
        const syncWidth = () => {
          const img = before.querySelector('img');
          if (img) img.style.width = `${slider.offsetWidth}px`;
        };
        syncWidth();

        let dragging = false;

        const move = (clientX: number) => {
          const rect = slider.getBoundingClientRect();
          const pct = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
          before.style.width = `${pct}%`;
          handle.style.left = `${pct}%`;
          const img = before.querySelector('img');
          if (img) img.style.width = `${rect.width}px`;
        };

        const onDown = (e: MouseEvent | TouchEvent) => {
          e.preventDefault(); // Prevent native drag/selection
          dragging = true;
          const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
          move(x);
        };
        const onMove = (e: MouseEvent | TouchEvent) => {
          if (!dragging) return;
          e.preventDefault();
          const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
          move(x);
        };
        const onUp = () => {
          if (dragging) {
            dragging = false;
            document.body.style.overflow = '';
            document.body.style.touchAction = '';
          }
        };

        slider.addEventListener('mousedown', onDown);
        slider.addEventListener('touchstart', onDown, { passive: false });
        document.addEventListener('mousemove', onMove);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchend', onUp);
        window.addEventListener('resize', syncWidth);

        cleanups.push(() => {
          slider.removeEventListener('mousedown', onDown);
          slider.removeEventListener('touchstart', onDown);
          document.removeEventListener('mousemove', onMove);
          document.removeEventListener('touchmove', onMove);
          document.removeEventListener('mouseup', onUp);
          document.removeEventListener('touchend', onUp);
          window.removeEventListener('resize', syncWidth);
        });
      });

      return () => cleanups.forEach(fn => fn());
    }, 100);

    return () => clearTimeout(timer);
  }, [post, processedContent]);

  if (loading) {
    return (
      <div className="pt-24 pb-12 min-h-screen bg-white">
        <Container className="max-w-4xl px-4 animate-pulse space-y-6 pt-8">
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
      <Container className="max-w-4xl px-4 sm:px-6 pt-8 sm:pt-12">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-primary leading-tight italic mb-6">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
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
        <div className="sm:px-0 mb-6">
          <Container className="max-w-4xl px-0 sm:px-6">
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

      {/* Content */}
      <Container className="max-w-4xl px-4 sm:px-6 mx-auto">
        <article
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: processedContent }}
        />
      </Container>

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

      {/* Final CTA */}
      <section className="bg-white py-8 sm:py-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--secondary)/0.05)_0%,transparent_70%)]" />
        <Container clean className="px-4 sm:px-6 lg:px-12">
          <div className="flex flex-col items-center text-center gap-6 sm:gap-8 relative z-10 py-8 sm:py-12 border-y border-muted">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Strategic Transformation</span>
            <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold text-primary max-w-4xl leading-tight italic">
              Thinking of Selling Your <span className="text-gold underline decoration-secondary/20 underline-offset-4 sm:underline-offset-[12px]">Property?</span>
            </h2>
            <p className="text-base sm:text-2xl text-muted-foreground font-medium max-w-2xl leading-relaxed italic px-2">
              A strategic renovation may significantly increase your property's market value and buyer appeal.
            </p>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 sm:px-16 py-6 sm:py-10 text-base sm:text-2xl font-bold rounded-none shadow-elegant group transition-all duration-500 hover:scale-105 active:scale-95">
              <Link to="/consultation" className="flex items-center gap-2 sm:gap-4">
                Book Consultation <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8 group-hover:translate-x-3 transition-transform duration-500" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}
