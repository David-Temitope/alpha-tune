
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Music, Album, ArrowLeft } from "lucide-react";
import { useArtist, useAlbums } from "@/hooks/useSupabaseData";
import SEOHead from "@/components/SEOHead";
import StructuredData from "@/components/StructuredData";
import LikeButtons from "@/components/LikeButtons";
import SocialMediaIcons from "@/components/SocialMediaIcons";

const ArtistProfile = () => {
  const { id } = useParams();
  const { data: artist, isLoading: artistLoading, error: artistError } = useArtist(id || "");
  const { data: allAlbums } = useAlbums();
  
  // Filter albums by this artist
  const artistAlbums = allAlbums?.filter(album => album.artist_id === id) || [];

  if (artistLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-white">Loading artist profile...</div>
      </div>
    );
  }

  if (artistError || !artist) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Artist Not Found</h1>
          <Button asChild>
            <Link to="/artists">Back to Artists</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <SEOHead
        title={`${artist.name} - ${artist.genre} Artist | Alpha Tunes`}
        description={artist.bio || `Discover ${artist.name}, a talented ${artist.genre} artist with ${artist.followers} followers. Explore their music and latest releases on Alpha Tunes.`}
        image={artist.image}
        type="profile"
        keywords={[artist.name.toLowerCase(), artist.genre.toLowerCase(), "artist", "music", "alpha tunes"]}
      />
      
      <StructuredData 
        type="person" 
        data={{
          ...artist,
          url: window.location.href
        }} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-purple-400 hover:text-purple-300">
          <Link to="/artists">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Artists
          </Link>
        </Button>

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img
              src={artist.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'}
              alt={`${artist.name} profile picture`}
              className="w-48 h-48 rounded-full object-cover border-4 border-purple-500"
              loading="lazy"
            />
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {artist.name}
              </h1>
              <Badge className="text-lg px-4 py-2 bg-purple-600 mb-4">
                {artist.genre}
              </Badge>
              <div className="flex flex-col sm:flex-row gap-6 text-gray-300 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{artist.followers}</div>
                  <div className="text-sm">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{artistAlbums.length}</div>
                  <div className="text-sm">Albums</div>
                </div>
              </div>
              
              {/* Social Media Icons */}
              <SocialMediaIcons 
                instagram={(artist as any).instagram}
                twitter={(artist as any).twitter}
                facebook={(artist as any).facebook}
                youtube={(artist as any).youtube}
              />
              
              <div className="mt-6">
                <LikeButtons itemType="artist" itemId={artist.id} />
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="about" className="data-[state=active]:bg-purple-600">
              <User className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="discography" className="data-[state=active]:bg-purple-600">
              <Album className="w-4 h-4 mr-2" />
              Discography
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">About {artist.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {artist.bio || "No biography available for this artist."}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="discography">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artistAlbums.length > 0 ? artistAlbums.map((album) => (
                <Link key={album.id} to={`/album/${album.id}`}>
                  <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <img
                        src={album.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'}
                        alt={`${album.title} album cover`}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                          View Album
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold text-white mb-1">{album.title}</h3>
                      <p className="text-purple-400 text-sm mb-2">{album.genre}</p>
                      <p className="text-gray-400 text-sm">{new Date(album.release_date).getFullYear()}</p>
                    </CardContent>
                  </Card>
                </Link>
              )) : (
                <div className="col-span-full text-center py-8">
                  <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-400 mb-2">No albums yet</h3>
                  <p className="text-gray-500">This artist hasn't released any albums.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ArtistProfile;
