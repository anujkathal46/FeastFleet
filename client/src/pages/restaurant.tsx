import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ArrowLeft, Clock, Star, Plus, Minus } from "lucide-react";
import type { Restaurant, MenuItem } from "@shared/schema";
import { addToCart } from "@/lib/cart";
import { useToast } from "@/hooks/use-toast";

export default function RestaurantPage() {
  const [, params] = useRoute("/restaurant/:id");
  const restaurantId = params?.id;
  const { toast } = useToast();

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState("");

  const { data: restaurant, isLoading: restaurantLoading } = useQuery<Restaurant>({
    queryKey: ["/api/restaurants", restaurantId],
    enabled: !!restaurantId,
  });

  const { data: menuItems, isLoading: menuLoading } = useQuery<MenuItem[]>({
    queryKey: ["/api/menu-items", restaurantId],
    enabled: !!restaurantId,
  });

  const handleAddToCart = () => {
    if (!selectedItem || !restaurant) return;

    addToCart({
      menuItemId: selectedItem.id,
      restaurantId: restaurant.id,
      name: selectedItem.name,
      price: selectedItem.price,
      imageUrl: selectedItem.imageUrl,
      quantity,
      customization: customization || undefined,
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${selectedItem.name} added to your cart`,
    });

    setSelectedItem(null);
    setQuantity(1);
    setCustomization("");
    
    // Trigger cart count update
    window.dispatchEvent(new Event('cartUpdated'));
  };

  // Group menu items by category
  const groupedItems = menuItems?.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>) || {};

  if (restaurantLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <Skeleton className="h-64 w-full mb-8" />
          <Skeleton className="h-8 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-8" />
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full mb-4" />
          ))}
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Restaurant not found</p>
          <Link href="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Restaurant Info */}
      <div className="bg-card border-b border-card-border">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>

          <div className="flex flex-col md:flex-row gap-6">
            {restaurant.imageUrl && (
              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                <img
                  src={restaurant.imageUrl}
                  alt={restaurant.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1">
              <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="text-restaurant-name">
                {restaurant.name}
              </h1>
              {restaurant.description && (
                <p className="text-muted-foreground mb-4">{restaurant.description}</p>
              )}
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="secondary" className="gap-1">
                  <Star className="w-3 h-3 fill-current" />
                  {restaurant.rating}
                </Badge>
                <Badge variant="secondary" className="gap-1">
                  <Clock className="w-3 h-3" />
                  {restaurant.deliveryTime} min
                </Badge>
                <Badge variant="secondary">{restaurant.cuisineType}</Badge>
                <Badge variant="secondary">${restaurant.deliveryFee} delivery</Badge>
                {parseFloat(restaurant.minOrder) > 0 && (
                  <Badge variant="secondary">${restaurant.minOrder} min</Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        {menuLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full mb-4" />
          ))
        ) : Object.keys(groupedItems).length === 0 ? (
          <div className="text-center py-12" data-testid="text-no-menu">
            <p className="text-lg text-muted-foreground">
              No menu items available at this time.
            </p>
          </div>
        ) : (
          Object.entries(groupedItems).map(([category, items]) => (
            <div key={category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid={`text-category-${category.toLowerCase().replace(/\s+/g, '-')}`}>
                {category}
              </h2>
              <div className="space-y-4">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    className={`hover-elevate active-elevate-2 cursor-pointer transition-all ${!item.isAvailable ? 'opacity-60' : ''}`}
                    onClick={() => item.isAvailable && setSelectedItem(item)}
                    data-testid={`card-menu-item-${item.id}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {item.imageUrl && (
                          <div className="w-20 h-20 md:w-28 md:h-28 rounded-md overflow-hidden bg-muted flex-shrink-0">
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-lg" data-testid={`text-item-name-${item.id}`}>
                              {item.name}
                            </h3>
                            <span className="font-semibold text-lg whitespace-nowrap" data-testid={`text-item-price-${item.id}`}>
                              ${item.price}
                            </span>
                          </div>
                          {item.description && (
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                          <div className="flex flex-wrap gap-1">
                            {item.dietaryInfo?.map((info) => (
                              <Badge key={info} variant="outline" className="text-xs">
                                {info}
                              </Badge>
                            ))}
                            {!item.isAvailable && (
                              <Badge variant="destructive" className="text-xs">
                                Unavailable
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add to Cart Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)}>
        <DialogContent data-testid="dialog-add-to-cart">
          <DialogHeader>
            <DialogTitle>{selectedItem?.name}</DialogTitle>
            <DialogDescription>
              Customize your order and add to cart
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {selectedItem?.imageUrl && (
              <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {selectedItem?.description && (
              <p className="text-sm text-muted-foreground">{selectedItem.description}</p>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium">Special Instructions (Optional)</label>
              <Textarea
                placeholder="e.g., No onions, extra cheese..."
                value={customization}
                onChange={(e) => setCustomization(e.target.value)}
                data-testid="input-customization"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Quantity</label>
              <div className="flex items-center gap-3">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  data-testid="button-decrease-quantity"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-semibold w-12 text-center" data-testid="text-quantity">
                  {quantity}
                </span>
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => setQuantity(quantity + 1)}
                  data-testid="button-increase-quantity"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-bold" data-testid="text-item-total">
                ${(parseFloat(selectedItem?.price || '0') * quantity).toFixed(2)}
              </span>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedItem(null)} data-testid="button-cancel">
              Cancel
            </Button>
            <Button onClick={handleAddToCart} data-testid="button-add-to-cart">
              Add to Cart
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
