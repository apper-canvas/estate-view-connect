import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';

const PropertyErrorState = ({ error, onRetry }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
        >
            <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto mb-4" />
            <Text tag="h3" className="text-lg font-semibold text-surface-800 mb-2">Error Loading Properties</Text>
            <Text className="text-surface-600 mb-4">{error}</Text>
            <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <Button
                    onClick={onRetry}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    Try Again
                </Button>
            </motion.div>
        </motion.div>
    );
};

export default PropertyErrorState;