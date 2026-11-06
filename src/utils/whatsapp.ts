import { BRAND_CONFIG, CartItem, DeliveryZone } from '../data/menu';

export function formatCurrency(value: number): string {
  return value.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

interface SingleOrderParams {
  productName: string;
  variantLabel: string;
  unitPrice: number;
  quantity?: number;
  selectedSingleFruit?: string;
  selectedFlavorLabel?: string;
  selectedAddons?: string[];
  removedFruits?: string[];
  notes?: string;
  deliveryZone?: DeliveryZone | null;
}

export function buildSingleItemWhatsAppUrl(params: SingleOrderParams): string {
  const qty = params.quantity ?? 1;
  const itemSubtotal = params.unitPrice * qty;

  const lines: string[] = [
    `Olá, *${BRAND_CONFIG.name}*! Gostaria de solicitar um pedido pelo cardápio digital:`,
    '',
    `*${qty}x ${params.productName}*`,
    `• Opção/Tamanho: *${params.variantLabel}*`,
  ];

  if (params.selectedSingleFruit) {
    lines.push(`• Fruta escolhida (1 opção): *${params.selectedSingleFruit}*`);
  }

  if (params.selectedFlavorLabel) {
    lines.push(`• Sabor escolhido: *${params.selectedFlavorLabel}*`);
  }

  if (params.selectedAddons && params.selectedAddons.length > 0) {
    lines.push(`• Adicionais: *${params.selectedAddons.join(', ')}*`);
  }

  if (params.removedFruits && params.removedFruits.length > 0) {
    lines.push(`• Retirar das frutas: *Sem ${params.removedFruits.join(', ')}*`);
  }

  if (params.notes && params.notes.trim()) {
    lines.push(`• Observação: _${params.notes.trim()}_`);
  }

  lines.push(`• Valor do item: *${formatCurrency(itemSubtotal)}*`);

  if (params.deliveryZone) {
    const feeText = params.deliveryZone.isFree
      ? 'GRÁTIS'
      : formatCurrency(params.deliveryZone.fee);
    const grandTotal = itemSubtotal + params.deliveryZone.fee;
    lines.push('');
    lines.push(`*Região de entrega:* ${params.deliveryZone.name} (${feeText})`);
    lines.push(`*Total estimado:* *${formatCurrency(grandTotal)}*`);
  } else {
    lines.push('');
    lines.push('Pode confirmar a disponibilidade e a entrega para o meu endereço?');
  }

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encoded}`;
}

interface CartCheckoutParams {
  items: CartItem[];
  deliveryZone: DeliveryZone;
  customerName: string;
  address: string;
  paymentMethod: string;
}

export function buildCartWhatsAppUrl(params: CartCheckoutParams): string {
  const subtotal = params.items.reduce(
    (sum, item) => sum + item.unitPrice * item.quantity,
    0
  );
  const deliveryFee = params.deliveryZone.fee;
  const total = subtotal + deliveryFee;

  const lines: string[] = [
    `Olá, *${BRAND_CONFIG.name}*! Quero finalizar meu pedido pelo cardápio digital:`,
    '',
    '*ITENS DO PEDIDO:*',
  ];

  params.items.forEach((item, idx) => {
    const lineTotal = formatCurrency(item.unitPrice * item.quantity);
    lines.push(
      `${idx + 1}. *${item.quantity}x ${item.productName}* (${item.variantLabel}) — *${lineTotal}*`
    );
    if (item.selectedSingleFruit) {
      lines.push(`   • Fruta escolhida: ${item.selectedSingleFruit}`);
    }
    if (item.selectedFlavorLabel) {
      lines.push(`   • Sabor: ${item.selectedFlavorLabel}`);
    }
    if (item.selectedAddons.length > 0) {
      lines.push(`   • Adicionais: ${item.selectedAddons.join(', ')}`);
    }
    if (item.removedFruits.length > 0) {
      lines.push(`   • Retirar das frutas: Sem ${item.removedFruits.join(', ')}`);
    }
    if (item.notes.trim()) {
      lines.push(`   • Obs: _${item.notes.trim()}_`);
    }
  });

  lines.push('');
  lines.push('*ENTREGA E PAGAMENTO:*');
  if (params.customerName.trim()) {
    lines.push(`• Cliente: *${params.customerName.trim()}*`);
  }
  lines.push(
    `• Região: *${params.deliveryZone.name}* (${
      params.deliveryZone.isFree ? 'Entrega Grátis' : formatCurrency(deliveryFee)
    })`
  );
  if (params.address.trim()) {
    lines.push(`• Endereço: ${params.address.trim()}`);
  }
  if (params.paymentMethod) {
    lines.push(`• Pagamento: ${params.paymentMethod}`);
  }

  lines.push('');
  lines.push(`Subtotal: ${formatCurrency(subtotal)}`);
  lines.push(
    `Taxa de entrega: ${
      params.deliveryZone.isFree ? 'GRÁTIS' : formatCurrency(deliveryFee)
    }`
  );
  lines.push(`*TOTAL DO PEDIDO: ${formatCurrency(total)}*`);

  const encoded = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${encoded}`;
}

export function buildDirectGreetingWhatsAppUrl(): string {
  const msg = encodeURIComponent(
    `Olá, *${BRAND_CONFIG.name}*! Vim pelo site do cardápio e gostaria de fazer um pedido!`
  );
  return `https://wa.me/${BRAND_CONFIG.whatsappNumber}?text=${msg}`;
}
