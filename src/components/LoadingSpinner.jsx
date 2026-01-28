import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const LoadingSpinner = ({ size = 'md', message = 'Loading...' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 gap-4">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className={sizeClasses[size]}
      >
        <Heart className="w-full h-full text-[#FF6B6B]" fill="#FF6B6B" />
      </motion.div>
      {message && (
        <p className="text-[#0F4C75] font-medium">{message}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;