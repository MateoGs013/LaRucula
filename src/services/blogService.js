import { apiRequest } from '@/api/client';
import { isApiEnabled } from '@/api/config';
import { adaptBlogPost, adaptBlogPosts } from '@/adapters/blogAdapter';
import { mockBlogPosts } from '@/data/mock-blog-posts';

let cachedPosts = adaptBlogPosts(mockBlogPosts);
let pendingPostsRequest = null;
const cachedPostsBySlug = new Map(cachedPosts.map((post) => [post.slug, post]));

function cachePosts(posts) {
  cachedPosts = posts;
  cachedPostsBySlug.clear();
  posts.forEach((post) => cachedPostsBySlug.set(post.slug, post));
}

function clonePost(post) {
  return post ? structuredClone(post) : null;
}

export function getBlogPostsSnapshot() {
  return structuredClone(cachedPosts);
}

export function getBlogPostSnapshot(slug) {
  return clonePost(cachedPostsBySlug.get(slug) || null);
}

export async function getBlogPosts(options = {}) {
  const { force = false } = options;

  if (!isApiEnabled()) {
    cachePosts(adaptBlogPosts(mockBlogPosts));
    return getBlogPostsSnapshot();
  }

  if (!force && pendingPostsRequest) {
    return pendingPostsRequest;
  }

  pendingPostsRequest = (async () => {
    const payload = await apiRequest('/blog/posts');
    cachePosts(adaptBlogPosts(payload));
    return getBlogPostsSnapshot();
  })();

  try {
    return await pendingPostsRequest;
  } finally {
    pendingPostsRequest = null;
  }
}

export async function getBlogPost(slug, options = {}) {
  const normalizedSlug = String(slug || '').trim();
  if (!normalizedSlug) return null;

  if (!isApiEnabled()) {
    const cachedPost = cachedPostsBySlug.get(normalizedSlug) || null;
    return cachedPost ? clonePost(adaptBlogPost(cachedPost)) : null;
  }

  if (!options.force && cachedPostsBySlug.has(normalizedSlug)) {
    return getBlogPostSnapshot(normalizedSlug);
  }

  const payload = await apiRequest(`/blog/posts/${normalizedSlug}`);
  const post = adaptBlogPost(payload, cachedPostsBySlug.get(normalizedSlug) || undefined);
  cachedPostsBySlug.set(post.slug, post);

  const listIndex = cachedPosts.findIndex((item) => item.slug === post.slug);
  if (listIndex >= 0) {
    cachedPosts.splice(listIndex, 1, post);
  } else {
    cachedPosts = [post, ...cachedPosts];
  }

  return clonePost(post);
}
