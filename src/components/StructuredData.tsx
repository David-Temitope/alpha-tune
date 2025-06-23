
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'website' | 'article' | 'musicAlbum' | 'person' | 'organization';
  data: any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const getStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
    };

    switch (type) {
      case 'website':
        return {
          ...baseData,
          "@type": "WebSite",
          name: "Alpha Tunes",
          url: "https://alphatunes.lovable.app",
          description: "Modern music blog featuring the latest trends, album previews, and emerging artists",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://alphatunes.lovable.app/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        };

      case 'article':
        return {
          ...baseData,
          "@type": "Article",
          headline: data.title,
          description: data.excerpt || data.description,
          image: data.image,
          author: {
            "@type": "Organization",
            name: "Alpha Tunes"
          },
          publisher: {
            "@type": "Organization",
            name: "Alpha Tunes",
            logo: {
              "@type": "ImageObject",
              url: "https://lovable.dev/opengraph-image-p98pqg.png"
            }
          },
          datePublished: data.date,
          dateModified: data.updated_at,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": data.url
          }
        };

      case 'musicAlbum':
        return {
          ...baseData,
          "@type": "MusicAlbum",
          name: data.title,
          description: data.description,
          image: data.image,
          albumProductionType: "http://schema.org/StudioAlbum",
          genre: data.genre,
          numTracks: data.tracks,
          datePublished: data.release_date,
          byArtist: {
            "@type": "MusicGroup",
            name: data.artist_name
          }
        };

      case 'person':
        return {
          ...baseData,
          "@type": "Person",
          name: data.name,
          description: data.bio,
          image: data.image,
          genre: data.genre,
          sameAs: data.socialLinks || []
        };

      case 'organization':
        return {
          ...baseData,
          "@type": "Organization",
          name: "Alpha Tunes",
          url: "https://alphatunes.lovable.app",
          logo: "https://lovable.dev/opengraph-image-p98pqg.png",
          description: "Modern music blog featuring the latest trends, album previews, and emerging artists",
          sameAs: [
            "https://twitter.com/alphatunes"
          ]
        };

      default:
        return baseData;
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(getStructuredData())}
      </script>
    </Helmet>
  );
};

export default StructuredData;
