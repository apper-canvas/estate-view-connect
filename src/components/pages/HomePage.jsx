import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from '@/components/organisms/HeroSection';
import PropertyListingSection from '@/components/organisms/PropertyListingSection';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-surface-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <PropertyListingSection />
      </div>
    </motion.div>
  );
};

export default HomePage;