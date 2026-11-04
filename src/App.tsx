import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, CheckCircle2, Sparkles } from 'lucide-react';
import {
  CartItem,
  DELIVERY_ZONES,
  DeliveryZone,
  MENU_PRODUCTS,
  MenuProduct,
} from './data/menu';
import {
  buildDirectGreetingWhatsAppUrl,
  formatCurrency,
} from './utils/whatsapp';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { DeliverySection } from './components/DeliverySection';
import { FreshnessBanner } from './components/FreshnessBanner';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { WhatsAppIcon } from './components/WhatsAppIcon';

type CategoryFilter = 'todos' | 'saladas' | 'cortadas' | 'caixas';

const STORAGE_CART_KEY = 'suafruti_cart_v1';
const STORAGE_ZONE_KEY = 'suafruti_zone_v1';

export const App: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('todos');

  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ZONE_KEY);
      if (saved) {
        const found = DELIVERY_ZONES.find((z) => z.id === saved);
        if (found) return found;
      }
    } catch {
      // ignore storage errors
    }
    return DELIVERY_ZONES[0];
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_CART_KEY);
      if (raw) return JSON.parse(raw) as CartItem[];
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Modal state for deep customization
  const [modalState, setModalState] = useState<{
    product: MenuProduct | null;
    variantId?: string;
    singleFruitId?: string;
    addons?: string[];
  }>({ product: null });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cart));
    } catch {
      // ignore storage errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ZONE_KEY, selectedZone.id);
    } catch {
      // ignore storage errors
    }
  }, [selectedZone]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const handleAddToCart = (config: {
    product: MenuProduct;
    variantId: string;
    selectedSingleFruit?: string;
    selectedAddons: string[];
    removedFruits: string[];
    notes: string;
    quantity: number;
  }) => {
    const variant =
      config.product.variants.find((v) => v.id === config.variantId) ??
      config.product.variants[0];

    const singleFruitObj = config.product.singleFruitChoices?.find(
      (f) => f.name === config.selectedSingleFruit
    );

    const imageWebp = singleFruitObj
      ? singleFruitObj.imageWebp
      : config.product.imageWebp;
    const imageJpg = singleFruitObj
      ? singleFruitObj.imageJpg
      : config.product.imageJpg;

    const signature = [
      config.product.id,
      variant.id,
      config.selectedSingleFruit ?? '',
      [...config.selectedAddons].sort().join('|'),
      [...config.removedFruits].sort().join('|'),
      config.notes.trim(),
    ].join('::');

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.cartItemId === signature
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + config.quantity,
        };
        return updated;
      }
      return [
        ...prev,
        {
          cartItemId: signature,
          productId: config.product.id,
          productName: config.product.name,
          variantLabel: variant.label,
          unitPrice: variant.price,
          quantity: config.quantity,
          selectedSingleFruit: config.selectedSingleFruit,
          selectedAddons: config.selectedAddons,
          removedFruits: config.removedFruits,
          notes: config.notes.trim(),
          imageWebp,
          imageJpg,
        },
      ];
    });

    showToast(`${config.product.name} adicionado à cesta!`);
  };

  const handleUpdateQty = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'todos') return MENU_PRODUCTS;
    return MENU_PRODUCTS.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const cartCount = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'todos', label: 'Cardápio Completo (4)' },
    { id: 'saladas', label: 'Saladas de Frutas & Overnight' },
    { id: 'cortadas', label: 'Fruta Cortada' },
    { id: 'caixas', label: 'Caixa de Morango' },
  ];

  const scrollToDelivery = () => {
    const el = document.getElementById('entregas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-botanical-canvas">
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        selectedZone={selectedZone}
        onScrollToDelivery={scrollToDelivery}
      />

      <main className="flex-1">
        <Hero />

        {/* Main Digital Menu Section */}
        <section id="cardapio" className="pt-6 pb-8 sm:pt-10 sm:pb-12 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* Section Title */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-suafruti-800 text-citrus-400 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  Cardápio Oficial Suafruti
                </span>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-suafruti-950">
                  Escolha sua fruta fresquinha
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-suafruti-800/80">
                  Selecione o tamanho e os adicionais no próprio card ou toque em{' '}
                  <strong>Personalizar</strong>. Peça um item direto no WhatsApp ou monte sua cesta!
                </p>
              </div>
            </div>

            {/* Mobile-Friendly Horizontal Category Filter Tabs */}
            <div className="sticky top-16 sm:top-[4.5rem] z-30 -mx-4 px-4 sm:mx-0 sm:px-0 py-2.5 bg-cream-100/90 backdrop-blur-md mb-6 border-y sm:border-none border-suafruti-200/60">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {categories.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all active:scale-95 ${
                        active
                          ? 'bg-suafruti-800 text-white shadow-md'
                          : 'bg-white text-suafruti-800 border border-suafruti-200 hover:border-suafruti-400'
                      }`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-7">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedZone={selectedZone}
                  onAddToCart={handleAddToCart}
                  onOpenModal={(prod, variantId, singleFruitId, addons) =>
                    setModalState({
                      product: prod,
                      variantId,
                      singleFruitId,
                      addons,
                    })
                  }
                />
              ))}
            </div>
          </div>
        </section>

        {/* Delivery Rates Section */}
        <DeliverySection
          selectedZone={selectedZone}
          onSelectZone={(zone) => {
            setSelectedZone(zone);
            showToast(
              `Entrega alterada para ${zone.name} (${
                zone.isFree ? 'Grátis' : formatCurrency(zone.fee)
              })`
            );
          }}
        />

        {/* Freshness & Brand Craftsmanship Section */}
        <FreshnessBanner />
      </main>

      <Footer />

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-suafruti-950 text-white text-xs sm:text-sm font-bold shadow-2xl border border-suafruti-700 flex items-center gap-2 animate-pop-in max-w-[92vw]">
          <CheckCircle2 className="w-4 h-4 text-citrus-400 shrink-0" />
          <span className="truncate">{toastMessage}</span>
        </div>
      )}

      {/* Mobile Sticky Bottom Cesta / WhatsApp Bar */}
      {cartCount > 0 ? (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden bg-gradient-to-t from-suafruti-950/95 via-suafruti-950/85 to-transparent pb-safe">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-gradient-to-r from-suafruti-700 via-suafruti-600 to-[#1ea952] text-white shadow-2xl border border-white/15 active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-citrus-400 text-suafruti-950 font-black text-xs">
                {cartCount}
              </span>
              <div className="text-left">
                <p className="text-xs font-extrabold leading-tight">
                  Ver Minha Cesta
                </p>
                <p className="text-[10px] text-suafruti-100">
                  Entrega {selectedZone.name}:{' '}
                  {selectedZone.isFree
                    ? 'Grátis'
                    : formatCurrency(selectedZone.fee)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="font-display font-black text-base tabular-price">
                {formatCurrency(cartSubtotal + selectedZone.fee)}
              </span>
              <ShoppingBag className="w-4 h-4 text-citrus-400" />
            </div>
          </button>
        </div>
      ) : (
        <a
          href={buildDirectGreetingWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar no WhatsApp"
          className="fixed bottom-4 right-4 z-40 sm:hidden inline-flex items-center gap-2 px-4 py-3 rounded-full bg-[#25D366] text-suafruti-950 font-extrabold text-xs shadow-2xl border-2 border-white active:scale-95"
        >
          <WhatsAppIcon className="w-5 h-5" />
          <span>Pedir no Zap</span>
        </a>
      )}

      {/* Product Customization Modal / Sheet */}
      <ProductModal
        product={modalState.product}
        initialVariantId={modalState.variantId}
        initialSingleFruitId={modalState.singleFruitId}
        initialAddons={modalState.addons}
        selectedZone={selectedZone}
        onClose={() => setModalState({ product: null })}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Cart Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        selectedZone={selectedZone}
        onSelectZone={setSelectedZone}
      />
    </div>
  );
};

export default App;
