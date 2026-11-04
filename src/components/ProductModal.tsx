import React, { useState, useEffect } from 'react';
import { X, Check, Minus, Plus, ShoppingBag, MessageSquareText } from 'lucide-react';
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

interface ProductModalProps {
  product: MenuProduct | null;
  initialVariantId?: string;
  initialSingleFruitId?: string;
  initialAddons?: string[];
  selectedZone: DeliveryZone;
  onClose: () => void;
  onAddToCart: (config: {
    product: MenuProduct;
    variantId: string;
    selectedSingleFruit?: string;
    selectedAddons: string[];
    removedFruits: string[];
    notes: string;
    quantity: number;
  }) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  initialVariantId,
  initialSingleFruitId,
  initialAddons,
  selectedZone,
  onClose,
  onAddToCart,
}) => {
  const [variantId, setVariantId] = useState<string>('');
  const [singleFruitId, setSingleFruitId] = useState<string>('');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [removedFruits, setRemovedFruits] = useState<string[]>([]);
  const [notes, setNotes] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (product) {
      setVariantId(initialVariantId || product.defaultVariantId);
      setSingleFruitId(
        initialSingleFruitId || product.singleFruitChoices?.[0]?.id || ''
      );
      setSelectedAddons(initialAddons ?? []);
      setRemovedFruits([]);
      setNotes('');
      setQuantity(1);
    }
  }, [product, initialVariantId, initialSingleFruitId, initialAddons]);

  if (!product) return null;

  const activeVariant =
    product.variants.find((v) => v.id === variantId) ?? product.variants[0];

  const activeFruitChoice = product.singleFruitChoices?.find(
    (f) => f.id === singleFruitId
  );

  const displayWebp = activeFruitChoice
    ? activeFruitChoice.imageWebp
    : product.imageWebp;
  const displayJpg = activeFruitChoice
    ? activeFruitChoice.imageJpg
    : product.imageJpg;

  const itemTotal = activeVariant.price * quantity;

  const toggleAddon = (addon: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const toggleRemoveFruit = (fruit: string) => {
    setRemovedFruits((prev) =>
      prev.includes(fruit) ? prev.filter((f) => f !== fruit) : [...prev, fruit]
    );
  };

  const handleConfirmCart = () => {
    onAddToCart({
      product,
      variantId: activeVariant.id,
      selectedSingleFruit: activeFruitChoice?.name,
      selectedAddons,
      removedFruits,
      notes,
      quantity,
    });
    onClose();
  };

  const directWhatsAppUrl = buildSingleItemWhatsAppUrl({
    productName: product.name,
    variantLabel: activeVariant.label,
    unitPrice: activeVariant.price,
    quantity,
    selectedSingleFruit: activeFruitChoice?.name,
    selectedAddons,
    removedFruits,
    notes,
    deliveryZone: selectedZone,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-suafruti-950/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-lg max-h-[92dvh] flex flex-col bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up"
      >
        {/* Modal Header Image */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 bg-cream-200">
          <picture key={displayWebp}>
            <source srcSet={displayWebp} type="image/webp" />
            <img
              src={displayJpg}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </picture>
          <div className="absolute inset-0 bg-gradient-to-t from-suafruti-950/85 via-suafruti-950/20 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 hover:bg-white text-suafruti-950 flex items-center justify-center shadow-lg transition-transform active:scale-90"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-3.5 left-4 right-4 flex items-end justify-between gap-2 text-white">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-citrus-400">
                {product.categoryLabel}
              </span>
              <h3 className="font-display font-black text-2xl leading-tight">
                {product.name}
              </h3>
            </div>
            <div className="px-3 py-1 rounded-xl bg-suafruti-700 border border-citrus-400/70 font-display font-black text-lg tabular-price shrink-0">
              {formatCurrency(activeVariant.price)}
            </div>
          </div>
        </div>

        {/* Scrollable Customization Options */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* 1. Size / Option */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-suafruti-800 mb-2">
              1. Escolha o tamanho / opção
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              {product.variants.map((variant) => {
                const isSelected = variant.id === activeVariant.id;
                return (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setVariantId(variant.id)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all ${
                      isSelected
                        ? 'bg-suafruti-50 border-suafruti-600 shadow-sm'
                        : 'bg-cream-50 border-suafruti-100 hover:border-suafruti-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-sm text-suafruti-950">
                        {variant.shortLabel}
                      </span>
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-suafruti-600 text-white flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </span>
                      )}
                    </div>
                    <p className="text-base font-black text-suafruti-700 tabular-price mt-0.5">
                      {formatCurrency(variant.price)}
                    </p>
                    {variant.subtitle && (
                      <p className="text-[11px] text-suafruti-700/75">
                        {variant.subtitle}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Single Fruit Choice (Fruta Cortada) */}
          {product.singleFruitChoices && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-suafruti-800">
                  2. Escolha sua fruta
                </h4>
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase">
                  Obrigatório • 1 opção
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {product.singleFruitChoices.map((fruit) => {
                  const active = fruit.id === singleFruitId;
                  return (
                    <button
                      key={fruit.id}
                      type="button"
                      onClick={() => setSingleFruitId(fruit.id)}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                        active
                          ? `${fruit.bgClass} ${fruit.borderClass} ${fruit.textClass} font-extrabold shadow-sm`
                          : 'bg-cream-50 border-suafruti-100 text-suafruti-800 font-semibold'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full mb-1.5"
                        style={{ backgroundColor: fruit.accentColor }}
                      />
                      <span className="text-sm">{fruit.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Adicionais */}
          {product.addons && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-suafruti-800">
                  2. Escolha os adicionais
                </h4>
                <span className="text-[11px] font-semibold text-suafruti-600">
                  Opcional
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {product.addons.map((addon) => {
                  const active = selectedAddons.includes(addon);
                  return (
                    <button
                      key={addon}
                      type="button"
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left text-xs sm:text-sm font-bold transition-all ${
                        active
                          ? 'bg-suafruti-700 border-suafruti-700 text-white shadow-sm'
                          : 'bg-cream-50 border-suafruti-200 text-suafruti-900 hover:border-suafruti-400'
                      }`}
                    >
                      <span className="truncate pr-1">{addon}</span>
                      <span
                        className={`w-4 h-4 rounded-md flex items-center justify-center shrink-0 ${
                          active
                            ? 'bg-citrus-400 text-suafruti-950'
                            : 'bg-white border border-suafruti-300'
                        }`}
                      >
                        {active && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 4. Base Fruits Customization (Allow removing disliked fruit) */}
          {product.baseFruits && (
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-suafruti-800">
                  Frutas inclusas no pote
                </h4>
                <span className="text-[11px] text-suafruti-600">
                  Toque caso queira retirar alguma
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.baseFruits.map((fruit) => {
                  const isRemoved = removedFruits.includes(fruit);
                  return (
                    <button
                      key={fruit}
                      type="button"
                      onClick={() => toggleRemoveFruit(fruit)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
                        isRemoved
                          ? 'bg-rose-50 border-rose-300 text-rose-700 line-through opacity-75'
                          : 'bg-cream-100 border-suafruti-200 text-suafruti-900'
                      }`}
                    >
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: isRemoved
                            ? '#FB7185'
                            : FRUIT_DOT_COLORS[fruit] ?? '#27964B',
                        }}
                      />
                      {fruit}
                    </button>
                  );
                })}
              </div>
              {removedFruits.length > 0 && (
                <p className="mt-1.5 text-xs text-rose-700 font-semibold">
                  Retirar do pote: Sem {removedFruits.join(', ')}
                </p>
              )}
            </div>
          )}

          {/* 5. Observation Field */}
          <div>
            <label
              htmlFor="item-notes"
              className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-suafruti-800 mb-1.5"
            >
              <MessageSquareText className="w-3.5 h-3.5 text-suafruti-600" />
              Alguma observação? (opcional)
            </label>
            <input
              id="item-notes"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: mandar colherzinha, adicional separado..."
              className="w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border border-suafruti-200 focus:border-suafruti-600 focus:bg-white focus:outline-none text-sm text-suafruti-950 placeholder:text-suafruti-700/45"
            />
          </div>
        </div>

        {/* Sticky Bottom Action Bar */}
        <div className="p-4 sm:px-6 border-t border-suafruti-100 bg-cream-50 pb-safe space-y-2.5">
          <div className="flex items-center justify-between gap-3">
            {/* Quantity Stepper */}
            <div className="inline-flex items-center bg-white border border-suafruti-200 rounded-2xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-suafruti-800 hover:bg-suafruti-50 active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-extrabold text-sm text-suafruti-950 tabular-price">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="w-9 h-9 rounded-xl flex items-center justify-center text-suafruti-800 hover:bg-suafruti-50 active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Basket Button */}
            <button
              type="button"
              onClick={handleConfirmCart}
              className="flex-1 inline-flex items-center justify-between px-4 py-3 rounded-2xl bg-suafruti-900 hover:bg-suafruti-800 text-white font-extrabold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98]"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-citrus-400" />
                Adicionar à Cesta
              </span>
              <span className="tabular-price text-citrus-400">
                {formatCurrency(itemTotal)}
              </span>
            </button>
          </div>

          {/* Direct 1-Item WhatsApp Redirect */}
          <a
            href={directWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-suafruti-950 font-extrabold text-xs sm:text-sm shadow-sm transition-all active:scale-[0.98]"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>
              Pedir só este direto no WhatsApp ({formatCurrency(itemTotal)})
            </span>
          </a>
        </div>
      </div>
    </div>
  );
};
