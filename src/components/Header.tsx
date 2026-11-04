import React from 'react';
import { ShoppingBag, MapPin } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-suafruti-950/95 backdrop-blur-md border-b border-suafruti-800/80 shadow-[0_6px_24px_rgba(7,36,18,0.28)]">
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 h-16 sm:h-[4.5rem] flex items-center justify-between gap-2">
        {/* Brand Identity */}
        <a
          href="#topo"
          className="flex items-center gap-2 group focus:outline-none shrink-0"
          aria-label="Suafruti Início"
        >
          <BrandLogo className="h-11 xs:h-12 sm:h-14 w-auto transition-transform duration-300 group-hover:scale-105" />
          <div className="hidden md:flex flex-col">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-suafruti-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Frutas fresquinhas hoje
            </span>
            <span className="text-xs text-suafruti-300/90">
              Cardápio Digital • Grande Vitória
            </span>
          </div>
        </a>

        {/* Desktop Quick Navigation */}
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

        {/* Right Actions: Active Delivery Badge + Basket / WhatsApp */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={onScrollToDelivery}
            className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-suafruti-800/90 hover:bg-suafruti-700 border border-suafruti-600/60 text-cream-50 text-xs font-semibold transition-colors"
            title="Alterar região de entrega"
          >
            <MapPin className="w-3.5 h-3.5 text-citrus-400 shrink-0" />
            <span className="max-w-[105px] sm:max-w-[150px] truncate">
              {selectedZone.name}
            </span>
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
              className="relative inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-gradient-to-r from-suafruti-500 to-emerald-500 hover:from-suafruti-400 hover:to-emerald-400 text-white text-xs sm:text-sm font-bold shadow-glow transition-all active:scale-95"
            >
              <ShoppingBag className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline tabular-price">
                {formatCurrency(cartSubtotal)}
              </span>
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-citrus-400 text-suafruti-950 text-xs font-extrabold">
                {cartCount}
              </span>
            </button>
          ) : (
            <a
              href={buildDirectGreetingWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-suafruti-950 text-xs sm:text-sm font-extrabold shadow-md transition-all active:scale-95"
            >
              <WhatsAppIcon className="w-4 h-4" />
              <span className="hidden xs:inline sm:inline">WhatsApp</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
};
