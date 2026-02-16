import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PackageCard({ pkg }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (pkg.slug) {
      navigate(`/package/${pkg.slug}`);
    }
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl shadow-lg h-80 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        {pkg.images?.length > 0 ? (
          <img
            src={pkg.images[0]}
            alt={pkg.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span>No Image</span>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6">
        <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
          {pkg.name}
        </h3>

        <p className="text-gray-200 text-sm mb-4 line-clamp-2">
          {pkg.description}
        </p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleClick();
          }}
          className="self-start px-4 py-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium rounded-full border border-white/20 hover:bg-white/20 transition"
        >
          Explore Package
        </button>
      </div>
    </motion.div>
  );
}
