import type { CartItem } from "@shared/schema";

const CART_STORAGE_KEY = "foodswift_cart";

export function getCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]): void {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

export function clearCart(): void {
  localStorage.removeItem(CART_STORAGE_KEY);
}

export function addToCart(item: CartItem): CartItem[] {
  const cart = getCart();
  const existingIndex = cart.findIndex(
    (i) => i.menuItemId === item.menuItemId && i.customization === item.customization
  );

  if (existingIndex >= 0) {
    cart[existingIndex].quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
  return cart;
}

export function removeFromCart(menuItemId: string, customization?: string): CartItem[] {
  const cart = getCart();
  const filtered = cart.filter(
    (i) => !(i.menuItemId === menuItemId && i.customization === customization)
  );
  saveCart(filtered);
  return filtered;
}

export function updateCartItemQuantity(
  menuItemId: string,
  quantity: number,
  customization?: string
): CartItem[] {
  const cart = getCart();
  const item = cart.find(
    (i) => i.menuItemId === menuItemId && i.customization === customization
  );

  if (item) {
    if (quantity <= 0) {
      return removeFromCart(menuItemId, customization);
    }
    item.quantity = quantity;
    saveCart(cart);
  }

  return cart;
}

export function getCartTotal(): number {
  const cart = getCart();
  return cart.reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0);
}

export function getCartItemCount(): number {
  const cart = getCart();
  return cart.reduce((count, item) => count + item.quantity, 0);
}
