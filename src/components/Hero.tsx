import React from 'react';
import { Sparkles, Truck, CheckCircle2, ArrowDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { SmartImage } from './SmartImage';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BRAND_CONFIG, HERO_PREVIEW_IMAGES } from '../data/menu';
import { buildDirectGreetingWhatsAppUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section
      id="topo"
      className="relative w-full max-w-full overflow-hidden bg-hero-tropical text-white pt-5 pb-12 sm:pt-10 sm:pb-20"
    >
      {/* Contained Decorative Botanical Leaves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          viewBox="0 0 260 260"
          className="absolute -top-12 -left-16 w-48 sm:w-56 h-48 sm:h-56 text-suafruti-500/15 rotate-12"
          fill="currentColor"
        >
          <path d="M228 24C140 20 58 68 28 158c-8 24-10 50-8 74 24 2 50 0 74-8 90-30 138-112 134-200ZM62 196c28-56 76-102 136-132-46 42-88 86-136 132Z" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 260 260"
          className="absolute bottom-10 -right-16 w-52 sm:w-64 h-52 sm:h-64 text-citrus-400/10 -rotate-45"
          fill="currentColor"
        >
          <path d="M228 24C140 20 58 68 28 158c-8 24-10 50-8 74 24 2 50 0 74-8 90-30 138-112 134-200ZM62 196c28-56 76-102 136-132-46 42-88 86-136 132Z" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 lg:gap-10 items-center">
          {/* Brand Emblem + Headline Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left min-w-0">
            {/* Official Logo Spotlight */}
            <div className="relative mb-3.5 sm:mb-5 max-w-full flex justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-105 rounded-full bg-gradient-to-tr from-suafruti-400/30 via-citrus-400/25 to-transparent blur-2xl"
              />
              <BrandLogo
                priority
                className="relative w-56 xs:w-64 sm:w-80 md:w-[21rem] max-w-[76vw] h-auto animate-float-slow"
              />
            </div>

            {/* Freshness Pill */}
            <div className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-citrus-400 text-[11px] sm:text-sm font-bold tracking-wide mb-3 max-w-full">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">
                Frutas cortadas fresquinhas todo dia
              </span>
            </div>

            <h1 className="font-display font-black text-[1.85rem] xs:text-[2.1rem] sm:text-5xl lg:text-[3.35rem] leading-[1.1] tracking-tight text-cream-50 max-w-full">
              Sua pausa mais{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-suafruti-300 via-citrus-400 to-suafruti-200 italic">
                gostosa
              </span>{' '}
              e natural!
            </h1>

            <p className="mt-3 text-sm sm:text-base md:text-lg text-suafruti-100/90 max-w-xl leading-relaxed">
              Saladas de frutas selecionadas, sobremesas cremosas especiais,{' '}
              <strong>Berry Cream</strong>, <strong>Manga Temperada</strong>, Overnight e caixas de morangos frescos. Escolha no cardápio e peça direto pelo WhatsApp!
            </p>

            {/* Primary CTAs: Full-width stacked on mobile (<640px) so text never wraps or clips */}
            <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
              <a
                href="#cardapio"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-citrus-400 to-amber-400 hover:from-amber-300 hover:to-citrus-400 text-suafruti-950 font-extrabold text-sm sm:text-base shadow-[0_12px_28px_-6px_rgba(251,191,36,0.45)] transition-all active:scale-[0.98]"
              >
                <span>Ver Cardápio e Preços</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>

              <a
                href={buildDirectGreetingWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366] shrink-0" />
                <span>Pedir pelo WhatsApp</span>
              </a>
            </div>

            {/* Trust & Delivery Highlights */}
            <div className="mt-5 sm:mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-xl">
              <a
                href="#entregas"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-suafruti-900/75 border border-suafruti-700/70 hover:border-citrus-400/60 transition-colors text-left min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-citrus-400/20 text-citrus-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-citrus-400 truncate">
                    Entrega Grátis
                  </p>
                  <p className="text-xs font-semibold text-cream-50 truncate">
                    Jesus de Nazareth
                  </p>
                </div>
              </a>

              <a
                href="#entregas"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-suafruti-900/75 border border-suafruti-700/70 hover:border-suafruti-400/60 transition-colors text-left min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-suafruti-500/25 text-suafruti-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-suafruti-300 truncate">
                    Entrega em Vitória
                  </p>
                  <p className="text-xs font-semibold text-cream-50 truncate">
                    Taxa fixa de R$ 5,00
                  </p>
                </div>
              </a>

              <a
                href="#produto-caixa-morango"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-suafruti-900/75 border border-suafruti-700/70 hover:border-rose-400/60 transition-colors text-left min-w-0"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/25 text-rose-300 flex items-center justify-center shrink-0 font-extrabold text-xs">
                  4x
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-rose-300 truncate">
                    Caixa Morango
                  </p>
                  <p className="text-xs font-semibold text-cream-50 truncate">
                    4 bandejas a partir R$ 40
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Visual Collage */}
          <div className="lg:col-span-5 min-w-0 w-full">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 max-w-md mx-auto lg:max-w-none w-full">
              <a
                href="#produto-berry-cream"
                className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-citrus-400/70 shadow-2xl aspect-[4/4.6] bg-suafruti-900 min-w-0"
              >
                <SmartImage
                  webpSrc={HERO_PREVIEW_IMAGES.berryCream.webp}
                  fallbackSrc={HERO_PREVIEW_IMAGES.berryCream.jpg}
                  alt="SuaFruti Berry Cream"
                  eager
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-suafruti-950/90 via-suafruti-950/20 to-transparent" />
                <div className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full bg-berry-600 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wide text-white shadow">
                  Novidade
                </div>
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <p className="font-display font-bold text-xs sm:text-base text-white leading-snug">
                    Berry Cream
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-citrus-400 font-bold">
                    Cremoso • R$ 25,00
                  </p>
                </div>
              </a>

              <div className="flex flex-col gap-2.5 sm:gap-4 min-w-0">
                <a
                  href="#produto-manga-temperada"
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl flex-1 min-h-[120px] sm:min-h-[135px] bg-suafruti-900"
                >
                  <SmartImage
                    webpSrc={HERO_PREVIEW_IMAGES.mangaTemperada.webp}
                    fallbackSrc={HERO_PREVIEW_IMAGES.mangaTemperada.jpg}
                    alt="Manga Temperada Suafruti"
                    eager
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-suafruti-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <p className="font-display font-bold text-xs sm:text-sm text-white leading-tight">
                      Manga Temperada
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-citrus-400 font-semibold">
                      300 ml • R$ 18,00
                    </p>
                  </div>
                </a>

                <a
                  href="#produto-salada-tradicional"
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl flex-1 min-h-[120px] sm:min-h-[135px] bg-suafruti-900"
                >
                  <SmartImage
                    webpSrc={HERO_PREVIEW_IMAGES.tradicional.webp}
                    fallbackSrc={HERO_PREVIEW_IMAGES.tradicional.jpg}
                    alt="Salada Tradicional da Casa Suafruti"
                    eager
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-suafruti-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2.5 right-2.5">
                    <p className="font-display font-bold text-xs sm:text-sm text-white leading-tight">
                      Salada da Casa
                    </p>
                    <p className="text-[10px] sm:text-[11px] text-suafruti-200 font-semibold">
                      Completa • R$ 20,00
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-suafruti-200/80 italic">
              “{BRAND_CONFIG.footerTagline}”
            </p>
          </div>
        </div>
      </div>

      {/* Organic Curved Botanical Wave Transition into Cream Canvas */}
      <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none">
        <svg
          viewBox="0 0 1440 72"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-12"
          preserveAspectRatio="none"
        >
          <path
            d="M0 38C240 78 480 6 720 32C960 58 1200 74 1440 22V72H0V38Z"
            fill="#F6FAF1"
          />
        </svg>
      </div>
    </section>
  );
};
