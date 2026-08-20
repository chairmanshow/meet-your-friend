import { useState, useEffect } from 'react';
import { Photo } from '../types';
import { compressImage } from '../utils/helpers';

const STORAGE_KEY = 'meet_your_friend_photos';

export const usePhotos = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    // Load photos from localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setPhotos(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load photos:', error);
        setPhotos([]);
      }
    }
  }, []);

  const savePhotos = (newPhotos: Photo[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newPhotos));
      setPhotos(newPhotos);
    } catch (error) {
      console.error('Failed to save photos:', error);
    }
  };

  const addPhoto = async (file: File) => {
    const compressed = await compressImage(file);
    const newPhoto: Photo = {
      id: Date.now().toString(),
      url: compressed,
      createdAt: new Date().toISOString(),
    };
    savePhotos([...photos, newPhoto]);
  };

  const deletePhoto = (id: string) => {
    savePhotos(photos.filter(photo => photo.id !== id));
  };

  return { photos, addPhoto, deletePhoto };
};
