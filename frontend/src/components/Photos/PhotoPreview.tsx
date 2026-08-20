import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface PhotoPreviewProps {
  photo: string;
  onClose: () => void;
}

const PhotoPreview: React.FC<PhotoPreviewProps> = ({ photo, onClose }) => {
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="relative max-w-4xl w-full max-h-[90vh]"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors touch-manipulation z-10"
          aria-label="Close preview"
        >
          <X className="w-6 h-6" />
        </button>
        <img
          src={photo}
          alt="Preview"
          className="w-full h-full object-contain rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
};

export default PhotoPreview;
