import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Music as MusicIcon, Search, Calendar } from "lucide-react";
import { useAlbums } from "@/hooks/useSupabaseData";

const Music = () => {
  const { data: albums, isLoading } = useAlbums();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  
  const genres = [
    "All", "Electronic", "Hip-Hop", "Folk", "Pop", "Rock", "Jazz", "Classical", 
    "Country", "R&B", "Reggae", "Afrobeat", "Dancehall", "Reggaeton", "Latin", 
    "Gospel", "Blues", "Funk", "Soul", "Disco", "House", "Techno", "Trance", 
    "Dubstep", "Drum & Bass", "Ambient", "World", "African", "Caribbean", 
    "Ska", "Punk", "Metal", "Alternative", "Indie", "Folk Rock", "Synthwave", 
    "Lo-fi", "Trap", "Drill", "Amapiano", "Highlife", "Juju", "Fuji"
  ];
  
  const filteredAlbums = albums?.filter((album) => {
    const matchesSearch = album.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         album.artist_name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || selectedGenre === "" || album.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-white">Loading albums...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest Music & Albums
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover new releases, album previews, and trending music across all genres
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search albums or artists..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-700 text-white"
              />
            </div>
            
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select Genre" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button className="bg-purple-600 hover:bg-purple-700">
              <MusicIcon className="w-4 h-4 mr-2" />
              Filter Results
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAlbums.map((album) => (
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
                      Preview Album
                    </Button>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-purple-600">
                    {album.genre}
                  </Badge>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {album.title}
                  </h3>
                  <p className="text-purple-400 mb-3">{album.artist_name}</p>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(album.release_date).toLocaleDateString()}
                    </div>
                    <span>{album.tracks} tracks</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Listen Now
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredAlbums.length === 0 && (
          <div className="text-center py-12">
            <MusicIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No albums found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Music;
