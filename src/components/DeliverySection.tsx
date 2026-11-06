import React from 'react';
import { Truck, Gift, MapPin, Check } from 'lucide-react';
import { DELIVERY_ZONES, DeliveryZone } from '../data/menu';
import { formatCurrency } from '../utils/whatsapp';

interface DeliverySectionProps {
  selectedZone: DeliveryZone;
  onSelectZone: (zone: DeliveryZone) => void;
}

export const DeliverySection: React.FC<DeliverySectionProps> = ({
  selectedZone,
  onSelectZone,
}) => {
  return (
    <section
      id="entregas"
      className="py-12 sm:py-16 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-3.5 sm:px-6 w-full">
        <div className="relative rounded-3xl sm:rounded-[2rem] overflow-hidden bg-hero-tropical text-white p-4 sm:p-10 shadow-botanical-lg border border-suafruti-700/70 w-full">
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-citrus-400/15 blur-3xl"
          />

          <div className="relative flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-citrus-400 text-[11px] sm:text-xs font-extrabold uppercase tracking-wider mb-3">
                <Truck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">Entrega Rápida na Grande Vitória</span>
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-cream-50 leading-tight">
                Confira nossas Taxas de Entrega
              </h2>
              <p className="mt-1.5 text-xs sm:text-base text-suafruti-100/90 max-w-xl">
                Selecione abaixo a sua região para calcular automaticamente o valor no seu pedido pelo WhatsApp:
              </p>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-2 px-3.5 py-2.5 rounded-2xl bg-suafruti-950/75 border border-suafruti-700 text-xs sm:text-sm w-full md:w-auto max-w-full">
              <div className="flex items-center gap-1.5 min-w-0">
                <MapPin className="w-4 h-4 text-citrus-400 shrink-0" />
                <span className="text-suafruti-200 shrink-0">Região:</span>
                <strong className="text-white truncate">{selectedZone.name}</strong>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-citrus-400 text-suafruti-950 font-extrabold text-[11px] shrink-0">
                {selectedZone.isFree
                  ? 'GRÁTIS'
                  : formatCurrency(selectedZone.fee)}
              </span>
            </div>
          </div>

          {/* 3 Main Tier Highlights */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tier 1: Jesus de Nazareth — Free */}
            <button
              type="button"
              onClick={() => onSelectZone(DELIVERY_ZONES[0])}
              className={`group text-left p-5 rounded-3xl border-2 transition-all active:scale-[0.99] ${
                selectedZone.id === 'jesus-de-nazareth'
                  ? 'bg-gradient-to-br from-citrus-400/25 via-suafruti-800/90 to-suafruti-900 border-citrus-400 shadow-lg'
                  : 'bg-suafruti-900/70 border-suafruti-700/80 hover:border-citrus-400/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-2xl bg-citrus-400 text-suafruti-950 flex items-center justify-center shadow-md">
                  <Gift className="w-5 h-5 stroke-[2.4]" />
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-citrus-400 text-suafruti-950 text-xs font-black uppercase tracking-wider">
                  {selectedZone.id === 'jesus-de-nazareth' && (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                  Entrega Grátis
                </span>
              </div>
              <h3 className="mt-4 font-display font-extrabold text-xl text-white">
                Jesus de Nazareth
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-suafruti-200">
                No bairro Jesus de Nazareth a entrega é 100% gratuita!
              </p>
              <p className="mt-3 font-display font-black text-2xl text-citrus-400">
                R$ 0,00
              </p>
            </button>

            {/* Tier 2: Vitória — R$ 3,00 */}
            <button
              type="button"
              onClick={() => onSelectZone(DELIVERY_ZONES[1])}
              className={`group text-left p-5 rounded-3xl border-2 transition-all active:scale-[0.99] ${
                selectedZone.id === 'vitoria'
                  ? 'bg-gradient-to-br from-suafruti-600/35 via-suafruti-800/90 to-suafruti-900 border-suafruti-300 shadow-lg'
                  : 'bg-suafruti-900/70 border-suafruti-700/80 hover:border-suafruti-400/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-2xl bg-suafruti-500/30 border border-suafruti-400/40 text-suafruti-200 flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-suafruti-700 text-suafruti-100 text-xs font-extrabold">
                  {selectedZone.id === 'vitoria' && (
                    <Check className="w-3.5 h-3.5 stroke-[3] text-citrus-400" />
                  )}
                  Capital
                </span>
              </div>
              <h3 className="mt-4 font-display font-extrabold text-xl text-white">
                Vitória
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-suafruti-200">
                Taxa especial super acessível para todos os bairros de Vitória.
              </p>
              <p className="mt-3 font-display font-black text-2xl text-suafruti-300 tabular-price">
                R$ 3,00
              </p>
            </button>

            {/* Tier 3: Vila Velha, Serra e Cariacica — R$ 5,00 */}
            <div
              className={`text-left p-5 rounded-3xl border-2 transition-all ${
                ['vila-velha', 'serra', 'cariacica'].includes(selectedZone.id)
                  ? 'bg-gradient-to-br from-suafruti-600/35 via-suafruti-800/90 to-suafruti-900 border-suafruti-300 shadow-lg'
                  : 'bg-suafruti-900/70 border-suafruti-700/80'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-2xl bg-suafruti-500/30 border border-suafruti-400/40 text-suafruti-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-suafruti-700 text-suafruti-100 text-xs font-extrabold">
                  Grande Vitória
                </span>
              </div>
              <h3 className="mt-4 font-display font-extrabold text-xl text-white">
                Vila Velha, Serra e Cariacica
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-suafruti-200">
                Toque na sua cidade para selecionar a entrega:
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {DELIVERY_ZONES.slice(2).map((zone) => {
                  const active = selectedZone.id === zone.id;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      onClick={() => onSelectZone(zone)}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-extrabold border transition-all active:scale-95 ${
                        active
                          ? 'bg-citrus-400 border-citrus-400 text-suafruti-950 shadow'
                          : 'bg-suafruti-950/60 border-suafruti-600 text-cream-100 hover:border-suafruti-300'
                      }`}
                    >
                      {active && <Check className="w-3 h-3 stroke-[3]" />}
                      {zone.name}
                    </button>
                  );
                })}
              </div>

              <p className="mt-3 font-display font-black text-2xl text-suafruti-300 tabular-price">
                R$ 5,00
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
