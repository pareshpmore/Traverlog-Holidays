import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, Star, TrendingUp, Award, Plane } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HoneymoonSection from '../components/HoneymoonSection';
import { formatPrice } from '../utils/formatters';

const Home = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const destinations = [
    { 
      name: 'Goa Beaches', 
      image: 'https://images.unsplash.com/photo-1559628376-f3fe5f782a2e?w=800&h=600&fit=crop',
      price: '12,999',
      duration: '5 Days',
      rating: 4.8,
      popular: true
    },
    { 
      name: 'Kerala Backwaters', 
      image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
      price: '15,499',
      duration: '6 Days',
      rating: 4.9,
      popular: true
    },
    { 
      name: 'Himalayan Trek', 
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      price: '18,999',
      duration: '7 Days',
      rating: 4.7,
      popular: false
    },
  ];

  const features = [
    { icon: Award, title: 'Best Price Guarantee', desc: 'Find a better price? We\'ll match it' },
    { icon: Calendar, title: 'Flexible Booking', desc: 'Free cancellation up to 48 hours' },
    { icon: Users, title: 'Expert Guides', desc: 'Local experts to enhance your journey' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <HeroSection />

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:bg-blue-50 transition-colors">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Holiday Experiences Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Holiday Style
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every journey is different – find the one that matches your vibe
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

            {/* Card 1 */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/images/experiences/friends-beach.jpg"
                alt="Friends Trip"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
                  Friends Trip
                </span>
                <h3 className="text-2xl font-bold mt-3">Beach Parties & Nightlife</h3>
                <p className="text-sm text-white/80 mt-1">Goa • Thailand • Bali</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/images/experiences/yacht-party.jpg"
                alt="Luxury Cruise"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                  Luxury
                </span>
                <h3 className="text-2xl font-bold mt-3">Private Yacht Experiences</h3>
                <p className="text-sm text-white/80 mt-1">Mediterranean • Maldives</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/images/experiences/cruise-ship.jpg"
                alt="Cruise"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-purple-500 px-3 py-1 rounded-full text-sm font-semibold">
                  International
                </span>
                <h3 className="text-2xl font-bold mt-3">World Class Cruises</h3>
                <p className="text-sm text-white/80 mt-1">Europe • Caribbean • Asia</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/images/experiences/family-hiking.jpg"
                alt="Family Trip"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-green-500 px-3 py-1 rounded-full text-sm font-semibold">
                  Family
                </span>
                <h3 className="text-2xl font-bold mt-3">Family Friendly Getaways</h3>
                <p className="text-sm text-white/80 mt-1">Hills • Resorts • Nature</p>
              </div>
            </div>

            {/* Card 5 */}
            <div className="group relative h-[420px] md:col-span-2 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all">
              <img
                src="/images/experiences/cultural-india.jpg"
                alt="Cultural India"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                  Culture
                </span>
                <h3 className="text-3xl font-bold mt-3">Incredible India Tours</h3>
                <p className="text-sm text-white/80 mt-1">Rajasthan • Kerala • Varanasi</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Honeymoon Section */}
      <HoneymoonSection />

      {/* Destinations Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Popular Destinations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Handpicked paradises waiting to be explored
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {destinations.map((destination, index) => (
            <div 
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 bg-white"
            >
              {destination.popular && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                  🔥 Popular
                </div>
              )}
              
              <div className="relative h-72 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredCard === index ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-gray-800">{destination.rating}</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-sm font-medium text-gray-800">
                      {destination.duration}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{destination.name}</h3>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm">Starting from</p>
                    <p className="text-2xl font-bold text-blue-600">{formatPrice(destination.price)}</p>
                  </div>
                  <Link to="/domestic" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors group-hover:shadow-lg inline-block">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/domestic" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-10 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 inline-block">
            View All Destinations
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Travel adventure"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 to-gray-700/80"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join thousands of happy travelers and start creating memories that last a lifetime
          </p>
          <Link to="/domestic" className="bg-white text-blue-700 hover:bg-blue-50 px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl inline-block">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;