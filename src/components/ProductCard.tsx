import React, { useState } from 'react';
import {
  Check,
  Plus,
  X,
  SlidersHorizontal,
  Sparkles,
  PackageCheck,
  Flame,
  RotateCcw,
  Leaf,
  Crown,
} from 'lucide-react';
import {
  DeliveryZone,
  FRUIT_DOT_COLORS,
  MenuProduct,
} from '../data/menu';
import {
  buildSingleItemWhatsAppUrl,
  formatCurrency,
} from '../utils/whatsapp';
import { SmartImage } from './SmartImage';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ProductCardProps {
  product: MenuProduct;
  selectedZone: DeliveryZone;
  onAddToCart: (config: {
    product: MenuProduct;
    variantId: string;
    selectedSingleFruit?: string;
    selectedFlavorLabel?: string;
    selectedAddons: string[];
    removedAddons: string[];
    removedFruits: string[];
    notes: string;
    quantity: number;
  }) => void;
  onOpenModal: (config: {
    product: MenuProduct;
    initialVariantId: string;
    initialSingleFruitId?: string;
    initialFlavorId?: string;
    initialPaprika?: string;
    initialAddons?: string[];
    initialRemovedFruits?: string[];
  }) => void;
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
  const [selectedFlavorId, setSelectedFlavorId] = useState<string>(
    product.seasonedFlavors?.[0]?.id ?? ''
  );
  const [selectedPaprika, setSelectedPaprika] = useState<string>(
    product.paprikaChoices?.[0] ?? 'Páprica Picante'
  );
  const [selectedAddons, setSelectedAddons] = useState<string[]>(() =>
    product.addonsIncludedByDefault && product.addons
      ? [...product.addons]
      : []
  );
  const [removedFruits, setRemovedFruits] = useState<string[]>([]);
  const [justAdded, setJustAdded] = useState(false);

  const activeVariant =
    product.variants.find((v) => v.id === selectedVariantId) ??
    product.variants[0];

  const activeFruitChoice = product.singleFruitChoices?.find(
    (f) => f.id === selectedSingleFruitId
  );

  const activeFlavor = product.seasonedFlavors?.find(
    (fl) => fl.id === selectedFlavorId
  );

  const formattedFlavorLabel = activeFlavor
    ? activeFlavor.hasPaprikaChoice
      ? `${activeFlavor.name} (${selectedPaprika})`
      : activeFlavor.name
    : undefined;

  const removedAddons =
    product.addonsIncludedByDefault && product.addons
      ? product.addons.filter((a) => !selectedAddons.includes(a))
      : [];

  const displayWebp = activeFruitChoice
    ? activeFruitChoice.imageWebp
    : product.imageWebp;
  const displayJpg = activeFruitChoice
    ? activeFruitChoice.imageJpg
    : product.imageJpg;

  const canRemoveBaseFruits =
    Boolean(product.baseFruits) && (product.baseFruits?.length ?? 0) > 1;

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const toggleRemoveFruit = (fruit: string) => {
    if (!product.baseFruits || product.baseFruits.length <= 1) return;
    setRemovedFruits((prev) => {
      if (prev.includes(fruit)) {
        return prev.filter((f) => f !== fruit);
      }
      if (prev.length >= product.baseFruits!.length - 1) {
        return prev;
      }
      return [...prev, fruit];
    });
  };

  const handleQuickAddToCart = () => {
    onAddToCart({
      product,
      variantId: activeVariant.id,
      selectedSingleFruit: activeFruitChoice?.name,
      selectedFlavorLabel: formattedFlavorLabel,
      selectedAddons,
      removedAddons,
      removedFruits,
      notes: '',
      quantity: 1,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1600);
  };

  const openFullModal = () => {
    onOpenModal({
      product,
      initialVariantId: activeVariant.id,
      initialSingleFruitId: activeFruitChoice?.id,
      initialFlavorId: activeFlavor?.id,
      initialPaprika: selectedPaprika,
      initialAddons: selectedAddons,
      initialRemovedFruits: removedFruits,
    });
  };

  const directWhatsAppHref = buildSingleItemWhatsAppUrl({
    productName: product.name,
    variantLabel: activeVariant.label,
    unitPrice: activeVariant.price,
    quantity: 1,
    selectedSingleFruit: activeFruitChoice?.name,
    selectedFlavorLabel: formattedFlavorLabel,
    selectedAddons,
    removedAddons,
    noAddons: Boolean(product.noAddonsNote),
    removedFruits,
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
      className="group relative flex flex-col w-full max-w-full min-w-0 bg-white rounded-3xl sm:rounded-[1.75rem] border border-suafruti-200/90 shadow-botanical hover:shadow-botanical-lg transition-all duration-300 overflow-hidden scroll-mt-32"
    >
      {/* Product Studio Image Header */}
      <div
        onClick={openFullModal}
        className="relative aspect-[16/10.8] w-full overflow-hidden bg-cream-200 cursor-pointer"
      >
        <SmartImage
          webpSrc={displayWebp}
          fallbackSrc={displayJpg}
          alt={
            activeFruitChoice
              ? `${product.name} - ${activeFruitChoice.name}`
              : product.name
          }
          eager
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-suafruti-950/65 via-transparent to-suafruti-950/15" />

        {/* Top Highlight Pill */}
        <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-start justify-between gap-1.5">
          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-extrabold border shadow-md backdrop-blur-sm min-w-0 ${badgeColors}`}
          >
            <Sparkles className="w-3 h-3 shrink-0" />
            <span className="truncate">{product.highlightBadge}</span>
          </span>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openFullModal();
            }}
            className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/95 hover:bg-white text-suafruti-900 text-[11px] font-bold shadow-md transition-transform active:scale-95"
          >
            <SlidersHorizontal className="w-3 h-3 text-suafruti-600 shrink-0" />
            <span>Personalizar</span>
          </button>
        </div>

        {/* Flyer-Inspired Emerald Price Tag Floating on Bottom Right */}
        <div className="absolute bottom-2.5 sm:bottom-3 left-2.5 sm:left-3 right-2.5 sm:right-3 flex items-end justify-between gap-2">
          {activeFruitChoice ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-suafruti-950 text-[11px] font-extrabold shadow min-w-0 truncate">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ backgroundColor: activeFruitChoice.accentColor }}
              />
              <span className="truncate">Opção: {activeFruitChoice.name}</span>
            </span>
          ) : activeFlavor ? (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-suafruti-950 text-[11px] font-extrabold shadow min-w-0 truncate">
              <Flame className="w-3 h-3 text-berry-600 shrink-0" />
              <span className="truncate">
                {activeFlavor.name} • {activeVariant.label}
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-suafruti-950/80 backdrop-blur-sm text-cream-50 text-[11px] font-semibold truncate min-w-0">
              {activeVariant.label}
            </span>
          )}

          <div className="shrink-0 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-2xl bg-suafruti-800 border-2 border-citrus-400/80 text-white shadow-lg">
            <span className="text-[11px] font-bold text-suafruti-200 mr-0.5">
              R$
            </span>
            <span className="font-display font-black text-lg sm:text-2xl leading-none tabular-price">
              {activeVariant.price.toFixed(2).replace('.', ',')}
            </span>
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex-1 flex flex-col p-4 sm:p-5 min-w-0">
        <h3 className="font-display font-extrabold text-xl sm:text-2xl text-suafruti-950 leading-tight">
          {product.name}
        </h3>
        <p className="mt-1.5 text-xs sm:text-sm text-suafruti-800/85 leading-relaxed">
          {product.description}
        </p>

        {/* Crate 4 Trays Highlight Banner */}
        {product.crateHighlight && (
          <div className="mt-3.5 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 min-w-0">
            <PackageCheck className="w-4 h-4 text-berry-600 shrink-0" />
            <span className="text-xs font-bold leading-snug">
              {product.crateHighlight}
            </span>
          </div>
        )}

        {/* Finishing Highlight Banner (e.g. Berry Cream) */}
        {product.finishingNote && (
          <div className="mt-3.5 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-950 min-w-0">
            <Crown className="w-4 h-4 text-purple-700 shrink-0" />
            <span className="text-xs font-bold leading-snug">
              {product.finishingNote}
            </span>
          </div>
        )}

        {/* Pure Fruit / No Add-ons Note (Salada Comum) */}
        {product.noAddonsNote && (
          <div className="mt-3.5 flex items-center gap-2 px-3 py-2 rounded-xl bg-suafruti-50 border border-suafruti-200 text-suafruti-900 min-w-0">
            <Leaf className="w-4 h-4 text-suafruti-600 shrink-0" />
            <span className="text-xs font-bold leading-snug">
              {product.noAddonsNote}
            </span>
          </div>
        )}

        {/* Interactive Size / Option Selector */}
        {product.variants.length > 1 ? (
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
                    className={`relative flex flex-col items-start p-2.5 sm:px-3.5 sm:py-2.5 rounded-xl border-2 text-left transition-all active:scale-[0.98] min-w-0 ${
                      isSelected
                        ? 'bg-suafruti-50 border-suafruti-600 shadow-sm'
                        : 'bg-cream-50/70 border-suafruti-100 hover:border-suafruti-300'
                    }`}
                  >
                    <div className="w-full flex items-center justify-between gap-1 min-w-0">
                      <span
                        className={`text-xs sm:text-sm font-extrabold truncate ${
                          isSelected ? 'text-suafruti-950' : 'text-suafruti-800'
                        }`}
                      >
                        {variant.shortLabel}
                      </span>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                          isSelected
                            ? 'bg-suafruti-600 border-suafruti-600 text-white'
                            : 'border-suafruti-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        )}
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
        ) : (
          <div className="mt-3.5 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-suafruti-50 border border-suafruti-200">
            <span className="text-xs font-extrabold text-suafruti-900">
              {activeVariant.label}
              {activeVariant.subtitle ? ` • ${activeVariant.subtitle}` : ''}
            </span>
            <span className="text-sm font-black text-suafruti-700 tabular-price shrink-0 ml-2">
              {formatCurrency(activeVariant.price)}
            </span>
          </div>
        )}

        {/* Seasoned Mango Flavors (Manga Temperada: SUAFRUTI, Agridoce, Tropical) */}
        {product.seasonedFlavors && (
          <div className="mt-4 pt-3.5 border-t border-suafruti-100 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-800">
                Escolha a combinação:
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase shrink-0">
                3 sabores
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {product.seasonedFlavors.map((flavor) => {
                const isSelected = flavor.id === selectedFlavorId;
                return (
                  <button
                    key={flavor.id}
                    type="button"
                    onClick={() => setSelectedFlavorId(flavor.id)}
                    className={`w-full p-3 rounded-xl border-2 text-left transition-all active:scale-[0.99] min-w-0 ${
                      isSelected
                        ? 'bg-amber-50/80 border-suafruti-600 shadow-sm'
                        : 'bg-cream-50/70 border-suafruti-100 hover:border-suafruti-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="font-extrabold text-sm text-suafruti-950">
                          {flavor.name}
                        </span>
                        {flavor.badge && (
                          <span className="px-2 py-0.5 rounded-full bg-suafruti-800 text-citrus-400 text-[10px] font-extrabold uppercase shrink-0">
                            {flavor.badge}
                          </span>
                        )}
                      </div>
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center border shrink-0 ${
                          isSelected
                            ? 'bg-suafruti-600 border-suafruti-600 text-white'
                            : 'border-suafruti-300 bg-white'
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        )}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-suafruti-800/85 leading-snug">
                      {flavor.ingredients}
                    </p>
                  </button>
                );
              })}
            </div>

            {/* Conditional Paprika Selector for Tropical & SUAFRUTI */}
            {activeFlavor?.hasPaprikaChoice && product.paprikaChoices && (
              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200/80">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-rose-900 mb-2">
                  Qual páprica você prefere?
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {product.paprikaChoices.map((paprika) => {
                    const active = selectedPaprika === paprika;
                    return (
                      <button
                        key={paprika}
                        type="button"
                        onClick={() => setSelectedPaprika(paprika)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg border text-xs font-extrabold transition-all active:scale-95 min-w-0 ${
                          active
                            ? 'bg-berry-600 border-berry-600 text-white shadow-sm'
                            : 'bg-white border-rose-200 text-rose-900 hover:border-rose-400'
                        }`}
                      >
                        <Flame className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{paprika}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Single Fruit Selector (ONLY for Fruta Cortada — Somente uma opção) */}
        {product.singleFruitChoices && (
          <div className="mt-4 pt-3.5 border-t border-suafruti-100">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-800">
                Escolha a fruta:
              </span>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase tracking-wide shrink-0">
                Somente 1 opção
              </span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
              {product.singleFruitChoices.map((fruit) => {
                const isPicked = fruit.id === selectedSingleFruitId;
                return (
                  <button
                    key={fruit.id}
                    type="button"
                    onClick={() => setSelectedSingleFruitId(fruit.id)}
                    className={`flex flex-col items-center justify-center py-2.5 px-1.5 rounded-xl border-2 transition-all active:scale-95 min-w-0 ${
                      isPicked
                        ? `${fruit.bgClass} ${fruit.borderClass} ${fruit.textClass} shadow-sm font-extrabold`
                        : 'bg-cream-50 border-suafruti-100 text-suafruti-800 hover:border-suafruti-300 font-semibold'
                    }`}
                  >
                    <span
                      className="w-3 h-3 rounded-full mb-1 shadow-inner shrink-0"
                      style={{ backgroundColor: fruit.accentColor }}
                    />
                    <span className="text-xs sm:text-sm truncate max-w-full">
                      {fruit.name}
                    </span>
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

        {/* Base Fruits (Interactive toggle when >1 fruit; clean badge when 1 fruit like Morango Supreme) */}
        {product.baseFruits && (
          <div className="mt-4 pt-3.5 border-t border-suafruti-100">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-800">
                {canRemoveBaseFruits ? 'Frutas do pote:' : 'Fruta da base:'}
              </span>
              {canRemoveBaseFruits &&
                (removedFruits.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setRemovedFruits([])}
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-suafruti-700 hover:text-suafruti-950 underline shrink-0"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Manter todas
                  </button>
                ) : (
                  <span className="text-[11px] font-semibold text-suafruti-600 shrink-0">
                    Toque p/ retirar
                  </span>
                ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {product.baseFruits.map((fruit) => {
                const isRemoved = removedFruits.includes(fruit);
                if (!canRemoveBaseFruits) {
                  return (
                    <span
                      key={fruit}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border bg-suafruti-50/90 border-suafruti-300 text-suafruti-950 text-xs font-bold"
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{
                          backgroundColor: FRUIT_DOT_COLORS[fruit] ?? '#E11D48',
                        }}
                      />
                      <span>{fruit}</span>
                      <Check className="w-3 h-3 text-suafruti-600 stroke-[2.8] shrink-0" />
                    </span>
                  );
                }

                return (
                  <button
                    key={fruit}
                    type="button"
                    onClick={() => toggleRemoveFruit(fruit)}
                    aria-pressed={!isRemoved}
                    title={
                      isRemoved
                        ? `Toque para incluir ${fruit} novamente`
                        : `Toque caso não queira ${fruit}`
                    }
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-bold transition-all active:scale-95 ${
                      isRemoved
                        ? 'bg-rose-50 border-rose-300 text-rose-700 line-through'
                        : 'bg-suafruti-50/90 border-suafruti-300 text-suafruti-950 hover:border-suafruti-500 shadow-sm'
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{
                        backgroundColor: isRemoved
                          ? '#FB7185'
                          : FRUIT_DOT_COLORS[fruit] ?? '#27964B',
                      }}
                    />
                    <span>{fruit}</span>
                    {isRemoved ? (
                      <X className="w-3 h-3 text-rose-600 stroke-[2.8] shrink-0" />
                    ) : (
                      <Check className="w-3 h-3 text-suafruti-600 stroke-[2.8] shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {removedFruits.length > 0 && (
              <p className="mt-2 px-2.5 py-1.5 rounded-lg bg-rose-50 border border-rose-200 text-[11px] font-bold text-rose-800">
                Retirar do pote: Sem {removedFruits.join(', ')}
              </p>
            )}
          </div>
        )}

        {/* Interactive Add-ons (Adicionais) */}
        {product.addons && (
          <div className="mt-3.5 pt-3 border-t border-suafruti-100">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-suafruti-800">
                {product.addonsTitle ?? 'Adicionais'}:
              </span>
              <span className="text-[11px] font-semibold text-suafruti-600 shrink-0">
                {product.addonsIncludedByDefault
                  ? removedAddons.length > 0
                    ? `Sem ${removedAddons.length} item(ns)`
                    : 'Inclusos (toque p/ retirar)'
                  : selectedAddons.length > 0
                  ? `${selectedAddons.length} escolhido(s)`
                  : 'Toque p/ escolher'}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.addons.map((addon) => {
                const active = selectedAddons.includes(addon);
                const isRemovedDefault =
                  product.addonsIncludedByDefault && !active;
                return (
                  <button
                    key={addon}
                    type="button"
                    onClick={() => toggleAddon(addon)}
                    className={`inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-bold border transition-all active:scale-95 ${
                      active
                        ? 'bg-suafruti-700 border-suafruti-700 text-white shadow-sm'
                        : isRemovedDefault
                        ? 'bg-rose-50 border-rose-300 text-rose-700 line-through'
                        : 'bg-white border-suafruti-200 text-suafruti-800 hover:border-suafruti-400 hover:bg-suafruti-50'
                    }`}
                  >
                    {active ? (
                      <Check className="w-3 h-3 stroke-[3] text-citrus-400 shrink-0" />
                    ) : isRemovedDefault ? (
                      <X className="w-3 h-3 stroke-[2.8] text-rose-600 shrink-0" />
                    ) : (
                      <Plus className="w-3 h-3 text-suafruti-500 shrink-0" />
                    )}
                    <span>{addon}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Bottom Spacer + Action Buttons */}
        <div className="mt-auto pt-5">
          <div className="flex items-stretch gap-2 w-full">
            {/* Direct WhatsApp Redirect CTA */}
            <a
              href={directWhatsAppHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3.5 rounded-2xl bg-gradient-to-r from-suafruti-700 via-suafruti-600 to-[#1ea952] hover:from-suafruti-600 hover:to-[#22bd5b] text-white font-extrabold text-xs sm:text-sm shadow-glow transition-all active:scale-[0.98]"
            >
              <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">Pedir no WhatsApp</span>
            </a>

            {/* Add to Multi-Item Basket CTA */}
            <button
              type="button"
              onClick={handleQuickAddToCart}
              className={`shrink-0 inline-flex items-center justify-center gap-1 px-3.5 sm:px-4 py-3.5 rounded-2xl font-extrabold text-xs sm:text-sm border-2 transition-all active:scale-[0.98] ${
                justAdded
                  ? 'bg-citrus-400 border-citrus-400 text-suafruti-950'
                  : 'bg-suafruti-50 hover:bg-suafruti-100 border-suafruti-600/30 text-suafruti-900'
              }`}
              title="Adicionar à cesta para pedir mais itens juntos"
            >
              {justAdded ? (
                <>
                  <Check className="w-4 h-4 stroke-[3] shrink-0" />
                  <span>Adicionado</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 stroke-[2.5] shrink-0" />
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
