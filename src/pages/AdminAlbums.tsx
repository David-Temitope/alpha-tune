
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, Plus, Music } from "lucide-react";
import { useAlbums, useDeleteAlbum } from "@/hooks/useSupabaseData";
import SEOHead from "@/components/SEOHead";

const AdminAlbums = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: albums, isLoading: albumsLoading } = useAlbums();
  const deleteAlbum = useDeleteAlbum();

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

  const handleDeleteAlbum = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete album "${title}"? This action cannot be undone.`)) {
      deleteAlbum.mutate(id);
    }
  };

  if (loading || albumsLoading) {
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
        title="Manage Albums - Admin Dashboard"
        description="Admin interface for managing albums"
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
            <h1 className="text-3xl font-bold text-white mb-2">Manage Albums</h1>
            <p className="text-gray-400">View and manage all albums in the system</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Link to="/admin/add-album">
              <Plus className="w-4 h-4 mr-2" />
              Add New Album
            </Link>
          </Button>
        </div>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Music className="w-5 h-5 mr-2" />
              All Albums ({albums?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {albums && albums.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <Card key={album.id} className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={album.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'}
                          alt={album.title}
                          className="w-16 h-16 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold text-white truncate">{album.title}</h3>
                          <p className="text-sm text-purple-400">{album.artist_name}</p>
                          <Badge className="mb-2 bg-green-600">{album.genre}</Badge>
                          <div className="text-sm text-gray-400">
                            <p>{album.tracks} tracks</p>
                            <p>{new Date(album.release_date).getFullYear()}</p>
                          </div>
                        </div>
                      </div>
                      {album.description && (
                        <p className="text-sm text-gray-300 mt-3 line-clamp-2">{album.description}</p>
                      )}
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/album/${album.id}`}>View Album</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteAlbum(album.id, album.title)}
                          disabled={deleteAlbum.isPending}
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
                <Music className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No albums found</h3>
                <p className="text-gray-500 mb-4">Start by adding your first album to the platform.</p>
                <Button asChild>
                  <Link to="/admin/add-album">Add First Album</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminAlbums;
