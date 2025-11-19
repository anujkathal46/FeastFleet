import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Clock, Star, ShoppingCart, User, MapPin, Receipt } from "lucide-react";
import { Link } from "wouter";
import type { Restaurant } from "@shared/schema";
import { getCartItemCount } from "@/lib/cart";

export default function Home() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(getCartItemCount());

  const { data: restaurants, isLoading } = useQuery<Restaurant[]>({
    queryKey: ["/api/restaurants"],
  });

  // Update cart count when needed
  const updateCartCount = () => {
    setCartCount(getCartItemCount());
  };

  // Filter restaurants based on search and cuisine
  const filteredRestaurants = restaurants?.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisineType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = !selectedCuisine || restaurant.cuisineType === selectedCuisine;
    return matchesSearch && matchesCuisine;
  }) || [];

  // Get unique cuisines
  const cuisines = Array.from(new Set(restaurants?.map(r => r.cuisineType) || []));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-card-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link href="/">
              <a className="text-2xl font-bold text-primary" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="link-logo">
                FoodSwift
              </a>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search restaurants or cuisines..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
                  <ShoppingCart className="w-5 h-5" />
                  {cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs" data-testid="badge-cart-count">
                      {cartCount}
                    </Badge>
                  )}
                </Button>
              </Link>
              <Link href="/orders">
                <Button variant="ghost" size="icon" data-testid="button-orders">
                  <Receipt className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/profile">
                <Button variant="ghost" size="icon" data-testid="button-profile">
                  <User className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search restaurants or cuisines..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-mobile"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Banner */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="text-welcome">
            Welcome back, {user?.firstName || 'Guest'}!
          </h1>
          <p className="text-muted-foreground text-lg">
            What would you like to eat today?
          </p>
        </div>

        {/* Cuisine Filter */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Button
              variant={selectedCuisine === null ? "default" : "outline"}
              onClick={() => setSelectedCuisine(null)}
              data-testid="button-cuisine-all"
              className="whitespace-nowrap"
            >
              All
            </Button>
            {cuisines.map((cuisine) => (
              <Button
                key={cuisine}
                variant={selectedCuisine === cuisine ? "default" : "outline"}
                onClick={() => setSelectedCuisine(cuisine)}
                data-testid={`button-cuisine-${cuisine.toLowerCase().replace(/\s+/g, '-')}`}
                className="whitespace-nowrap"
              >
                {cuisine}
              </Button>
            ))}
          </div>
        </div>

        {/* Restaurants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <div className="flex gap-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredRestaurants.length === 0 ? (
            <div className="col-span-full text-center py-12" data-testid="text-no-restaurants">
              <p className="text-lg text-muted-foreground">
                No restaurants found. Try adjusting your search.
              </p>
            </div>
          ) : (
            filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} href={`/restaurant/${restaurant.id}`}>
                <Card className="overflow-hidden hover-elevate active-elevate-2 cursor-pointer transition-all" data-testid={`card-restaurant-${restaurant.id}`}>
                  {restaurant.imageUrl && (
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h3 className="text-xl font-semibold mb-1" data-testid={`text-restaurant-name-${restaurant.id}`}>
                      {restaurant.name}
                    </h3>
                    {restaurant.description && (
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {restaurant.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-2 text-sm">
                      <Badge variant="secondary" className="gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {restaurant.rating}
                      </Badge>
                      <Badge variant="secondary" className="gap-1">
                        <Clock className="w-3 h-3" />
                        {restaurant.deliveryTime} min
                      </Badge>
                      <Badge variant="secondary">
                        {restaurant.cuisineType}
                      </Badge>
                      <Badge variant="secondary">
                        ${restaurant.deliveryFee} delivery
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
