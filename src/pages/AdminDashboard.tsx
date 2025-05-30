import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, User, FileText, Plus, Trash2, LogOut } from "lucide-react";
import { useArtists, useAlbums, useNews, useDeleteArtist, useDeleteAlbum, useDeleteNews } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { data: artists } = useArtists();
  const { data: albums } = useAlbums();
  const { data: news } = useNews();
  
  const deleteArtist = useDeleteArtist();
  const deleteAlbum = useDeleteAlbum();
  const deleteNews = useDeleteNews();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

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

  const stats = [
    {
      title: "Total Artists",
      value: artists?.length || 0,
      icon: User,
      color: "text-blue-400"
    },
    {
      title: "Total Albums",
      value: albums?.length || 0,
      icon: Music,
      color: "text-green-400"
    },
    {
      title: "Total Articles",
      value: news?.length || 0,
      icon: FileText,
      color: "text-purple-400"
    }
  ];

  const handleDeleteArtist = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete artist "${name}"?`)) {
      deleteArtist.mutate(id);
    }
  };

  const handleDeleteAlbum = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete album "${title}"?`)) {
      deleteAlbum.mutate(id);
    }
  };

  const handleDeleteNews = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"?`)) {
      deleteNews.mutate(id);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your music blog content</p>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="outline" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
              <Link to="/">Back to Site</Link>
            </Button>
            <Button onClick={handleSignOut} variant="outline" className="border-red-400 text-red-400 hover:bg-red-400 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card key={stat.title} className="bg-gray-900/50 border-gray-800">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <IconComponent className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Actions */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="h-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Link to="/admin/add-artist" className="flex flex-col items-center">
                  <User className="w-6 h-6 mb-2" />
                  Add Artist
                </Link>
              </Button>
              
              <Button asChild className="h-20 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Link to="/admin/add-album" className="flex flex-col items-center">
                  <Music className="w-6 h-6 mb-2" />
                  Add Album
                </Link>
              </Button>
              
              <Button asChild className="h-20 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Link to="/admin/add-article" className="flex flex-col items-center">
                  <FileText className="w-6 h-6 mb-2" />
                  Add Article
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Artists */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Recent Artists
                </span>
                <Button asChild variant="ghost" size="sm" className="text-purple-400">
                  <Link to="/artists">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {artists?.slice(0, 3).map((artist) => (
                  <div key={artist.id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                    <img
                      src={artist.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'}
                      alt={artist.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{artist.name}</h4>
                      <p className="text-gray-400 text-sm">{artist.genre}</p>
                    </div>
                    <span className="text-purple-400 text-sm">{artist.followers} followers</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteArtist(artist.id, artist.name)}
                      disabled={deleteArtist.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Albums */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="flex items-center">
                  <Music className="w-5 h-5 mr-2" />
                  Recent Albums
                </span>
                <Button asChild variant="ghost" size="sm" className="text-purple-400">
                  <Link to="/music">View All</Link>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {albums?.slice(0, 3).map((album) => (
                  <div key={album.id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                    <img
                      src={album.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'}
                      alt={album.title}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{album.title}</h4>
                      <p className="text-gray-400 text-sm">{album.artist_name}</p>
                    </div>
                    <span className="text-purple-400 text-sm">{album.tracks} tracks</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteAlbum(album.id, album.title)}
                      disabled={deleteAlbum.isPending}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent News */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Recent Articles
              </span>
              <Button asChild variant="ghost" size="sm" className="text-purple-400">
                <Link to="/news">View All</Link>
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {news?.slice(0, 3).map((article) => (
                <div key={article.id} className="flex items-center space-x-4 p-3 bg-gray-800/50 rounded-lg">
                  <img
                    src={article.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'}
                    alt={article.title}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="text-white font-semibold">{article.title}</h4>
                    <p className="text-gray-400 text-sm">{article.category}</p>
                  </div>
                  <span className="text-purple-400 text-sm">{new Date(article.date || '').toLocaleDateString()}</span>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteNews(article.id, article.title)}
                    disabled={deleteNews.isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
