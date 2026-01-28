import React from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

// Import images (you'll need to add these images to your project)
import himachal from '/images/domestic/himachal.jpg';
import kerala from '/images/domestic/kerala.jpg';
import kanyakumari from '/images/domestic/kanyakumari.jpg';
import darjeeling from '/images/domestic/darjeeling.jpg';
import coorg from '/images/domestic/coorg.jpg';
import wayanad from '/images/domestic/wayanad.jpg';

const HoneymoonPackages = () => {
  const location = useLocation();
  
  // Only show this component on the /domestic route
  if (location.pathname !== '/domestic') {
    return null;
  }

  const packages = [
    {
      title: 'Romantic Himachal Holidays',
      image: himachal,
      description: 'Snow-capped mountains and cozy retreats',
      alt: 'Snowy mountains and pine forests of Himachal'
    },
    {
      title: 'Romantic Kerala Holidays',
      image: kerala,
      description: 'Serene backwaters and luxury houseboats',
      alt: 'Kerala backwaters with houseboat'
    },
    {
      title: 'Romantic Kerala with Kanyakumari',
      image: kanyakumari,
      description: 'Where the three seas meet in divine harmony',
      alt: 'Sunset at Kanyakumari'
    },
    {
      title: 'Romantic Darjeeling – Gangtok',
      image: darjeeling,
      description: 'Tea gardens with mountain vistas',
      alt: 'Tea gardens of Darjeeling with mountains'
    },
    {
      title: 'Romantic Coorg Holidays',
      image: coorg,
      description: 'Misty coffee plantations and waterfalls',
      alt: 'Coffee plantations in Coorg'
    },
    {
      title: 'Romantic Wayanad Holidays',
      image: wayanad,
      description: 'Lush forests and luxury tree houses',
      alt: 'Scenic view of Wayanad forests'
    }
  ];

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-blue-800 mb-3">Domestic Honeymoon Packages</h3>
          <p className="text-grey-600 max-w-2xl mx-auto">Discover the most romantic destinations in India, handpicked for your perfect honeymoon experience.</p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {packages.map((pkg, index) => (
            <motion.div 
              key={index}
              className="group relative overflow-hidden rounded-xl shadow-lg h-80 cursor-pointer"
              variants={item}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                // Handle navigation to package details
                console.log(`Navigating to ${pkg.title} details`);
              }}
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute inset-0">
                <img
                  src={pkg.image}
                  alt={pkg.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{pkg.title}</h3>
                <p className="text-gray-200 text-sm mb-4 drop-shadow-md">{pkg.description}</p>
                <button className="self-start px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition-colors">
                  Explore Package
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HoneymoonPackages;
