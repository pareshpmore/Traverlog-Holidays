import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { 
  ArrowLeftIcon, 
  PlusIcon, 
  TrashIcon, 
  PencilIcon, 
  CheckIcon, 
  XMarkIcon,
  Bars3Icon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const EditPackage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingDay, setDeletingDay] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [packageData, setPackageData] = useState({
    name: '',
    slug: '',
    type: 'domestic',
    duration: '',
    price: 0,
    description: '',
    images: [],
    itinerary: [],
  });
  const [editingDay, setEditingDay] = useState(null);
  const [dayForm, setDayForm] = useState({
    day: 1,
    title: '',
    description: '',
    meals: '',
    hotel: ''
  });

  // Fetch package data
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const docRef = doc(db, 'packages', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setPackageData({
            ...data,
            // Ensure itinerary is an array and has the correct structure
            itinerary: Array.isArray(data.itinerary) 
              ? data.itinerary.map((item, index) => ({
                  ...item,
                  // Ensure each day has all required fields
                  day: item.day || index + 1,
                  title: item.title || `Day ${index + 1}`,
                  description: item.description || '',
                  meals: item.meals || '',
                  hotel: item.hotel || ''
                }))
              : []
          });
        } else {
          toast.error('Package not found');
          navigate('/admin/packages');
        }
      } catch (error) {
        console.error('Error fetching package:', error);
        toast.error('Failed to load package');
        navigate('/admin/packages');
      } finally {
        setLoading(false);
      }
    };

    fetchPackage();
  }, [id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDayInputChange = (e) => {
    const { name, value } = e.target;
    setDayForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddDay = () => {
    const newDay = {
      ...dayForm,
      day: packageData.itinerary.length + 1
    };

    setPackageData(prev => ({
      ...prev,
      itinerary: [...prev.itinerary, newDay]
    }));
    
    setHasUnsavedChanges(true);

    // Reset form
    setDayForm({
      day: packageData.itinerary.length + 2,
      title: '',
      description: '',
      meals: '',
      hotel: ''
    });
  };

  const handleEditDay = (dayIndex) => {
    const day = packageData.itinerary[dayIndex];
    setEditingDay(dayIndex);
    setDayForm({
      day: day.day,
      title: day.title,
      description: day.description,
      meals: day.meals,
      hotel: day.hotel
    });
  };

  const handleUpdateDay = () => {
    const updatedItinerary = [...packageData.itinerary];
    updatedItinerary[editingDay] = { ...dayForm };
    
    setPackageData(prev => ({
      ...prev,
      itinerary: updatedItinerary
    }));
    
    setEditingDay(null);
    setDayForm({
      day: 1,
      title: '',
      description: '',
      meals: '',
      hotel: ''
    });
  };

  const handleDeleteDay = (index) => {
    setDeletingDay(index);
    setShowDeleteConfirm(true);
  };

  const confirmDeleteDay = useCallback(() => {
    if (deletingDay === null) return;
    
    const updatedItinerary = packageData.itinerary.filter((_, i) => i !== deletingDay);
    // Reorder days after deletion
    const reorderedItinerary = updatedItinerary.map((day, idx) => ({
      ...day,
      day: idx + 1
    }));
    
    setPackageData(prev => ({
      ...prev,
      itinerary: reorderedItinerary
    }));
    setHasUnsavedChanges(true);
    setShowDeleteConfirm(false);
    setDeletingDay(null);
  }, [deletingDay, packageData.itinerary]);

  const cancelDeleteDay = () => {
    setShowDeleteConfirm(false);
    setDeletingDay(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id) {
      setPackageData(({ itinerary }) => {
        const oldIndex = itinerary.findIndex(item => `day-${item.day}` === active.id);
        const newIndex = itinerary.findIndex(item => `day-${item.day}` === over.id);
        
        const newItinerary = arrayMove(itinerary, oldIndex, newIndex).map((item, index) => ({
          ...item,
          day: index + 1
        }));
        
        setHasUnsavedChanges(true);
        
        return {
          ...packageData,
          itinerary: newItinerary
        };
      });
    }
  };

  // Warn before leaving page with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = 'You have unsaved changes. Are you sure you want to leave?';
        return e.returnValue;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      setSaving(true);
      
      const packageRef = doc(db, 'packages', id);
      await updateDoc(packageRef, {
        ...packageData,
        updatedAt: serverTimestamp()
      });
      
      setHasUnsavedChanges(false);
      toast.success('Package updated successfully');
      navigate('/admin/packages');
    } catch (error) {
      console.error('Error updating package:', error);
      toast.error('Failed to update package');
    } finally {
      setSaving(false);
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <ArrowPathIcon className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 relative">
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow-lg z-40 flex items-center">
          <span className="mr-2">You have unsaved changes</span>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Link
            to="/admin/packages"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-2" />
            Back to Packages
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            Edit Package: {packageData.name}
          </h1>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? (
            <>
              <ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Package Information
          </h3>
        </div>
        
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Package Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={packageData.name}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Type *
              </label>
              <select
                id="type"
                name="type"
                value={packageData.type}
                onChange={handleInputChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                <option value="domestic">Domestic</option>
                <option value="international">International</option>
              </select>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
                Duration *
              </label>
              <input
                type="text"
                name="duration"
                id="duration"
                value={packageData.duration}
                onChange={handleInputChange}
                placeholder="e.g., 7 Days / 6 Nights"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
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
                  value={packageData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
                  placeholder="0.00"
                />
              </div>
            </div>

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
                  onChange={handleInputChange}
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Itinerary Section */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Itinerary
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Manage the day-by-day itinerary for this package.
          </p>
        </div>

        <div className="px-4 py-5 sm:p-6">
        {/* Confirmation Dialog */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this day? This action cannot be undone.</p>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={cancelDeleteDay}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  disabled={saving}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={confirmDeleteDay}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  disabled={saving}
                >
                  {saving ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
        
        <DndContext 
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={packageData.itinerary.map(item => `day-${item.day}`)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {packageData.itinerary.map((day, index) => (
                <SortableDay
                  key={`day-${day.day}`}
                  id={`day-${day.day}`}
                  day={day}
                  index={index}
                  onEdit={handleEditDay}
                  onDelete={handleDeleteDay}
                  saving={saving}
                  deletingDay={deletingDay}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

          {/* Add/Edit Day Form */}
          <div className="mt-8 border-t border-gray-200 pt-8">
            <h4 className="text-lg font-medium text-gray-900 mb-4">
              {editingDay !== null ? 'Edit Day' : 'Add New Day'}
            </h4>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 gap-y-4 gap-x-6 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="day-title" className="block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="day-title"
                    name="title"
                    value={dayForm.title}
                    onChange={handleDayInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Arrival in Paris"
                  />
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="day-description" className="block text-sm font-medium text-gray-700">
                    Description *
                  </label>
                  <textarea
                    id="day-description"
                    name="description"
                    rows={3}
                    value={dayForm.description}
                    onChange={handleDayInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="Detailed description of the day's activities"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="day-meals" className="block text-sm font-medium text-gray-700">
                    Meals Included
                  </label>
                  <input
                    type="text"
                    id="day-meals"
                    name="meals"
                    value={dayForm.meals}
                    onChange={handleDayInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Breakfast, Lunch, Dinner"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="day-hotel" className="block text-sm font-medium text-gray-700">
                    Hotel
                  </label>
                  <input
                    type="text"
                    id="day-hotel"
                    name="hotel"
                    value={dayForm.hotel}
                    onChange={handleDayInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    placeholder="e.g., Hotel Grand Plaza"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end space-x-3">
                {editingDay !== null && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingDay(null);
                      setDayForm({
                        day: 1,
                        title: '',
                        description: '',
                        meals: '',
                        hotel: ''
                      });
                    }}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <XMarkIcon className="-ml-1 mr-2 h-5 w-5" />
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  onClick={editingDay !== null ? handleUpdateDay : handleAddDay}
                  disabled={!dayForm.title || !dayForm.description}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingDay !== null ? (
                    <>
                      <CheckIcon className="-ml-1 mr-2 h-5 w-5" />
                      Update Day
                    </>
                  ) : (
                    <>
                      <PlusIcon className="-ml-1 mr-2 h-5 w-5" />
                      Add Day
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// SortableDay Component
const SortableDay = ({ id, day, index, onEdit, onDelete, saving, deletingDay }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden"
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center">
          <button
            {...attributes}
            {...listeners}
            className="p-1 text-gray-400 hover:text-gray-600 cursor-move mr-2"
          >
            <Bars3Icon className="h-5 w-5" />
          </button>
          <h4 className="text-sm font-medium text-gray-900">
            Day {day.day}: {day.title}
          </h4>
        </div>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => onEdit(index)}
            className="text-blue-600 hover:text-blue-800"
          >
            <PencilIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
            className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={saving}
          >
            {saving && deletingDay === index ? (
              <ArrowPathIcon className="h-5 w-5 animate-spin" />
            ) : (
              <TrashIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium text-gray-500">Description</p>
            <p className="mt-1 text-gray-900">
              {day.description || 'No description provided'}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Meals</p>
            <p className="mt-1 text-gray-900">
              {day.meals || 'Not specified'}
            </p>
          </div>
          <div>
            <p className="font-medium text-gray-500">Hotel</p>
            <p className="mt-1 text-gray-900">
              {day.hotel || 'Not specified'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditPackage;
