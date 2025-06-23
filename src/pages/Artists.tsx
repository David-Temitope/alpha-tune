import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Search } from "lucide-react";
import { useArtists } from "@/hooks/useSupabaseData";

const Artists = () => {
  const { data: artists, isLoading } = useArtists();
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
  
  const filteredArtists = artists?.filter((artist) => {
    const matchesSearch = artist.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === "All" || selectedGenre === "" || artist.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  }) || [];

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-white">Loading artists...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Artists
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore profiles of emerging and established artists across all genres
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-900/50 rounded-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search artists..."
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
              <User className="w-4 h-4 mr-2" />
              Filter Artists
            </Button>
          </div>
        </div>

        {/* Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map((artist) => (
            <Link key={artist.id} to={`/artist/${artist.id}`}>
              <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer h-full">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="relative mb-4">
                      <img
                        src={artist.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'}
                        alt={artist.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-purple-400 text-lg mb-4">{artist.genre}</p>
                  </div>
                  
                  <div className="space-y-3 text-sm text-gray-400">
                    <div className="flex items-center justify-between">
                      <span>Followers:</span>
                      <span className="text-white font-medium">{artist.followers}</span>
                    </div>
                  </div>
                  
                  {artist.bio && (
                    <div className="mt-6">
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {artist.bio}
                      </p>
                    </div>
                  )}
                  
                  <Button className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredArtists.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No artists found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;
