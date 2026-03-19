import React, { useState, useEffect } from 'react';
import { Link, useSearch, useNavigate } from '@tanstack/react-router';
import { Container } from '@/components/ui/Container';
import { SEO } from '@/components/ui/SEO';
import { Clock, ArrowLeft, ArrowRight } from 'lucide-react';
import { BLOG_CATEGORIES } from '@/lib/supabase';
import type { BlogPost } from '@/lib/supabase';

function categorySlug(cat: string): string {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1 overflow-hidden flex flex-col"
    >
      {post.featured_image_url && (
        <div className="aspect-video overflow-hidden">
          <img
            src={post.featured_image_url}
            alt={post.featured_image_alt || post.title}
            loading="lazy"
            decoding="async"
            width={600}
            height={338}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
      <div className="p-5 sm:p-6 flex flex-col flex-1">
        <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-secondary mb-2 w-fit bg-secondary/10 px-2 py-0.5 rounded">
          {post.category}
        </span>
        <h2 className="text-lg sm:text-xl font-heading font-bold text-primary mb-2 leading-snug line-clamp-2 group-hover:text-secondary transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-xs text-muted-foreground">
          <span>{post.published_at ? formatDate(post.published_at) : ''}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" /> {post.reading_time} min read
          </span>
        </div>
      </div>
    </Link>
  );
}

export function BlogListPage() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as Record<string, string | undefined>;
  const currentPage = parseInt(search.page || '1', 10);
  const activeCategory = search.category || 'all';

  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('page', String(currentPage));
        params.set('limit', '12');
        if (activeCategory !== 'all') params.set('category', activeCategory);
        const res = await fetch(`/api/blog/posts?${params.toString()}`);
        const data = await res.json();
        setPosts(data.posts || []);
        setTotalPages(data.totalPages || 1);
      } catch {
        setPosts([]);
      }
      setLoading(false);
    };
    fetchPosts();
  }, [currentPage, activeCategory]);

  const setCategory = (cat: string) => {
    const params: Record<string, string> = {};
    if (cat !== 'all') params.category = cat;
    navigate({ to: '/blog', search: params } as any);
  };

  const setPage = (page: number) => {
    const params: Record<string, string> = {};
    if (activeCategory !== 'all') params.category = activeCategory;
    if (page > 1) params.page = String(page);
    navigate({ to: '/blog', search: params } as any);
  };

  return (
    <div className="flex flex-col w-full">
      <SEO
        title="PDCON Blog — Melbourne Renovation & Building Insights"
        description="Expert renovation guides, cost breakdowns, and suburb-specific advice for Melbourne homeowners and property developers. Pre-sale renovation specialists."
        canonical="/blog"
      />

      {/* Header */}
      <section className="bg-primary pt-24 sm:pt-32 pb-8 sm:pb-12 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-secondary rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]" />
        </div>
        <Container className="relative z-10 flex flex-col gap-6 text-center items-center py-0 px-4 sm:px-6">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] sm:tracking-[0.5em] text-secondary">Industry Insights</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold text-white max-w-5xl leading-[1.1] italic">
            PDCON <span className="text-gold underline decoration-secondary/20 underline-offset-8 sm:underline-offset-[16px]">Blog</span>
          </h1>
          <p className="text-base sm:text-xl text-white/50 max-w-2xl leading-relaxed font-light">
            Melbourne Renovation & Building Insights
          </p>
        </Container>
      </section>

      {/* Category Filter */}
      <section className="bg-white border-b border-border sticky top-[60px] z-30">
        <Container className="py-0 px-4 sm:px-6">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            <button
              onClick={() => setCategory('all')}
              className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-colors shrink-0 ${
                activeCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {BLOG_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 text-sm font-medium rounded-full transition-colors shrink-0 ${
                  activeCategory === cat
                    ? 'bg-primary text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Posts Grid */}
      <section className="py-8 sm:py-12 bg-muted/30 min-h-[50vh]">
        <Container className="px-4 sm:px-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden animate-pulse">
                  <div className="aspect-video bg-muted" />
                  <div className="p-6 space-y-3">
                    <div className="h-3 bg-muted rounded w-20" />
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground font-heading italic">No posts found</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-10">
              <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage <= 1}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white border border-border rounded hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4" /> Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setPage(page)}
                  className={`w-10 h-10 text-sm font-medium rounded transition-colors ${
                    page === currentPage
                      ? 'bg-primary text-white'
                      : 'bg-white border border-border hover:bg-muted'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium bg-white border border-border rounded hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
