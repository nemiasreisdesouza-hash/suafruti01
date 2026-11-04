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
  const [useImgurFallback, setUseImgurFallback] = useState(false);

  if (useImgurFallback) {
    return (
      <img
        src={BRAND_CONFIG.officialLogoImgur}
        alt="Suafruti - O melhor sabor da natureza"
        className={`${className} rounded-2xl object-contain`}
        data-official-logo={BRAND_CONFIG.officialLogoImgur}
      />
    );
  }

  return (
    <picture data-official-logo={BRAND_CONFIG.officialLogoImgur}>
      <source srcSet={BRAND_CONFIG.logoWebp} type="image/webp" />
      <img
        src={BRAND_CONFIG.logoPng}
        alt="Suafruti - O melhor sabor da natureza"
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        onError={() => setUseImgurFallback(true)}
        className={`${className} object-contain select-none drop-shadow-[0_10px_22px_rgba(0,0,0,0.32)]`}
      />
    </picture>
  );
};
