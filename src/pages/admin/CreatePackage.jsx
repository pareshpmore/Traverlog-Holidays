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
    type: 'domestic',
    duration: '',
    price: 0,
    description: '',
    images: [''],
    featured: false,
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

  const handleImageChange = (index, value) => {
    const newImages = [...packageData.images];
    newImages[index] = value;
    setPackageData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const addImageField = () => {
    setPackageData(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  const removeImageField = (index) => {
    const newImages = packageData.images.filter((_, i) => i !== index);
    setPackageData(prev => ({
      ...prev,
      images: newImages
    }));
  };

  const validateForm = () => {
    const requiredFields = ['name', 'slug', 'duration', 'price', 'description'];
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

    if (isNaN(packageData.duration) || packageData.duration < 1) {
      toast.error('Duration must be at least 1 day');
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
      // Filter out empty image URLs
      const filteredImages = packageData.images.filter(url => url.trim() !== '');
      
      // Create package data with required fields
      const packageToSave = {
        name: packageData.name.trim(),
        slug: packageData.slug.trim(),
        type: packageData.type,
        duration: Number(packageData.duration),
        price: Number(packageData.price),
        description: packageData.description.trim(),
        images: filteredImages,
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
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={packageData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>

              {/* Duration */}
              <div className="sm:col-span-2">
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                  Duration (days) *
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    min="1"
                    value={packageData.duration}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
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
                  Image URLs
                </label>
                {packageData.images.map((url, index) => (
                  <div key={index} className="flex mb-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageChange(index, e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="flex-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-l-md"
                    />
                    {packageData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="ml-1 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-r-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addImageField}
                  className="mt-2 inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="-ml-0.5 mr-2 h-4 w-4" />
                  Add Another Image
                </button>
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
