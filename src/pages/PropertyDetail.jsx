import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../components/ApperIcon';
import ImageGallery from '../components/ImageGallery';
import { propertyService, savedPropertyService } from '../services';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    loadProperty();
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await propertyService.getById(id);
      setProperty(result);
    } catch (err) {
      setError(err.message || 'Property not found');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProperty = async () => {
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

  const handleContactInquiry = () => {
    toast.success('Contact inquiry sent! The agent will reach out to you soon.');
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

  if (loading) {
    return (
      <div className="min-h-full bg-surface-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-surface-200 rounded w-1/4"></div>
            <div className="h-96 bg-surface-200 rounded-lg"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-6 bg-surface-200 rounded w-3/4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-surface-200 rounded"></div>
                  <div className="h-4 bg-surface-200 rounded w-5/6"></div>
                  <div className="h-4 bg-surface-200 rounded w-4/6"></div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-32 bg-surface-200 rounded-lg"></div>
                <div className="h-12 bg-surface-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-full bg-surface-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <ApperIcon name="Home" className="w-16 h-16 text-surface-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-surface-800 mb-2">Property Not Found</h2>
          <p className="text-surface-600 mb-6">
            {error || 'The property you are looking for does not exist.'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/browse')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Browse Properties
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-surface-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -5 }}
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-surface-600 hover:text-primary transition-colors mb-6"
        >
          <ApperIcon name="ArrowLeft" className="w-5 h-5" />
          <span>Back to listings</span>
        </motion.button>

        {/* Image Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ImageGallery images={property.images} title={property.title} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Property Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-surface-800 mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center text-surface-600 mb-3">
                    <ApperIcon name="MapPin" className="w-5 h-5 mr-2" />
                    <span className="text-lg">{property.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {formatPrice(property.price)}
                  </div>
                  <div className="text-sm text-surface-500">
                    ${Math.round(property.price / property.squareFeet)}/sqft
                  </div>
                </div>
              </div>

              {/* Property Stats */}
              <div className="flex flex-wrap items-center gap-6 p-4 bg-white rounded-lg border border-surface-200">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Bed" className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{property.bedrooms}</span>
                  <span className="text-surface-600">Bedrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Bath" className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{property.bathrooms}</span>
                  <span className="text-surface-600">Bathrooms</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Square" className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{formatSquareFeet(property.squareFeet)}</span>
                  <span className="text-surface-600">Sq Ft</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Car" className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{property.parking}</span>
                  <span className="text-surface-600">Parking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Calendar" className="w-5 h-5 text-primary" />
                  <span className="font-semibold">{property.yearBuilt}</span>
                  <span className="text-surface-600">Built</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg border border-surface-200 p-6">
              <h2 className="font-display text-2xl font-semibold text-surface-800 mb-4">
                About This Property
              </h2>
              <p className="text-surface-600 leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg border border-surface-200 p-6">
              <h2 className="font-display text-2xl font-semibold text-surface-800 mb-4">
                Features & Amenities
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    className="flex items-center space-x-3"
                  >
                    <ApperIcon name="Check" className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-surface-700">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Property Details Card */}
            <div className="bg-white rounded-lg border border-surface-200 p-6">
              <h3 className="font-semibold text-lg text-surface-800 mb-4">Property Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-surface-600">Type:</span>
                  <span className="font-medium">{property.propertyType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Listed:</span>
                  <span className="font-medium">
                    {new Date(property.listingDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-surface-600">Price/sqft:</span>
                  <span className="font-medium">
                    ${Math.round(property.price / property.squareFeet)}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContactInquiry}
                className="w-full px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <ApperIcon name="MessageCircle" className="w-5 h-5" />
                <span>Contact Agent</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSaveProperty}
                className={`w-full px-6 py-3 rounded-lg transition-colors font-semibold flex items-center justify-center space-x-2 ${
                  isSaved
                    ? 'bg-accent text-white hover:bg-accent/90'
                    : 'bg-surface-100 text-surface-700 hover:bg-surface-200'
                }`}
              >
                <ApperIcon 
                  name="Heart" 
                  className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`}
                />
                <span>{isSaved ? 'Saved' : 'Save Property'}</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-surface-100 text-surface-700 rounded-lg hover:bg-surface-200 transition-colors font-semibold flex items-center justify-center space-x-2"
              >
                <ApperIcon name="Share2" className="w-5 h-5" />
                <span>Share Property</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;