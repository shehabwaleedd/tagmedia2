import { MetadataRoute } from 'next';
import { serverDynamicFetch } from '@/lib/serverDynamicFetch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    let blogEntries = [];
    try {
        blogEntries = await generateBlogPostsSitemapObjects();
    } catch (error) {
        console.error('Failed to fetch blog entries:', error);
        // Handle the error appropriately, perhaps logging it or sending to an error tracking service
    }

    const blogUrls = blogEntries.map((o: any) => ({
        url: `https://tagmedia.me/blog/${o.slug}`,
        lastModified: new Date(o.updatedAt),
        changeFrequency: 'weekly',
        priority: 0.6,
    }));

    return [
        { url: 'https://tagmedia.me', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        { url: 'https://tagmedia.me/about', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
        { url: 'https://tagmedia.me/news', lastModified: new Date(), changeFrequency: 'weekly', priority: 0.5 },
        { url: 'https://tagmedia.me/contact', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        { url: 'https://tagmedia.me/services', lastModified: new Date(), changeFrequency: 'yearly', priority: 1 },
        ...blogUrls
    ];
}

const generateBlogPostsSitemapObjects = async () => {
    try {
        const posts = await serverDynamicFetch('blog');
        return posts.map((post: any) => ({
            slug: post.slug,
            updatedAt: new Date(post.updatedAt),
        }));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};
