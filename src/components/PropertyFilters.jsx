import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from './ApperIcon';

const PropertyFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const [isOpen, setIsOpen] = useState(false);

  const propertyTypes = ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa'];

  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    onFilterChange(newFilters);
  };

  const handlePropertyTypeToggle = (type) => {
    const currentTypes = filters.propertyTypes || [];
    const newTypes = currentTypes.includes(type)
      ? currentTypes.filter(t => t !== type)
      : [...currentTypes, type];
    handleFilterUpdate('propertyTypes', newTypes);
  };

  const hasActiveFilters = Object.values(filters).some(value => 
    value && (Array.isArray(value) ? value.length > 0 : true)
  );

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
          hasActiveFilters || isOpen
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-surface-300 bg-white text-surface-600 hover:border-surface-400'
        }`}
      >
        <ApperIcon name="Filter" className="w-4 h-4" />
        <span className="font-medium">Filters</span>
        {hasActiveFilters && (
          <span className="bg-accent text-white text-xs px-2 py-1 rounded-full">
            {Object.values(filters).filter(value => 
              value && (Array.isArray(value) ? value.length > 0 : true)
            ).length}
          </span>
        )}
        <ApperIcon 
          name="ChevronDown" 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-surface-200 p-6 z-30"
          >
            <div className="space-y-6">
              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Price Range
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterUpdate('minPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-surface-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterUpdate('maxPrice', e.target.value)}
                      className="w-full px-3 py-2 border border-surface-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Property Type
                </label>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={(filters.propertyTypes || []).includes(type)}
                        onChange={() => handlePropertyTypeToggle(type)}
                        className="rounded border-surface-300 text-primary focus:ring-primary focus:ring-2"
                      />
                      <span className="ml-2 text-sm text-surface-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Minimum Bedrooms */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Minimum Bedrooms
                </label>
                <select
                  value={filters.minBedrooms}
                  onChange={(e) => handleFilterUpdate('minBedrooms', e.target.value)}
                  className="w-full px-3 py-2 border border-surface-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Enter city, neighborhood, or ZIP"
                  value={filters.location}
                  onChange={(e) => handleFilterUpdate('location', e.target.value)}
                  className="w-full px-3 py-2 border border-surface-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-surface-200">
                <button
                  onClick={() => {
                    onClearFilters();
                    setIsOpen(false);
                  }}
                  className="text-sm text-surface-600 hover:text-surface-800 transition-colors"
                >
                  Clear All
                </button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors text-sm font-medium"
                >
                  Apply Filters
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PropertyFilters;