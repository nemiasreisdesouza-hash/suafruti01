import React, { useState } from 'react';
import { Check, Plus, SlidersHorizontal, Sparkles, PackageCheck } from 'lucide-react';
import {
  DeliveryZone,
  FRUIT_DOT_COLORS,
  MenuProduct,
} from '../data/menu';
import {
  buildSingleItemWhatsAppUrl,
  formatCurrency,
} from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ProductCardProps {
  product: MenuProduct;
  selectedZone: DeliveryZone;
  onAddToCart: (config: {
    product: MenuProduct;
    variantId: string;
    selectedSingleFruit?: string;
    selectedAddons: string[];
    removedFruits: string[];
    notes: string;
    quantity: number;
  }) => void;
  onOpenModal: (
    product: MenuProduct,
    initialVariantId: string,
    initialSingleFruit?: string,
    initialAddons?: string[]
  ) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  selectedZone,
  onAddToCart,
  onOpenModal,
}) => {
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.defaultVariantId
  );
  const [selectedSingleFruitId, setSelectedSingleFruitId] = useState<string>(
    product.singleFruitChoices?.[0]?.id ?? ''
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];

  const activeFruitChoice = product.singleFruitChoices?.find(
    (f) => f.id === selectedSingleFruitId
  );

  const displayWebp = activeFruitChoice
    ? activeFruitChoice.imageWebp
    : product.imageWebp;
  const displayJpg = activeFruitChoice
    ? activeFruitChoice.imageJpg
    : product.imageJpg;

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const handleQuickAddToCart = () => {
    onAddToCart({
      product,
      variantId: activeVariant.id,
      selectedSingleFruit: activeFruitChoice?.name,
      selectedAddons,
      removedFruits: [],
      notes: '',
      quantity: 1,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const directWhatsAppHref = buildSingleItemWhatsAppUrl({
    productName: product.name,
    variantLabel: activeVariant.label,
    unitPrice: activeVariant.price,
    quantity: 1,
    selectedSingleFruit: activeFruitChoice?.name,
    selectedAddons,
    deliveryZone: selectedZone,
  });

  const badgeColors = {
    emerald: 'bg-suafruti-800 text-cream-50 border-suafruti-600/50',
    gold: 'bg-amber-400 text-suafruti-950 border-amber-300',
    berry: 'bg-berry-600 text-white border-rose-400/40',
  }[product.badgeTone];

  return (
    <article
      id={`produto-${product.id}`}
      className="group relative flex flex-col bg-white rounded-[1.75rem] border border-suafruti-200/90 shadow-botanical hover:shadow-botanical-lg transition-all duration-300 overflow-hidden scroll-mt-28"
    >
      {/* Product Studio Image Header */}
      <div
        onClick={() =>
          onOpenModal(
            product,
            activeVariant.id,
            activeFruitChoice?.id,
            selectedAddons
          )
        }
        className="relative aspect-[16/11] sm:aspect-[16/10.5] w-full overflow-hidden bg-cream-200 cursor-pointer"
      >
        <picture key={displayWebp}>
          <source srcSet={displayWebp} type="image/webp" />
          <img
            src={displayJpg}
            alt={
              activeFruitChoice
                ? `${product.name} - ${activeFruitChoice.name}`
                : product.name
            }
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 animate-pop-in"
          />
        </picture>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-suafruti-950/65 via-transparent to-suafruti-950/15" />

        {/* Top Highlight Pill */}
        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold border shadow-md backdrop-blur-sm ${badgeColors}`}
          >
            <Sparkles className="w-3 h-3 shrink-0" />
            {product.highlightBadge}
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(
                product,
                activeVariant.id,
                activeFruitChoice?.id,
                selectedAddons
              );
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 hover:bg-white text-suafruti-900 text-[11px] font-bold shadow-md transition-transform active:scale-95"
          >
            <SlidersHorizontal className="w-3 h-3 text-suafruti-600" />
            <span>Personalizar</span>
          </button>
        </div>

        {/* Flyer-Inspired Emerald Price Tag Floating on Bottom Right */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          {activeFruitChoice ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-suafruti-950 text-xs font-extrabold shadow">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: activeFruitChoice.accentColor }}
              />
              Opção: {activeFruitChoice.name}
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-suafruti-950/75 backdrop-blur-sm text-cream-50 text-[11px] font-semibold">
              {activeVariant.label}
            </span>
          )}

          <div className="px-3.5 py-1.5 rounded-2xl bg-suafruti-800 border-2 border-citrus-400/80 text-white shadow-lg">
            <span className="text-[11px] font-bold text-suafruti-200 mr-1">
              R$
            </span>
            <span className="font-display font-black text-xl sm:text-2xl leading-none tabular-price">
              {activeVariant.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col p-4 sm:p-5">
        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-suafruti-950 leading-tight">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-suafruti-800/85 leading-relaxed">
          {product.description}
        </p>

        {/* Crate 4 Trays Highlight Banner */}
        {product.crateHighlight && (
          <div className="mt-3.5 flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
            <PackageCheck className="w-4 h-4 text-berry-600 shrink-0" />
            <span className="text-xs font-bold">{product.crateHighlight}</span>
          </div>
        )}

        {/* Interactive Size / Option Selector */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-700">
              {product.id === 'caixa-morango'
                ? 'Escolha o tipo do morango:'
                : 'Escolha o tamanho do pote:'}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {product.variants.map((variant) => {
              const isSelected = variant.id === activeVariant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedVariantId(variant.id)}
                  className={`relative flex flex-col items-start p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border-2 text-left transition-all active:scale-[0.98] ${
                    isSelected
                      ? 'bg-suafruti-50 border-suafruti-600 shadow-sm'
                      : 'bg-cream-50/70 border-suafruti-100 hover:border-suafruti-300'
                  }`}
                >
                  <div className="w-full flex items-center justify-between gap-1">
                    <span
                      className={`text-xs sm:text-sm font-extrabold ${
                        isSelected ? 'text-suafruti-950' : 'text-suafruti-800'
                      }`}
                    >
                      {variant.shortLabel}
                    </span>
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                        isSelected
                          ? 'bg-suafruti-600 border-suafruti-600 text-white'
                          : 'border-suafruti-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                    </span>
                  </div>
                  <span
                    className={`mt-0.5 text-sm sm:text-base font-black tabular-price ${
                      isSelected ? 'text-suafruti-700' : 'text-suafruti-900/80'
                    }`}
                  >
                    {formatCurrency(variant.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Single Fruit Selector (ONLY for Fruta Cortada — Somente uma opção) */}
        {product.singleFruitChoices && (
          <div className="mt-4 pt-3.5 border-t border-suafruti-100">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-800">
                Escolha a fruta:
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wide">
                Somente 1 opção
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {product.singleFruitChoices.map((fruit) => {
                const isPicked = fruit.id === selectedSingleFruitId;
                return (
                  <button
                    key={fruit.id}
                    type="button"
                    onClick={() => setSelectedSingleFruitId(fruit.id)}
                    className={`flex flex-col items-center justify-center py-2.5 px-2 rounded-xl border-2 transition-all active:scale-95 ${
                      isPicked
                        ? `${fruit.bgClass} ${fruit.borderClass} ${fruit.textClass} shadow-sm font-extrabold`
                        : 'bg-cream-50 border-suafruti-100 text-suafruti-800 hover:border-suafruti-300 font-semibold'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full mb-1 shadow-inner"
                      style={{ backgroundColor: fruit.accentColor }}
                    />
                    <span className="text-xs sm:text-sm">{fruit.name}</span>
                  </button>
                );
              })}
            </div>
            {activeFruitChoice && (
              <p className="mt-1.5 text-[11px] text-suafruti-700 font-medium">
                Selecionado: <strong>{activeFruitChoice.name}</strong> —{' '}
                {activeFruitChoice.tagline}
              </p>
            )}
          </div>
        )}

        {/* Base Fruits Included (Salada Tradicional & Overnight) */}
        {product.baseFruits && (
          <div className="mt-4 pt-3.5 border-t border-suafruti-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-800">
                Frutas do pote ({product.baseFruits.length} frutas):
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.baseFruits.map((fruit) => (
                <span
                  key={fruit}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream-100 border border-suafruti-200/70 text-xs font-semibold text-suafruti-900"
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: FRUIT_DOT_COLORS[fruit] ?? '#27964B',
                    }}
                  />
                  {fruit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Add-ons (Adicionais) */}
        {product.addons && (
          <div className="mt-3.5 pt-3 border-t border-suafruti-100">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-800">
                {product.addonsTitle ?? 'Adicionais'}:
              </span>
              <span className="text-[11px] font-semibold text-suafruti-600">
                {selectedAddons.length > 0
                  ? `${selectedAddons.length} escolhido(s)`
                  : 'Toque p/ escolher'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.addons.map((addon) => {
                const active = selectedAddons.includes(addon);
                return (
                  <button
                    key={addon}
                    type="button"
                    onClick={() => toggleAddon(addon)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                      active
                        ? 'bg-suafruti-700 border-suafruti-700 text-white shadow-sm'
                        : 'bg-white border-suafruti-200 text-suafruti-800 hover:border-suafruti-400 hover:bg-suafruti-50'
                    }`}
                  >
                    {active ? (
                      <Check className="w-3 h-3 stroke-[3] text-citrus-400" />
                    ) : (
                      <Plus className="w-3 h-3 text-suafruti-500" />
                    )}
                    {addon}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Spacer + Action Buttons */}
        <div className="mt-auto pt-5 flex flex-col gap-2">
          <div className="grid grid-cols-12 gap-2">
            {/* Direct WhatsApp Redirect CTA */}
            <a
              href={directWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-8 inline-flex items-center justify-center gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-suafruti-700 via-suafruti-600 to-[#1ea952] hover:from-suafruti-600 hover:to-[#22bd5b] text-white font-extrabold text-xs sm:text-sm shadow-glow transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span>Pedir no WhatsApp</span>
            </a>

            {/* Add to Multi-Item Basket CTA */}
            <button
              type="button"
              onClick={handleQuickAddToCart}
              className={`col-span-4 inline-flex items-center justify-center gap-1 px-3 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm border-2 transition-all active:scale-[0.98] ${
                justAdded
                  ? 'bg-citrus-400 border-citrus-400 text-suafruti-950'
                  : 'bg-suafruti-50 hover:bg-suafruti-100 border-suafruti-600/30 text-suafruti-900'
              }`}
              title="Adicionar à cesta para pedir mais itens juntos"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Na Cesta!</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                  <span>Cesta</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
