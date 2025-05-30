
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { mockArtists } from "@/data/mockData";
import { Link } from "react-router-dom";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = mockArtists.filter(
        (artist) =>
          artist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          artist.genre.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-950 border-purple-900/20 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Search Artists</DialogTitle>
        </DialogHeader>
        
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search by artist name or genre..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-800 text-white placeholder-gray-400"
            autoFocus
          />
        </div>

        {searchResults.length > 0 && (
          <div className="mt-4 max-h-96 overflow-y-auto">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Artists</h3>
            <div className="space-y-2">
              {searchResults.map((artist) => (
                <Link
                  key={artist.id}
                  to={`/artist/${artist.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-900 transition-colors"
                >
                  <img
                    src={artist.image}
                    alt={artist.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-medium">{artist.name}</p>
                    <p className="text-sm text-gray-400">{artist.genre}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No artists found for "{searchQuery}"
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
