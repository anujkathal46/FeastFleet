import { Button } from "@/components/ui/button";
import { Search, Clock, Shield, Star } from "lucide-react";
import heroImage from "@assets/generated_images/Hero_section_food_spread_34336629.png";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[75vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Food delivery in minutes
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            Order from your favorite restaurants and get it delivered right to your door
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-8 py-6 min-h-12"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-get-started"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 min-h-12 bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              Log In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-card">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Why Choose FoodSwift?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center" data-testid="feature-fast">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your food delivered in 30 minutes or less
              </p>
            </div>

            <div className="text-center" data-testid="feature-restaurants">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Top Restaurants</h3>
              <p className="text-muted-foreground">
                Choose from hundreds of local favorites
              </p>
            </div>

            <div className="text-center" data-testid="feature-tracking">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-muted-foreground">
                Track your order from kitchen to doorstep
              </p>
            </div>

            <div className="text-center" data-testid="feature-secure">
              <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-muted-foreground">
                Safe and secure checkout with Stripe
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Ready to order?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of happy customers enjoying delicious food delivered fast
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 min-h-12"
            onClick={() => window.location.href = "/api/login"}
            data-testid="button-start-ordering"
          >
            Start Ordering Now
          </Button>
        </div>
      </section>
    </div>
  );
}
