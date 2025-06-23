
import { Music } from "lucide-react";
import { Link } from "react-router-dom";
import ContactForm from "./ContactForm";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-purple-900/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/9f1032e0-925a-437b-8de7-bfdb04c48afd.png" 
                alt="Alpha Tunes Logo" 
                className="w-8 h-8"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Alpha Tunes
              </span>
            </Link>
            <p className="text-gray-400 max-w-md mb-6">
              Your destination for the latest music trends, album previews, and artist promotions.
              Discover new sounds and connect with your favorite artists.
            </p>
            
            {/* Quick Links */}
            <div className="mb-6">
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
                <li>
                  <Link to="/about" className="text-gray-400 hover:text-purple-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="mailto:davoeinc@gmail.com" className="hover:text-purple-400 transition-colors">
                    davoeinc@gmail.com
                  </a>
                </li>
                <li>
                  <a href="tel:+2348105546777" className="hover:text-purple-400 transition-colors">
                    +234 810 554 6777
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>

        <div className="border-t border-purple-900/20 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Alpha Tunes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
