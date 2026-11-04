import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  MapPin,
  CreditCard,
  User,
} from 'lucide-react';
import {
  CartItem,
  DELIVERY_ZONES,
  DeliveryZone,
} from '../data/menu';
import {
  buildCartWhatsAppUrl,
  formatCurrency,
} from '../utils/whatsapp';
import { WhatsAppIcon } from './WhatsAppIcon';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (cartItemId: string, delta: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  selectedZone: DeliveryZone;
  onSelectZone: (zone: DeliveryZone) => void;
}

const PAYMENT_OPTIONS = ['PIX', 'Cartão na entrega', 'Dinheiro'];

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  selectedZone,
  onSelectZone,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('PIX');

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = items.length > 0 ? selectedZone.fee : 0;
  const grandTotal = subtotal + deliveryFee;

  const whatsappCheckoutUrl = buildCartWhatsAppUrl({
    items,
    deliveryZone: selectedZone,
    customerName,
    address,
    paymentMethod,
  });

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-suafruti-950/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full sm:max-w-md h-full bg-cream-50 flex flex-col shadow-2xl animate-pop-in"
      >
        {/* Header */}
        <div className="px-5 py-4 bg-suafruti-950 text-white flex items-center justify-between border-b border-suafruti-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-suafruti-700 text-citrus-400 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg leading-tight">
                Minha Cesta Suafruti
              </h3>
              <p className="text-xs text-suafruti-300">
                {items.length === 0
                  ? 'Sua cesta está vazia'
                  : `${items.reduce((a, b) => a + b.quantity, 0)} item(ns) selecionado(s)`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar cesta"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-3xl bg-suafruti-100 text-suafruti-600 flex items-center justify-center mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h4 className="font-display font-bold text-xl text-suafruti-950">
              Sua cesta ainda está vazia
            </h4>
            <p className="mt-1.5 text-sm text-suafruti-700 max-w-xs">
              Escolha suas saladas de frutas, frutas cortadas ou caixas de morango no cardápio para montar seu pedido!
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 px-6 py-3 rounded-2xl bg-suafruti-700 hover:bg-suafruti-600 text-white font-bold text-sm shadow-md"
            >
              Explorar Cardápio
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-5">
              {/* Items List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-suafruti-800">
                    Itens escolhidos
                  </span>
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-xs font-semibold text-rose-600 hover:underline"
                  >
                    Limpar cesta
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="bg-white rounded-2xl p-3.5 border border-suafruti-200/80 shadow-sm flex gap-3"
                  >
                    <picture className="shrink-0">
                      <source srcSet={item.imageWebp} type="image/webp" />
                      <img
                        src={item.imageJpg}
                        alt={item.productName}
                        className="w-16 h-16 rounded-xl object-cover bg-cream-200"
                      />
                    </picture>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-sm text-suafruti-950 leading-snug">
                          {item.productName}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.cartItemId)}
                          aria-label="Remover item"
                          className="text-suafruti-400 hover:text-rose-600 p-0.5"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-xs font-semibold text-suafruti-700">
                        {item.variantLabel}
                        {item.selectedSingleFruit
                          ? ` • ${item.selectedSingleFruit}`
                          : ''}
                      </p>

                      {item.selectedAddons.length > 0 && (
                        <p className="mt-1 text-[11px] text-suafruti-800/85">
                          <strong>+ Adicionais:</strong>{' '}
                          {item.selectedAddons.join(', ')}
                        </p>
                      )}

                      {item.removedFruits.length > 0 && (
                        <p className="mt-0.5 text-[11px] text-rose-700">
                          <strong>Sem:</strong> {item.removedFruits.join(', ')}
                        </p>
                      )}

                      {item.notes && (
                        <p className="mt-0.5 text-[11px] italic text-suafruti-700">
                          “{item.notes}”
                        </p>
                      )}

                      <div className="mt-2.5 flex items-center justify-between">
                        <div className="inline-flex items-center bg-cream-100 border border-suafruti-200 rounded-xl p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.cartItemId, -1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-suafruti-800 hover:bg-white"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-7 text-center text-xs font-extrabold text-suafruti-950 tabular-price">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQty(item.cartItemId, 1)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center text-suafruti-800 hover:bg-white"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <span className="font-extrabold text-sm text-suafruti-800 tabular-price">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery Zone Selector */}
              <div className="bg-white rounded-2xl p-4 border border-suafruti-200/80 space-y-3">
                <div className="flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-suafruti-800">
                  <MapPin className="w-3.5 h-3.5 text-suafruti-600" />
                  <span>Região de Entrega</span>
                </div>

                <div className="grid grid-cols-1 gap-1.5">
                  {DELIVERY_ZONES.map((zone) => {
                    const active = selectedZone.id === zone.id;
                    return (
                      <button
                        key={zone.id}
                        type="button"
                        onClick={() => onSelectZone(zone)}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                          active
                            ? 'bg-suafruti-50 border-suafruti-600 text-suafruti-950 shadow-sm'
                            : 'bg-cream-50/70 border-suafruti-100 text-suafruti-800 hover:border-suafruti-300'
                        }`}
                      >
                        <span>{zone.name}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                            zone.isFree
                              ? 'bg-amber-200 text-suafruti-950'
                              : 'bg-suafruti-100 text-suafruti-800'
                          }`}
                        >
                          {zone.isFree ? 'GRÁTIS' : formatCurrency(zone.fee)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Quick Customer Info */}
                <div className="pt-2 space-y-2.5">
                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold text-suafruti-800 mb-1">
                      <User className="w-3 h-3 text-suafruti-600" />
                      Seu nome (opcional)
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Como podemos te chamar?"
                      className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-suafruti-200 focus:border-suafruti-600 focus:bg-white focus:outline-none text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-1 text-[11px] font-bold text-suafruti-800 mb-1">
                      <MapPin className="w-3 h-3 text-suafruti-600" />
                      Rua, número e bairro (opcional)
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Ex: Rua das Palmeiras, 120 - Centro"
                      className="w-full px-3 py-2 rounded-xl bg-cream-50 border border-suafruti-200 focus:border-suafruti-600 focus:bg-white focus:outline-none text-xs sm:text-sm"
                    />
                  </div>

                  <div>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-suafruti-800 mb-1.5">
                      <CreditCard className="w-3 h-3 text-suafruti-600" />
                      Forma de pagamento
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {PAYMENT_OPTIONS.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setPaymentMethod(opt)}
                          className={`py-2 px-2 rounded-xl border text-[11px] font-extrabold transition-all ${
                            paymentMethod === opt
                              ? 'bg-suafruti-700 border-suafruti-700 text-white'
                              : 'bg-cream-50 border-suafruti-200 text-suafruti-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary & WhatsApp Checkout Footer */}
            <div className="p-4 sm:p-5 bg-white border-t border-suafruti-200 pb-safe space-y-3">
              <div className="space-y-1 text-xs sm:text-sm">
                <div className="flex justify-between text-suafruti-800">
                  <span>Subtotal dos produtos</span>
                  <span className="font-bold tabular-price">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-suafruti-800">
                  <span>Entrega ({selectedZone.name})</span>
                  <span
                    className={`font-extrabold tabular-price ${
                      selectedZone.isFree
                        ? 'text-suafruti-600'
                        : 'text-suafruti-900'
                    }`}
                  >
                    {selectedZone.isFree
                      ? 'GRÁTIS'
                      : formatCurrency(deliveryFee)}
                  </span>
                </div>
                <div className="pt-1.5 border-t border-suafruti-100 flex justify-between items-baseline">
                  <span className="font-display font-extrabold text-base text-suafruti-950">
                    Total do Pedido
                  </span>
                  <span className="font-display font-black text-xl text-suafruti-700 tabular-price">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              </div>

              <a
                href={whatsappCheckoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-suafruti-700 via-suafruti-600 to-[#1ea952] hover:from-suafruti-600 hover:to-[#22bd5b] text-white font-extrabold text-sm sm:text-base shadow-glow transition-all active:scale-[0.98]"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Finalizar Pedido no WhatsApp</span>
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
