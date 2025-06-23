
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Artists from "./pages/Artists";
import ArtistProfile from "./pages/ArtistProfile";
import Music from "./pages/Music";
import AlbumDetail from "./pages/AlbumDetail";
import AllNews from "./pages/AllNews";
import ArticleDetail from "./pages/ArticleDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArtists from "./pages/AdminArtists";
import AdminAlbums from "./pages/AdminAlbums";
import AdminArticles from "./pages/AdminArticles";
import AddArtist from "./pages/AddArtist";
import AddAlbum from "./pages/AddAlbum";
import AddArticle from "./pages/AddArticle";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="artists" element={<Artists />} />
            <Route path="artist/:id" element={<ArtistProfile />} />
            <Route path="music" element={<Music />} />
            <Route path="album/:id" element={<AlbumDetail />} />
            <Route path="news" element={<AllNews />} />
            <Route path="article/:id" element={<ArticleDetail />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/artists" element={<AdminArtists />} />
          <Route path="/admin/albums" element={<AdminAlbums />} />
          <Route path="/admin/articles" element={<AdminArticles />} />
          <Route path="/admin/add-artist" element={<AddArtist />} />
          <Route path="/admin/add-album" element={<AddAlbum />} />
          <Route path="/admin/add-article" element={<AddArticle />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
