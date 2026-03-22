import { mockBlogPosts } from '@/data/mock-blog-posts';

function pickFirstValue(...values) {
  return values.find((value) => {
    if (Array.isArray(value)) return value.length > 0;
    return value !== undefined && value !== null && value !== '';
  });
}

function normalizeBodyBlocks(body, fallbackBody = []) {
  if (Array.isArray(body) && body.length > 0) {
    return body.map((block) => ({
      type: block.type || 'paragraph',
      content: String(block.content || '').trim(),
    }));
  }

  if (typeof body === 'string' && body.trim()) {
    return body
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => ({ type: 'paragraph', content: paragraph }));
  }

  return fallbackBody;
}

function estimateReadTime(post) {
  const text = [
    post.excerpt,
    ...post.body.map((block) => block.content),
  ].join(' ');
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(3, Math.ceil(words / 180));
  return `${minutes} min`;
}

export function adaptBlogPost(rawPost = {}, fallbackPost = null) {
  const fallback = fallbackPost || mockBlogPosts.find((post) => post.slug === rawPost.slug) || {};
  const body = normalizeBodyBlocks(rawPost.body || rawPost.contentBlocks || rawPost.content, fallback.body || []);

  const normalizedPost = {
    slug: pickFirstValue(rawPost.slug, rawPost.handle, fallback.slug),
    title: pickFirstValue(rawPost.title, fallback.title, ''),
    subtitle: pickFirstValue(rawPost.subtitle, rawPost.kicker, fallback.subtitle, ''),
    date: pickFirstValue(rawPost.date, rawPost.publishedAt, fallback.date, ''),
    readTime: pickFirstValue(rawPost.readTime, fallback.readTime, ''),
    category: pickFirstValue(rawPost.category, rawPost.tagline, fallback.category, ''),
    image: pickFirstValue(rawPost.image, rawPost.featuredImage, fallback.image, ''),
    imageAlt: pickFirstValue(rawPost.imageAlt, rawPost.featuredImageAlt, fallback.imageAlt, ''),
    excerpt: pickFirstValue(rawPost.excerpt, rawPost.summary, fallback.excerpt, ''),
    body,
  };

  if (!normalizedPost.readTime) {
    normalizedPost.readTime = estimateReadTime(normalizedPost);
  }

  return normalizedPost;
}

export function adaptBlogPosts(rawPayload = {}) {
  const items = Array.isArray(rawPayload)
    ? rawPayload
    : rawPayload.items || rawPayload.posts || rawPayload.data?.items || rawPayload.data || [];

  if (!Array.isArray(items) || items.length === 0) {
    return mockBlogPosts.map((post) => adaptBlogPost(post));
  }

  return items.map((item) => adaptBlogPost(item));
}
