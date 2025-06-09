import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import PropertyCard from '../components/PropertyCard';
import { propertyService } from '../services';

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getAll();
      setProperties(result);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
      toast.error('Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (loading) {
    return (
      <div className="h-full bg-surface-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-surface-600">Loading map...</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-surface-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-surface-800 mb-2">Error Loading Map</h3>
          <p className="text-surface-600 mb-4">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadProperties}
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
      className="h-full bg-surface-50"
    >
      <div className="h-full flex">
        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Simulated Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-20" 
                 style={{
                   backgroundImage: `
                     linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                     linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                   `,
                   backgroundSize: '20px 20px'
                 }}>
            </div>
            
            {/* Property Markers */}
            {properties.map((property, index) => (
              <motion.div
                key={property.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className="absolute cursor-pointer"
                style={{
                  left: `${20 + (index % 3) * 30}%`,
                  top: `${20 + Math.floor(index / 3) * 25}%`
                }}
                onClick={() => setSelectedProperty(property)}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`bg-accent text-white px-3 py-2 rounded-lg shadow-lg font-semibold text-sm relative ${
                    selectedProperty?.id === property.id ? 'ring-2 ring-primary' : ''
                  }`}
                >
                  {formatPrice(property.price)}
                  {/* Marker Pointer */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-accent"></div>
                </motion.div>
              </motion.div>
            ))}

            {/* Map Controls */}
            <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2 space-y-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-surface-50 hover:bg-surface-100 rounded flex items-center justify-center transition-colors"
              >
                <ApperIcon name="Plus" className="w-4 h-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-8 h-8 bg-surface-50 hover:bg-surface-100 rounded flex items-center justify-center transition-colors"
              >
                <ApperIcon name="Minus" className="w-4 h-4" />
              </motion.button>
            </div>

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4">
              <h3 className="font-semibold text-sm text-surface-800 mb-2">Property Map</h3>
              <div className="flex items-center space-x-2 text-sm text-surface-600">
                <div className="w-4 h-4 bg-accent rounded"></div>
                <span>Available Properties</span>
              </div>
              <p className="text-xs text-surface-500 mt-2">
                Click markers to view details
              </p>
            </div>
          </div>
        </div>

        {/* Property Details Sidebar */}
        <div className="w-96 bg-white border-l border-surface-200 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-xl font-semibold text-surface-800">
                Properties on Map
              </h2>
              <span className="text-sm text-surface-500 bg-surface-100 px-2 py-1 rounded">
                {properties.length} listings
              </span>
            </div>

            {selectedProperty ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-surface-800">Selected Property</h3>
                  <button
                    onClick={() => setSelectedProperty(null)}
                    className="p-1 text-surface-400 hover:text-surface-600 transition-colors"
                  >
                    <ApperIcon name="X" className="w-4 h-4" />
                  </button>
                </div>
                <PropertyCard property={selectedProperty} viewMode="list" />
              </motion.div>
            ) : (
              <div className="mb-6 p-4 bg-surface-50 rounded-lg text-center">
                <ApperIcon name="MapPin" className="w-8 h-8 text-surface-300 mx-auto mb-2" />
                <p className="text-surface-600 text-sm">
                  Click on a property marker to view details
                </p>
              </div>
            )}

            {/* All Properties List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-surface-800">All Properties</h3>
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedProperty(property)}
                  className={`cursor-pointer transition-all ${
                    selectedProperty?.id === property.id
                      ? 'ring-2 ring-primary rounded-lg'
                      : 'hover:shadow-md'
                  }`}
                >
                  <PropertyCard property={property} viewMode="list" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MapView;