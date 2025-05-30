
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar } from "lucide-react";
import { useNewsArticle } from "@/hooks/useSupabaseData";

const ArticleDetail = () => {
  const { id } = useParams();
  const { data: article, isLoading, error } = useNewsArticle(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-white">Loading article...</div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen py-8 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Article Not Found</h1>
          <Button asChild>
            <Link to="/">Back to Home</Link>
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
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        {/* Article Header */}
        <Card className="bg-gray-900/50 border-gray-800 mb-8">
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <Badge className="bg-purple-600">
                {article.category}
              </Badge>
              <div className="flex items-center text-gray-400">
                <Calendar className="w-4 h-4 mr-2" />
                {article.date ? new Date(article.date).toLocaleDateString() : 'No date'}
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold text-white leading-tight">
              {article.title}
            </CardTitle>
            {article.excerpt && (
              <p className="text-xl text-gray-300 mt-4">
                {article.excerpt}
              </p>
            )}
          </CardHeader>
        </Card>

        {/* Article Image */}
        {article.image && (
          <div className="mb-8">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-2xl"
            />
          </div>
        )}

        {/* Article Content */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-8">
            <div className="prose prose-invert prose-purple max-w-none">
              {article.content ? (
                <div className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                  {article.content}
                </div>
              ) : (
                <p className="text-gray-400 italic">No content available for this article.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ArticleDetail;
