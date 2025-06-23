
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useCreateAlbum, useArtists } from "@/hooks/useSupabaseData";
import ImageUpload from "@/components/ImageUpload";

const AddAlbum = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const createAlbum = useCreateAlbum();
  const { data: artists } = useArtists();
  
  useEffect(() => {
    // Check for admin authentication
    const adminAuth = localStorage.getItem('admin_authenticated');
    const adminUser = localStorage.getItem('admin_user');
    
    if (adminAuth === 'true' && adminUser) {
      setIsAuthenticated(true);
    } else {
      navigate("/admin/login");
    }
    setLoading(false);
  }, [navigate]);

  const [formData, setFormData] = useState({
    title: "",
    artist_id: "",
    artist_name: "",
    genre: "",
    image: "",
    release_date: "",
    tracks: 0,
    description: "",
    song_link: ""
  });

  const genres = [
    "Electronic", "Hip-Hop", "Folk", "Pop", "Rock", "Jazz", "Classical", 
    "Country", "R&B", "Reggae", "Afrobeat", "Dancehall", "Reggaeton", "Latin", 
    "Gospel", "Blues", "Funk", "Soul", "Disco", "House", "Techno", "Trance", 
    "Dubstep", "Drum & Bass", "Ambient", "World", "African", "Caribbean", 
    "Ska", "Punk", "Metal", "Alternative", "Indie", "Folk Rock", "Synthwave", 
    "Lo-fi", "Trap", "Drill", "Amapiano", "Highlife", "Juju", "Fuji"
  ];

  const handleArtistChange = (artistId: string) => {
    const selectedArtist = artists?.find(a => a.id === artistId);
    setFormData({
      ...formData, 
      artist_id: artistId,
      artist_name: selectedArtist?.name || "",
      genre: selectedArtist?.genre || ""
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.artist_id || !formData.release_date) {
      return;
    }

    try {
      await createAlbum.mutateAsync({
        title: formData.title,
        artist_id: formData.artist_id,
        artist_name: formData.artist_name,
        genre: formData.genre as any,
        image: formData.image || null,
        release_date: formData.release_date,
        tracks: formData.tracks,
        description: formData.description || null,
        song_link: formData.song_link || null
      });

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error creating album:", error);
    }
  };

  const isFormValid = formData.title.trim() && formData.artist_id && formData.release_date && formData.genre;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 py-8 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 text-purple-400 hover:text-purple-300">
          <Link to="/admin/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <Card className="bg-gray-900/80 border-gray-800">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Add New Album</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Album Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="artist" className="text-gray-300">Artist</Label>
                <Select onValueChange={handleArtistChange} required>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select an artist" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {artists?.map((artist) => (
                      <SelectItem key={artist.id} value={artist.id} className="text-white hover:bg-gray-700">
                        {artist.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-gray-300">Genre</Label>
                <Select 
                  value={formData.genre} 
                  onValueChange={(value) => setFormData({...formData, genre: value})}
                  required
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select a genre" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {genres.map((genre) => (
                      <SelectItem key={genre} value={genre} className="text-white hover:bg-gray-700">
                        {genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="release_date" className="text-gray-300">Release Date</Label>
                <Input
                  id="release_date"
                  type="date"
                  value={formData.release_date}
                  onChange={(e) => setFormData({...formData, release_date: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tracks" className="text-gray-300">Number of Tracks</Label>
                <Input
                  id="tracks"
                  type="number"
                  value={formData.tracks}
                  onChange={(e) => setFormData({...formData, tracks: parseInt(e.target.value) || 0})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="song_link" className="text-gray-300">Song Link</Label>
                <Input
                  id="song_link"
                  type="url"
                  value={formData.song_link}
                  onChange={(e) => setFormData({...formData, song_link: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://spotify.com/track/..."
                />
              </div>

              <ImageUpload
                onImageUploaded={(url) => setFormData({...formData, image: url})}
                currentImage={formData.image}
                label="Album Cover"
              />

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-300">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white min-h-32"
                  placeholder="Describe this album..."
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={createAlbum.isPending || !isFormValid}
              >
                {createAlbum.isPending ? "Creating..." : "Create Album"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddAlbum;
