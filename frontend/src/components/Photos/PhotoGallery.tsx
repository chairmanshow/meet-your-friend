import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, X } from 'lucide-react';
import { usePhotos } from '../../hooks/usePhotos';
import PhotoPreview from './PhotoPreview';
import toast from 'react-hot-toast';

const PhotoGallery: React.FC = () => {
  const { photos, addPhoto, deletePhoto } = usePhotos();
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image too large! Max 10MB');
      return;
    }

    setIsUploading(true);
    try {
      await addPhoto(file);
      toast.success('Photo uploaded! 📸');
    } catch (error) {
      toast.error('Failed to upload photo');
      console.error('Upload error:', error);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            📸 Photo Gallery
          </h1>
          <label className="cursor-pointer glass-morphism px-4 py-2 rounded-full hover:shadow-lg transition-all touch-manipulation">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              disabled={isUploading}
            />
            <div className="flex items-center gap-2">
              {isUploading ? (
                <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Plus className="w-5 h-5" />
                  <span>Add Photo</span>
                </>
              )}
            </div>
          </label>
        </div>

        {photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-xl text-gray-600">No photos yet</h3>
            <p className="text-gray-400">Start capturing your memories!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id || index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group aspect-square"
              >
                <img
                  src={photo.url}
                  alt={`Memory ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer"
                  onClick={() => setSelectedPhoto(photo.url)}
                  loading="lazy"
                />
                <button
                  onClick={() => {
                    deletePhoto(photo.id);
                    toast.success('Photo deleted');
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity touch-manipulation"
                  aria-label="Delete photo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <PhotoPreview
            photo={selectedPhoto}
            onClose={() => setSelectedPhoto(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;
