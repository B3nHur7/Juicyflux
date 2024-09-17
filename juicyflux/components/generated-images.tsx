'use client';

import React from 'react';
import { Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GeneratedImagesProps {
  images: string[];
  outputFormat: string;
  loading: boolean;
}

export function GeneratedImages({ images, outputFormat, loading }: GeneratedImagesProps) {
  const handleDownload = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `generated-image-${index + 1}.${outputFormat}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-32 h-32 relative">
              <div className="absolute inset-0 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              <div className="absolute inset-0 border-4 border-pink-500 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '1.5s' }}></div>
              <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" style={{ animationDuration: '2s' }}></div>
            </div>
          </motion.div>
        ) : images.length > 0 ? (
          <motion.div
            key="images"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <img 
                  src={image}
                  alt={`Generated image ${index + 1}`}
                  className="w-full h-auto object-contain rounded-lg shadow-lg"
                />
                <button 
                  className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-200 transition-colors"
                  onClick={() => handleDownload(image, index)}
                >
                  <Download size={20} />
                </button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center text-gray-400"
          >
            No images generated yet
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}