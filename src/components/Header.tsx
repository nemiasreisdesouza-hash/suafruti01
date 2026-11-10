import React from 'react';
import { ShoppingBag, MapPin, ChevronDown } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { WhatsAppIcon } from './WhatsAppIcon';
import { DeliveryZone } from '../data/menu';
import { buildDirectGreetingWhatsAppUrl, formatCurrency } from '../utils/whatsapp';

interface HeaderProps {
  cartCount: number;
  cartSubtotal: number;
  onOpenCart: () => void;
  selectedZone: DeliveryZone;
  onScrollToDelivery: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartSubtotal,
  onOpenCart,
  selectedZone,
  onScrollToDelivery,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full max-w-full bg-suafruti-950/95 backdrop-blur-md border-b border-suafruti-800/80 shadow-[0_6px_24px_rgba(7,36,18,0.28)]">
      {/* Main Top Bar: Clean 2-side layout on mobile so it NEVER clips even on 320px */}
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-14 md:h-[4.25rem] flex items-center justify-between gap-2 w-full">
        {/* Left: Brand Identity */}
        <a
          href="#topo"
          className="flex items-center gap-2.5 group focus:outline-none min-w-0 shrink-0"
          aria-label="Suafruti Início"
        >
          <BrandLogo className="h-10 sm:h-12 md:h-13 w-auto transition-transform duration-300 group-hover:scale-105" />
          <div className="hidden sm:flex flex-col min-w-0">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-suafruti-200 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              Frutas fresquinhas hoje
            </span>
            <span className="text-xs text-suafruti-300/90 hidden lg:inline truncate">
              Cardápio Digital • Vitória - ES
            </span>
          </div>
        </a>

        {/* Center: Desktop Quick Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-cream-100/90">
          <a
            href="#cardapio"
            className="hover:text-citrus-400 transition-colors"
          >
            Cardápio
          </a>
          <a
            href="#entregas"
            className="hover:text-citrus-400 transition-colors"
          >
            Taxas de Entrega
          </a>
          <a
            href="#diferenciais"
            className="hover:text-citrus-400 transition-colors"
          >
            Ingredientes
          </a>
        </nav>

        {/* Right: Desktop Delivery Selector + Cart/WhatsApp CTA */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Desktop/Tablet Delivery Pill (hidden on narrow mobile, shown in dedicated slim bar below) */}
          <button
            type="button"
            onClick={onScrollToDelivery}
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-suafruti-800/90 hover:bg-suafruti-700 border border-suafruti-600/60 text-cream-50 text-xs font-semibold transition-colors"
            title="Alterar região de entrega"
          >
            <MapPin className="w-3.5 h-3.5 text-citrus-400 shrink-0" />
            <span className="max-w-[140px] truncate">{selectedZone.name}</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                selectedZone.isFree
                  ? 'bg-citrus-400 text-suafruti-950'
                  : 'bg-suafruti-950/70 text-suafruti-200'
              }`}
            >
              {selectedZone.isFree ? 'Grátis' : formatCurrency(selectedZone.fee)}
            </span>
          </button>

          {cartCount > 0 ? (
            <button
              type="button"
              onClick={onOpenCart}
              className="relative inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-suafruti-500 to-emerald-500 hover:from-suafruti-400 hover:to-emerald-400 text-white text-xs sm:text-sm font-bold shadow-glow transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="tabular-price text-xs sm:text-sm">
                {formatCurrency(cartSubtotal)}
              </span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-citrus-400 text-suafruti-950 text-[11px] font-extrabold">
                {cartCount}
              </span>
            </button>
          ) : (
            <a
              href={buildDirectGreetingWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-suafruti-950 text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span>WhatsApp</span>
            </a>
          )}
        </div>
      </div>

      {/* Mobile Slim Delivery Strip: Full width, zero clipping, super readable */}
      <button
        type="button"
        onClick={onScrollToDelivery}
        className="md:hidden w-full bg-suafruti-900/95 border-t border-suafruti-800/80 px-3.5 py-1.5 flex items-center justify-between gap-2 text-left active:bg-suafruti-800 transition-colors"
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <MapPin className="w-3.5 h-3.5 text-citrus-400 shrink-0" />
          <span className="text-[11px] text-suafruti-200 shrink-0">
            Entrega:
          </span>
          <strong className="text-xs text-white font-bold truncate">
            {selectedZone.name}
          </strong>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
              selectedZone.isFree
                ? 'bg-citrus-400 text-suafruti-950'
                : 'bg-suafruti-800 text-suafruti-200 border border-suafruti-600'
            }`}
          >
            {selectedZone.isFree ? 'Grátis' : formatCurrency(selectedZone.fee)}
          </span>
          <span className="inline-flex items-center text-[11px] font-semibold text-citrus-400">
            Trocar
            <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
          </span>
        </div>
      </button>
    </header>
  );
};
