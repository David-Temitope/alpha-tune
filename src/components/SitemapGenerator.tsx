
import { useEffect } from 'react';
import { useArtists, useAlbums, useNews } from '@/hooks/useSupabaseData';

const SitemapGenerator = () => {
  const { data: artists } = useArtists();
  const { data: albums } = useAlbums();
  const { data: news } = useNews();

  useEffect(() => {
    if (!artists || !albums || !news) return;

    const generateSitemap = () => {
      const baseUrl = window.location.origin;
      const now = new Date().toISOString();

      interface SitemapUrl {
        url: string;
        changefreq: string;
        priority: string;
        lastmod?: string;
      }

      const urls: SitemapUrl[] = [
        // Static pages
        { url: '/', changefreq: 'daily', priority: '1.0' },
        { url: '/artists', changefreq: 'weekly', priority: '0.8' },
        { url: '/music', changefreq: 'weekly', priority: '0.8' },
        { url: '/news', changefreq: 'daily', priority: '0.8' },
        
        // Dynamic artist pages
        ...artists.map(artist => ({
          url: `/artist/${artist.id}`,
          changefreq: 'monthly',
          priority: '0.7',
          lastmod: artist.updated_at || artist.created_at
        })),
        
        // Dynamic album pages
        ...albums.map(album => ({
          url: `/album/${album.id}`,
          changefreq: 'monthly',
          priority: '0.7',
          lastmod: album.updated_at || album.created_at
        })),
        
        // Dynamic news pages
        ...news.map(article => ({
          url: `/article/${article.id}`,
          changefreq: 'monthly',
          priority: '0.6',
          lastmod: article.updated_at || article.created_at
        }))
      ];

      const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(item => `  <url>
    <loc>${baseUrl}${item.url}</loc>
    <lastmod>${item.lastmod || now}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      // Store sitemap in localStorage for development purposes
      localStorage.setItem('sitemap', sitemap);
      console.log('Sitemap generated and stored in localStorage');
    };

    generateSitemap();
  }, [artists, albums, news]);

  return null; // This component doesn't render anything
};

export default SitemapGenerator;
