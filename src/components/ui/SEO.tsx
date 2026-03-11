import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
}

const BASE_URL = 'https://pdcon.com.au';
const DEFAULT_IMAGE = '/landing.webp';
const SITE_NAME = 'PDCON';

export function SEO({ 
  title, 
  description, 
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | PDCON Melbourne`;
    document.title = fullTitle;

    const updateMeta = (selector: string, content: string, attr: string = 'content') => {
      const element = document.querySelector(selector);
      if (element) {
        element.setAttribute(attr, content);
      } else {
        const meta = document.createElement('meta');
        if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) {
            meta.setAttribute('property', property);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
          }
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) {
            meta.setAttribute('name', name);
            meta.setAttribute('content', content);
            document.head.appendChild(meta);
          }
        }
      }
    };

    if (description) {
      updateMeta('meta[name="description"]', description);
      updateMeta('meta[property="og:description"]', description);
      updateMeta('meta[name="twitter:description"]', description);
    }

    updateMeta('meta[name="title"]', fullTitle);
    updateMeta('meta[property="og:title"]', fullTitle);
    updateMeta('meta[name="twitter:title"]', fullTitle);
    
    updateMeta('meta[property="og:type"]', type);
    updateMeta('meta[property="og:site_name"]', SITE_NAME);

    const fullImage = image.startsWith('http') ? image : `${BASE_URL}${image}`;
    updateMeta('meta[property="og:image"]', fullImage);
    updateMeta('meta[name="twitter:image"]', fullImage);

    if (canonical) {
      const fullCanonical = canonical.startsWith('http') ? canonical : `${BASE_URL}${canonical}`;
      updateMeta('meta[property="og:url"]', fullCanonical);
      updateMeta('meta[name="twitter:url"]', fullCanonical);
      
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (canonicalLink) {
        canonicalLink.setAttribute('href', fullCanonical);
      } else {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        canonicalLink.setAttribute('href', fullCanonical);
        document.head.appendChild(canonicalLink);
      }
    }

    if (noindex) {
      updateMeta('meta[name="robots"]', 'noindex, nofollow');
    } else {
      updateMeta('meta[name="robots"]', 'index, follow');
    }
  }, [title, description, canonical, image, type, noindex]);

  return null;
}
