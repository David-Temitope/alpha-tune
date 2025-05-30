
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Music from "./pages/Music";
import Artists from "./pages/Artists";
import AllNews from "./pages/AllNews";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AddArtist from "./pages/AddArtist";
import AddAlbum from "./pages/AddAlbum";
import AddArticle from "./pages/AddArticle";
import ArtistProfile from "./pages/ArtistProfile";
import AlbumDetail from "./pages/AlbumDetail";
import ArticleDetail from "./pages/ArticleDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Admin routes without Layout */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-artist" element={<AddArtist />} />
            <Route path="/admin/add-album" element={<AddAlbum />} />
            <Route path="/admin/add-article" element={<AddArticle />} />
            
            {/* Public routes with Layout wrapper */}
            <Route path="/" element={
              <Layout>
                <Index />
              </Layout>
            } />
            <Route path="/music" element={
              <Layout>
                <Music />
              </Layout>
            } />
            <Route path="/artists" element={
              <Layout>
                <Artists />
              </Layout>
            } />
            <Route path="/news" element={
              <Layout>
                <AllNews />
              </Layout>
            } />
            <Route path="/artist/:id" element={
              <Layout>
                <ArtistProfile />
              </Layout>
            } />
            <Route path="/album/:id" element={
              <Layout>
                <AlbumDetail />
              </Layout>
            } />
            <Route path="/article/:id" element={
              <Layout>
                <ArticleDetail />
              </Layout>
            } />
            
            {/* 404 route */}
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
