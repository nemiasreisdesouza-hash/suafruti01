import React, { useState, useEffect } from 'react';

interface SmartImageProps {
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

export const SmartImage: React.FC<SmartImageProps> = ({
  webpSrc,
  fallbackSrc,
  alt,
  className = '',
  eager = true,
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(webpSrc || fallbackSrc);
  const [triedFallback, setTriedFallback] = useState<boolean>(false);

  useEffect(() => {
    setCurrentSrc(webpSrc || fallbackSrc);
    setTriedFallback(false);
  }, [webpSrc, fallbackSrc]);

  const handleError = () => {
    if (!triedFallback && fallbackSrc && currentSrc !== fallbackSrc) {
      setTriedFallback(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={handleError}
      className={className}
    />
  );
};
