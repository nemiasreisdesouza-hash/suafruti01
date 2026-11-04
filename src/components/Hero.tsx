import React from 'react';
import { Sparkles, Truck, CheckCircle2, ArrowDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BRAND_CONFIG } from '../data/menu';
import { buildDirectGreetingWhatsAppUrl } from '../utils/whatsapp';

export const Hero: React.FC = () => {
  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-hero-tropical text-white pt-6 pb-14 sm:pt-10 sm:pb-20"
    >
      {/* Decorative organic botanical leaf silhouettes */}
      <svg
        aria-hidden="true"
        viewBox="0 0 260 260"
        className="pointer-events-none absolute -top-12 -left-16 w-56 h-56 text-suafruti-500/15 rotate-12"
        fill="currentColor"
      >
        <path d="M228 24C140 20 58 68 28 158c-8 24-10 50-8 74 24 2 50 0 74-8 90-30 138-112 134-200ZM62 196c28-56 76-102 136-132-46 42-88 86-136 132Z" />
      </svg>
      <svg
        aria-hidden="true"
        viewBox="0 0 260 260"
        className="pointer-events-none absolute bottom-10 -right-16 w-64 h-64 text-citrus-400/10 -rotate-45"
        fill="currentColor"
      >
        <path d="M228 24C140 20 58 68 28 158c-8 24-10 50-8 74 24 2 50 0 74-8 90-30 138-112 134-200ZM62 196c28-56 76-102 136-132-46 42-88 86-136 132Z" />
      </svg>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Brand Emblem + Headline Column */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Official Logo Spotlight */}
            <div className="relative mb-4 sm:mb-5">
              <div
                aria-hidden="true"
                className="absolute inset-0 scale-110 rounded-full bg-gradient-to-tr from-suafruti-400/30 via-citrus-400/25 to-transparent blur-2xl"
              />
              <BrandLogo
                priority
                className="relative w-64 sm:w-80 md:w-[22rem] h-auto animate-float-slow"
              />
            </div>

            {/* Freshness Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-citrus-400 text-xs sm:text-sm font-bold tracking-wide mb-3.5">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Frutas higienizadas e cortadas fresquinhas todo dia</span>
            </div>

            <h1 className="font-display font-black text-3xl sm:text-5xl lg:text-[3.35rem] leading-[1.08] tracking-tight text-cream-50">
              Sua pausa mais{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-suafruti-300 via-citrus-400 to-suafruti-200 italic">
                gostosa
              </span>{' '}
              e natural!
            </h1>

            <p className="mt-3.5 text-sm sm:text-base md:text-lg text-suafruti-100/90 max-w-xl leading-relaxed">
              Potes caprichados de <strong>250 ml</strong> e <strong>300 ml</strong> com frutas selecionadas, Overnight cremoso e caixas fechadas de morangos frescos. Escolha no cardápio e peça direto pelo WhatsApp!
            </p>

            {/* Primary CTAs */}
            <div className="mt-6 flex flex-col xs:flex-row sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
              <a
                href="#cardapio"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-citrus-400 to-amber-400 hover:from-amber-300 hover:to-citrus-400 text-suafruti-950 font-extrabold text-sm sm:text-base shadow-[0_12px_28px_-6px_rgba(251,191,36,0.45)] transition-all active:scale-[0.98]"
              >
                <span>Ver Cardápio e Preços</span>
                <ArrowDown className="w-4 h-4" />
              </a>

              <a
                href={buildDirectGreetingWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white/12 hover:bg-white/20 border border-white/25 text-white font-bold text-sm sm:text-base backdrop-blur-sm transition-all active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5 text-[#25D366]" />
                <span>Pedir pelo WhatsApp</span>
              </a>
            </div>

            {/* Trust & Delivery Highlights */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2.5 w-full max-w-xl">
              <a
                href="#entregas"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-suafruti-900/75 border border-suafruti-700/70 hover:border-citrus-400/60 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-citrus-400/20 text-citrus-400 flex items-center justify-center shrink-0">
                  <Truck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-citrus-400">
                    Entrega Grátis
                  </p>
                  <p className="text-xs font-semibold text-cream-50">
                    Jesus de Nazareth
                  </p>
                </div>
              </a>

              <a
                href="#entregas"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-suafruti-900/75 border border-suafruti-700/70 hover:border-suafruti-400/60 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-suafruti-500/25 text-suafruti-300 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-suafruti-300">
                    Grande Vitória
                  </p>
                  <p className="text-xs font-semibold text-cream-50">
                    Taxas de R$ 3 a R$ 5
                  </p>
                </div>
              </a>

              <a
                href="#cardapio"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-suafruti-900/75 border border-suafruti-700/70 hover:border-rose-400/60 transition-colors text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-500/25 text-rose-300 flex items-center justify-center shrink-0 font-extrabold text-xs">
                  4x
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider font-extrabold text-rose-300">
                    Caixa Morango
                  </p>
                  <p className="text-xs font-semibold text-cream-50">
                    4 bandejas a partir R$ 40
                  </p>
                </div>
              </a>
            </div>
          </div>

          {/* Right Visual Collage (Visible on Desktop & Tablet, Sleek Horizontal Preview on Mobile) */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 max-w-md mx-auto lg:max-w-none">
              <a
                href="#produto-salada-tradicional"
                className="group relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl aspect-[4/4.4] bg-suafruti-900"
              >
                <picture>
                  <source srcSet="/images/salada-tradicional.webp" type="image/webp" />
                  <img
                    src="/images/salada-tradicional.jpg"
                    alt="Salada de Frutas Tradicional Suafruti"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-suafruti-950/90 via-suafruti-950/20 to-transparent" />
                <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-suafruti-700/95 text-[11px] font-extrabold text-white shadow">
                  A partir de R$ 12
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="font-display font-bold text-sm sm:text-base text-white leading-snug">
                    Salada Tradicional
                  </p>
                  <p className="text-[11px] text-suafruti-200">
                    8 frutas + adicionais
                  </p>
                </div>
              </a>

              <div className="flex flex-col gap-3 sm:gap-4">
                <a
                  href="#produto-salada-overnight"
                  className="group relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl flex-1 min-h-[135px] bg-suafruti-900"
                >
                  <picture>
                    <source srcSet="/images/salada-overnight.webp" type="image/webp" />
                    <img
                      src="/images/salada-overnight.jpg"
                      alt="Salada Overnight Suafruti"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-suafruti-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 flex items-end justify-between gap-1">
                    <div>
                      <p className="font-display font-bold text-sm text-white leading-tight">
                        Overnight
                      </p>
                      <p className="text-[11px] text-citrus-400 font-semibold">
                        R$ 18 • R$ 20
                      </p>
                    </div>
                  </div>
                </a>

                <a
                  href="#produto-caixa-morango"
                  className="group relative rounded-3xl overflow-hidden border-2 border-white/15 shadow-2xl flex-1 min-h-[135px] bg-suafruti-900"
                >
                  <picture>
                    <source srcSet="/images/caixa-morango.webp" type="image/webp" />
                    <img
                      src="/images/caixa-morango.jpg"
                      alt="Caixa de Morango com 4 bandejas Suafruti"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-suafruti-950/90 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3">
                    <p className="font-display font-bold text-sm text-white leading-tight">
                      Caixa de Morango
                    </p>
                    <p className="text-[11px] text-rose-300 font-semibold">
                      4 bandejas • R$ 40 / R$ 45
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
          className="w-full h-7 sm:h-12 preserve-3d"
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
