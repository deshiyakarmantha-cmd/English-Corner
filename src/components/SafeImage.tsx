import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  fallbackName: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Robust image component that guarantees rendering on GitHub Pages, Netlify,
 * subpath repositories, or local environments by trying multiple resolution strategies.
 */
export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackName,
  alt,
  className = '',
  loading = 'lazy',
}) => {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  // Candidate path strategies for GitHub Pages subpath vs root deployment
  const candidatePaths = [
    src,
    `./images/${fallbackName}`,
    `images/${fallbackName}`,
    `./assets/images/${fallbackName}`,
    `./assets/${fallbackName}`,
    `/images/${fallbackName}`,
    `/assets/${fallbackName}`,
  ];

  const handleError = () => {
    if (currentSrcIndex < candidatePaths.length - 1) {
      setCurrentSrcIndex(prev => prev + 1);
    }
  };

  return (
    <img
      src={candidatePaths[currentSrcIndex]}
      alt={alt}
      loading={loading}
      onError={handleError}
      className={className}
    />
  );
};
