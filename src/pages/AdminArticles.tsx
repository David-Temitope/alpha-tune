
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, Plus, FileText, Calendar } from "lucide-react";
import { useNews, useDeleteNews } from "@/hooks/useSupabaseData";
import SEOHead from "@/components/SEOHead";

const AdminArticles = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const { data: articles, isLoading: articlesLoading } = useNews();
  const deleteNews = useDeleteNews();

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

  const handleDeleteArticle = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete article "${title}"? This action cannot be undone.`)) {
      deleteNews.mutate(id);
    }
  };

  if (loading || articlesLoading) {
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
        title="Manage Articles - Admin Dashboard"
        description="Admin interface for managing articles"
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
            <h1 className="text-3xl font-bold text-white mb-2">Manage Articles</h1>
            <p className="text-gray-400">View and manage all articles in the system</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
            <Link to="/admin/add-article">
              <Plus className="w-4 h-4 mr-2" />
              Add New Article
            </Link>
          </Button>
        </div>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              All Articles ({articles?.length || 0})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {articles && articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                  <Card key={article.id} className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <div className="mb-4">
                        <img
                          src={article.image || 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400'}
                          alt={article.title}
                          className="w-full h-32 rounded object-cover"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Badge className="bg-purple-600">{article.category}</Badge>
                          <div className="flex items-center text-sm text-gray-400">
                            <Calendar className="w-4 h-4 mr-1" />
                            {article.date ? new Date(article.date).toLocaleDateString() : 'No date'}
                          </div>
                        </div>
                        <h3 className="text-lg font-semibold text-white line-clamp-2">{article.title}</h3>
                        {article.excerpt && (
                          <p className="text-sm text-gray-300 line-clamp-3">{article.excerpt}</p>
                        )}
                      </div>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/article/${article.id}`}>View Article</Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteArticle(article.id, article.title)}
                          disabled={deleteNews.isPending}
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
                <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No articles found</h3>
                <p className="text-gray-500 mb-4">Start by adding your first article to the platform.</p>
                <Button asChild>
                  <Link to="/admin/add-article">Add First Article</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminArticles;
