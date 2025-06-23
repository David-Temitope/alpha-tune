
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Music, Heart, Star, Users } from "lucide-react";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const About = () => {
  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Us - Alpha Tunes"
        description="Learn about Alpha Tunes and our mission to spotlight upcoming artists without causing them pain. Founded by Obasa David Temitope (DaVoe) in 2024."
        keywords={["about alpha tunes", "DaVoe", "Obasa David Temitope", "music platform", "upcoming artists"]}
      />

      {/* Hero Section with Musical Background */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500673922987-e212871fec22?w=1200')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-blue-900/80" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-6">
              About Us
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Spotlighting upcoming artists without causing them pain
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="bg-gray-900/50 border-gray-800 mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Heart className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                At Alpha Tunes, we are passionate about taking upcoming artists into the spotlight without causing them pain. 
                We believe that every talented artist deserves a platform to showcase their creativity and connect with their audience 
                in an authentic and supportive environment.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                We started early this year with a vision to create a space where music lovers can discover fresh talent, 
                and where artists can grow their fanbase organically without the stress and exploitation often found in the music industry.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/50 border-gray-800 mb-12">
            <CardContent className="p-8">
              <div className="flex items-center mb-6">
                <Star className="w-8 h-8 text-purple-400 mr-3" />
                <h2 className="text-3xl font-bold text-white">Our Story</h2>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Alpha Tunes was founded in 2024 by <strong className="text-purple-400">Obasa David Temitope</strong>, 
                also known as <strong className="text-purple-400">DaVoe</strong>. With a deep love for music and a keen eye for talent, 
                DaVoe recognized the need for a platform that truly cares about artists' wellbeing while helping them reach new heights.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                What started as a passion project has grown into a community where emerging artists can find support, 
                exposure, and genuine connections with fans who appreciate authentic music.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="bg-gray-900/50 border-gray-800 text-center">
              <CardContent className="p-6">
                <Music className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Artist First</h3>
                <p className="text-gray-300">
                  We prioritize the wellbeing and growth of artists above all else.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 text-center">
              <CardContent className="p-6">
                <Heart className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">No Pain Policy</h3>
                <p className="text-gray-300">
                  We believe in supporting artists without exploitation or unnecessary stress.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 text-center">
              <CardContent className="p-6">
                <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Community Driven</h3>
                <p className="text-gray-300">
                  Building genuine connections between artists and music lovers.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Join Our Journey</h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Whether you're an emerging artist looking for a supportive platform or a music lover seeking fresh talent, 
                Alpha Tunes is here for you. Let's build something beautiful together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <Link to="/artists">Discover Artists</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white">
                  <a href="https://wa.me/2348105546777" target="_blank" rel="noopener noreferrer">
                    Contact Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
