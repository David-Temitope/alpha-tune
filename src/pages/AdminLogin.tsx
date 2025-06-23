
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import SEOHead from "@/components/SEOHead";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [attempts, setAttempts] = useState(0);
  const [blocked, setBlocked] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (blocked) {
      toast({
        title: "Access Temporarily Blocked",
        description: "Too many failed attempts. Please try again later.",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      // Check for correct admin credentials
      if (formData.email === "iamadmin@admin.com" && formData.password === "DaV03daAddme") {
        // Create a mock session for admin access
        localStorage.setItem('admin_authenticated', 'true');
        localStorage.setItem('admin_user', JSON.stringify({
          id: 'admin-user',
          email: 'iamadmin@admin.com',
          role: 'admin'
        }));
        
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard!"
        });
        navigate("/admin/dashboard");
        return;
      }

      // If credentials don't match, increment attempts
      setAttempts(prev => prev + 1);
      
      if (attempts >= 4) {
        setBlocked(true);
        setTimeout(() => setBlocked(false), 300000); // 5 minutes
      }
      
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please check your email and password.",
        variant: "destructive"
      });

    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 py-8 flex items-center justify-center">
      <SEOHead
        title="Admin Login - Alpha Tunes"
        description="Admin access to Alpha Tunes dashboard"
        noIndex={true}
      />
      
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Button asChild variant="ghost" className="mb-6 text-purple-400 hover:text-purple-300">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <Card className="bg-gray-900/80 border-gray-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white text-center">Admin Access</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                  required
                  autoComplete="username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="bg-gray-800 border-gray-700 text-white focus:border-purple-500"
                  required
                  autoComplete="current-password"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
                disabled={loading || blocked}
              >
                {loading ? "Authenticating..." : blocked ? "Access Blocked" : "Secure Login"}
              </Button>
            </form>

            {attempts > 0 && !blocked && (
              <div className="mt-4 text-center text-sm text-red-400">
                Failed attempts: {attempts}/5
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
