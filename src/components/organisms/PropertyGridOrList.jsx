import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from '@/components/PropertyCard';

const PropertyGridOrList = ({ properties, viewMode }) => {
    return (
        <motion.div
            layout
            className={viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
            }
        >
            {properties.map((property, index) => (
                <motion.div
                    key={property.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    <PropertyCard property={property} viewMode={viewMode} />
                </motion.div>
            ))}
        </motion.div>
    );
};

export default PropertyGridOrList;