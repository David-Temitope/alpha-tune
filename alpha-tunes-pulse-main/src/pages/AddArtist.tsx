import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useCreateArtist } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";

const AddArtist = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const createArtist = useCreateArtist();
  
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    genre: "",
    image: "",
    followers: 0
  });

  const genres = [
    "Electronic", "Hip-Hop", "Folk", "Pop", "Rock", 
    "Jazz", "Classical", "Country", "R&B", "Reggae"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      return;
    }

    if (!formData.genre) {
      return;
    }

    try {
      await createArtist.mutateAsync({
        name: formData.name,
        bio: formData.bio || null,
        genre: formData.genre as any,
        image: formData.image || null,
        followers: formData.followers
      });

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error creating artist:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 py-8 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
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
            <CardTitle className="text-2xl text-white">Add New Artist</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">Artist Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="genre" className="text-gray-300">Genre</Label>
                <Select onValueChange={(value) => setFormData({...formData, genre: value})} required>
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
                <Label htmlFor="bio" className="text-gray-300">Biography</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white min-h-32"
                  placeholder="Tell us about this artist..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image" className="text-gray-300">Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="followers" className="text-gray-300">Followers</Label>
                <Input
                  id="followers"
                  type="number"
                  value={formData.followers}
                  onChange={(e) => setFormData({...formData, followers: parseInt(e.target.value) || 0})}
                  className="bg-gray-800 border-gray-700 text-white"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={createArtist.isPending || !formData.name.trim() || !formData.genre}
              >
                {createArtist.isPending ? "Creating..." : "Create Artist"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddArtist;
