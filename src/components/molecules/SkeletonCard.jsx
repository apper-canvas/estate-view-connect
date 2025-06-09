import React from 'react';
import { motion } from 'framer-motion';

const SkeletonCard = ({ index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm h-80 animate-pulse"
        >
            <div className="h-48 bg-surface-200 rounded-t-lg"></div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-surface-200 rounded w-3/4"></div>
                <div className="h-4 bg-surface-200 rounded w-1/2"></div>
                <div className="h-4 bg-surface-200 rounded w-2/3"></div>
            </div>
        </motion.div>
    );
};

export default SkeletonCard;