import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ApperIcon from '../components/ApperIcon';

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-full bg-surface-50 flex items-center justify-center"
    >
      <div className="text-center py-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <ApperIcon name="Home" className="w-24 h-24 text-surface-300 mx-auto mb-6" />
          <h1 className="font-display text-6xl font-bold text-surface-800 mb-4">404</h1>
          <h2 className="font-display text-2xl font-semibold text-surface-700 mb-4">
            Property Not Found
          </h2>
          <p className="text-surface-600 max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <Link
            to="/browse"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-semibold"
          >
            <ApperIcon name="Search" className="w-5 h-5" />
            <span>Browse Properties</span>
          </Link>
          
          <div className="block">
            <Link
              to="/"
              className="text-surface-600 hover:text-primary transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;