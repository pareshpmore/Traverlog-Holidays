import { useEffect, useState } from "react";

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const experiences = [
    {
      image: "/images/experiences/friends-beach.jpg",
      heading: "Tropical Beach Escapes",
      subheading: "Unforgettable beach parties and sun-soaked adventures with your favorite people",
    },
    {
      image: "/images/experiences/family-hiking.jpg",
      heading: "Family Adventure Trails",
      subheading: "Create lasting memories with thrilling outdoor experiences for all ages",
    },
    {
      image: "/images/experiences/cultural-india.jpg",
      heading: "Cultural Odyssey Through India",
      subheading: "Immerse yourself in the vibrant traditions and rich heritage of incredible India",
    },
    {
      image: "/images/experiences/yacht-party.jpg",
      heading: "Luxury Yacht Experiences",
      subheading: "Sail in style with our exclusive private yacht charters and premium services",
    },
    {
      image: "/images/experiences/cruise-ship.jpg",
      heading: "Oceanic Voyages",
      subheading: "Discover the world's most breathtaking destinations aboard luxury cruise liners",
    },
  ];

  const videos = [
    { id: "MDXZVaiG_J0", title: "Tropical Paradise" },
    { id: "JZy-9QR5ekk", title: "Mountain Adventure" },
    { id: "zcvroryW4DY", title: "Cultural Journey" },
    { id: "QOhMCcsRibE", title: "Beach Getaway" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % experiences.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-[85vh] overflow-hidden">
      {/* ================= BACKGROUND SLIDER ================= */}
      {experiences.map((exp, index) => (
        <img
          key={index}
          src={exp.image}
          alt={exp.heading}
          className={`absolute inset-0 w-full h-[90vh] object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* DARK OVERLAY (LESS WHITISH) */}
      <div className="absolute inset-0 bg-black/20 z-10"></div>

      {/* ================= HERO TEXT ================= */}
      <div className="absolute inset-0 z-20 flex items-start justify-center text-center px-4 text-white pt-[25vh]">
        <div className="max-w-5xl px-6">
          <h1 className="text-5xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-lg leading-tight">
            {experiences[currentIndex].heading}
          </h1>
          <p className="text-xl md:text-2xl opacity-95 font-medium drop-shadow">
            {experiences[currentIndex].subheading}
          </p>
        </div>
      </div>

      {/* ================= VIDEO STRIP (BOTTOM) ================= */}
      <div className="absolute bottom-0 left-0 right-0 z-30 pb-4" style={{ top: 'calc(90vh - 240px)' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-white rounded-xl shadow-xl overflow-hidden hover:scale-105 transition-transform duration-300"
              >
                <div className="aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${video.id}`}
                    title={video.title}
                    className="w-full h-full"
                    loading="lazy"
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM FADE FOR CLEAN EDGE */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-black/40 z-20"></div>
    </section>
  );
};

export default HeroSection;
