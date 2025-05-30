
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Music, User } from "lucide-react";
import { useAlbum } from "@/hooks/useSupabaseData";

const AlbumDetail = () => {
  const { id } = useParams();
  const { data: album, isLoading, error } = useAlbum(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-white">Loading album details...</div>
      </div>
    );
  }

  if (error || !album) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Album Not Found</h1>
          <Button asChild>
            <Link to="/music">Back to Music</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button asChild variant="ghost" className="mb-6 text-purple-400 hover:text-purple-300">
          <Link to="/music">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Music
          </Link>
        </Button>

        {/* Album Hero */}
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={album.image || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400'}
                alt={album.title}
                className="w-80 h-80 object-cover rounded-lg shadow-2xl"
              />
            </div>
            <div className="flex-1">
              <Badge className="mb-4 bg-purple-600 text-lg px-4 py-2">
                {album.genre}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {album.title}
              </h1>
              <div className="flex items-center text-purple-400 text-xl mb-6">
                <User className="w-5 h-5 mr-2" />
                {album.artist_name}
              </div>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <Calendar className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Release Date</div>
                  <div className="text-gray-300">{new Date(album.release_date).toLocaleDateString()}</div>
                </div>
                <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                  <Music className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-white font-semibold">Tracks</div>
                  <div className="text-gray-300">{album.tracks} songs</div>
                </div>
              </div>

              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Music className="w-5 h-5 mr-2" />
                Listen Now
              </Button>
            </div>
          </div>
        </div>

        {/* Album Description */}
        {album.description && (
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">About This Album</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg leading-relaxed">
                {album.description}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
