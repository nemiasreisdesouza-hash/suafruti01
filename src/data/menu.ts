export interface ProductVariant {
  id: string;
  label: string;
  shortLabel: string;
  subtitle?: string;
  price: number;
}

export interface FruitChoiceOption {
  id: string;
  name: string;
  accentColor: string;
  bgClass: string;
  borderClass: string;
  textClass: string;
  imageWebp: string;
  imageJpg: string;
  tagline: string;
}

export interface MenuProduct {
  id: string;
  category: 'saladas' | 'cortadas' | 'caixas';
  categoryLabel: string;
  name: string;
  highlightBadge: string;
  badgeTone: 'emerald' | 'gold' | 'berry';
  description: string;
  imageWebp: string;
  imageJpg: string;
  variants: ProductVariant[];
  defaultVariantId: string;
  baseFruits?: string[];
  addons?: string[];
  addonsTitle?: string;
  addonsHelper?: string;
  singleFruitChoices?: FruitChoiceOption[];
  crateHighlight?: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  subtitle: string;
  fee: number;
  badge: string;
  isFree?: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  selectedSingleFruit?: string;
  selectedAddons: string[];
  removedFruits: string[];
  notes: string;
  imageWebp: string;
  imageJpg: string;
}

export const BRAND_CONFIG = {
  name: 'Suafruti',
  slogan: 'O melhor sabor da natureza.',
  heroHeadline: 'Sua pausa mais gostosa e natural!',
  footerTagline: 'Sua fruta, sempre fresquinha!',
  whatsappNumber: '5527992822534',
  whatsappDisplay: '(27) 99282-2534',
  instagramHandle: '@suafruti',
  instagramUrl: 'https://instagram.com/suafruti',
  websiteDisplay: 'www.suafruti.com.br',
  officialLogoImgur: 'https://i.imgur.com/iHVVTHH.jpeg',
  logoWebp: '/images/logo-suafruti.webp',
  logoPng: '/images/logo-suafruti.png',
};

export const FRUIT_DOT_COLORS: Record<string, string> = {
  'Uva verde': '#84CC16',
  'Uva preta': '#6D28D9',
  Morango: '#E11D48',
  Kiwi: '#4D7C0F',
  Manga: '#F59E0B',
  Banana: '#FACC15',
  Maçã: '#EF4444',
  Mamão: '#F97316',
};

export const MENU_PRODUCTS: MenuProduct[] = [
  {
    id: 'salada-tradicional',
    category: 'saladas',
    categoryLabel: 'Saladas no Pote',
    name: 'Salada de Frutas Tradicional',
    highlightBadge: 'Campeã de Pedidos',
    badgeTone: 'emerald',
    description:
      'Combinação colorida de 8 frutas selecionadas e cortadas na hora, docinhas e suculentas no pote transparente. Escolha seus adicionais favoritos!',
    imageWebp: '/images/salada-tradicional.webp',
    imageJpg: '/images/salada-tradicional.jpg',
    variants: [
      {
        id: '250ml',
        label: 'Pote 250 ml',
        shortLabel: '250 ML',
        subtitle: 'Na medida certa',
        price: 12.0,
      },
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: '300 ML',
        subtitle: 'Mais pedido',
        price: 15.0,
      },
    ],
    defaultVariantId: '300ml',
    baseFruits: [
      'Uva verde',
      'Uva preta',
      'Morango',
      'Kiwi',
      'Manga',
      'Banana',
      'Maçã',
      'Mamão',
    ],
    addonsTitle: 'Adicionais disponíveis',
    addonsHelper: 'Toque para incluir no seu pedido',
    addons: [
      'Leite condensado',
      'Leite em pó',
      'Mel',
      'Granola',
      'Mousse de maracujá',
      'Mousse de morango',
    ],
  },
  {
    id: 'salada-overnight',
    category: 'saladas',
    categoryLabel: 'Saladas no Pote',
    name: 'Salada Overnight',
    highlightBadge: 'Nutritiva & Cremosa',
    badgeTone: 'gold',
    description:
      'Camadas irresistíveis de frutas fresquinhas combinadas com cremosidade e fibras naturais. Energia leve, saciedade e muito sabor a qualquer hora do dia.',
    imageWebp: '/images/salada-overnight.webp',
    imageJpg: '/images/salada-overnight.jpg',
    variants: [
      {
        id: '250ml',
        label: 'Pote 250 ml',
        shortLabel: '250 ML',
        subtitle: 'Pausa leve',
        price: 18.0,
      },
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: '300 ML',
        subtitle: 'Refeição completa',
        price: 20.0,
      },
    ],
    defaultVariantId: '300ml',
    baseFruits: [
      'Uva verde',
      'Uva preta',
      'Morango',
      'Kiwi',
      'Manga',
      'Banana',
      'Maçã',
      'Mamão',
    ],
    addonsTitle: 'Adicionais do Overnight',
    addonsHelper: 'Escolha os complementos do seu pote',
    addons: ['Iogurte natural', 'Chia', 'Granola', 'Mel', 'Aveia'],
  },
  {
    id: 'fruta-cortada',
    category: 'cortadas',
    categoryLabel: 'Fruta Cortada',
    name: 'Fruta Cortada',
    highlightBadge: 'Escolha a sua • 1 Opção',
    badgeTone: 'emerald',
    description:
      'Praticidade pura! Um pote inteirinho dedicado à sua fruta preferida, higienizada e cortada fresquinha no momento do preparo. Somente uma opção por pote.',
    imageWebp: '/images/fruta-morango.webp',
    imageJpg: '/images/fruta-morango.jpg',
    variants: [
      {
        id: '250ml',
        label: 'Pote 250 ml',
        shortLabel: '250 ML',
        subtitle: 'Porção individual',
        price: 8.0,
      },
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: '300 ML',
        subtitle: 'Porção caprichada',
        price: 10.0,
      },
    ],
    defaultVariantId: '300ml',
    singleFruitChoices: [
      {
        id: 'morango',
        name: 'Morango',
        accentColor: '#E11D48',
        bgClass: 'bg-rose-50',
        borderClass: 'border-rose-400',
        textClass: 'text-rose-800',
        imageWebp: '/images/fruta-morango.webp',
        imageJpg: '/images/fruta-morango.jpg',
        tagline: 'Morangos vermelhinhos e selecionados',
      },
      {
        id: 'manga',
        name: 'Manga',
        accentColor: '#D97706',
        bgClass: 'bg-amber-50',
        borderClass: 'border-amber-400',
        textClass: 'text-amber-900',
        imageWebp: '/images/fruta-manga.webp',
        imageJpg: '/images/fruta-manga.jpg',
        tagline: 'Cubos doces, macios e sem fiapos',
      },
      {
        id: 'mamao',
        name: 'Mamão',
        accentColor: '#EA580C',
        bgClass: 'bg-orange-50',
        borderClass: 'border-orange-400',
        textClass: 'text-orange-900',
        imageWebp: '/images/fruta-mamao.webp',
        imageJpg: '/images/fruta-mamao.jpg',
        tagline: 'Maduro no ponto certo e super leve',
      },
    ],
  },
  {
    id: 'caixa-morango',
    category: 'caixas',
    categoryLabel: 'Caixa de Morango',
    name: 'Caixa de Morango',
    highlightBadge: 'Caixa com 4 Bandejas',
    badgeTone: 'berry',
    description:
      'Caixa fechada com 4 bandejas de morangos frescos, colhidos no auge do sabor e selecionados com todo cuidado para sua casa, família ou receitas.',
    imageWebp: '/images/caixa-morango.webp',
    imageJpg: '/images/caixa-morango.jpg',
    crateHighlight: 'Caixa completa contendo 4 bandejas fresquinhas',
    variants: [
      {
        id: 'medio',
        label: 'Morango Médio (4 bandejas)',
        shortLabel: 'Morango Médio',
        subtitle: '4 bandejas • R$ 40,00',
        price: 40.0,
      },
      {
        id: 'graudo',
        label: 'Morango Graúdo (4 bandejas)',
        shortLabel: 'Morango Graúdo',
        subtitle: '4 bandejas • R$ 45,00',
        price: 45.0,
      },
    ],
    defaultVariantId: 'graudo',
  },
];

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'jesus-de-nazareth',
    name: 'Jesus de Nazareth',
    subtitle: 'Bairro Jesus de Nazareth (Vitória)',
    fee: 0,
    badge: 'Entrega Grátis',
    isFree: true,
  },
  {
    id: 'vitoria',
    name: 'Vitória',
    subtitle: 'Demais bairros de Vitória',
    fee: 3.0,
    badge: 'Taxa R$ 3,00',
  },
  {
    id: 'vila-velha',
    name: 'Vila Velha',
    subtitle: 'Entrega em Vila Velha',
    fee: 5.0,
    badge: 'Taxa R$ 5,00',
  },
  {
    id: 'serra',
    name: 'Serra',
    subtitle: 'Entrega na Serra',
    fee: 5.0,
    badge: 'Taxa R$ 5,00',
  },
  {
    id: 'cariacica',
    name: 'Cariacica',
    subtitle: 'Entrega em Cariacica',
    fee: 5.0,
    badge: 'Taxa R$ 5,00',
  },
];
