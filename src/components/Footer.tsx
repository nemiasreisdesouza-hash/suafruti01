import React from 'react';
import { Globe, Instagram, MapPin } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BRAND_CONFIG } from '../data/menu';
import { buildDirectGreetingWhatsAppUrl } from '../utils/whatsapp';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-suafruti-950 text-cream-100 pt-14 pb-28 sm:pb-14 overflow-hidden">
      {/* Top Curved Wave */}
      <div className="absolute top-0 left-0 right-0 leading-none pointer-events-none rotate-180">
        <svg
          viewBox="0 0 1440 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-9"
          preserveAspectRatio="none"
        >
          <path
            d="M0 28C320 62 640 0 960 28C1200 48 1340 42 1440 16V54H0V28Z"
            fill="#F6FAF1"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b border-suafruti-800/80">
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <BrandLogo className="h-24 sm:h-28 w-auto" />
            <p className="mt-2 font-display italic text-lg text-citrus-400">
              “{BRAND_CONFIG.footerTagline}”
            </p>
            <p className="mt-1.5 text-xs text-suafruti-300 flex items-start md:items-center justify-center md:justify-start gap-1.5 max-w-md">
              <MapPin className="w-3.5 h-3.5 text-suafruti-400 shrink-0 mt-0.5 md:mt-0" />
              <span>
                Entregas em Jesus de Nazareth (Grátis), Vitória, Vila Velha, Serra e Cariacica
              </span>
            </p>
          </div>

          {/* Contact Pills Inspired by Flyer Footer */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3">
            <a
              href={buildDirectGreetingWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-suafruti-950 font-extrabold text-sm shadow-md transition-transform active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span>{BRAND_CONFIG.whatsappDisplay}</span>
            </a>

            <a
              href={BRAND_CONFIG.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-suafruti-900 hover:bg-suafruti-800 border border-suafruti-700 text-cream-50 font-bold text-sm transition-colors"
            >
              <Instagram className="w-4 h-4 text-citrus-400" />
              <span>{BRAND_CONFIG.instagramHandle}</span>
            </a>

            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-suafruti-900/70 border border-suafruti-800 text-suafruti-200 font-semibold text-sm">
              <Globe className="w-4 h-4 text-suafruti-400" />
              <span>{BRAND_CONFIG.websiteDisplay}</span>
            </span>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-suafruti-400 text-center">
          <p>
            © {new Date().getFullYear()} {BRAND_CONFIG.name} •{' '}
            {BRAND_CONFIG.slogan}
          </p>
          <p>Cardápio Digital Oficial • Pedidos rápidos pelo WhatsApp</p>
        </div>
      </div>
    </footer>
  );
};
