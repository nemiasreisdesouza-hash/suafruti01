import logoWebpAsset from '../assets/images/logo-suafruti.webp';
import logoPngAsset from '../assets/images/logo-suafruti.png';

import saladaTradicionalWebp from '../assets/images/salada-tradicional.webp';
import saladaTradicionalJpg from '../assets/images/salada-tradicional.jpg';

import saladaComumWebp from '../assets/images/salada-comum.webp';
import saladaComumJpg from '../assets/images/salada-comum.jpg';

import morangoSupremeWebp from '../assets/images/morango-supreme.webp';
import morangoSupremeJpg from '../assets/images/morango-supreme.jpg';

import explosaoMaracujaWebp from '../assets/images/explosao-maracuja.webp';
import explosaoMaracujaJpg from '../assets/images/explosao-maracuja.jpg';

import limaoCremosoWebp from '../assets/images/limao-cremoso.webp';
import limaoCremosoJpg from '../assets/images/limao-cremoso.jpg';

import berryCreamWebp from '../assets/images/berry-cream.webp';
import berryCreamJpg from '../assets/images/berry-cream.jpg';

import saladaOvernightWebp from '../assets/images/salada-overnight.webp';
import saladaOvernightJpg from '../assets/images/salada-overnight.jpg';

import mangaTemperadaWebp from '../assets/images/manga-temperada.webp';
import mangaTemperadaJpg from '../assets/images/manga-temperada.jpg';

import frutaMorangoWebp from '../assets/images/fruta-morango.webp';
import frutaMorangoJpg from '../assets/images/fruta-morango.jpg';

import frutaMangaWebp from '../assets/images/fruta-manga.webp';
import frutaMangaJpg from '../assets/images/fruta-manga.jpg';

import frutaMamaoWebp from '../assets/images/fruta-mamao.webp';
import frutaMamaoJpg from '../assets/images/fruta-mamao.jpg';

import caixaMorangoWebp from '../assets/images/caixa-morango.webp';
import caixaMorangoJpg from '../assets/images/caixa-morango.jpg';

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

export interface SeasonedFlavorOption {
  id: string;
  name: string;
  badge?: string;
  ingredients: string;
  hasPaprikaChoice?: boolean;
}

export type ProductCategory =
  | 'saladas'
  | 'especiais'
  | 'temperadas'
  | 'cortadas'
  | 'caixas';

export interface MenuProduct {
  id: string;
  category: ProductCategory;
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
  addonsIncludedByDefault?: boolean;
  noAddonsNote?: string;
  finishingNote?: string;
  singleFruitChoices?: FruitChoiceOption[];
  seasonedFlavors?: SeasonedFlavorOption[];
  paprikaChoices?: string[];
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
  selectedFlavorLabel?: string;
  selectedAddons: string[];
  removedAddons?: string[];
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
  logoWebp: logoWebpAsset,
  logoPng: logoPngAsset,
};

export const HERO_PREVIEW_IMAGES = {
  berryCream: {
    webp: berryCreamWebp,
    jpg: berryCreamJpg,
  },
  tradicional: {
    webp: saladaTradicionalWebp,
    jpg: saladaTradicionalJpg,
  },
  mangaTemperada: {
    webp: mangaTemperadaWebp,
    jpg: mangaTemperadaJpg,
  },
  caixaMorango: {
    webp: caixaMorangoWebp,
    jpg: caixaMorangoJpg,
  },
};

export const FRUIT_DOT_COLORS: Record<string, string> = {
  'Uva verde': '#84CC16',
  'Uva preta': '#6D28D9',
  Uva: '#7C3AED',
  Mirtilo: '#312E81',
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
    name: 'Salada Tradicional da Casa',
    highlightBadge: 'Campeã de Pedidos',
    badgeTone: 'emerald',
    description:
      'A clássica completa da Suafruti! Combinação de 8 frutas selecionadas e cortadas na hora, com direito aos seus adicionais favoritos.',
    imageWebp: saladaTradicionalWebp,
    imageJpg: saladaTradicionalJpg,
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Com adicionais à escolha',
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
    addonsTitle: 'Adicionais disponíveis',
    addonsHelper: 'Toque para escolher',
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
    id: 'salada-comum',
    category: 'saladas',
    categoryLabel: 'Saladas no Pote',
    name: 'Salada de Frutas Comum',
    highlightBadge: '100% Pura Fruta',
    badgeTone: 'emerald',
    description:
      'Leve, refrescante e 100% natural! Mix de 7 frutas fresquinhas cortadas na hora, ideal para quem prefere o sabor puro da fruta sem adicionais.',
    imageWebp: saladaComumWebp,
    imageJpg: saladaComumJpg,
    noAddonsNote: 'Sem adicionais • Somente frutas frescas selecionadas',
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Sem adicionais',
        price: 15.0,
      },
    ],
    defaultVariantId: '300ml',
    baseFruits: [
      'Mamão',
      'Manga',
      'Banana',
      'Maçã',
      'Uva preta',
      'Morango',
      'Kiwi',
    ],
  },
  {
    id: 'morango-supreme',
    category: 'especiais',
    categoryLabel: 'Especiais & Cremosos',
    name: 'Morango Supreme',
    highlightBadge: 'Novo • Irresistível',
    badgeTone: 'berry',
    description:
      'Para os apaixonados por morango! Morangos frescos e selecionados envolvidos na combinação clássica de leite condensado e leite em pó.',
    imageWebp: morangoSupremeWebp,
    imageJpg: morangoSupremeJpg,
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Porção cremosa',
        price: 15.0,
      },
    ],
    defaultVariantId: '300ml',
    baseFruits: ['Morango'],
    addonsTitle: 'Adicionais da receita',
    addonsIncludedByDefault: true,
    addons: ['Leite condensado', 'Leite em pó'],
  },
  {
    id: 'explosao-maracuja',
    category: 'especiais',
    categoryLabel: 'Especiais & Cremosos',
    name: 'Explosão de Maracujá',
    highlightBadge: 'Novo • Super Cremoso',
    badgeTone: 'gold',
    description:
      'Equilíbrio perfeito entre o docinho e o cítrico tropical! Frutas selecionadas com mousse aerado e calda natural de maracujá com sementes.',
    imageWebp: explosaoMaracujaWebp,
    imageJpg: explosaoMaracujaJpg,
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Receita especial',
        price: 18.0,
      },
    ],
    defaultVariantId: '300ml',
    baseFruits: ['Morango', 'Uva', 'Kiwi', 'Banana'],
    addonsTitle: 'Adicionais da receita',
    addonsIncludedByDefault: true,
    addons: [
      'Mousse de maracujá',
      'Calda de maracujá com sementes',
      'Leite condensado',
      'Leite em pó',
    ],
  },
  {
    id: 'limao-cremoso',
    category: 'especiais',
    categoryLabel: 'Especiais & Cremosos',
    name: 'Limão Cremoso',
    highlightBadge: 'Novo • Refrescante',
    badgeTone: 'emerald',
    description:
      'Cremosidade cítrica na medida certa! Morango, uva e manga combinados com mousse de limão aveludado, raspas frescas, leite condensado e leite em pó.',
    imageWebp: limaoCremosoWebp,
    imageJpg: limaoCremosoJpg,
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Receita especial',
        price: 18.0,
      },
    ],
    defaultVariantId: '300ml',
    baseFruits: ['Morango', 'Uva', 'Manga'],
    addonsTitle: 'Adicionais da receita',
    addonsIncludedByDefault: true,
    addons: [
      'Mousse de limão',
      'Raspa de limão',
      'Leite condensado',
      'Leite em pó',
    ],
  },
  {
    id: 'berry-cream',
    category: 'especiais',
    categoryLabel: 'Especiais & Cremosos',
    name: 'SuaFruti Berry Cream',
    highlightBadge: 'Premium • Sobremesa Cremosa',
    badgeTone: 'berry',
    description:
      'Para quem gosta de sobremesas cremosas! Camadas generosas de mirtilo, morango, uva preta e banana com mousse de morango e leite condensado.',
    imageWebp: berryCreamWebp,
    imageJpg: berryCreamJpg,
    finishingNote: 'Finalização: morangos frescos e mirtilos por cima.',
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Sobremesa especial',
        price: 25.0,
      },
    ],
    defaultVariantId: '300ml',
    baseFruits: ['Mirtilo', 'Morango', 'Uva preta', 'Banana'],
    addonsTitle: 'Cremes da receita',
    addonsIncludedByDefault: true,
    addons: ['Mousse de morango', 'Leite condensado'],
  },
  {
    id: 'salada-overnight',
    category: 'saladas',
    categoryLabel: 'Saladas no Pote',
    name: 'Salada Overnight',
    highlightBadge: 'Nutritiva & Cremosa',
    badgeTone: 'gold',
    description:
      'Camadas irresistíveis de frutas fresquinhas combinadas com cremosidade e fibras naturais. Personalize as frutas do pote e seus complementos preferidos!',
    imageWebp: saladaOvernightWebp,
    imageJpg: saladaOvernightJpg,
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Refeição completa',
        price: 25.0,
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
    id: 'manga-temperada',
    category: 'temperadas',
    categoryLabel: 'Lançamento Especial',
    name: 'Manga Temperada',
    highlightBadge: 'Lançamento • Sabor que Conquista!',
    badgeTone: 'berry',
    description:
      'A sensação que conquista no primeiro pedaço! Manga fresquinha cortada na hora com tempero na medida certa. Escolha sua combinação favorita no pote de 300 ml:',
    imageWebp: mangaTemperadaWebp,
    imageJpg: mangaTemperadaJpg,
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Porção caprichada',
        price: 18.0,
      },
    ],
    defaultVariantId: '300ml',
    seasonedFlavors: [
      {
        id: 'suafruti',
        name: 'SUAFRUTI',
        badge: 'Especial da Casa',
        ingredients:
          'Sal, limão, lemon pepper, páprica picante ou defumada e leite condensado.',
        hasPaprikaChoice: true,
      },
      {
        id: 'agridoce',
        name: 'Agridoce',
        ingredients:
          'Combinação de sal, limão, lemon pepper e uma cobertura de leite condensado.',
        hasPaprikaChoice: false,
      },
      {
        id: 'tropical',
        name: 'Tropical',
        ingredients:
          'Sal, limão, lemon pepper e páprica picante ou defumada.',
        hasPaprikaChoice: true,
      },
    ],
    paprikaChoices: ['Páprica Picante', 'Páprica Defumada'],
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
    imageWebp: frutaMorangoWebp,
    imageJpg: frutaMorangoJpg,
    variants: [
      {
        id: '300ml',
        label: 'Pote 300 ml',
        shortLabel: 'Pote 300 ML',
        subtitle: 'Porção individual',
        price: 12.0,
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
        imageWebp: frutaMorangoWebp,
        imageJpg: frutaMorangoJpg,
        tagline: 'Morangos vermelhinhos e selecionados',
      },
      {
        id: 'manga',
        name: 'Manga',
        accentColor: '#D97706',
        bgClass: 'bg-amber-50',
        borderClass: 'border-amber-400',
        textClass: 'text-amber-900',
        imageWebp: frutaMangaWebp,
        imageJpg: frutaMangaJpg,
        tagline: 'Cubos doces, macios e sem fiapos',
      },
      {
        id: 'mamao',
        name: 'Mamão',
        accentColor: '#EA580C',
        bgClass: 'bg-orange-50',
        borderClass: 'border-orange-400',
        textClass: 'text-orange-900',
        imageWebp: frutaMamaoWebp,
        imageJpg: frutaMamaoJpg,
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
    imageWebp: caixaMorangoWebp,
    imageJpg: caixaMorangoJpg,
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
    fee: 5.0,
    badge: 'Taxa R$ 5,00',
  },
];
