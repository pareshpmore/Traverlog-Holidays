

// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Menu, X, User, LogOut, ChevronDown, Settings, Search } from 'lucide-react';
// import { collection, getDocs } from 'firebase/firestore';
// import { useAuth } from '../contexts/AuthContext';
// import { db } from '../../firebase';
// import { TOURS } from '../pages/domestic/maharashtra/Toursdata';

// const getDurationDays = (pkg) => {
//   if (typeof pkg?.duration?.days === 'number') return pkg.duration.days;
//   if (typeof pkg?.duration?.days === 'string') {
//     const parsed = Number.parseInt(pkg.duration.days, 10);
//     if (!Number.isNaN(parsed)) return parsed;
//   }
//   if (typeof pkg?.duration?.nights === 'number') return pkg.duration.nights + 1;
//   if (typeof pkg?.duration === 'string') {
//     const match = pkg.duration.match(/(\d+)\s*days?/i);
//     if (match) return Number(match[1]);
//   }
//   return 9999;
// };

// const getSearchableValues = (pkg) => {
//   const itineraryText = Array.isArray(pkg?.itinerary)
//     ? pkg.itinerary.flatMap((day) => [day?.title, day?.description, day?.hotel])
//     : [];

//   return [
//     pkg?.name,
//     pkg?.description,
//     pkg?.category,
//     pkg?.type,
//     pkg?.destination,
//     pkg?.location,
//     pkg?.place,
//     pkg?.slug,
//     ...itineraryText,
//   ].filter(Boolean);
// };

// const fallbackPackages = TOURS.map((tour) => ({
//   id: tour.id,
//   name: tour.title,
//   description: tour.tagline,
//   category: 'domestic',
//   type: 'tour',
//   destination: tour.region,
//   location: tour.region,
//   place: tour.region,
//   slug: tour.id,
//   duration: { days: getDurationDays({ duration: tour.duration }), nights: getDurationDays({ duration: tour.duration }) - 1 },
//   itinerary: Array.isArray(tour.itinerary)
//     ? tour.itinerary.map((day) => ({
//         title: day?.title,
//         description: day?.body,
//         hotel: day?.highlights?.[0]?.text || '',
//       }))
//     : [],
//   images: Array.isArray(tour.images) ? tour.images.map((image) => image.src) : [],
//   path: '/domestic/maharashtra',
// }));

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [allPackages, setAllPackages] = useState([]);
//   const profileRef = useRef(null);
//   const navigate = useNavigate();
//   const { currentUser, userRole, logout } = useAuth();
//   const isAdmin = userRole === 'admin';

//   useEffect(() => {
//     async function loadPackages() {
//       try {
//         const snapshot = await getDocs(collection(db, 'packages'));
//         setAllPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//       } catch (error) {
//         console.error('Failed to load packages for search suggestions', error);
//       }
//     }

//     loadPackages();
//   }, []);

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (profileRef.current && !profileRef.current.contains(event.target)) {
//         setIsProfileOpen(false);
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     const normalizedQuery = searchQuery.trim().toLowerCase();

//     if (!normalizedQuery) {
//       setSuggestions([]);
//       return;
//     }

//     const staticSuggestions = [
//       { label: 'Maharashtra', path: '/domestic/maharashtra', type: 'destination' },
//       { label: 'Maharashtra Tours', path: '/domestic/maharashtra', type: 'destination' },
//       { label: 'Nashik', path: '/search?q=Nashik', type: 'destination' },
//       { label: 'Rajasthan Tours', path: '/domestic/rajasthan', type: 'destination' },
//       { label: 'Kerala Holidays', path: '/domestic/kerala', type: 'destination' },
//       { label: 'Coorg Ooty Tours', path: '/domestic/coorg-ooty', type: 'destination' },
//       { label: 'Coorg', path: '/domestic/coorg-ooty', type: 'destination' },
//       { label: 'Ooty', path: '/domestic/coorg-ooty', type: 'destination' },
//       { label: 'Wayanad', path: '/domestic/coorg-ooty', type: 'destination' },
//       { label: 'Honeymoon Packages', path: '/romantic-honeymoon', type: 'category' },
//       { label: 'Anniversary Packages', path: '/celebration-packages/anniversary', type: 'category' },
//       { label: 'Birthday Packages', path: '/celebration-packages/birthday', type: 'category' },
//       { label: 'Festival Packages', path: '/celebration-packages/festival', type: 'category' },
//     ].filter((item) => item.label.toLowerCase().includes(normalizedQuery));

//     const packageSuggestions = [...allPackages, ...fallbackPackages]
//       .filter((pkg) => {
//         return getSearchableValues(pkg).some((value) => String(value).toLowerCase().includes(normalizedQuery));
//       })
//       .slice(0, 6)
//       .map((pkg) => ({
//         label: pkg.name,
//         path: pkg.path || `/search?q=${encodeURIComponent(pkg.name)}`,
//         type: 'package',
//       }));

//     setSuggestions([...staticSuggestions, ...packageSuggestions].slice(0, 8));
//   }, [allPackages, searchQuery]);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate('/');
//     } catch (error) {
//       console.error('Failed to log out', error);
//     }
//   };

//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     const trimmedQuery = searchQuery.trim();
//     if (trimmedQuery) {
//       navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
//       setSearchQuery('');
//       setSuggestions([]);
//       setIsMenuOpen(false);
//     }
//   };

//   const handleSuggestionSelect = (suggestion) => {
//     setSearchQuery(suggestion.label);
//     setSuggestions([]);
//     navigate(suggestion.path);
//     setIsMenuOpen(false);
//   };

//   const getSubItemPath = (parent, item) => {
//     if (parent === "Romantic Honeymoon") return `/romantic-honeymoon/${item.toLowerCase().replace(" ", "-")}`;
//     if (parent === "Celebration Packages") return `/celebration-packages/${item.toLowerCase().replace(" ", "-")}`;
//     if (parent === "Bachelor Holidays") return `/bachelor-holidays`;
//     if (parent === "Family Holidays") return `/family-holidays`;
//     if (parent === "Cab Booking") return `/cab-booking`;
//     if (parent === "Hotel Booking") return `/hotel-booking`;
//     if (parent === "World Trips") return `/world-trips`;
//     if (parent === "Promotional Packages") return `/promotional-packages`;
//     if (parent === "Contact Us") return `/contact-us`;
//     if (parent === "International Tours") return `/international-tours`;
//     if (parent === "International Holidays") return `/international-holidays`;
//     if (parent === "Domestic Holidays") {
//       if (item === "Maharashtra Holidays") return `/domestic/maharashtra`;
//       if (item === "Rajasthan Tours") return `/domestic/rajasthan`;
//       if (item === "Kerala Holidays") return `/domestic/kerala`;
//       if (item === "Coorg Ooty Tours") return `/domestic/coorg-ooty`;
//       return `/domestic-holidays`;
//     }
//     return "#";
//   };

//   const navItems = [
//     { title: 'Promotional Packages' },
//     { title: 'Cab Booking' },
//     { title: 'Hotel Booking' },
//     { title: 'World Trips' },
//     { title: 'Domestic Holidays', subItems: ['Maharashtra Holidays', 'Rajasthan Tours', 'Kerala Holidays', 'Coorg Ooty Tours'] },
//     { title: 'International Holidays' },

//     // { title: 'Romantic Honeymoon', subItems: ['Domestic', 'International'] },
//     // { title: 'Celebration Packages', subItems: ['Anniversary', 'Birthday', 'Festival'] },
//     // { title: 'Bachelor Holidays' },
//     // { title: 'Family Holidays' },
//   ];

//   return (
//     <header className="sticky top-0 z-50 border-b border-[#5a2f16]/30 bg-[#5a2f16] shadow-[0_10px_25px_rgba(90,47,22,0.25)]">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* TOP ROW: Logo + Search + Profile (logo now sits ABOVE the nav bar) */}
//         <div className="flex items-center justify-between gap-4 py-3">
//           <div className="flex-shrink-0 rounded-full bg-transparent p-1">
//             <Link to="/" className="flex items-center">
//               <img
//                 src="/images/logo.png"
//                 alt="Travelog Holidays"
//                 className="h-12 w-auto object-contain sm:h-14 lg:h-16"
//               />
//             </Link>
//           </div>

//           {/* Search bar - Veena World style, hidden on small screens (shown in mobile menu instead) */}
//           <div className="hidden md:flex flex-1 max-w-xl relative">
//             <form
//               onSubmit={handleSearchSubmit}
//               className="flex w-full items-center rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-inner"
//             >
//               <Search className="h-4 w-4 text-[#5a2f16]/70 flex-shrink-0" />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder='Search "Gulmarg"'
//                 className="ml-2 w-full bg-transparent text-sm text-[#5a2f16] placeholder-[#5a2f16]/50 focus:outline-none"
//               />
//             </form>

//             {suggestions.length > 0 && (
//               <div className="absolute left-0 right-0 top-full z-[60] mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl">
//                 {suggestions.map((suggestion, index) => (
//                   <button
//                     key={`${suggestion.label}-${index}`}
//                     type="button"
//                     onMouseDown={() => handleSuggestionSelect(suggestion)}
//                     className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-orange-50 hover:text-[#a34f12]"
//                   >
//                     <span>{suggestion.label}</span>
//                     <span className="text-xs uppercase tracking-wide text-slate-400">
//                       {suggestion.type}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="hidden lg:flex flex-shrink-0 items-center" style={{ minWidth: '128px' }}>
//             {currentUser && (
//               <div className="relative" ref={profileRef}>
//                 <button
//                   onClick={() => setIsProfileOpen(!isProfileOpen)}
//                   className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm backdrop-blur transition hover:bg-white/20 focus:outline-none"
//                 >
//                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
//                     <User className="h-4 w-4" />
//                   </div>
//                   <span className="hidden md:inline">
//                     {currentUser.displayName || currentUser.email?.split('@')[0]}
//                   </span>
//                   <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
//                 </button>

//                 {isProfileOpen && (
//                   <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl bg-white py-1 shadow-lg">
//                     <div className="border-b px-4 py-2 text-sm text-gray-700">
//                       <p className="truncate font-medium">{currentUser.displayName || 'User'}</p>
//                       <p className="truncate text-xs text-gray-500">{currentUser.email}</p>
//                     </div>
//                     {isAdmin && (
//                       <Link
//                         to="/admin"
//                         className="flex items-center px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
//                         onClick={() => setIsProfileOpen(false)}
//                       >
//                         <Settings className="mr-2 h-4 w-4" />
//                         Admin Dashboard
//                       </Link>
//                     )}
//                     <button
//                       onClick={handleLogout}
//                       className="flex w-full items-center px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
//                     >
//                       <LogOut className="mr-2 h-4 w-4" />
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>

//           {/* Mobile hamburger */}
//           <div className="lg:hidden">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="p-2 rounded-lg text-white/90 hover:bg-white/10 focus:outline-none"
//             >
//               {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
//             </button>
//           </div>
//         </div>

//         {/* NAV ROW: sits below the logo/search row */}
//         <nav className="hidden lg:flex items-center justify-center pb-3">
//           <div className="flex items-center gap-2 rounded-full border border-amber-100/20 bg-white/10 p-2 shadow-inner backdrop-blur-md">
//             <Link
//               to="/"
//               className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#f4b26d] hover:to-[#a34f12] hover:text-white hover:shadow-lg"
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//               </svg>
//               <span>Home</span>
//             </Link>

//             {navItems.map((item, index) => (
//               <div key={index} className="group relative">
//                 {(item.title === 'Romantic Honeymoon' || item.title === 'Celebration Packages' || item.title === 'Bookings') ? (
//                   <div
//                     className="flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#f4b26d] hover:to-[#a34f12] hover:text-white hover:shadow-lg cursor-pointer"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     {item.title}
//                     {item.subItems && (
//                       <svg className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={getSubItemPath(item.title, item.title)}
//                     className="flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#f4b26d] hover:to-[#a34f12] hover:text-white hover:shadow-lg"
//                   >
//                     {item.title}
//                     {item.subItems && (
//                       <svg className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     )}
//                   </Link>
//                 )}
//                 {item.subItems && (
//                   <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-2xl opacity-0 invisible transition-all duration-300 group-hover:visible group-hover:opacity-100">
//                     {item.subItems.map((subItem, subIndex) => (
//                       <Link
//                         key={subIndex}
//                         to={getSubItemPath(item.title, subItem)}
//                         className="block px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-orange-50 hover:text-[#a34f12]"
//                       >
//                         {subItem}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </nav>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-3 shadow-xl backdrop-blur lg:hidden">
//             {/* Mobile search bar */}
//             <div className="relative mb-3">
//               <form
//                 onSubmit={handleSearchSubmit}
//                 className="flex items-center rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-inner"
//               >
//                 <Search className="h-4 w-4 text-[#5a2f16]/70 flex-shrink-0" />
//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   placeholder='Search "Gulmarg"'
//                   className="ml-2 w-full bg-transparent text-sm text-[#5a2f16] placeholder-[#5a2f16]/50 focus:outline-none"
//                 />
//               </form>

//               {suggestions.length > 0 && (
//                 <div className="absolute left-0 right-0 top-full z-[60] mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl">
//                   {suggestions.map((suggestion, index) => (
//                     <button
//                       key={`${suggestion.label}-${index}`}
//                       type="button"
//                       onMouseDown={() => handleSuggestionSelect(suggestion)}
//                       className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-orange-50 hover:text-[#a34f12]"
//                     >
//                       <span>{suggestion.label}</span>
//                       <span className="text-xs uppercase tracking-wide text-slate-400">
//                         {suggestion.type}
//                       </span>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             <Link
//               to="/"
//               className="mb-2 flex items-center gap-2 rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
//               onClick={() => setIsMenuOpen(false)}
//             >
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
//               </svg>
//               <span className="font-medium">Home</span>
//             </Link>
//             {navItems.map((item, index) => (
//               <div key={index} className="mb-2">
//                 {(item.title === 'Romantic Honeymoon' || item.title === 'Celebration Packages' || item.title === 'Bookings') ? (
//                   <div
//                     className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
//                     onClick={(e) => e.preventDefault()}
//                   >
//                     <span className="font-medium">{item.title}</span>
//                     {item.subItems && (
//                       <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                       </svg>
//                     )}
//                   </div>
//                 ) : (
//                   <Link
//                     to={getSubItemPath(item.title, item.title)}
//                     className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <span className="font-medium">{item.title}</span>
//                   </Link>
//                 )}
//                 {item.subItems && (
//                   <div className="ml-4 mt-1 space-y-1">
//                     {item.subItems.map((subItem, subIndex) => (
//                       <Link
//                         key={subIndex}
//                         to={getSubItemPath(item.title, subItem)}
//                         className="block rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {subItem}
//                       </Link>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Mobile profile/logout */}
//             {currentUser && (
//               <div className="mt-2 border-t border-white/10 pt-2">
//                 <div className="px-2 py-2 text-sm text-white/70">
//                   <p className="truncate font-medium text-white">{currentUser.displayName || 'User'}</p>
//                   <p className="truncate text-xs">{currentUser.email}</p>
//                 </div>
//                 {isAdmin && (
//                   <Link
//                     to="/admin"
//                     className="flex items-center rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
//                     onClick={() => setIsMenuOpen(false)}
//                   >
//                     <Settings className="mr-2 h-4 w-4" />
//                     Admin Dashboard
//                   </Link>
//                 )}
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsMenuOpen(false);
//                   }}
//                   className="flex w-full items-center rounded-lg px-2 py-3 text-red-400 transition-colors hover:bg-white/10"
//                 >
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Logout
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, ChevronDown, Settings, Search } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../../firebase';
import { TOURS } from '../pages/domestic/maharashtra/Toursdata';

const getDurationDays = (pkg) => {
  if (typeof pkg?.duration?.days === 'number') return pkg.duration.days;
  if (typeof pkg?.duration?.days === 'string') {
    const parsed = Number.parseInt(pkg.duration.days, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  if (typeof pkg?.duration?.nights === 'number') return pkg.duration.nights + 1;
  if (typeof pkg?.duration === 'string') {
    const match = pkg.duration.match(/(\d+)\s*days?/i);
    if (match) return Number(match[1]);
  }
  return 9999;
};

const getSearchableValues = (pkg) => {
  const itineraryText = Array.isArray(pkg?.itinerary)
    ? pkg.itinerary.flatMap((day) => [day?.title, day?.description, day?.hotel])
    : [];

  return [
    pkg?.name,
    pkg?.description,
    pkg?.category,
    pkg?.type,
    pkg?.destination,
    pkg?.location,
    pkg?.place,
    pkg?.slug,
    ...itineraryText,
  ].filter(Boolean);
};

const fallbackPackages = TOURS.map((tour) => ({
  id: tour.id,
  name: tour.title,
  description: tour.tagline,
  category: 'domestic',
  type: 'tour',
  destination: tour.region,
  location: tour.region,
  place: tour.region,
  slug: tour.id,
  duration: { days: getDurationDays({ duration: tour.duration }), nights: getDurationDays({ duration: tour.duration }) - 1 },
  itinerary: Array.isArray(tour.itinerary)
    ? tour.itinerary.map((day) => ({
        title: day?.title,
        description: day?.body,
        hotel: day?.highlights?.[0]?.text || '',
      }))
    : [],
  images: Array.isArray(tour.images) ? tour.images.map((image) => image.src) : [],
  path: '/domestic/maharashtra',
}));

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [allPackages, setAllPackages] = useState([]);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const { currentUser, userRole, logout } = useAuth();
  const isAdmin = userRole === 'admin';

  useEffect(() => {
    async function loadPackages() {
      try {
        const snapshot = await getDocs(collection(db, 'packages'));
        setAllPackages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error('Failed to load packages for search suggestions', error);
      }
    }

    loadPackages();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      setSuggestions([]);
      return;
    }

    const staticSuggestions = [
      { label: 'Maharashtra', path: '/domestic/maharashtra', type: 'destination' },
      { label: 'Maharashtra Tours', path: '/domestic/maharashtra', type: 'destination' },
      { label: 'Nashik', path: '/search?q=Nashik', type: 'destination' },
      { label: 'Rajasthan Tours', path: '/domestic/rajasthan', type: 'destination' },
      { label: 'Kerala Holidays', path: '/domestic/kerala', type: 'destination' },
      { label: 'Coorg Ooty Tours', path: '/domestic/coorg-ooty', type: 'destination' },
      { label: 'Coorg', path: '/domestic/coorg-ooty', type: 'destination' },
      { label: 'Ooty', path: '/domestic/coorg-ooty', type: 'destination' },
      { label: 'Wayanad', path: '/domestic/coorg-ooty', type: 'destination' },
      { label: 'Tamil Nadu Tours', path: '/domestic/tamilnadu', type: 'destination' },
      { label: 'Madurai', path: '/domestic/tamilnadu', type: 'destination' },
      { label: 'Mahabalipuram', path: '/domestic/tamilnadu', type: 'destination' },
      { label: 'Pondicherry', path: '/domestic/tamilnadu', type: 'destination' },
      { label: 'Kanchipuram', path: '/domestic/tamilnadu', type: 'destination' },
      { label: 'Karnataka Tours', path: '/domestic/karnataka', type: 'destination' },
      { label: 'Hampi', path: '/domestic/karnataka', type: 'destination' },
      { label: 'Gokarna', path: '/domestic/karnataka', type: 'destination' },
      { label: 'Murdeshwar', path: '/domestic/karnataka', type: 'destination' },
      { label: 'Honeymoon Packages', path: '/romantic-honeymoon', type: 'category' },
      { label: 'Anniversary Packages', path: '/celebration-packages/anniversary', type: 'category' },
      { label: 'Birthday Packages', path: '/celebration-packages/birthday', type: 'category' },
      { label: 'Festival Packages', path: '/celebration-packages/festival', type: 'category' },
    ].filter((item) => item.label.toLowerCase().includes(normalizedQuery));

    const packageSuggestions = [...allPackages, ...fallbackPackages]
      .filter((pkg) => {
        return getSearchableValues(pkg).some((value) => String(value).toLowerCase().includes(normalizedQuery));
      })
      .slice(0, 6)
      .map((pkg) => ({
        label: pkg.name,
        path: pkg.path || `/search?q=${encodeURIComponent(pkg.name)}`,
        type: 'package',
      }));

    setSuggestions([...staticSuggestions, ...packageSuggestions].slice(0, 8));
  }, [allPackages, searchQuery]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchQuery('');
      setSuggestions([]);
      setIsMenuOpen(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion.label);
    setSuggestions([]);
    navigate(suggestion.path);
    setIsMenuOpen(false);
  };

  const getSubItemPath = (parent, item) => {
    if (parent === "Romantic Honeymoon") return `/romantic-honeymoon/${item.toLowerCase().replace(" ", "-")}`;
    if (parent === "Celebration Packages") return `/celebration-packages/${item.toLowerCase().replace(" ", "-")}`;
    if (parent === "Bachelor Holidays") return `/bachelor-holidays`;
    if (parent === "Family Holidays") return `/family-holidays`;
    if (parent === "Cab Booking") return `/cab-booking`;
    if (parent === "Hotel Booking") return `/hotel-booking`;
    if (parent === "World Trips") return `/world-trips`;
    if (parent === "Promotional Packages") return `/promotional-packages`;
    if (parent === "Contact Us") return `/contact-us`;
    if (parent === "International Tours") return `/international-tours`;
    if (parent === "International Holidays") return `/international-holidays`;
    if (parent === "Domestic Holidays") {
      if (item === "Maharashtra Holidays") return `/domestic/maharashtra`;
      if (item === "Rajasthan Tours") return `/domestic/rajasthan`;
      if (item === "Kerala Holidays") return `/domestic/kerala`;
      if (item === "Coorg Ooty Tours") return `/domestic/coorg-ooty`;
      if (item === "Tamil Nadu Tours") return `/domestic/tamilnadu`;
      if (item === "Karnataka Tours") return `/domestic/karnataka`;
      return `/domestic-holidays`;
    }
    return "#";
  };

  const navItems = [
    { title: 'Promotional Packages' },
    { title: 'Cab Booking' },
    { title: 'Hotel Booking' },
    { title: 'World Trips' },
    { title: 'Domestic Holidays', subItems: ['Maharashtra Holidays', 'Rajasthan Tours', 'Kerala Holidays', 'Coorg Ooty Tours', 'Tamil Nadu Tours', 'Karnataka Tours'] },
    { title: 'International Holidays' },

    // { title: 'Romantic Honeymoon', subItems: ['Domestic', 'International'] },
    // { title: 'Celebration Packages', subItems: ['Anniversary', 'Birthday', 'Festival'] },
    // { title: 'Bachelor Holidays' },
    // { title: 'Family Holidays' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-[#5a2f16]/30 bg-[#5a2f16] shadow-[0_10px_25px_rgba(90,47,22,0.25)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* TOP ROW: Logo + Search + Profile (logo now sits ABOVE the nav bar) */}
        <div className="flex items-center justify-between gap-4 py-3">
          <div className="flex-shrink-0 rounded-full bg-transparent p-1">
            <Link to="/" className="flex items-center">
              <img
                src="/images/logo.png"
                alt="Travelog Holidays"
                className="h-12 w-auto object-contain sm:h-14 lg:h-16"
              />
            </Link>
          </div>

          {/* Search bar - Veena World style, hidden on small screens (shown in mobile menu instead) */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
            <form
              onSubmit={handleSearchSubmit}
              className="flex w-full items-center rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-inner"
            >
              <Search className="h-4 w-4 text-[#5a2f16]/70 flex-shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search "Gulmarg"'
                className="ml-2 w-full bg-transparent text-sm text-[#5a2f16] placeholder-[#5a2f16]/50 focus:outline-none"
              />
            </form>

            {suggestions.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-[60] mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={`${suggestion.label}-${index}`}
                    type="button"
                    onMouseDown={() => handleSuggestionSelect(suggestion)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-orange-50 hover:text-[#a34f12]"
                  >
                    <span>{suggestion.label}</span>
                    <span className="text-xs uppercase tracking-wide text-slate-400">
                      {suggestion.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="hidden lg:flex flex-shrink-0 items-center" style={{ minWidth: '128px' }}>
            {currentUser && (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-sm backdrop-blur transition hover:bg-white/20 focus:outline-none"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                    <User className="h-4 w-4" />
                  </div>
                  <span className="hidden md:inline">
                    {currentUser.displayName || currentUser.email?.split('@')[0]}
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 z-50 mt-2 w-48 rounded-xl bg-white py-1 shadow-lg">
                    <div className="border-b px-4 py-2 text-sm text-gray-700">
                      <p className="truncate font-medium">{currentUser.displayName || 'User'}</p>
                      <p className="truncate text-xs text-gray-500">{currentUser.email}</p>
                    </div>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg text-white/90 hover:bg-white/10 focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* NAV ROW: sits below the logo/search row */}
        <nav className="hidden lg:flex items-center justify-center pb-3">
          <div className="flex items-center gap-2 rounded-full border border-amber-100/20 bg-white/10 p-2 shadow-inner backdrop-blur-md">
            <Link
              to="/"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#f4b26d] hover:to-[#a34f12] hover:text-white hover:shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span>Home</span>
            </Link>

            {navItems.map((item, index) => (
              <div key={index} className="group relative">
                {(item.title === 'Romantic Honeymoon' || item.title === 'Celebration Packages' || item.title === 'Bookings') ? (
                  <div
                    className="flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#f4b26d] hover:to-[#a34f12] hover:text-white hover:shadow-lg cursor-pointer"
                    onClick={(e) => e.preventDefault()}
                  >
                    {item.title}
                    {item.subItems && (
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                ) : (
                  <Link
                    to={getSubItemPath(item.title, item.title)}
                    className="flex items-center rounded-full px-4 py-2 text-sm font-semibold text-white/90 transition-all duration-300 hover:bg-gradient-to-r hover:from-[#f4b26d] hover:to-[#a34f12] hover:text-white hover:shadow-lg"
                  >
                    {item.title}
                    {item.subItems && (
                      <svg className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                )}
                {item.subItems && (
                  <div className="absolute left-0 mt-2 w-56 rounded-2xl border border-slate-200 bg-white py-2 shadow-2xl opacity-0 invisible transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={getSubItemPath(item.title, subItem)}
                        className="block px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-orange-50 hover:text-[#a34f12]"
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mb-4 rounded-2xl border border-white/10 bg-slate-950/95 px-3 py-3 shadow-xl backdrop-blur lg:hidden">
            {/* Mobile search bar */}
            <div className="relative mb-3">
              <form
                onSubmit={handleSearchSubmit}
                className="flex items-center rounded-full border border-white/20 bg-white/95 px-4 py-2 shadow-inner"
              >
                <Search className="h-4 w-4 text-[#5a2f16]/70 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Search "Gulmarg"'
                  className="ml-2 w-full bg-transparent text-sm text-[#5a2f16] placeholder-[#5a2f16]/50 focus:outline-none"
                />
              </form>

              {suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full z-[60] mt-2 rounded-2xl border border-slate-200 bg-white shadow-xl">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={`${suggestion.label}-${index}`}
                      type="button"
                      onMouseDown={() => handleSuggestionSelect(suggestion)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-orange-50 hover:text-[#a34f12]"
                    >
                      <span>{suggestion.label}</span>
                      <span className="text-xs uppercase tracking-wide text-slate-400">
                        {suggestion.type}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/"
              className="mb-2 flex items-center gap-2 rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              <span className="font-medium">Home</span>
            </Link>
            {navItems.map((item, index) => (
              <div key={index} className="mb-2">
                {(item.title === 'Romantic Honeymoon' || item.title === 'Celebration Packages' || item.title === 'Bookings') ? (
                  <div
                    className="flex w-full cursor-pointer items-center justify-between rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="font-medium">{item.title}</span>
                    {item.subItems && (
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </div>
                ) : (
                  <Link
                    to={getSubItemPath(item.title, item.title)}
                    className="flex w-full items-center justify-between rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium">{item.title}</span>
                  </Link>
                )}
                {item.subItems && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={getSubItemPath(item.title, subItem)}
                        className="block rounded-lg px-3 py-2 text-slate-300 transition-colors hover:bg-white/10 hover:text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile profile/logout */}
            {currentUser && (
              <div className="mt-2 border-t border-white/10 pt-2">
                <div className="px-2 py-2 text-sm text-white/70">
                  <p className="truncate font-medium text-white">{currentUser.displayName || 'User'}</p>
                  <p className="truncate text-xs">{currentUser.email}</p>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center rounded-lg px-2 py-3 text-white transition-colors hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center rounded-lg px-2 py-3 text-red-400 transition-colors hover:bg-white/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;