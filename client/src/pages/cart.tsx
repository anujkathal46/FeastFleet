import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { getCart, updateCartItemQuantity, removeFromCart, getCartTotal } from "@/lib/cart";
import type { CartItem } from "@shared/schema";

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const items = getCart();
    setCartItems(items);
    setSubtotal(getCartTotal());
  };

  const handleUpdateQuantity = (menuItemId: string, quantity: number, customization?: string) => {
    updateCartItemQuantity(menuItemId, quantity, customization);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleRemoveItem = (menuItemId: string, customization?: string) => {
    removeFromCart(menuItemId, customization);
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Get unique restaurant from cart
  const restaurantId = cartItems.length > 0 ? cartItems[0].restaurantId : null;
  const hasMultipleRestaurants = cartItems.some(item => item.restaurantId !== restaurantId);

  const deliveryFee = 4.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="text-center py-16" data-testid="empty-cart">
            <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some delicious food to get started
            </p>
            <Link href="/">
              <Button data-testid="button-browse">Browse Restaurants</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="text-cart-title">
          Your Cart
        </h1>

        {hasMultipleRestaurants && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-6" data-testid="warning-multiple-restaurants">
            <p className="text-sm text-destructive">
              Your cart contains items from multiple restaurants. Please order from one restaurant at a time.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <Card key={`${item.menuItemId}-${item.customization || index}`} data-testid={`cart-item-${item.menuItemId}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    {item.imageUrl && (
                      <div className="w-20 h-20 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h3 className="font-semibold" data-testid={`text-item-name-${item.menuItemId}`}>
                            {item.name}
                          </h3>
                          {item.customization && (
                            <p className="text-sm text-muted-foreground">
                              {item.customization}
                            </p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="flex-shrink-0"
                          onClick={() => handleRemoveItem(item.menuItemId, item.customization)}
                          data-testid={`button-remove-${item.menuItemId}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.menuItemId, item.quantity - 1, item.customization)}
                            disabled={item.quantity <= 1}
                            data-testid={`button-decrease-${item.menuItemId}`}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.menuItemId}`}>
                            {item.quantity}
                          </span>
                          <Button
                            size="icon"
                            variant="outline"
                            className="h-8 w-8"
                            onClick={() => handleUpdateQuantity(item.menuItemId, item.quantity + 1, item.customization)}
                            data-testid={`button-increase-${item.menuItemId}`}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                        <span className="font-semibold" data-testid={`text-item-total-${item.menuItemId}`}>
                          ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span data-testid="text-subtotal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span data-testid="text-delivery-fee">${deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span data-testid="text-tax">${tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span data-testid="text-total">${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => setLocation('/checkout')}
                  disabled={hasMultipleRestaurants}
                  data-testid="button-checkout"
                >
                  Proceed to Checkout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
