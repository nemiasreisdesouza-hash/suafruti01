import React, { useState } from 'react';
import { BRAND_CONFIG } from '../data/menu';

interface BrandLogoProps {
  className?: string;
  priority?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-16 w-auto',
  priority = false,
}) => {
  const [step, setStep] = useState<'webp' | 'png' | 'imgur'>('webp');

  const src =
    step === 'webp'
      ? BRAND_CONFIG.logoWebp
      : step === 'png'
      ? BRAND_CONFIG.logoPng
      : BRAND_CONFIG.officialLogoImgur;

  const handleError = () => {
    if (step === 'webp') setStep('png');
    else if (step === 'png') setStep('imgur');
  };

  return (
    <img
      src={src}
      alt="Suafruti - O melhor sabor da natureza"
      loading={priority ? 'eager' : 'eager'}
      decoding="async"
      onError={handleError}
      data-official-logo={BRAND_CONFIG.officialLogoImgur}
      className={`${className} object-contain select-none ${
        step === 'imgur'
          ? 'rounded-2xl'
          : 'drop-shadow-[0_10px_22px_rgba(0,0,0,0.32)]'
      }`}
    />
  );
};
