import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const PropertyNoResultsState = ({ onClearFilters }) => {
    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center py-12"
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
            >
                <ApperIcon name="Home" className="w-16 h-16 text-surface-300 mx-auto" />
            </motion.div>
            <Text tag="h3" className="mt-4 text-lg font-medium text-surface-800">No properties found</Text>
            <Text className="mt-2 text-surface-500">Try adjusting your search criteria or filters</Text>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={onClearFilters}
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Clear Filters
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default PropertyNoResultsState;