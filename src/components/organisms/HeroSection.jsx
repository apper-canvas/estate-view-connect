import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div className="mb-8">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-3xl md:text-4xl font-bold text-surface-800 mb-2"
            >
                Find Your Dream Home
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-surface-600 text-lg"
            >
                Discover the perfect property from our curated collection of premium listings
            </motion.p>
        </div>
    );
};

export default HeroSection;