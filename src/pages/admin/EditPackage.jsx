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
  const [editingDay, setEditingDay] = useState(null);
  const [dayForm, setDayForm] = useState({
    day: 1,
    title: '',
    description: '',
    meals: '',
    hotel: ''
  });
  const [packageData, setPackageData] = useState({
    costSection: {
      enabled: false,
      title: '',
      subtitle: '',
      note: '',
      table: {
        columns: [],
        rows: []
      }
    },
    // Initialize all array fields as empty arrays to prevent undefined errors
    inclusions: [],
    exclusions: [],
    termsAndConditions: [],
    cancellationPolicy: [],
    itinerary: [],
    name: '',
    slug: '',
    type: 'domestic',
    duration: {
      days: 1,
      nights: 0
    },
    price: 0,
    description: '',
    images: [],
    galleryImages: [],
    rating: 4.5,
    reviewsCount: 10,
  });

  // Process array data for textareas when loading from Firestore
  const processArrayForTextarea = (value) => {
    if (Array.isArray(value)) {
      return value.filter(item => item && String(item).trim() !== '').join('\n');
    }
    return value || ''; // Return as-is if not an array (already processed or empty)
  };

  // Add a new column to the cost section table
  const addCostSectionColumn = () => {
    const newColumnId = crypto.randomUUID();
    const newColumn = { id: newColumnId, label: 'New Column' };
    
    setPackageData(prev => {
      const currentColumns = prev.costSection?.table?.columns || [];
      const currentRows = prev.costSection?.table?.rows || [];
      
      // Add empty cell for each row for the new column
      const updatedRows = currentRows.map(row => ({
        ...row,
        cells: {
          ...row.cells,
          [newColumnId]: ''
        }
      }));
      
      
      return {
        ...prev,
        costSection: {
          ...prev.costSection,
          enabled: true,
          table: {
            ...prev.costSection.table,
            columns: [...currentColumns, newColumn],
            rows: updatedRows
          }
        }
      };
    });
    
    setHasUnsavedChanges(true);
  };

  // Update a column's label
  const updateCostSectionColumn = (columnId, newLabel) => {
    setPackageData(prev => ({
      ...prev,
      costSection: {
        ...prev.costSection,
        table: {
          ...prev.costSection.table,
          columns: prev.costSection.table.columns.map(col => 
            col.id === columnId ? { ...col, label: newLabel } : col
          )
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Delete a column from the cost section table
  const deleteCostSectionColumn = (columnId) => {
    setPackageData(prev => {
      const updatedColumns = prev.costSection.table.columns.filter(col => col.id !== columnId);
      
      // Remove the column's cells from each row
      const updatedRows = prev.costSection.table.rows.map(row => {
        const { [columnId]: _, ...remainingCells } = row.cells || {};
        return {
          ...row,
          cells: remainingCells
        };
      });
      
      return {
        ...prev,
        costSection: {
          ...prev.costSection,
          table: {
            ...prev.costSection.table,
            columns: updatedColumns,
            rows: updatedRows
          }
        }
      };
    });
    
    setHasUnsavedChanges(true);
  };

  // Add a new row to the cost section table
  const addCostSectionRow = () => {
    const newRow = {
      id: crypto.randomUUID(),
      highlight: false,
      cells: {}
    };

    // Initialize cells for each column
    packageData.costSection?.table?.columns?.forEach(column => {
      newRow.cells[column.id] = '';
    });

    setPackageData(prev => ({
      ...prev,
      costSection: {
        ...prev.costSection,
        table: {
          ...prev.costSection.table,
          rows: [...prev.costSection.table.rows, newRow]
        }
      }
    }));
    setHasUnsavedChanges(true);
  };

  // Update a cell's value
  const updateCostSectionCell = (rowId, columnId, value) => {
    setPackageData(prev => {
      const updatedRows = prev.costSection.table.rows.map(row => {
        if (row.id === rowId) {
          return {
            ...row,
            cells: {
              ...row.cells,
              [columnId]: value
            }
          };
        }
        return row;
      });

      return {
        ...prev,
        costSection: {
          ...prev.costSection,
          table: {
            ...prev.costSection.table,
            rows: updatedRows
          }
        }
      };
    });
    setHasUnsavedChanges(true);
  };

  // Toggle row highlight
  const toggleRowHighlight = (rowId) => {
    setPackageData(prev => {
      const updatedRows = prev.costSection.table.rows.map(row => {
        if (row.id === rowId) {
          return { ...row, highlight: !row.highlight };
        }
        return row;
      });

      return {
        ...prev,
        costSection: {
          ...prev.costSection,
          table: {
            ...prev.costSection.table,
            rows: updatedRows
          }
        }
      };
    });
    setHasUnsavedChanges(true);
  };

  // Delete a row from the cost section table
  const deleteCostSectionRow = (rowId) => {
    setPackageData(prev => ({
      ...prev,
      costSection: {
        ...prev.costSection,
        table: {
          ...prev.costSection.table,
          rows: prev.costSection.table.rows.filter(row => row.id !== rowId)
        }
      }
    }));
    setHasUnsavedChanges(true);
  };
  
  // State for tracking which cell is being edited
  const [editingCell, setEditingCell] = useState({ rowId: null, columnId: null });

  // Fetch package data
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const docRef = doc(db, 'packages', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          
          // Process textarea fields to join arrays with newlines
          const processedData = {
            // keep defaults FIRST
            ...packageData,

            // then overwrite safe fields
            name: data.name || '',
            slug: data.slug || '',
            type: data.type || 'domestic',
            price: data.price || 0,
            description: data.description || '',
            duration: data.duration || { days: 1, nights: 0 },
            images: Array.isArray(data.images) ? data.images : [],
            galleryImages: Array.isArray(data.galleryImages) ? data.galleryImages : [],
            rating: data.rating ?? 4.5,
            reviewsCount: data.reviewsCount ?? 10,

            // ✅ ALWAYS DEFINE costSection
            costSection: {
              enabled: data.costSection?.enabled ?? false,
              title: data.costSection?.title ?? '',
              subtitle: data.costSection?.subtitle ?? '',
              note: data.costSection?.note ?? '',
              table: {
                columns: Array.isArray(data.costSection?.table?.columns)
                  ? data.costSection.table.columns
                  : [],
                rows: Array.isArray(data.costSection?.table?.rows)
                  ? data.costSection.table.rows.map(row => ({
                      ...row,
                      cells: row.cells || {}
                    }))
                  : []
              }
            },

            // textarea fields
            inclusions: processArrayForTextarea(data.inclusions),
            exclusions: processArrayForTextarea(data.exclusions),
            termsAndConditions: processArrayForTextarea(data.termsAndConditions),
            cancellationPolicy: processArrayForTextarea(data.cancellationPolicy),

            itinerary: Array.isArray(data.itinerary)
              ? data.itinerary.map((item, i) => ({
                  ...item,
                  day: item.day || i + 1,
                  title: item.title || `Day ${i + 1}`,
                  description: Array.isArray(item.description)
                    ? item.description.join('\n')
                    : item.description || '',
                  meals: item.meals || '',
                  hotel: item.hotel || ''
                }))
              : []
          };
          setPackageData(processedData);
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle nested duration fields
    if (name.startsWith('duration.')) {
      const durationField = name.split('.')[1];
      setPackageData(prev => ({
        ...prev,
        duration: {
          ...prev.duration,
          [durationField]: type === 'number' ? parseInt(value, 10) : value
        }
      }));
    } else {
      setPackageData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
                type === 'number' ? parseFloat(value) : 
                value
      }));
    }
    
    setHasUnsavedChanges(true);
  };
  
  const handleArrayChange = (index, value, field) => {
    // For textarea fields, we're now storing the full text value
    // and will process it on save
    if (['inclusions', 'exclusions', 'termsAndConditions', 'cancellationPolicy'].includes(field)) {
      setPackageData(prev => ({
        ...prev,
        [field]: value
      }));
    } else {
      const newItems = [...(packageData[field] || [])];
      newItems[index] = value;
      setPackageData(prev => ({
        ...prev,
        [field]: newItems
      }));
    }
    setHasUnsavedChanges(true);
  };
  
  const addItem = (field) => {
    if (['inclusions', 'exclusions', 'termsAndConditions', 'cancellationPolicy'].includes(field)) {
      // For textarea fields, just add a newline to the existing value
      setPackageData(prev => ({
        ...prev,
        [field]: (prev[field] || '') + '\n'
      }));
    } else {
      // For other array fields, add an empty item
      setPackageData(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), '']
      }));
    }
    setHasUnsavedChanges(true);
  };
  
  const removeItem = (index, field) => {
    const newItems = packageData[field].filter((_, i) => i !== index);
    setPackageData(prev => ({
      ...prev,
      [field]: newItems
    }));
    setHasUnsavedChanges(true);
  };

  const handleDayInputChange = (e) => {
    const { name, value } = e.target;
    setDayForm(prev => ({
      ...prev,
      [name]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleAddDay = () => {
    const newDay = {
      ...dayForm,
      day: packageData.itinerary ? packageData.itinerary.length + 1 : 1
    };

    setPackageData(prev => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), newDay]
    }));
    
    setHasUnsavedChanges(true);

    // Reset form
    setDayForm({
      day: (packageData.itinerary?.length || 0) + 2,
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
      title: day.title || '',
      description: day.description || '',
      meals: day.meals || '',
      hotel: day.hotel || ''
    });
  };

  const handleUpdateDay = () => {
    const updatedItinerary = [...packageData.itinerary];
    updatedItinerary[editingDay] = { ...dayForm };
    
    setPackageData(prev => ({
      ...prev,
      itinerary: updatedItinerary
    }));
    
    setHasUnsavedChanges(true);
    setEditingDay(null);
    setDayForm({
      day: packageData.itinerary.length + 1,
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

  // Process textarea value by splitting into array of non-empty lines
  const processTextareaValue = (value, keepAsString = false) => {
    if (!value) return keepAsString ? '' : [];
    
    let result;
    if (Array.isArray(value)) {
      // If it's already an array, clean it up
      result = value
        .map(item => String(item).trim())
        .filter(item => item.length > 0);
    } else {
      // If it's a string, split by newlines and clean
      result = String(value)
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0);
    }
    
    return keepAsString ? result.join('\n') : result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasUnsavedChanges) return;
    
    try {
      setIsSubmitting(true);
      
      // Process all text-heavy fields, ensuring they are arrays
      const processedData = {
        ...packageData,
        inclusions: processTextareaValue(Array.isArray(packageData.inclusions) ? packageData.inclusions : [packageData.inclusions || '']),
        exclusions: processTextareaValue(Array.isArray(packageData.exclusions) ? packageData.exclusions : [packageData.exclusions || '']),
        termsAndConditions: processTextareaValue(Array.isArray(packageData.termsAndConditions) ? packageData.termsAndConditions : [packageData.termsAndConditions || '']),
        cancellationPolicy: processTextareaValue(Array.isArray(packageData.cancellationPolicy) ? packageData.cancellationPolicy : [packageData.cancellationPolicy || '']),
        itinerary: packageData.itinerary.map(day => ({
          ...day,
          description: processTextareaValue(day.description, true) // Keep as string for display
        }))
      };
      
      // Update document in Firestore
      const packageRef = doc(db, 'packages', id);
      const updateData = {
        ...processedData,
        updatedAt: serverTimestamp()
      };

      // Handle costSection based on enabled status
      if (packageData.costSection) {
        if (packageData.costSection.enabled) {
          updateData.costSection = packageData.costSection;
        } else {
          updateData.costSection = {
            ...packageData.costSection,
            enabled: false
          };
        }
      }

      await updateDoc(packageRef, updateData);
      
      toast.success('Package updated successfully');
      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error updating package:', error);
      toast.error('Failed to update package');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Main component render
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {id ? 'Edit Package' : 'Create New Package'}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {id ? 'Update package details' : 'Fill in the details to create a new package'}
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/admin/packages"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeftIcon className="-ml-1 mr-2 h-5 w-5" />
            Back to Packages
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
          </div>
          <div className="px-4 py-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={packageData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="slug"
                  value={packageData.slug}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="e.g., summer-vacation-2023"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Package Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="type"
                  value={packageData.type}
                  onChange={handleChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value="domestic">Domestic</option>
                  <option value="international">International</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={packageData.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Duration (Days) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="duration.days"
                  value={packageData.duration.days}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setPackageData(prev => ({
                      ...prev,
                      duration: {
                        ...prev.duration,
                        days: value
                      }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  min="1"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nights <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="duration.nights"
                  value={packageData.duration.nights}
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 0;
                    setPackageData(prev => ({
                      ...prev,
                      duration: {
                        ...prev.duration,
                        nights: value
                      }
                    }));
                    setHasUnsavedChanges(true);
                  }}
                  min="0"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={packageData.description}
                onChange={handleChange}
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
   
        {/* Overview */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg font-medium text-gray-900">Overview</h3>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <textarea
              name="description"
              rows={4}
              value={packageData.description || ''}
              onChange={handleChange}
              className="block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
{/* Itinerary Section */}
   <div className="bg-white rounded-lg shadow overflow-hidden">
     <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 className="text-lg font-medium text-gray-900">Itinerary</h3>
     </div>
     <div className="px-4 py-5 sm:p-6">
       {packageData.itinerary && packageData.itinerary.length > 0 ? (
        <div className="space-y-4 mb-6">
          {packageData.itinerary.map((day, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Day {day.day}: {day.title}</h4>
                <div className="space-x-2">
                  <button
                    type="button"
                    onClick={() => handleEditDay(index)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setDeletingDay(index);
                      setShowDeleteConfirm(true);
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">{day.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mb-4">No itinerary days added yet.</p>
      )}

      <div className="border-t pt-4">
        <h4 className="text-md font-medium mb-3">
          {editingDay !== null ? 'Edit Day' : 'Add New Day'}
        </h4>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              value={dayForm.title || ''}
              onChange={(e) => setDayForm({...dayForm, title: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="E.g., Arrival in Paris"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows={3}
              value={dayForm.description || ''}
              onChange={(e) => setDayForm({...dayForm, description: e.target.value})}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter the day's activities and details"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            {editingDay !== null && (
              <button
                type="button"
                onClick={() => {
                  setEditingDay(null);
                  setDayForm({ day: packageData.itinerary ? packageData.itinerary.length + 1 : 1, title: '', description: '' });
                }}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={editingDay !== null ? handleUpdateDay : handleAddDay}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={!dayForm.title || !dayForm.description}
            >
              {editingDay !== null ? 'Update Day' : 'Add Day'}
            </button>
          </div>
        </div>

        {/* Itinerary List */}
        <div className="mt-6">
          <h4 className="text-md font-medium text-gray-900 mb-3">Itinerary Days</h4>
          {packageData.itinerary && packageData.itinerary.length > 0 ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={packageData.itinerary.map(day => `day-${day.day}`)}
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
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <p className="text-sm text-gray-500">No itinerary days added yet.</p>
          )}
        </div>
      </div>
    </div>
  </div>
  {/* Cost Section */}
<div className="bg-white rounded-lg shadow overflow-hidden">
  <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between items-center">
    <h3 className="text-lg font-medium text-gray-900">Cost Section</h3>

    <div className="flex items-center">
      <span className="mr-3 text-sm font-medium text-gray-700">
        {packageData?.costSection?.enabled ? 'Enabled' : 'Disabled'}
      </span>
      <button
        type="button"
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
          packageData?.costSection?.enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
        onClick={() => {
          setPackageData(prev => ({
            ...prev,
            costSection: {
              ...prev.costSection,
              enabled: !prev.costSection.enabled,
            }
          }));
          setHasUnsavedChanges(true);
        }}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
            packageData?.costSection?.enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  </div>

  {packageData?.costSection?.enabled && (
    <div className="px-4 py-5 sm:p-6 space-y-4">

      {/* Title */}
      <input
        type="text"
        value={packageData.costSection.title}
        onChange={(e) =>
          setPackageData(prev => ({
            ...prev,
            costSection: { ...prev.costSection, title: e.target.value }
          }))
        }
        placeholder="Cost Section Title"
        className="w-full border rounded-md p-2"
      />

      {/* Table Controls */}
      <div className="flex gap-2">
        <button type="button" onClick={addCostSectionColumn} className="px-3 py-1 bg-blue-600 text-white rounded">
          Add Column
        </button>
        <button type="button" onClick={addCostSectionRow} className="px-3 py-1 bg-green-600 text-white rounded">
          Add Row
        </button>
      </div>

      {/* Table */}
      {packageData.costSection.table.columns.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead className="bg-gray-50">
              <tr>
                {/* Highlight Column */}
                <th className="border px-2 w-12 text-center text-xs font-semibold text-gray-500">
                  ⭐
                </th>

                {packageData.costSection.table.columns.map(col => (
                  <th key={col.id} className="border px-3 py-2">
                    <div className="flex items-center gap-2">
                      <input
                        value={col.label}
                        onChange={(e) => updateCostSectionColumn(col.id, e.target.value)}
                        className="w-full bg-transparent focus:outline-none"
                      />

                      <button
                        type="button"
                        onClick={() => deleteCostSectionColumn(col.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete Column"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </th>
                ))}

                {/* Row Action Column */}
                <th className="border px-2 w-12 text-center text-xs font-semibold text-gray-500">
                  ❌
                </th>
              </tr>
            </thead>
            
            <tbody>
              {packageData.costSection.table.rows.map(row => (
                <tr key={row.id} className={row.highlight ? 'bg-blue-50' : ''}>

                  {/* Highlight Toggle */}
                  <td className="border px-2 text-center">
                    <button
                      type="button"
                      onClick={() => toggleRowHighlight(row.id)}
                      className={`p-1 rounded-full ${
                        row.highlight ? 'text-blue-600' : 'text-gray-400'
                      }`}
                      title="Highlight Row"
                    >
                      ⭐
                    </button>
                  </td>

                  {/* Cells */}
                  {packageData.costSection.table.columns.map(col => (
                    <td key={col.id} className="border px-2">
                      <input
                        value={row.cells?.[col.id] || ''}
                        onChange={(e) =>
                          updateCostSectionCell(row.id, col.id, e.target.value)
                        }
                        className="w-full bg-transparent focus:outline-none"
                      />
                    </td>
                  ))}

                  {/* Delete Row */}
                  <td className="border px-2 text-center">
                    <button
                      type="button"
                      onClick={() => deleteCostSectionRow(row.id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete Row"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}

      {/* Note */}
      <textarea
        rows={3}
        value={packageData.costSection.note}
        onChange={(e) =>
          setPackageData(prev => ({
            ...prev,
            costSection: { ...prev.costSection, note: e.target.value }
          }))
        }
        placeholder="Cost notes (optional)"
        className="w-full border rounded-md p-2"
      />
    </div>
  )}
</div>

        {/* Inclusions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
            <h3 className="text-lg font-medium text-gray-900">Inclusions</h3>
            <button type="button" onClick={() => addItem('inclusions')}>
              Add
            </button>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <textarea
              rows={4}
              value={packageData.inclusions || ''}
              onChange={(e) =>
                handleArrayChange(0, e.target.value, 'inclusions')
              }
              className="block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Exclusions */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
            <h3 className="text-lg font-medium text-gray-900">Exclusions</h3>
            <button type="button" onClick={() => addItem('exclusions')}>
              Add
            </button>
          </div>
          <div className="px-4 py-5 sm:p-6">
            <textarea
              rows={4}
              value={packageData.exclusions || ''}
              onChange={(e) =>
                handleArrayChange(0, e.target.value, 'exclusions')
              }
              className="block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
{/* Terms and Conditions */}
<div className="bg-white rounded-lg shadow overflow-hidden">
    <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
       <h3 className="text-lg font-medium text-gray-900">
         Terms and Conditions
       </h3>
       <button
        type="button"
        onClick={() => addItem('termsAndConditions')}
      >
        Add
      </button>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <textarea
        rows={4}
        value={packageData.termsAndConditions || ''}
        onChange={(e) =>
          handleArrayChange(0, e.target.value, 'termsAndConditions')
        }
        className="block w-full border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  </div>

   {/*Cancellation Policy*/}
   <div className="bg-white rounded-lg shadow overflow-hidden">
     <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
       <h3 className="text-lg font-medium text-gray-900">
         Cancellation Policy
       </h3>
       <button
        type="button"
        onClick={() => addItem('cancellationPolicy')}
      >
        Add
      </button>
    </div>
    <div className="px-4 py-5 sm:p-6">
      <textarea
        rows={4}
        value={packageData.cancellationPolicy || ''}
        onChange={(e) =>
          handleArrayChange(0, e.target.value, 'cancellationPolicy')
        }
        className="block w-full border border-gray-300 rounded-md shadow-sm"
      />
    </div>
  </div>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !hasUnsavedChanges}
            className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              isSubmitting || !hasUnsavedChanges
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            }`}
          >
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
//           {packageData.costSection.table?.columns?.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 border">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
//                       {/* Empty for highlight toggle */}
//                     </th>
//                     {packageData.costSection.table.columns.map((column) => (
//                       <th
//                         key={column.id}
//                         className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                       >
//                         <div className="flex items-center">
//                           <input
//                             type="text"
//                             value={column.label}
//                             onChange={(e) => updateCostSectionColumn(column.id, e.target.value)}
//                             className="block w-full border-0 p-0 focus:ring-0 focus:border-blue-500 text-xs bg-transparent"
//                           />
//                           <button
//                             type="button"
//                             onClick={() => deleteCostSectionColumn(column.id)}
//                             className="ml-1 text-gray-400 hover:text-red-500"
//                             title="Delete column"
//                           >
//                             <XMarkIcon className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </th>
//                     ))}
//                     <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {packageData.costSection.table.rows.map((row) => (
//                     <tr
//                       key={row.id}
//                       className={row.highlight ? 'bg-blue-50' : 'hover:bg-gray-50'}
//                     >
//                       <td className="px-3 py-2 whitespace-nowrap text-sm text-center">
//                         <button
//                           type="button"
//                           onClick={() => toggleRowHighlight(row.id)}
//                           className={`p-1 rounded-full ${row.highlight ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
//                           title={row.highlight ? 'Unhighlight row' : 'Highlight row'}
//                         >
//                           <svg
//                             className="h-4 w-4"
//                             fill="currentColor"
//                             viewBox="0 0 20 20"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </button>
//                       </td>
//                       {packageData.costSection.table.columns.map((column) => (
//                         <td
//                           key={`${row.id}-${column.id}`}
//                           className="px-3 py-2 whitespace-nowrap text-sm text-gray-900"
//                         >
//                           <input
//                             type="text"
//                             value={row.cells?.[column.id] || ''}
//                             onChange={(e) => updateCostSectionCell(row.id, column.id, e.target.value)}
//                             className="block w-full border-0 p-1 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 rounded-md"
//                             placeholder="Value"
//                           />
//                         </td>
//                       ))}
//                       <td className="px-3 py-2 whitespace-nowrap text-sm text-center">
//                         <button
//                           type="button"
//                           onClick={() => deleteCostSectionRow(row.id)}
//                           className="text-red-600 hover:text-red-800"
//                           title="Delete row"
//                         >
//                           <TrashIcon className="h-4 w-4" />
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
//               <p className="text-sm text-gray-500">
//                 No columns added yet. Click "Add Column" to get started.
//               </p>
//             </div>
//           )}
//         </div>
        
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Note (optional)
//           </label>
//           <textarea
//             rows={3}
//             value={packageData.costSection.note || ''}
//             onChange={(e) =>
//               setPackageData(prev => ({
//                 ...prev,
//                 costSection: {
//                   ...prev.costSection,
//                   note: e.target.value
//                 }
//               }))
//             }
//             className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md"
//             placeholder="Add any additional notes about the pricing"
//           />
//         </div>
//       </div>
//     )}
//   </div>

//   {/* Overview */}
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
//       <h3 className="text-lg font-medium text-gray-900">Overview</h3>
//     </div>
//     <div className="px-4 py-5 sm:p-6">
//       <textarea
//         name="description"
//         rows={4}
//         value={packageData.description || ''}
//         onChange={handleChange}
//         className="block w-full border border-gray-300 rounded-md shadow-sm"
//       />
//     </div>
//   </div>

//   {/* Inclusions */}
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
//       <h3 className="text-lg font-medium text-gray-900">Inclusions</h3>
//       <button type="button" onClick={() => addItem('inclusions')}>
//         Add
//       </button>
//     </div>
//     <div className="px-4 py-5 sm:p-6">
//       <textarea
//         rows={4}
//         value={packageData.inclusions || ''}
//         onChange={(e) =>
//           handleArrayChange(0, e.target.value, 'inclusions')
//         }
//         className="block w-full border border-gray-300 rounded-md shadow-sm"
//       />
//     </div>
//   </div>

//   {/* Exclusions */}
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
//       <h3 className="text-lg font-medium text-gray-900">Exclusions</h3>
//       <button type="button" onClick={() => addItem('exclusions')}>
//         Add
//       </button>
//     </div>
//     <div className="px-4 py-5 sm:p-6">
//       <textarea
//         rows={4}
//         value={packageData.exclusions || ''}
//         onChange={(e) =>
//           handleArrayChange(0, e.target.value, 'exclusions')
//         }
//         className="block w-full border border-gray-300 rounded-md shadow-sm"
//       />
//     </div>
//   </div>

//   Cancellation Policy
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
//       <h3 className="text-lg font-medium text-gray-900">
//         Cancellation Policy
//       </h3>
//       <button
//         type="button"
//         onClick={() => addItem('cancellationPolicy')}
//       >
//         Add
//       </button>
//     </div>
//     <div className="px-4 py-5 sm:p-6">
//       <textarea
//         rows={4}
//         value={packageData.cancellationPolicy || ''}
//         onChange={(e) =>
//           handleArrayChange(0, e.target.value, 'cancellationPolicy')
//         }
//         className="block w-full border border-gray-300 rounded-md shadow-sm"
//       />
//     </div>
//   </div>

//   {/* Terms and Conditions */}
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="px-4 py-5 border-b border-gray-200 sm:px-6 flex justify-between">
//       <h3 className="text-lg font-medium text-gray-900">
//         Terms and Conditions
//       </h3>
//       <button
//         type="button"
//         onClick={() => addItem('termsAndConditions')}
//       >
//         Add
//       </button>
//     </div>
//     <div className="px-4 py-5 sm:p-6">
//       <textarea
//         rows={4}
//         value={packageData.termsAndConditions || ''}
//         onChange={(e) =>
//           handleArrayChange(0, e.target.value, 'termsAndConditions')
//         }
//         className="block w-full border border-gray-300 rounded-md shadow-sm"
//       />
//     </div>
//   </div>

//   {/* Itinerary Section */}
//   <div className="bg-white rounded-lg shadow overflow-hidden">
//     <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
//       <h3 className="text-lg font-medium text-gray-900">Itinerary</h3>
//     </div>
//     <div className="px-4 py-5 sm:p-6">
//       {packageData.itinerary && packageData.itinerary.length > 0 ? (
//         <div className="space-y-4 mb-6">
//           {packageData.itinerary.map((day, index) => (
//             <div key={index} className="border rounded-lg p-4">
//               <div className="flex justify-between items-center">
//                 <h4 className="font-medium">Day {day.day}: {day.title}</h4>
//                 <div className="space-x-2">
//                   <button
//                     type="button"
//                     onClick={() => handleEditDay(index)}
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => {
//                       setDeletingDay(index);
//                       setShowDeleteConfirm(true);
//                     }}
//                     className="text-red-600 hover:text-red-800"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//               <p className="mt-2 text-sm text-gray-600">{day.description}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-gray-500 mb-4">No itinerary days added yet.</p>
//       )}

//       <div className="border-t pt-4">
//         <h4 className="text-md font-medium mb-3">
//           {editingDay !== null ? 'Edit Day' : 'Add New Day'}
//         </h4>
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
//             <input
//               type="text"
//               value={dayForm.title || ''}
//               onChange={(e) => setDayForm({...dayForm, title: e.target.value})}
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="E.g., Arrival in Paris"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//             <textarea
//               rows={3}
//               value={dayForm.description || ''}
//               onChange={(e) => setDayForm({...dayForm, description: e.target.value})}
//               className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               placeholder="Enter the day's activities and details"
//             ></textarea>
//           </div>
//           <div className="flex justify-end space-x-2">
//             {editingDay !== null && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingDay(null);
//                   setDayForm({ day: packageData.itinerary ? packageData.itinerary.length + 1 : 1, title: '', description: '' });
//                 }}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Cancel
//               </button>
//             )}
//             <button
//               type="button"
//               onClick={editingDay !== null ? handleUpdateDay : handleAddDay}
//               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               disabled={!dayForm.title || !dayForm.description}
//             >
//               {editingDay !== null ? 'Update Day' : 'Add Day'}
//             </button>
//           </div>
//         </div>

//         {/* Itinerary List */}
//         <div className="mt-6">
//           <h4 className="text-md font-medium text-gray-900 mb-3">Itinerary Days</h4>
//           {packageData.itinerary && packageData.itinerary.length > 0 ? (
//             <DndContext
//               sensors={sensors}
//               collisionDetection={closestCenter}
//               onDragEnd={handleDragEnd}
//             >
//               <SortableContext
//                 items={packageData.itinerary.map(day => `day-${day.day}`)}
//                 strategy={verticalListSortingStrategy}
//               >
//                 <div className="space-y-4">
//                   {packageData.itinerary.map((day, index) => (
//                     <SortableDay
//                       key={`day-${day.day}`}
//                       id={`day-${day.day}`}
//                       day={day}
//                       index={index}
//                       onEdit={handleEditDay}
//                       onDelete={handleDeleteDay}
//                     />
//                   ))}
//                 </div>
//               </SortableContext>
//             </DndContext>
//           ) : (
//             <p className="text-sm text-gray-500">No itinerary days added yet.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   </div>

//   {/* Delete Confirmation Modal */}
//   {showDeleteConfirm && (
//     <div className="fixed z-10 inset-0 overflow-y-auto">
//       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
//         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
//           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
//         </div>
//         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
//         <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
//           <div>
//             <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
//               <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
//               </svg>
//             </div>
//             <div className="mt-3 text-center sm:mt-5">
//               <h3 className="text-lg leading-6 font-medium text-gray-900">
//                 Delete Day {deletingDay !== null && packageData.itinerary[deletingDay]?.day}
//               </h3>
//               <div className="mt-2">
//                 <p className="text-sm text-gray-500">
//                   Are you sure you want to delete this day? This action cannot be undone.
//                 </p>
//               </div>
//             </div>
//           </div>
//           <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
//             <button
//               type="button"
//               onClick={cancelDeleteDay}
//               className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:col-start-2 sm:text-sm"
//             >
//               Cancel
//             </button>
//             <button
//               type="button"
//               onClick={confirmDeleteDay}
//               className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-1 sm:text-sm"
//             >
//               Delete
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )}

//   {/* Form Actions */}
//   <div className="flex justify-end space-x-3 pt-6 border-t">
//     <Link
//       to="/admin/packages"
//       className="px-4 py-2 border rounded-md"
//     >
//       Cancel
//     </Link>
//     <button
//       type="submit"
//       disabled={isSubmitting}
//       className="px-4 py-2 bg-blue-600 text-white rounded-md"
//     >
//       {isSubmitting ? 'Saving...' : 'Save Changes'}
//     </button>
//   </div>
// </form>
// </div>
//   );
// };

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
