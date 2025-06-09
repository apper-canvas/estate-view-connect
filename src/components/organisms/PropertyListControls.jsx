import React from 'react';
import PropertyFilters from '@/components/PropertyFilters';
import Select from '@/components/atoms/Select';
import IconToggleButton from '@/components/molecules/IconToggleButton';

const PropertyListControls = ({
    filters,
    onFilterChange,
    onClearFilters,
    sortBy,
    setSortBy,
    viewMode,
    setViewMode
}) => {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <PropertyFilters
                filters={filters}
                onFilterChange={onFilterChange}
                onClearFilters={onClearFilters}
            />

            <div className="flex items-center space-x-4">
                {/* Sort Dropdown */}
                <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-surface-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="bedrooms-desc">Most Bedrooms</option>
                    <option value="newest">Newest First</option>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 bg-surface-100 rounded-lg p-1">
                    <IconToggleButton
                        iconName="Grid3X3"
                        onClick={() => setViewMode('grid')}
                        isActive={viewMode === 'grid'}
                    />
                    <IconToggleButton
                        iconName="List"
                        onClick={() => setViewMode('list')}
                        isActive={viewMode === 'list'}
                    />
                </div>
            </div>
        </div>
    );
};

export default PropertyListControls;