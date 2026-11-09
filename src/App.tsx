import React, { useState, useEffect, useMemo } from 'react';
import { ShoppingBag, CheckCircle2, Sparkles } from 'lucide-react';
import {
  CartItem,
  DELIVERY_ZONES,
  DeliveryZone,
  MENU_PRODUCTS,
  MenuProduct,
  ProductCategory,
} from './data/menu';
import { formatCurrency } from './utils/whatsapp';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { DeliverySection } from './components/DeliverySection';
import { FreshnessBanner } from './components/FreshnessBanner';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

type CategoryFilter = 'todos' | ProductCategory;

const STORAGE_CART_KEY = 'suafruti_cart_v3';
const STORAGE_ZONE_KEY = 'suafruti_zone_v2';

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

  const [modalState, setModalState] = useState<{
    product: MenuProduct | null;
    initialVariantId?: string;
    initialSingleFruitId?: string;
    initialFlavorId?: string;
    initialPaprika?: string;
    initialAddons?: string[];
    initialRemovedFruits?: string[];
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
    selectedFlavorLabel?: string;
    selectedAddons: string[];
    removedAddons: string[];
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
      config.selectedFlavorLabel ?? '',
      [...config.selectedAddons].sort().join('|'),
      [...config.removedAddons].sort().join('|'),
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
          selectedFlavorLabel: config.selectedFlavorLabel,
          selectedAddons: config.selectedAddons,
          removedAddons: config.removedAddons,
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

  const categories: { id: CategoryFilter; label: string; isNew?: boolean }[] = [
    { id: 'todos', label: `Cardápio Completo (${MENU_PRODUCTS.length})` },
    { id: 'especiais', label: 'Especiais & Cremosos', isNew: true },
    { id: 'saladas', label: 'Saladas & Overnight' },
    { id: 'temperadas', label: 'Manga Temperada' },
    { id: 'cortadas', label: 'Fruta Cortada' },
    { id: 'caixas', label: 'Caixa de Morango' },
  ];

  const scrollToDelivery = () => {
    const el = document.getElementById('entregas');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      className={`min-h-screen w-full max-w-full flex flex-col bg-botanical-canvas ${
        cartCount > 0 ? 'pb-20 sm:pb-0' : ''
      }`}
    >
      <Header
        cartCount={cartCount}
        cartSubtotal={cartSubtotal}
        onOpenCart={() => setIsCartOpen(true)}
        selectedZone={selectedZone}
        onScrollToDelivery={scrollToDelivery}
      />

      <main className="flex-1 w-full max-w-full">
        <Hero />

        {/* Main Digital Menu Section */}
        <section
          id="cardapio"
          className="pt-6 pb-8 sm:pt-10 sm:pb-12 scroll-mt-24 w-full max-w-full"
        >
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 w-full">
            {/* Section Title */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-suafruti-800 text-citrus-400 text-xs font-extrabold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  Cardápio Oficial Suafruti
                </span>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-suafruti-950">
                  Escolha sua fruta fresquinha
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-suafruti-800/80">
                  Toque nas frutas para retirar caso não deseje alguma e personalize seus adicionais direto no card!
                </p>
              </div>
            </div>
          </div>

          {/* Mobile-Friendly Sticky Category Filter Tabs */}
          <div className="sticky top-[5.5rem] md:top-[4.25rem] z-30 w-full bg-cream-100/95 backdrop-blur-md mb-6 border-y sm:border-b-0 border-suafruti-200/70 py-2.5">
            <div className="max-w-6xl mx-auto px-3.5 sm:px-6 w-full">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full">
                {categories.map((cat) => {
                  const active = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={`shrink-0 inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-extrabold transition-all active:scale-95 ${
                        active
                          ? 'bg-suafruti-800 text-white shadow-md'
                          : 'bg-white text-suafruti-800 border border-suafruti-200 hover:border-suafruti-400'
                      }`}
                    >
                      <span>{cat.label}</span>
                      {cat.isNew && (
                        <span
                          className={`px-1.5 py-0.5 rounded-full text-[9px] font-black uppercase ${
                            active
                              ? 'bg-citrus-400 text-suafruti-950'
                              : 'bg-berry-600 text-white'
                          }`}
                        >
                          Novo
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="max-w-6xl mx-auto px-3.5 sm:px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-7 w-full">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  selectedZone={selectedZone}
                  onAddToCart={handleAddToCart}
                  onOpenModal={(cfg) => setModalState(cfg)}
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

      {/* Toast Feedback: Centered via full-width flex wrapper so keyframe transform never shifts it right */}
      {toastMessage && (
        <div className="fixed top-24 md:top-20 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
          <div
            role="status"
            onClick={() => setToastMessage(null)}
            className="pointer-events-auto w-auto max-w-full sm:max-w-md px-4 py-3 rounded-2xl bg-suafruti-950/95 backdrop-blur-md text-white text-xs sm:text-sm font-bold shadow-2xl border border-citrus-400/50 flex items-center gap-2.5 animate-pop-in cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-citrus-400 shrink-0" />
            <span className="leading-snug break-words">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Mobile Sticky Bottom Cesta Bar (shown only when basket has items) */}
      {cartCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:hidden bg-gradient-to-t from-suafruti-950/95 via-suafruti-950/85 to-transparent pb-safe">
          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-2xl bg-gradient-to-r from-suafruti-700 via-suafruti-600 to-[#1ea952] text-white shadow-2xl border border-white/15 active:scale-[0.99]"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-xl bg-citrus-400 text-suafruti-950 font-black text-xs shrink-0">
                {cartCount}
              </span>
              <div className="text-left min-w-0">
                <p className="text-xs font-extrabold leading-tight truncate">
                  Ver Minha Cesta
                </p>
                <p className="text-[10px] text-suafruti-100 truncate">
                  Entrega {selectedZone.name}:{' '}
                  {selectedZone.isFree
                    ? 'Grátis'
                    : formatCurrency(selectedZone.fee)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <span className="font-display font-black text-base tabular-price">
                {formatCurrency(cartSubtotal + selectedZone.fee)}
              </span>
              <ShoppingBag className="w-4 h-4 text-citrus-400 shrink-0" />
            </div>
          </button>
        </div>
      )}

      {/* Product Customization Modal / Sheet */}
      <ProductModal
        product={modalState.product}
        initialVariantId={modalState.initialVariantId}
        initialSingleFruitId={modalState.initialSingleFruitId}
        initialFlavorId={modalState.initialFlavorId}
        initialPaprika={modalState.initialPaprika}
        initialAddons={modalState.initialAddons}
        initialRemovedFruits={modalState.initialRemovedFruits}
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
