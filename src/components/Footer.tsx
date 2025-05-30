
import { Music } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-purple-900/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Music className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Alpha Tunes
              </span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Your destination for the latest music trends, album previews, and artist promotions.
              Discover new sounds and connect with your favorite artists.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/music" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/artists" className="text-gray-400 hover:text-purple-400 transition-colors">
                  Artists
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>contact@alphatunes.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-900/20 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Alpha Tunes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
