import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import { savedPropertyService, propertyService } from '../services';

const SavedProperties = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedProperties();
  }, []);

  const loadSavedProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const savedItems = await savedPropertyService.getAll();
      const allProperties = await propertyService.getAll();
      
      // Match saved property IDs with full property data
      const fullSavedProperties = savedItems
        .map(saved => {
          const property = allProperties.find(p => p.id === saved.propertyId);
          return property ? { ...property, savedDate: saved.savedDate } : null;
        })
        .filter(Boolean)
        .sort((a, b) => new Date(b.savedDate) - new Date(a.savedDate));

      setSavedProperties(fullSavedProperties);
    } catch (err) {
      setError(err.message || 'Failed to load saved properties');
      toast.error('Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveProperty = async (propertyId) => {
    try {
      await savedPropertyService.delete(propertyId);
      setSavedProperties(prev => prev.filter(p => p.id !== propertyId));
      toast.success('Property removed from saved');
    } catch (error) {
      toast.error('Failed to remove property');
    }
  };

  const clearAllSaved = async () => {
    if (window.confirm('Are you sure you want to remove all saved properties?')) {
      try {
        const promises = savedProperties.map(property => 
          savedPropertyService.delete(property.id)
        );
        await Promise.all(promises);
        setSavedProperties([]);
        toast.success('All saved properties removed');
      } catch (error) {
        toast.error('Failed to clear saved properties');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-full bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-200 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-lg shadow-sm h-80 animate-pulse"
                >
                  <div className="h-48 bg-surface-200 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                    <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                    <div className="h-4 bg-surface-200 rounded w-2/3"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-800 mb-2">Error Loading Saved Properties</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadSavedProperties}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-surface-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold text-surface-800 mb-2">
              Saved Properties
            </h1>
            <p className="text-surface-600 text-lg">
              {savedProperties.length} {savedProperties.length === 1 ? 'property' : 'properties'} saved for later
            </p>
          </motion.div>

          {savedProperties.length > 0 && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAllSaved}
              className="px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-colors flex items-center space-x-2"
            >
              <ApperIcon name="Trash2" className="w-4 h-4" />
              <span>Clear All</span>
            </motion.button>
          )}
        </div>

        {/* Content */}
        {savedProperties.length === 0 ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3 }}
              className="mb-6"
            >
              <ApperIcon name="Heart" className="w-20 h-20 text-surface-300 mx-auto" />
            </motion.div>
            <h3 className="font-display text-2xl font-semibold text-surface-800 mb-4">
              No Saved Properties Yet
            </h3>
            <p className="text-surface-600 mb-8 max-w-md mx-auto">
              Start browsing our listings and save your favorite properties to view them here later.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/browse'}
              className="px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center space-x-2 mx-auto"
            >
              <ApperIcon name="Search" className="w-5 h-5" />
              <span>Browse Properties</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {savedProperties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <PropertyCard property={property} />
                
                {/* Remove Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemoveProperty(property.id)}
                  className="absolute top-2 left-2 p-2 bg-error/90 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-error z-10"
                  title="Remove from saved"
                >
                  <ApperIcon name="Trash2" className="w-4 h-4" />
                </motion.button>

                {/* Saved Date Badge */}
                <div className="absolute bottom-4 right-4 bg-accent/90 text-white text-xs px-2 py-1 rounded">
                  Saved {new Date(property.savedDate).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats Section */}
        {savedProperties.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-white rounded-lg border border-surface-200 p-6"
          >
            <h3 className="font-display text-xl font-semibold text-surface-800 mb-4">
              Your Saved Properties Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {savedProperties.length}
                </div>
                <div className="text-sm text-surface-600">Total Saved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  ${new Intl.NumberFormat('en-US', { 
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0 
                  }).format(
                    savedProperties.reduce((avg, p) => avg + p.price, 0) / savedProperties.length
                  )}
                </div>
                <div className="text-sm text-surface-600">Avg Price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {Math.round(
                    savedProperties.reduce((avg, p) => avg + p.bedrooms, 0) / savedProperties.length
                  )}
                </div>
                <div className="text-sm text-surface-600">Avg Bedrooms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {new Intl.NumberFormat('en-US').format(
                    Math.round(
                      savedProperties.reduce((avg, p) => avg + p.squareFeet, 0) / savedProperties.length
                    )
                  )}
                </div>
                <div className="text-sm text-surface-600">Avg Sq Ft</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default SavedProperties;