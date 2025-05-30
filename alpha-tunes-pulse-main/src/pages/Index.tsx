
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, User, Calendar } from "lucide-react";
import { useNews, useAlbums, useArtists } from "@/hooks/useSupabaseData";

const Index = () => {
  const { data: news } = useNews();
  const { data: albums } = useAlbums();
  const { data: artists } = useArtists();

  // Get first 3 items for featured sections
  const featuredNews = news?.slice(0, 3) || [];
  const featuredAlbums = albums?.slice(0, 3) || [];
  const featuredArtists = artists?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Welcome to Alpha Tunes
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover the latest music trends, exclusive album previews, and connect with emerging artists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Link to="/music">Explore Music</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                <Link to="/artists">Meet Artists</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Latest News</h2>
            <Button asChild variant="ghost" className="text-purple-400 hover:text-purple-300">
              <Link to="/news">View All</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredNews.map((article) => (
              <Link key={article.id} to={`/article/${article.id}`}>
                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={article.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-purple-600">
                      {article.category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center text-sm text-gray-400 mb-2">
                      <Calendar className="w-4 h-4 mr-1" />
                      {article.date ? new Date(article.date).toLocaleDateString() : 'No date'}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors">
                      {article.title}
                    </h3>
                    {article.excerpt && (
                      <p className="text-gray-400">{article.excerpt}</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Albums Section */}
      <section className="py-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Albums</h2>
            <Button asChild variant="ghost" className="text-purple-400 hover:text-purple-300">
              <Link to="/music">View All Music</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredAlbums.map((album) => (
              <Link key={album.id} to={`/album/${album.id}`}>
                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={album.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'}
                      alt={album.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                        Preview
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{album.title}</h3>
                    <p className="text-purple-400 mb-2">{album.artist_name}</p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{album.genre}</span>
                      <span>{album.tracks} tracks</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white">Featured Artists</h2>
            <Button asChild variant="ghost" className="text-purple-400 hover:text-purple-300">
              <Link to="/artists">View All Artists</Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist) => (
              <Link key={artist.id} to={`/artist/${artist.id}`}>
                <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-6">
                      <img
                        src={artist.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'}
                        alt={artist.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-purple-400 mb-4">{artist.genre}</p>
                    <div className="flex items-center justify-center text-sm text-gray-400">
                      <User className="w-4 h-4 mr-1" />
                      {artist.followers} followers
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
