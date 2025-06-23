
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, Plus, User } from "lucide-react";
import { useArtists, useDeleteArtist } from "@/hooks/useSupabaseData";
import SEOHead from "@/components/SEOHead";

const AdminArtists = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: artists, isLoading: artistsLoading } = useArtists();
  const deleteArtist = useDeleteArtist();

  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_authenticated');
    const adminUser = localStorage.getItem('admin_user');
    
    if (adminAuth === 'true' && adminUser) {
      setIsAuthenticated(true);
    } else {
      navigate("/admin/login");
    }
    setLoading(false);
  }, [navigate]);

  const handleDeleteArtist = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete artist "${name}"? This action cannot be undone.`)) {
      deleteArtist.mutate(id);
    }
  };

  if (loading || artistsLoading) {
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
      <SEOHead
        title="Manage Artists - Admin Dashboard"
        description="Admin interface for managing artists"
        noIndex={true}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 text-purple-400 hover:text-purple-300">
          <Link to="/admin/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Manage Artists</h1>
            <p className="text-gray-400">View and manage all artists in the system</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Link to="/admin/add-artist">
              <Plus className="w-4 h-4 mr-2" />
              Add New Artist
            </Link>
          </Button>
        </div>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              All Artists ({artists?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {artists && artists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artists.map((artist) => (
                  <Card key={artist.id} className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={artist.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'}
                          alt={artist.name}
                          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{artist.name}</h3>
                          <Badge className="mb-2 bg-purple-600">{artist.genre}</Badge>
                          <p className="text-sm text-gray-400">{artist.followers} followers</p>
                          {artist.bio && (
                            <p className="text-sm text-gray-300 mt-2 line-clamp-2">{artist.bio}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/artist/${artist.id}`}>View Profile</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteArtist(artist.id, artist.name)}
                          disabled={deleteArtist.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <User className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No artists found</h3>
                <p className="text-gray-500 mb-4">Start by adding your first artist to the platform.</p>
                <Button asChild>
                  <Link to="/admin/add-artist">Add First Artist</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArtists;
