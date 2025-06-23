
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactForm from "@/components/ContactForm";
import SocialMediaIcons from "@/components/SocialMediaIcons";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-purple-950 to-gray-950 py-16">
      <SEOHead
        title="Contact Us - Alpha Tunes | Get In Touch"
        description="Contact Alpha Tunes for music promotions, partnerships, or general inquiries. Connect with us through email, phone, or social media."
        keywords={["contact", "music promotion", "partnerships", "Alpha Tunes contact"]}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Ready to collaborate or have questions? We'd love to hear from you. Reach out for music promotions, partnerships, or general inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 p-3 rounded-full">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Email</h3>
                    <a 
                      href="mailto:davoeinc@gmail.com" 
                      className="text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      davoeinc@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-green-600 p-3 rounded-full">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Phone</h3>
                    <a 
                      href="tel:+2348105546777" 
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      +234 810 554 6777
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="bg-blue-600 p-3 rounded-full">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold">Location</h3>
                    <p className="text-gray-400">Nigeria</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Media Section */}
            <Card className="bg-gray-900/50 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Follow Us</CardTitle>
                <p className="text-gray-400">Stay connected with Alpha Tunes on social media</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Facebook</span>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href="https://www.facebook.com/share/1BqKz9pSu1/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300"
                      >
                        Follow
                      </a>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white">WhatsApp Channel</span>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href="https://whatsapp.com/channel/0029Vb5O6nR11ulTOhAb132z" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300"
                      >
                        Join
                      </a>
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white">TikTok</span>
                    <Button asChild variant="outline" size="sm">
                      <a 
                        href="https://www.tiktok.com/@muxic.davoe?_t=ZM-8wsxSx6nlor&_r=1" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-pink-400 hover:text-pink-300"
                      >
                        Follow
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-700">
                  <p className="text-gray-400 text-sm mb-4">Connect with us instantly:</p>
                  <div className="flex gap-4">
                    <Button asChild className="bg-green-600 hover:bg-green-700">
                      <a 
                        href="https://wa.me/2348105546777" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        WhatsApp
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a 
                        href="https://whatsapp.com/channel/0029Vb5O6nR11ulTOhAb132z" 
                        target="_blank" 
                        rel="noopener noreferrer"
                      >
                        Join Channel
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <ContactForm />
            
            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-lg border border-purple-500/20">
              <h3 className="text-white font-semibold mb-2">Why Contact Alpha Tunes?</h3>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Music promotion and marketing services</li>
                <li>• Artist collaboration opportunities</li>
                <li>• Album reviews and features</li>
                <li>• Partnership and sponsorship inquiries</li>
                <li>• General questions about our platform</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
