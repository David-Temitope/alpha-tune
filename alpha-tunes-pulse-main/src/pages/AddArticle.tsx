import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft } from "lucide-react";
import { useCreateNews } from "@/hooks/useSupabaseData";
import { useAuth } from "@/hooks/useAuth";

const AddArticle = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const createNews = useCreateNews();
  
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      navigate("/admin/login");
    }
  }, [user, isAdmin, loading, navigate]);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    image: "",
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ["News", "Reviews", "Interviews", "Features", "Events"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.category) {
      return;
    }

    try {
      await createNews.mutateAsync({
        title: formData.title,
        excerpt: formData.excerpt || null,
        content: formData.content || null,
        category: formData.category as any,
        image: formData.image || null,
        date: formData.date
      });

      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error creating article:", error);
    }
  };

  const isFormValid = formData.title.trim() && formData.category;

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
            <CardTitle className="text-2xl text-white">Add New Article</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-gray-300">Article Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-gray-300">Category</Label>
                <Select onValueChange={(value) => setFormData({...formData, category: value})} required>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {categories.map((category) => (
                      <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt" className="text-gray-300">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Brief summary of the article..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content" className="text-gray-300">Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white min-h-48"
                  placeholder="Full article content..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="date" className="text-gray-300">Publication Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white"
                  required
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

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                disabled={createNews.isPending || !isFormValid}
              >
                {createNews.isPending ? "Creating..." : "Create Article"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddArticle;
