import { firestore } from '@lib/firebase';

export default async function handler(req, res) {
  try {
    const baseUrl = 'https://writtendesk.slideway.dev';
    
    // Helper function to get valid date
    const getValidDate = (timestamp) => {
      if (!timestamp || timestamp <= 0) return new Date();
      const date = new Date(timestamp);
      return isNaN(date.getTime()) ? new Date() : date;
    };
    
    // Fetch all posts (we'll filter published ones in JavaScript)
    const postsSnapshot = await firestore
      .collectionGroup('posts')
      .get();

    const posts = postsSnapshot.docs
      .map((doc) => doc.data())
      .filter((data) => data.published === true) // Filter in JS instead of query
      .map((data) => ({
        slug: data.slug,
        username: data.username,
        updatedAt: getValidDate(data.updatedAt || data.createdAt),
      }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${baseUrl}/enter</loc>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
      <url>
        <loc>${baseUrl}/about</loc>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
      </url>
      ${posts
        .map(
          ({ username, slug, updatedAt }) => `
      <url>
        <loc>${baseUrl}/${username}/${slug}</loc>
        <lastmod>${updatedAt.toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
      </url>`
        )
        .join('')}
    </urlset>`;

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate');
    res.status(200).send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
