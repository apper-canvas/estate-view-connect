import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { propertyService } from '@/services';
import SearchBar from '@/components/SearchBar';
import Text from '@/components/atoms/Text';
import Button from '@/components/atoms/Button';
import PropertyListControls from '@/components/organisms/PropertyListControls';
import PropertyLoadingState from '@/components/organisms/PropertyLoadingState';
import PropertyErrorState from '@/components/organisms/PropertyErrorState';
import PropertyNoResultsState from '@/components/organisms/PropertyNoResultsState';
import PropertyGridOrList from '@/components/organisms/PropertyGridOrList';

const PropertyListingSection = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    propertyTypes: [],
    minBedrooms: '',
    location: ''
  });
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('price-asc');

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [properties, searchTerm, filters, sortBy]);

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

  const applyFiltersAndSearch = () => {
    let filtered = [...properties];

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.propertyType.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.minPrice) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.maxPrice));
    }
    if (filters.propertyTypes.length > 0) {
      filtered = filtered.filter(property => filters.propertyTypes.includes(property.propertyType));
    }
    if (filters.minBedrooms) {
      filtered = filtered.filter(property => property.bedrooms >= parseInt(filters.minBedrooms));
    }
    if (filters.location) {
      filtered = filtered.filter(property =>
        property.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'bedrooms-desc':
          return b.bedrooms - a.bedrooms;
        case 'newest':
          return new Date(b.listingDate) - new Date(a.listingDate);
        default:
          return 0;
      }
    });

    setFilteredProperties(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      propertyTypes: [],
      minBedrooms: '',
      location: ''
    });
    setSearchTerm('');
  };

  if (loading) {
    return <PropertyLoadingState />;
  }

  if (error) {
    return <PropertyErrorState error={error} onRetry={loadProperties} />;
  }

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <SearchBar onSearch={handleSearch} searchTerm={searchTerm} />

      {/* Filters and Controls */}
      <PropertyListControls
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <Text className="text-surface-600">
          {filteredProperties.length} properties found
        </Text>
        {(searchTerm || Object.values(filters).some(f => f && f.length > 0)) && (
          <Button
            onClick={clearFilters}
            className="text-primary hover:text-primary/80 text-sm font-medium"
          >
            Clear all filters
          </Button>
        )}
      </div>

      {/* Properties Grid/List or No Results */}
      {filteredProperties.length === 0 ? (
        <PropertyNoResultsState onClearFilters={clearFilters} />
      ) : (
        <PropertyGridOrList properties={filteredProperties} viewMode={viewMode} />
      )}
    </div>
  );
};

export default PropertyListingSection;