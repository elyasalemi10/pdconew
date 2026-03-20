import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/ui/SEO';
import {
  Bold, Italic, List, ListOrdered, Quote, Minus, Undo2, Redo2,
  Image as ImageIcon, Link as LinkIcon, Table as TableIcon,
  Heading2, Heading3, Trash2, Edit3, Plus, ArrowLeft, Eye, EyeOff,
  Check, X, Search, AlertTriangle, Columns2
} from 'lucide-react';
import { Node, mergeAttributes } from '@tiptap/core';
import { BLOG_CATEGORIES, slugify, calculateReadingTime, generateExcerpt } from '@/lib/supabase';
import type { BlogPost, BlogCategory } from '@/lib/supabase';

// --- Before/After Slider TipTap Node ---
const BeforeAfterNode = Node.create({
  name: 'beforeAfterSlider',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      beforeSrc: { default: '' },
      afterSrc: { default: '' },
      beforeAlt: { default: 'Before renovation' },
      afterAlt: { default: 'After renovation' },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-before-after]' }];
  },

  renderHTML({ HTMLAttributes }) {
    const { beforeSrc, afterSrc, beforeAlt, afterAlt } = HTMLAttributes;
    return ['div', mergeAttributes({ 'data-before-after': '', class: 'ba-slider', style: 'position:relative;overflow:hidden;aspect-ratio:16/9;cursor:ew-resize;user-select:none;' }),
      ['img', { src: afterSrc, alt: afterAlt, loading: 'lazy', decoding: 'async', width: '1200', height: '675', style: 'position:absolute;inset:0;width:100%;height:100%;object-fit:cover;' }],
      ['div', { class: 'ba-before', style: 'position:absolute;inset:0;width:50%;overflow:hidden;border-right:3px solid #fff;z-index:2;' },
        ['img', { src: beforeSrc, alt: beforeAlt, loading: 'lazy', decoding: 'async', width: '1200', height: '675', style: 'position:absolute;top:0;left:0;width:var(--ba-w,100cqw);height:100%;object-fit:cover;max-width:none;' }],
      ],
      ['div', { class: 'ba-handle', style: 'position:absolute;top:0;bottom:0;left:50%;z-index:3;width:3px;background:#fff;transform:translateX(-50%);pointer-events:none;' },
        ['div', { style: 'position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.3);display:flex;align-items:center;justify-content:center;' },
          ['span', { style: 'font-size:14px;color:#1B2A41;font-weight:bold;letter-spacing:-1px;' }, '\u25C0\u25B6'],
        ],
      ],
      ['div', { style: 'position:absolute;bottom:12px;left:12px;z-index:4;padding:4px 12px;background:#1B2A41;color:#fff;font-size:10px;text-transform:uppercase;letter-spacing:2px;font-weight:700;' }, 'Before'],
      ['div', { style: 'position:absolute;bottom:12px;right:12px;z-index:4;padding:4px 12px;background:#B8A369;color:#1B2A41;font-size:10px;text-transform:uppercase;letter-spacing:2px;font-weight:700;' }, 'After'],
    ];
  },
});

const API_BASE = '/api/blog';

let adminToken = '';

function setAdminToken(token: string) {
  adminToken = token;
}

async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${adminToken}`,
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'API error');
  return data;
}

// --- SEO Checklist Component ---
function SeoChecklist({ post, content }: { post: Partial<BlogPost>; content: string }) {
  const keyword = post.focus_keyword?.toLowerCase().trim();
  if (!keyword) return null;

  const plainContent = content.replace(/<[^>]*>/g, '').toLowerCase();
  const firstParagraph = content.match(/<p[^>]*>(.*?)<\/p>/i)?.[1]?.replace(/<[^>]*>/g, '').toLowerCase() || '';
  const wordCount = plainContent.split(/\s+/).filter(Boolean).length;
  const h2s = content.match(/<h2[^>]*>(.*?)<\/h2>/gi) || [];
  const hasKeywordInH2 = h2s.some(h => h.replace(/<[^>]*>/g, '').toLowerCase().includes(keyword));
  const images = content.match(/<img[^>]*alt="([^"]*)"[^>]*>/gi) || [];
  const hasKeywordInImageAlt = images.some(img => {
    const alt = img.match(/alt="([^"]*)"/i)?.[1] || '';
    return alt.toLowerCase().includes(keyword);
  }) || (post.featured_image_alt || '').toLowerCase().includes(keyword);

  const checks = [
    { label: 'Keyword appears in title', pass: (post.title || '').toLowerCase().includes(keyword) },
    { label: 'Keyword appears in meta title', pass: (post.meta_title || '').toLowerCase().includes(keyword) },
    { label: 'Keyword appears in meta description', pass: (post.meta_description || '').toLowerCase().includes(keyword) },
    { label: 'Keyword appears in slug', pass: (post.slug || '').toLowerCase().includes(keyword.replace(/\s+/g, '-')) },
    { label: 'Keyword appears in first paragraph', pass: firstParagraph.includes(keyword) },
    { label: 'Content is at least 1200 words', pass: wordCount >= 1200 },
    { label: 'At least one image alt text contains keyword', pass: hasKeywordInImageAlt },
    { label: 'At least one H2 contains keyword', pass: hasKeywordInH2 },
  ];

  return (
    <div className="mt-3 space-y-1.5">
      {checks.map((c, i) => (
        <div key={i} className="flex items-center gap-2 text-sm">
          {c.pass ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-500" />}
          <span className={c.pass ? 'text-green-700' : 'text-red-600'}>{c.label}</span>
        </div>
      ))}
    </div>
  );
}

// --- Google Preview Component ---
function GooglePreview({ metaTitle, metaDescription, slug }: { metaTitle: string; metaDescription: string; slug: string }) {
  return (
    <div className="bg-white border border-border rounded p-4 mt-3">
      <p className="text-xs text-muted-foreground mb-1">Google Search Preview</p>
      <p className="text-[#1a0dab] text-lg leading-snug font-medium truncate cursor-pointer hover:underline">
        {metaTitle || 'Page Title'} | PDCON
      </p>
      <p className="text-[#006621] text-sm truncate">pdcon.com.au/blog/{slug || 'your-slug-here'}</p>
      <p className="text-[#545454] text-sm mt-1 line-clamp-2">{metaDescription || 'Meta description will appear here...'}</p>
    </div>
  );
}

// --- TipTap Toolbar ---
function EditorToolbar({ editor, onImageUpload, onBeforeAfter }: { editor: ReturnType<typeof useEditor>; onImageUpload: () => void; onBeforeAfter: () => void }) {
  if (!editor) return null;

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (!url) return;
    const nofollow = window.confirm('Set as nofollow?');
    editor.chain().focus().extendMarkRange('link').setLink({
      href: url,
      target: '_blank',
    }).run();
  };

  const addTable = () => {
    const rows = parseInt(window.prompt('Number of rows:', '3') || '3', 10);
    const cols = parseInt(window.prompt('Number of columns:', '3') || '3', 10);
    editor.chain().focus().insertTable({ rows, cols, withHeaderRow: true }).run();
  };

  const btnClass = (active: boolean) =>
    `p-2 rounded hover:bg-muted transition-colors ${active ? 'bg-muted text-secondary' : 'text-muted-foreground'}`;

  return (
    <div className="flex flex-wrap gap-1 border-b border-border p-2 bg-muted/30 sticky top-0 z-10">
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btnClass(editor.isActive('heading', { level: 2 }))} title="Heading 2"><Heading2 className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btnClass(editor.isActive('heading', { level: 3 }))} title="Heading 3"><Heading3 className="w-4 h-4" /></button>
      <div className="w-px bg-border mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btnClass(editor.isActive('bold'))} title="Bold"><Bold className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btnClass(editor.isActive('italic'))} title="Italic"><Italic className="w-4 h-4" /></button>
      <div className="w-px bg-border mx-1" />
      <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btnClass(editor.isActive('bulletList'))} title="Bullet List"><List className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btnClass(editor.isActive('orderedList'))} title="Numbered List"><ListOrdered className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btnClass(editor.isActive('blockquote'))} title="Blockquote"><Quote className="w-4 h-4" /></button>
      <div className="w-px bg-border mx-1" />
      <button type="button" onClick={addLink} className={btnClass(editor.isActive('link'))} title="Insert Link"><LinkIcon className="w-4 h-4" /></button>
      <button type="button" onClick={onImageUpload} className={btnClass(false)} title="Insert Image"><ImageIcon className="w-4 h-4" /></button>
      <button type="button" onClick={onBeforeAfter} className={btnClass(false)} title="Before/After Slider"><Columns2 className="w-4 h-4" /></button>
      <button type="button" onClick={addTable} className={btnClass(false)} title="Insert Table"><TableIcon className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().setHorizontalRule().run()} className={btnClass(false)} title="Horizontal Rule"><Minus className="w-4 h-4" /></button>
      <div className="w-px bg-border mx-1" />
      <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btnClass(false)} title="Undo"><Undo2 className="w-4 h-4" /></button>
      <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btnClass(false)} title="Redo"><Redo2 className="w-4 h-4" /></button>
    </div>
  );
}

// --- Post Editor ---
function PostEditor({ post: initialPost, onSave, onBack }: { post?: BlogPost; onSave: () => void; onBack: () => void }) {
  const [post, setPost] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    meta_title: '',
    meta_description: '',
    content: '',
    excerpt: '',
    featured_image_url: null,
    featured_image_alt: '',
    category: 'Pre-Sale Renovations',
    tags: [],
    author_name: 'Peter Dalamaras',
    status: 'draft',
    published_at: new Date().toISOString().slice(0, 16),
    focus_keyword: '',
    ...initialPost,
  });

  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Image.configure({ HTMLAttributes: { loading: 'lazy', decoding: 'async' } }),
      Link.configure({ openOnClick: false, HTMLAttributes: { rel: 'noopener noreferrer' } }),
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      Placeholder.configure({ placeholder: 'Start writing your blog post...' }),
      BeforeAfterNode,
    ],
    content: initialPost?.content || '',
    onUpdate: ({ editor: ed }) => {
      const html = ed.getHTML();
      const reading_time = calculateReadingTime(html);
      setPost(p => ({ ...p, content: html, reading_time }));
    },
  });

  const handleTitleChange = (title: string) => {
    const updates: Partial<BlogPost> = { title };
    if (!initialPost?.id) {
      updates.slug = slugify(title);
    }
    setPost(p => ({ ...p, ...updates }));
  };

  const handleImageUpload = async (file: File, purpose: 'featured' | 'inline') => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = async () => {
        try {
          const base64 = (reader.result as string).split(',')[1];
          let alt = '';
          if (purpose === 'featured') {
            alt = post.featured_image_alt || post.title || '';
          } else {
            alt = window.prompt('Enter alt text for this image:', '') || '';
          }
          const data = await apiFetch('/upload', {
            method: 'POST',
            body: JSON.stringify({
              file: base64,
              filename: file.name,
              alt_text: alt,
              post_id: initialPost?.id || null,
            }),
          });
          resolve(data.url);
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFeaturedImageUpload = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      setUploadingFeatured(true);
      try {
        const url = await handleImageUpload(file, 'featured');
        setPost(p => ({ ...p, featured_image_url: url }));
      } catch (err) {
        alert('Failed to upload image');
      }
      setUploadingFeatured(false);
    };
    input.click();
  };

  const handleInlineImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      try {
        const url = await handleImageUpload(file, 'inline');
        editor?.chain().focus().setImage({ src: url, alt: '' }).run();
      } catch {
        alert('Failed to upload image');
      }
    };
    input.click();
  };

  const handleBeforeAfterUpload = () => {
    const pickFile = (): Promise<File | null> => new Promise(resolve => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e) => resolve((e.target as HTMLInputElement).files?.[0] || null);
      input.click();
    });

    (async () => {
      alert('Select the BEFORE image first');
      const beforeFile = await pickFile();
      if (!beforeFile) return;

      alert('Now select the AFTER image');
      const afterFile = await pickFile();
      if (!afterFile) return;

      const beforeAlt = window.prompt('Alt text for BEFORE image:', 'Before renovation') || 'Before renovation';
      const afterAlt = window.prompt('Alt text for AFTER image:', 'After renovation') || 'After renovation';

      try {
        const [beforeUrl, afterUrl] = await Promise.all([
          handleImageUpload(beforeFile, 'inline'),
          handleImageUpload(afterFile, 'inline'),
        ]);

        editor?.chain().focus().insertContent({
          type: 'beforeAfterSlider',
          attrs: {
            beforeSrc: beforeUrl,
            afterSrc: afterUrl,
            beforeAlt,
            afterAlt,
          },
        }).run();
      } catch {
        alert('Failed to upload images');
      }
    })();
  };

  const handleSave = async (publishStatus?: 'draft' | 'published') => {
    const status = publishStatus || post.status || 'draft';
    setSaving(true);
    try {
      const saveData = {
        ...post,
        status,
        content: editor?.getHTML() || post.content,
        excerpt: post.excerpt || generateExcerpt(editor?.getHTML() || post.content || ''),
        id: initialPost?.id,
      };
      await apiFetch('/save', { method: 'POST', body: JSON.stringify(saveData) });
      onSave();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save');
    }
    setSaving(false);
  };

  const handleAddTag = () => {
    const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    if (tags.length) {
      setPost(p => ({ ...p, tags: [...new Set([...(p.tags || []), ...tags])] }));
      setTagInput('');
    }
  };

  const readingTime = useMemo(() => calculateReadingTime(post.content || ''), [post.content]);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to posts
        </button>
        <h2 className="text-xl font-bold font-heading text-primary">{initialPost?.id ? 'Edit Post' : 'New Post'}</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left 2/3 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white border border-border rounded-sm p-6 space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Title</label>
              <input
                type="text"
                value={post.title}
                onChange={e => handleTitleChange(e.target.value)}
                className="w-full text-2xl font-heading font-bold text-primary border-0 border-b-2 border-border focus:border-secondary outline-none pb-2 bg-transparent"
                placeholder="Enter post title..."
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground whitespace-nowrap">pdcon.com.au/blog/</span>
                <input
                  type="text"
                  value={post.slug}
                  onChange={e => setPost(p => ({ ...p, slug: e.target.value }))}
                  className="flex-1 text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none"
                />
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-white border border-border rounded-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
              <Search className="w-4 h-4" /> SEO Settings
            </h3>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meta Title</label>
                <span className={`text-xs font-mono ${(post.meta_title || '').length > 60 ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
                  {(post.meta_title || '').length}/60
                </span>
              </div>
              <input
                type="text"
                value={post.meta_title}
                onChange={e => setPost(p => ({ ...p, meta_title: e.target.value }))}
                className="w-full text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none"
                placeholder="SEO title (max 60 chars)"
                maxLength={70}
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Meta Description</label>
                <span className={`text-xs font-mono ${(post.meta_description || '').length > 160 ? 'text-red-500 font-bold' : 'text-muted-foreground'}`}>
                  {(post.meta_description || '').length}/160
                </span>
              </div>
              <textarea
                value={post.meta_description}
                onChange={e => setPost(p => ({ ...p, meta_description: e.target.value }))}
                className="w-full text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none resize-none h-20"
                placeholder="SEO description (150-160 chars)"
                maxLength={170}
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Focus Keyword</label>
              <input
                type="text"
                value={post.focus_keyword || ''}
                onChange={e => setPost(p => ({ ...p, focus_keyword: e.target.value }))}
                className="w-full text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none"
                placeholder="Primary target keyword"
              />
              <SeoChecklist post={post} content={editor?.getHTML() || post.content || ''} />
            </div>
            <GooglePreview
              metaTitle={post.meta_title || ''}
              metaDescription={post.meta_description || ''}
              slug={post.slug || ''}
            />
          </div>

          {/* Featured Image */}
          <div className="bg-white border border-border rounded-sm p-6 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary flex items-center gap-2">
              <ImageIcon className="w-4 h-4" /> Featured Image
            </h3>
            {post.featured_image_url ? (
              <div className="space-y-3">
                <div className="relative aspect-video bg-muted rounded overflow-hidden">
                  <img src={post.featured_image_url} alt={post.featured_image_alt || ''} className="w-full h-full object-cover" />
                  <button
                    onClick={() => setPost(p => ({ ...p, featured_image_url: null }))}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Alt Text</label>
                  <input
                    type="text"
                    value={post.featured_image_alt || ''}
                    onChange={e => setPost(p => ({ ...p, featured_image_alt: e.target.value }))}
                    className="w-full text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none"
                    placeholder="Describe this image for SEO"
                  />
                  {!post.featured_image_alt && (
                    <p className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Alt text is required for SEO and accessibility
                    </p>
                  )}
                </div>
              </div>
            ) : (
              <Button
                onClick={handleFeaturedImageUpload}
                disabled={uploadingFeatured}
                className="bg-muted text-primary hover:bg-muted/80 rounded-none border border-dashed border-border w-full h-32"
              >
                {uploadingFeatured ? 'Uploading...' : 'Click to upload featured image'}
              </Button>
            )}
          </div>

          {/* Content Editor */}
          <div className="bg-white border border-border rounded-sm overflow-hidden">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary px-6 pt-6 pb-2 flex items-center gap-2">
              <Edit3 className="w-4 h-4" /> Content
            </h3>
            <EditorToolbar editor={editor} onImageUpload={handleInlineImageUpload} onBeforeAfter={handleBeforeAfterUpload} />
            <div className="prose-editor">
              <EditorContent editor={editor} />
            </div>
          </div>
        </div>

        {/* Sidebar - Right 1/3 */}
        <div className="space-y-6">
          {/* Publish */}
          <div className="bg-white border border-border rounded-sm p-6 space-y-4 sticky top-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-secondary">Publish</h3>
            <div className="flex gap-2">
              <Button
                onClick={() => handleSave('draft')}
                disabled={saving}
                className="flex-1 bg-muted text-primary hover:bg-muted/80 rounded-none"
              >
                {saving ? 'Saving...' : 'Save Draft'}
              </Button>
              <Button
                onClick={() => handleSave('published')}
                disabled={saving}
                className="flex-1 bg-primary text-white hover:bg-primary/90 rounded-none"
              >
                {saving ? 'Saving...' : 'Publish'}
              </Button>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Status</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setPost(p => ({ ...p, status: 'draft' }))}
                  className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${post.status === 'draft' ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-muted text-muted-foreground'}`}
                >
                  <EyeOff className="w-3 h-3 inline mr-1" /> Draft
                </button>
                <button
                  type="button"
                  onClick={() => setPost(p => ({ ...p, status: 'published' }))}
                  className={`flex-1 py-2 text-sm font-medium rounded transition-colors ${post.status === 'published' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-muted text-muted-foreground'}`}
                >
                  <Eye className="w-3 h-3 inline mr-1" /> Published
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Publish Date</label>
              <input
                type="datetime-local"
                value={post.published_at ? post.published_at.slice(0, 16) : ''}
                onChange={e => setPost(p => ({ ...p, published_at: e.target.value ? new Date(e.target.value).toISOString() : null }))}
                className="w-full text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Category</label>
              <select
                value={post.category}
                onChange={e => setPost(p => ({ ...p, category: e.target.value as BlogCategory }))}
                className="w-full text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none bg-white"
              >
                {BLOG_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Tags</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={e => setTagInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="flex-1 text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none"
                  placeholder="Add tags (comma-separated)"
                />
                <Button onClick={handleAddTag} size="sm" className="bg-muted text-primary hover:bg-muted/80 rounded-none px-3">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(post.tags || []).map(tag => (
                  <span key={tag} className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-xs font-medium rounded">
                    {tag}
                    <button onClick={() => setPost(p => ({ ...p, tags: (p.tags || []).filter(t => t !== tag) }))} className="text-muted-foreground hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1 block">Author</label>
              <input
                type="text"
                value={post.author_name}
                onChange={e => setPost(p => ({ ...p, author_name: e.target.value }))}
                className="w-full text-sm border border-border rounded px-3 py-2 focus:border-secondary outline-none"
              />
            </div>

            <div className="bg-muted rounded p-3 text-center">
              <span className="text-2xl font-bold text-primary">{readingTime}</span>
              <span className="text-xs text-muted-foreground ml-1">min read</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Admin Page ---
export function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'edit'>('list');
  const [editingPost, setEditingPost] = useState<BlogPost | undefined>();
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCategory !== 'all') params.set('category', filterCategory);
      if (filterStatus !== 'all') params.set('status', filterStatus);
      params.set('limit', '100');
      const data = await apiFetch(`/posts?${params.toString()}`);
      setPosts(data.posts);
    } catch {
      setPosts([]);
    }
    setLoading(false);
  }, [filterCategory, filterStatus]);

  useEffect(() => {
    if (authenticated) fetchPosts();
  }, [authenticated, fetchPosts]);

  const handleLogin = async () => {
    if (!username || !password) return;
    setLoggingIn(true);
    setLoginError('');
    try {
      const res = await fetch('/api/blog/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLoginError(data.error || 'Invalid credentials');
      } else {
        setAdminToken(data.token);
        setAuthenticated(true);
      }
    } catch {
      setLoginError('Login failed. Try again.');
    }
    setLoggingIn(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await apiFetch(`/delete?id=${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch {
      alert('Failed to delete post');
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-muted flex items-center justify-center pt-24">
        <SEO title="Admin" noindex />
        <div className="bg-white border border-border rounded-sm p-8 w-full max-w-sm">
          <h1 className="text-xl font-heading font-bold text-primary mb-4">Admin Access</h1>
          {loginError && (
            <p className="text-sm text-red-500 mb-3">{loginError}</p>
          )}
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="w-full text-sm border border-border rounded px-3 py-2 mb-3 focus:border-secondary outline-none"
            placeholder="Username"
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
            className="w-full text-sm border border-border rounded px-3 py-2 mb-4 focus:border-secondary outline-none"
            placeholder="Password"
            autoComplete="current-password"
          />
          <Button onClick={handleLogin} disabled={loggingIn} className="w-full bg-primary text-white rounded-none">
            {loggingIn ? 'Logging in...' : 'Login'}
          </Button>
        </div>
      </div>
    );
  }

  if (view === 'edit') {
    return (
      <div className="min-h-screen bg-muted pt-24 pb-12">
        <SEO title="Admin - Edit Post" noindex />
        <div className="container mx-auto px-4 max-w-7xl">
          <PostEditor
            post={editingPost}
            onSave={() => { setView('list'); fetchPosts(); }}
            onBack={() => setView('list')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-24 pb-12">
      <SEO title="Admin Dashboard" noindex />
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-heading font-bold text-primary">Blog Management</h1>
          <Button
            onClick={() => { setEditingPost(undefined); setView('edit'); }}
            className="bg-primary text-white rounded-none"
          >
            <Plus className="w-4 h-4 mr-2" /> New Post
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <select
            value={filterCategory}
            onChange={e => setFilterCategory(e.target.value)}
            className="text-sm border border-border rounded px-3 py-2 bg-white focus:border-secondary outline-none"
          >
            <option value="all">All Categories</option>
            {BLOG_CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="text-sm border border-border rounded px-3 py-2 bg-white focus:border-secondary outline-none"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Posts Table */}
        <div className="bg-white border border-border rounded-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-muted border-b border-border">
                <th className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground px-6 py-3">Title</th>
                <th className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground px-6 py-3 hidden md:table-cell">Category</th>
                <th className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground px-6 py-3">Status</th>
                <th className="text-left text-xs font-bold uppercase tracking-widest text-muted-foreground px-6 py-3 hidden sm:table-cell">Date</th>
                <th className="text-right text-xs font-bold uppercase tracking-widest text-muted-foreground px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">Loading...</td></tr>
              ) : posts.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">No posts found. Create your first blog post!</td></tr>
              ) : posts.map(p => (
                <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-primary">{p.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">/blog/{p.slug}</p>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-xs bg-muted px-2 py-1 rounded font-medium">{p.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded font-medium ${p.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground hidden sm:table-cell">
                    {p.published_at ? new Date(p.published_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' }) : '-'}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => { setEditingPost(p); setView('edit'); }} className="p-2 hover:bg-muted rounded transition-colors" title="Edit">
                        <Edit3 className="w-4 h-4 text-primary" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-50 rounded transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
