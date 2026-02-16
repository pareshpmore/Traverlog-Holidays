import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { ArrowLeftIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const CreatePackage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [packageData, setPackageData] = useState({
    name: '',
    slug: '',
    category: 'romantic-honeymoon',
    type: 'domestic',
    duration: {
      days: 1,
      nights: 0
    },
    price: 0,
    description: '',
    images: [''],
    featured: false,
    inclusions: [''],
    exclusions: [''],
    termsAndConditions: [''],
    cancellationPolicy: [''],
    rating: 4.5,
    reviewsCount: 10,
    galleryImages: [''],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      setPackageData(prev => ({
        ...prev,
        [name]: checked
      }));
      return;
    }
    
    // Auto-generate slug from name
    if (name === 'name') {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      setPackageData(prev => ({
        ...prev,
        name: value,
        slug: slug
      }));
      return;
    }

    setPackageData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseFloat(value) : value
    }));
  };

  const handleImageChange = (index, value, field = 'images') => {
    const newItems = [...packageData[field]];
    newItems[index] = value;
    setPackageData(prev => ({
      ...prev,
      [field]: newItems
    }));
  };

  const addItem = (field) => {
    setPackageData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeItem = (index, field) => {
    const newItems = packageData[field].filter((_, i) => i !== index);
    setPackageData(prev => ({
      ...prev,
      [field]: newItems
    }));
  };
  
  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'slug', 'price', 'description'];
    const missingFields = [];

    requiredFields.forEach(field => {
      if (!packageData[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      const fieldNames = missingFields.map(field => 
        field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')
      );
      
      toast.error(`Please fill in all required fields: ${fieldNames.join(', ')}`);
      return false;
    }

    if (!packageData.duration || isNaN(packageData.duration.days) || packageData.duration.days < 1) {
      toast.error('Duration must be at least 1 day');
      return false;
    }

    if (isNaN(packageData.duration.nights) || packageData.duration.nights < 0) {
      toast.error('Number of nights cannot be negative');
      return false;
    }

    if (isNaN(packageData.price) || packageData.price < 0) {
      toast.error('Price must be a positive number');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // Filter out empty values from all arrays
      const filteredImages = packageData.images.filter(url => url.trim() !== '');
      const filteredInclusions = packageData.inclusions.filter(item => item.trim() !== '');
      const filteredExclusions = packageData.exclusions.filter(item => item.trim() !== '');
      const filteredGallery = packageData.galleryImages.filter(url => url.trim() !== '');
      const filteredTerms = packageData.termsAndConditions.filter(term => term.trim() !== '');
      const filteredPolicies = packageData.cancellationPolicy.filter(policy => policy.trim() !== '');
      
      // Create package data with all fields
      const packageToSave = {
        name: packageData.name.trim(),
        slug: packageData.slug.trim(),
        category: packageData.category,
        type: packageData.type,
        duration: {
          days: Number(packageData.duration.days),
          nights: Number(packageData.duration.nights)
        },
        price: Number(packageData.price),
        description: packageData.description.trim(),
        images: filteredImages,
        galleryImages: filteredGallery,
        inclusions: filteredInclusions,
        exclusions: filteredExclusions,
        termsAndConditions: filteredTerms,
        cancellationPolicy: filteredPolicies,
        rating: Number(packageData.rating) || 4.5,
        reviewsCount: Number(packageData.reviewsCount) || 10,
        featured: Boolean(packageData.featured),
        itinerary: [], // Initialize empty itinerary array
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };
      
      // Add package to Firestore
      const docRef = await addDoc(collection(db, 'packages'), packageToSave);

      toast.success('Package created successfully!');
      // Redirect to the package's edit page
      navigate(`/admin/packages/${docRef.id}`);
    } catch (error) {
      console.error('Error creating package:', error);
      toast.error('Failed to create package. Please try again.');
    } finally {
      setLoading(false);
    }
  };
const packageCategories = {
  "romantic-honeymoon": ["domestic", "international"],
  "celebration-packages": ["anniversary", "birthday", "festival"],
  "bachelor-holidays": [],
  "family-holidays": []
};

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1)}
          className="mr-4 p-1 rounded-full hover:bg-gray-100"
        >
          <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create New Package</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              {/* Package Name */}
              <div className="sm:col-span-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Package Name *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={packageData.name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Slug */}
              <div className="sm:col-span-4">
                <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                  Slug *
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    name="slug"
                    id="slug"
                    value={packageData.slug}
                    onChange={handleChange}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                    required
                  />
                  <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                    /package/{packageData.slug || 'your-package'}
                  </span>
                </div>
              </div>

              {/* Type */}
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Category *
                </label>

                <select
                  name="category"
                  value={packageData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                >
                  <option value="romantic-honeymoon">Romantic Honeymoon</option>
                  <option value="celebration-packages">Celebration Packages</option>
                  <option value="bachelor-holidays">Bachelor Holidays</option>
                  <option value="family-holidays">Family Holidays</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>

                <select
                  name="type"
                  value={packageData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full border-gray-300 rounded-md"
                  disabled={!packageCategories[packageData.category]?.length}
                >
                  {packageCategories[packageData.category]?.length ? (
                    packageCategories[packageData.category].map((type) => (
                      <option key={type} value={type}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </option>
                    ))
                  ) : (
                    <option value="">No Sub Type</option>
                  )}
                </select>
              </div>



              {/* Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="duration-days" className="block text-sm font-medium text-gray-700">
                    Days *
                  </label>
                  <input
                    type="number"
                    id="duration-days"
                    name="duration.days"
                    min="1"
                    value={packageData.duration?.days || ''}
                    onChange={(e) => {
                      const days = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                      setPackageData(prev => ({
                        ...prev,
                        duration: {
                          ...prev.duration,
                          days: isNaN(days) ? '' : Math.max(1, days)
                        }
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="duration-nights" className="block text-sm font-medium text-gray-700">
                    Nights
                  </label>
                  <input
                    type="number"
                    id="duration-nights"
                    name="duration.nights"
                    min="0"
                    value={packageData.duration?.nights || ''}
                    onChange={(e) => {
                      const nights = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                      setPackageData(prev => ({
                        ...prev,
                        duration: {
                          ...prev.duration,
                          nights: isNaN(nights) ? 0 : Math.max(0, nights)
                        }
                      }));
                    }}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="sm:col-span-2">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price (INR) *
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">₹</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    min="0"
                    step="0.01"
                    value={packageData.price}
                    onChange={handleChange}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Featured */}
              <div className="sm:col-span-2 flex items-end">
                <div className="flex items-center h-5">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    checked={packageData.featured}
                    onChange={handleChange}
                    className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="featured" className="font-medium text-gray-700">
                    Featured Package
                  </label>
                  <p className="text-gray-500">Show this package in featured section</p>
                </div>
              </div>

              {/* Description */}
              <div className="sm:col-span-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description *
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={packageData.description}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              {/* Images */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Main Image URLs (for thumbnails)
                </label>
                <div className="space-y-2">
                  {packageData.images.map((url, index) => (
                    <div key={`main-${index}`} className="flex space-x-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value, 'images')}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://example.com/image.jpg"
                      />
                      {packageData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index, 'images')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem('images')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                    Add Main Image URL
                  </button>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Image URLs (for package gallery)
                </label>
                <div className="space-y-2">
                  {packageData.galleryImages.map((url, index) => (
                    <div key={`gallery-${index}`} className="flex space-x-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleImageChange(index, e.target.value, 'galleryImages')}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="https://example.com/gallery-image.jpg"
                      />
                      {packageData.galleryImages.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index, 'galleryImages')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem('galleryImages')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                    Add Gallery Image URL
                  </button>
                </div>
              </div>

              {/* Inclusions */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Inclusions (what's included in the package)
                </label>
                <div className="space-y-2">
                  {packageData.inclusions.map((item, index) => (
                    <div key={`inclusion-${index}`} className="flex space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleImageChange(index, e.target.value, 'inclusions')}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Accommodation, Meals, etc."
                      />
                      {packageData.inclusions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index, 'inclusions')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem('inclusions')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                    Add Inclusion
                  </button>
                </div>
              </div>

              {/* Exclusions */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Exclusions (what's not included in the package)
                </label>
                <div className="space-y-2">
                  {packageData.exclusions.map((item, index) => (
                    <div key={`exclusion-${index}`} className="flex space-x-2">
                      <input
                        type="text"
                        value={item}
                        onChange={(e) => handleImageChange(index, e.target.value, 'exclusions')}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Flights, Travel Insurance, etc."
                      />
                      {packageData.exclusions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index, 'exclusions')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem('exclusions')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                    Add Exclusion
                  </button>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Terms and Conditions
                </label>
                <div className="space-y-2">
                  {packageData.termsAndConditions.map((term, index) => (
                    <div key={`term-${index}`} className="flex space-x-2">
                      <input
                        type="text"
                        value={term}
                        onChange={(e) => handleImageChange(index, e.target.value, 'termsAndConditions')}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., Full payment required at time of booking"
                      />
                      {packageData.termsAndConditions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index, 'termsAndConditions')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem('termsAndConditions')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                    Add Term
                  </button>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div className="sm:col-span-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Policy
                </label>
                <div className="space-y-2">
                  {packageData.cancellationPolicy.map((policy, index) => (
                    <div key={`policy-${index}`} className="flex space-x-2">
                      <input
                        type="text"
                        value={policy}
                        onChange={(e) => handleImageChange(index, e.target.value, 'cancellationPolicy')}
                        className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="e.g., 30 days before check-in: 100% refund"
                      />
                      {packageData.cancellationPolicy.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeItem(index, 'cancellationPolicy')}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addItem('cancellationPolicy')}
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                    Add Policy
                  </button>
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="sm:col-span-3">
                <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                  Rating (0-5)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    min="0"
                    max="5"
                    step="0.1"
                    value={packageData.rating}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="reviewsCount" className="block text-sm font-medium text-gray-700">
                  Number of Reviews
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="reviewsCount"
                    id="reviewsCount"
                    min="0"
                    value={packageData.reviewsCount}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              onClick={() => navigate('/admin/packages')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating...' : 'Create Package'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePackage;
