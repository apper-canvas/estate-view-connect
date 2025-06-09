import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from './ApperIcon';
import { savedPropertyService } from '../services';

const PropertyCard = ({ property, viewMode = 'grid' }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleSaveProperty = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isSaved) {
        await savedPropertyService.delete(property.id);
        setIsSaved(false);
        toast.success('Property removed from saved');
      } else {
        await savedPropertyService.create({
          propertyId: property.id,
          savedDate: new Date().toISOString()
        });
        setIsSaved(true);
        toast.success('Property saved successfully');
      }
    } catch (error) {
      toast.error('Failed to update saved properties');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(price);
  };

  const formatSquareFeet = (sqft) => {
    return new Intl.NumberFormat('en-US').format(sqft);
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white rounded-lg shadow-sm border border-surface-200 overflow-hidden"
      >
        <Link to={`/property/${property.id}`} className="flex flex-col sm:flex-row">
          <div className="relative w-full sm:w-80 h-48 sm:h-auto">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-surface-200 animate-pulse"></div>
            )}
            <img
              src={property.images[0]}
              alt={property.title}
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
            
            {/* Save Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSaveProperty}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
            >
              <ApperIcon 
                name="Heart" 
                className={`w-5 h-5 transition-colors ${
                  isSaved ? 'text-accent fill-current' : 'text-surface-400'
                }`}
              />
            </motion.button>

            {/* Price Badge */}
            <div className="absolute bottom-3 left-3 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-semibold">
              {formatPrice(property.price)}
            </div>
          </div>

          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display font-semibold text-xl text-surface-800 line-clamp-1">
                {property.title}
              </h3>
            </div>

            <div className="flex items-center text-surface-600 mb-3">
              <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
              <span className="text-sm">{property.address}</span>
            </div>

            <div className="flex items-center space-x-6 mb-4">
              <div className="flex items-center text-surface-600">
                <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center text-surface-600">
                <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center text-surface-600">
                <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                <span className="text-sm">{formatSquareFeet(property.squareFeet)} sqft</span>
              </div>
            </div>

            <p className="text-surface-600 text-sm line-clamp-2 mb-4">
              {property.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs text-surface-500 bg-surface-100 px-2 py-1 rounded">
                {property.propertyType}
              </span>
              <span className="text-xs text-surface-500">
                Listed {new Date(property.listingDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      className="bg-white rounded-lg shadow-sm border border-surface-200 overflow-hidden group"
    >
      <Link to={`/property/${property.id}`}>
        <div className="relative">
          {!imageLoaded && (
            <div className="w-full h-48 bg-surface-200 animate-pulse"></div>
          )}
          <img
            src={property.images[0]}
            alt={property.title}
            onLoad={() => setImageLoaded(true)}
            className={`w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          
          {/* Save Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleSaveProperty}
            className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors z-10"
          >
            <ApperIcon 
              name="Heart" 
              className={`w-5 h-5 transition-colors ${
                isSaved ? 'text-accent fill-current' : 'text-surface-400'
              }`}
            />
          </motion.button>

          {/* Price Badge */}
          <div className="absolute bottom-3 left-3 bg-accent/90 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-semibold">
            {formatPrice(property.price)}
          </div>
        </div>

        <div className="p-4">
          <h3 className="font-display font-semibold text-lg text-surface-800 mb-2 line-clamp-1">
            {property.title}
          </h3>

          <div className="flex items-center text-surface-600 mb-3">
            <ApperIcon name="MapPin" className="w-4 h-4 mr-1" />
            <span className="text-sm line-clamp-1">{property.address}</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-surface-600">
                <ApperIcon name="Bed" className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bedrooms}</span>
              </div>
              <div className="flex items-center text-surface-600">
                <ApperIcon name="Bath" className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.bathrooms}</span>
              </div>
              <div className="flex items-center text-surface-600">
                <ApperIcon name="Square" className="w-4 h-4 mr-1" />
                <span className="text-sm">{formatSquareFeet(property.squareFeet)}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-surface-500 bg-surface-100 px-2 py-1 rounded">
              {property.propertyType}
            </span>
            <span className="text-xs text-surface-500">
              {new Date(property.listingDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;