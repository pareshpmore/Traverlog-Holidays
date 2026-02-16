import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';
import { formatPrice, formatDuration } from '../utils/formatters';
import ImageCarousel from '../components/ImageCarousel';
import FormattedList from '../components/FormattedList';

// 🔹 Business Contact Details
const BUSINESS_WHATSAPP = "919922514719"; 
// Use country code without + (India example: 91xxxxxxxxxx)

const BUSINESS_EMAIL = "paresh@travelogholiday.com";

const PackageDetail = () => {
  const { slug } = useParams();
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('itinerary');
  const observer = useRef(null);
  const isScrolling = useRef(false);

  // Handle navigation clicks with accordion control
  const scrollToSection = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      isScrolling.current = true;
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      // Update active section
      setActiveSection(sectionId);

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });

      // Reset the scrolling flag after scroll completes
      setTimeout(() => {
        isScrolling.current = false;
      }, 1000);
    }
  }, []);

  // Set up intersection observer for section highlighting and accordion state
  useEffect(() => {
    const handleIntersection = (entries) => {
      if (isScrolling.current) return;
      
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId) {
            setActiveSection(sectionId);
            // Update active section
          }
        }
      });
    };

    // Initialize Intersection Observer
    observer.current = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0.1
    });

    // Observe all sections
    const sections = ['itinerary', 'cost', 'inclusions', 'exclusions', 'cancellation', 'terms'];
    sections.forEach(section => {
      const element = document.getElementById(section);
      if (element) {
        observer.current.observe(element);
      }
    });

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [packageData]);

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);

    let unsubscribe;

    try {
      // Query for the package with the matching slug
      const packagesRef = collection(db, 'packages');
      const q = query(
        packagesRef, 
        where('slug', '==', slug), 
        limit(1)
      );
      
      // Set up real-time listener
      unsubscribe = onSnapshot(
        q, 
        (querySnapshot) => {
          if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            if (!doc.exists()) {
              setError('Package not found');
              setLoading(false);
              return;
            }

            const data = doc.data();
            // Ensure all array fields are properly initialized
            const formattedData = {
              id: doc.id,
              name: data.name || '',
              slug: data.slug || '',
              type: data.type || 'domestic',
              duration: data.duration || { days: 1, nights: 0 },
              price: data.price || 0,
              description: data.description || '',
              images: Array.isArray(data.images) ? data.images : [],
              galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
              inclusions: Array.isArray(data.inclusions) ? data.inclusions : [],
              exclusions: Array.isArray(data.exclusions) ? data.exclusions : [],
              termsAndConditions: Array.isArray(data.termsAndConditions) ? data.termsAndConditions : [],
              cancellationPolicy: Array.isArray(data.cancellationPolicy) ? data.cancellationPolicy : [],
              rating: typeof data.rating === 'number' ? data.rating : 4.5,
              reviewsCount: typeof data.reviewsCount === 'number' ? data.reviewsCount : 0,
              costSection: data.costSection?.enabled ? {
  enabled: true,
  title: data.costSection.title || '',
  note: data.costSection.note || '',
  table: {
    columns: Array.isArray(data.costSection.table?.columns)
      ? data.costSection.table.columns
      : [],
    rows: Array.isArray(data.costSection.table?.rows)
      ? data.costSection.table.rows
      : []
  }
} : null,

              itinerary: Array.isArray(data.itinerary) 
                ? data.itinerary.map(day => ({
                    day: day.day || 1,
                    title: day.title || `Day ${day.day || 1}`,
                    description: day.description || '',
                    meals: day.meals || '',
                    hotel: day.hotel || ''
                  }))
                : []
            };
            
            setPackageData(formattedData);
            setError(null);
          } else {
            setError('Package not found');
          }
          setLoading(false);
        },
        (err) => {
          console.error('Error in package snapshot:', err);
          setError('Failed to load package details');
          setLoading(false);
          toast.error('Failed to load package details');
        }
      );
    } catch (err) {
      console.error('Error setting up listener:', err);
      setError('Error setting up real-time updates');
      setLoading(false);
      toast.error('Error setting up package details');
    }

    // Clean up subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [slug]);

  // Add this effect to handle initial scroll position and URL hash
  useEffect(() => {
    // Check if there's a hash in the URL and scroll to it
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash) {
        const element = document.getElementById(hash);
        if (element) {
          // Small delay to ensure the page is fully rendered
          setTimeout(() => {
            scrollToSection(hash);
          }, 100);
        }
      }
    };

    // Handle initial page load with hash
    handleHashChange();

    // Handle hash changes after initial load
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [scrollToSection]);

  // Update URL hash when active section changes
  useEffect(() => {
    if (activeSection && !isScrolling.current) {
      window.history.replaceState(null, '', `#${activeSection}`);
    }
  }, [activeSection]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !packageData) {
    return (
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-lg text-gray-700">{error || 'Package not found'}</p>
        <button 
          onClick={() => window.history.back()}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const { 
    name, 
    duration, 
    price, 
    description, 
    images, 
    itinerary, 
    termsAndConditions = [], 
    cancellationPolicy = [],
    inclusions = [],
    exclusions = []
  } = packageData;

  // Navigation tabs data
  const navTabs = [
  { id: 'itinerary', label: 'Tour Itinerary' },
  { id: 'cost', label: 'Cost' },
  { id: 'inclusions', label: 'Inclusion' },
  { id: 'exclusions', label: 'Exclusion' },
  { id: 'cancellation', label: 'Cancellation Policy' },
  { id: 'terms', label: 'Terms & Condition' },
];



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Navigation Bar - Outside max-width container */}
      <div className="sticky top-0 z-50 bg-blue-50 shadow-sm w-full">
        <div className="flex justify-center overflow-x-auto hide-scrollbar">
          <div className="flex space-x-1 py-3 px-4 max-w-[1200px] w-full justify-center">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`px-5 py-2 text-lg whitespace-nowrap transition-colors duration-200 rounded-md ${
                  activeSection === tab.id
                    ? 'text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 border-b-2 border-blue-400'
                    : 'text-blue-700 hover:bg-blue-100 font-medium'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4">

        <div className="py-8">
          {/* Main content container */}
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Content */}
            <div className="w-full lg:w-2/3">
              {/* Hero Image Carousel */}
              <div className="w-full rounded-xl overflow-hidden h-[420px] bg-gray-100">
                <ImageCarousel 
                  images={images || []} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Tour Overview */}
              <div className="mt-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Tour Overview</h2>
                <div className="prose max-w-none text-gray-700 leading-relaxed space-y-4">
                  {description.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

            </div>
            
            {/* Right Column - Sticky Booking Card */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-4">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{name}</h1>
                
                {/* Rest of the code remains the same */}
                {/* Rating and Reviews */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => {
                      const rating = packageData.rating || 4.5;
                      const starClass = i < Math.floor(rating) 
                        ? 'text-yellow-400' 
                        : i < Math.ceil(rating) 
                          ? 'text-yellow-400 opacity-70' 
                          : 'text-gray-300';
                      return (
                        <svg 
                          key={i}
                          className={`w-4 h-4 ${starClass} mr-0.5`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      );
                    })}
                    <span className="ml-1 text-sm font-medium text-gray-700">
                      {packageData.rating?.toFixed(1) || '4.5'}
                    </span>
                  </div>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-sm text-gray-600">
                    {packageData.reviewsCount || 10} {packageData.reviewsCount === 1 ? 'review' : 'reviews'}
                  </span>
                </div>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <svg className="w-4 h-4 mr-1.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">{formatDuration(duration)}</span>
                </div>

                <div className="mb-6">
                  <div className="text-3xl font-bold text-blue-600">{formatPrice(price)}</div>
                  <div className="text-gray-500 text-sm">per person</div>
                </div>

                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 mb-4">
                  Book Now
                </button>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button 
                    onClick={() => {
                      const message = `Hello Travelong Holiday Team,

                        I am interested in the following package:

                        📦 Package: ${name}
                        ⏳ Duration: ${formatDuration(duration)}
                        💰 Price: ${formatPrice(price)} per person

                        Kindly share complete details and availability.

                        Package Link:
                        ${window.location.href}

                        Thank you.`;

                          const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP}?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                    }}

                    className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    title="Enquire on WhatsApp"
                  >
                    <div className="w-6 h-6 bg-green-50 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.498 14.382v3.3c0 .66.36.83 1.01.47 4.5-2.5 4.5-8.32 4.5-8.32 0-.34-.18-.5-.5-.5h-1.2c-.3 0-.6.17-.8.37-.5.5-1.17 1.2-1.27 1.3-.1.1-.3.2-.5.1-.2 0-.5-.1-.8-.3-.3-.2-.6-.4-1-.5-.2-.1-.3-.3-.3-.5v-1.4c0-.5-.5-1-1-1s-1 .5-1 1v.3c0 .3-.1.5-.3.6-.2.1-.4.2-.6.3-.4.2-.7.4-1 .8-.1.1-.2.3-.1.5.1.2.1.4.2.5.1.2.3.4.4.5.1.1.3.3.4.4.1.1.2.3.3.5.1.2 0 .4-.1.5-.1.1-.2.2-.3.3-.1.1-.2.2-.3.4-.2.2-.4.3-.6.5-.2.1-.4.3-.3.6v1.4c0 .4.2.6.5.6.3 0 .6-.1.8-.3.2-.2.5-.4.7-.6.3-.2.7-.4 1.1-.5.2-.1.4 0 .6.1.2.1.3.3.4.5.2.3.5.6.8.9.5.5 1 1 1.5 1.3.2.1.4.3.6.3.2 0 .4-.1.5-.3.1-.2.2-.3.3-.4.1-.1.2-.2.3-.3.1-.1.3-.2.3-.4.1-.2 0-.4-.1-.5z"/>
                        <path d="M12 2C6.5 2 2 6.5 2 12c0 2.2.7 4.2 1.9 5.8l-1.5 4.4 4.5-1.5c1.6 1.2 3.5 1.8 5.6 1.8 6.5 0 11.5-5.2 11.5-11.5S18.5 2 12 2zm0 20c-1.9 0-3.8-.6-5.3-1.6l-.3-.2-3.2.9.9-3.1-.2-.3C3.1 15.8 2.5 14 2.5 12c0-5.2 4.3-9.5 9.5-9.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">Chat</span>
                  </button>

                  <button 
                    onClick={() => {
                      const subject = `Enquiry for ${name} Package`;

                      const body = `Hello Travelong Holiday Team,

                        I would like to enquire about the following package:

                        Package Name: ${name}
                        Duration: ${formatDuration(duration)}
                        Price: ${formatPrice(price)} per person

                        Please share detailed itinerary, inclusions, and availability.

                        Package Link:
                        ${window.location.href}

                        Regards,`;

                          window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                        }}

                        className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                        title="Email Itinerary"
                      >
                        <div className="w-6 h-6 bg-blue-50 rounded-full flex items-center justify-center mb-1">
                          <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="text-xs text-gray-600">Email</span>
                      </button>

                      <button 
                        onClick={async () => {
                          const shareData = {
                            title: name,
                            text: `Check out this amazing package: ${name}`,
                            url: window.location.href,
                          };
                          
                          try {
                            if (navigator.share) {
                              await navigator.share(shareData);
                            } else {
                              await navigator.clipboard.writeText(window.location.href);
                              toast.success('Link copied to clipboard!');
                            }
                          } catch (err) {
                            console.error('Error sharing:', err);
                            toast.error('Failed to share. Please try again.');
                          }
                        }}
                    className="flex flex-col items-center justify-center p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    title="Share"
                  >
                    <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mb-1">
                      <svg className="w-3 h-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <span className="text-xs text-gray-600">Share</span>
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="font-semibold text-gray-800 mb-3">What's Included</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Accommodation</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Meals as per itinerary</span>
                    </li>
                    <li className="flex items-center text-gray-600">
                      <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>All transfers & sightseeing</span>
                    </li>
                  </ul>
                </div>

                {/* Cost Section - Only render if enabled and has valid data */}
                {packageData.costSection?.enabled && 
                 Array.isArray(packageData.costSection.columns) && 
                 packageData.costSection.columns.length > 0 &&
                 Array.isArray(packageData.costSection.rows) && 
                 packageData.costSection.rows.length > 0 && (
                  <div className="mt-6 border-t border-gray-200 pt-4">
                    <h3 className="font-semibold text-gray-800 mb-3">Cost Breakdown</h3>
                    <div className="overflow-x-auto -mx-2 sm:mx-0">
                      <div className="inline-block min-w-full align-middle">
                        <div className="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                {packageData.costSection.columns.map((column, index) => (
                                  <th 
                                    key={index}
                                    className={`px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap ${
                                      index === 0 ? 'text-left' : 'text-right'
                                    }`}
                                  >
                                    {column || ''}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {packageData.costSection.rows.map((row, rowIndex) => {
                                // Skip if row is not an object or doesn't have values array
                                if (!row || !Array.isArray(row.values)) return null;
                                
                                return (
                                  <tr 
                                    key={rowIndex}
                                    className={row.highlight ? 'bg-blue-50 font-medium' : 'hover:bg-gray-50'}
                                  >
                                    <td className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap">
                                      {row.label || ''}
                                    </td>
                                    {row.values.map((value, valueIndex) => (
                                      <td 
                                        key={valueIndex}
                                        className="px-3 py-2 text-sm text-gray-900 whitespace-nowrap text-right"
                                      >
                                        {value ?? ''}
                                      </td>
                                    ))}
                                    {/* Fill in any missing cells if values array is shorter than columns */}
                                    {Array(Math.max(0, packageData.costSection.columns.length - 1 - (row.values?.length || 0))).fill().map((_, i) => (
                                      <td 
                                        key={`empty-${i}`}
                                        className="px-3 py-2 text-sm text-gray-400 whitespace-nowrap text-right"
                                      >
                                        -
                                      </td>
                                    ))}
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    {packageData.costSection.note && (
                      <p className="mt-2 text-xs text-gray-500 italic break-words">
                        {packageData.costSection.note}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div id="itinerary" className="mt-12 pt-4 -mt-4 px-4">
        <div className="max-w-[1000px] mx-auto px-4 w-full"></div>
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
            <h2 className="text-2xl font-bold text-white">Tour Itinerary</h2>
            <p className="text-blue-100 text-sm mt-1 flex items-center">
              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {itinerary && itinerary.length} {itinerary.length === 1 ? 'Day' : 'Days'} • {formatDuration(duration)}
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {itinerary && itinerary.length > 0 ? (
              itinerary.map((day, index) => (
                <div key={index} className="relative px-8 py-6 hover:bg-gray-50 transition-colors duration-200 group">
                  {/* Day Badge */}
                  <div className="absolute -left-2 top-6 w-4 h-4 bg-blue-600 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                  
                  <div className="flex flex-col md:flex-row">
                    {/* Day Number */}
                    <div className="md:w-1/6 mb-4 md:mb-0">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-700 border-2 border-blue-100">
                        <span className="text-2xl font-bold">{day.day}</span>
                      </div>
                    </div>
                    
                    {/* Day Content */}
                    <div className="md:w-5/6">
                      {/* Day Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                        <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full mr-3">
                          Day {day.day}
                        </span>
                        {day.title}
                      </h3>
                      
                      {/* Description */}
                      <div className="prose max-w-none text-gray-700 mb-4">
                        <FormattedList items={day.description} type="bullet" className="space-y-3" />
                      </div>
                      
                      {/* Details Section */}
                      <div className="space-y-4 mt-4">
                        {/* Meals */}
                        {day.meals && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-start">
                              <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                                <svg className="w-5 h-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">Meals</h4>
                                <p className="text-gray-600 text-sm">{day.meals}</p>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {/* Hotel */}
                        {day.hotel && (
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex items-start">
                              <div className="bg-white p-2 rounded-lg shadow-sm mr-3">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">Stay</h4>
                                <p className="text-gray-600 text-sm">{day.hotel}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Divider (only between items) */}
                  {index < itinerary.length - 1 && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-6 bg-blue-100 rounded-full"></div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-16 px-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 text-blue-100 mb-4">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Itinerary Coming Soon</h3>
                <p className="text-gray-500 max-w-md mx-auto">We're finalizing the perfect itinerary for this tour. Check back soon for detailed day-by-day plans.</p>
              </div>
            )}
          </div>
          
          {/* No CTA Button needed here as we have one in the sticky sidebar */}
        </div>
      </div>
{packageData.costSection?.enabled &&
 packageData.costSection.table.columns.length > 0 &&
 packageData.costSection.table.rows.length > 0 && (

  <div id="cost" className="mt-16 px-4">
    <div className="max-w-[1200px] mx-auto">

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
          <h2 className="text-2xl font-bold text-white">
            {packageData.costSection.title || 'Cost Details'}
          </h2>
          <p className="text-blue-100 text-sm mt-1">
            Transparent pricing breakdown
          </p>
        </div>

        {/* Table */}
        <div className="p-6 overflow-x-auto">

          <table className="min-w-full border-collapse">

            {/* Table Head */}
            <thead>
              <tr className="bg-blue-50">
                {packageData.costSection.table.columns.map(col => (
                  <th
                    key={col.id}
                    className="px-6 py-3 text-left text-sm font-semibold text-blue-800 border-b border-blue-100"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {packageData.costSection.table.rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`
                    transition-colors duration-200
                    ${row.highlight
                      ? 'bg-blue-100 font-semibold text-blue-900'
                      : index % 2 === 0
                        ? 'bg-white'
                        : 'bg-gray-50 hover:bg-blue-50'
                    }
                  `}
                >
                  {packageData.costSection.table.columns.map(col => (
                    <td
                      key={col.id}
                      className="px-6 py-4 text-sm border-b border-gray-100"
                    >
                      {row.cells?.[col.id] || '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>

        </div>

        {/* Note */}
        {packageData.costSection.note && (
          <div className="px-6 pb-6">
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
              <p className="text-sm text-blue-900 italic">
                {packageData.costSection.note}
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  </div>
)}

      {/* Additional Information Accordions */}
      <div className="mt-12 space-y-6">
        {/* Inclusions Section */}
        {inclusions?.length > 0 && (
          <div id="inclusions" className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">What's Included</h3>
            <div className="space-y-2">
              <FormattedList items={inclusions} type="check" />
            </div>
          </div>
        )}

        {/* Exclusions Section */}
        {exclusions?.length > 0 && (
          <div id="exclusions" className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">What's Not Included</h3>
            <div className="space-y-2">
              <FormattedList items={exclusions} type="cross" />
            </div>
          </div>
        )}

        {/* Cancellation Policy Section */}
        {cancellationPolicy?.length > 0 && (
          <div id="cancellation" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Cancellation Policy</h3>
            <div className="space-y-2 pl-5">
              <FormattedList items={cancellationPolicy} type="bullet" />
            </div>
          </div>
        )}

        {/* Terms & Conditions Section */}
        {termsAndConditions?.length > 0 && (
          <div id="terms" className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Terms & Conditions</h3>
            <div className="space-y-2 pl-5">
              <FormattedList items={termsAndConditions} type="bullet" />
            </div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default PackageDetail;
