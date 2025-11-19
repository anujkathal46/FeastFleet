import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, MapPin, LogOut, User as UserIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Address } from "@shared/schema";

export default function Profile() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: addresses } = useQuery<Address[]>({
    queryKey: ["/api/addresses"],
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
    }
  }, [isAuthenticated, authLoading, toast]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase() || user.email?.[0]?.toUpperCase() || 'U';

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Poppins, sans-serif' }} data-testid="text-profile-title">
          Profile
        </h1>

        {/* User Info Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 mb-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.profileImageUrl || undefined} alt={user.firstName || 'User'} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold" data-testid="text-user-name">
                  {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'User'}
                </h2>
                {user.email && (
                  <p className="text-muted-foreground" data-testid="text-user-email">{user.email}</p>
                )}
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">User ID</label>
                <p className="font-mono text-sm">{user.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Type</label>
                <p className="capitalize">{user.role}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Saved Addresses */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Saved Addresses
              </CardTitle>
              <Link href="/profile/addresses">
                <Button variant="outline" size="sm" data-testid="button-manage-addresses">
                  Manage
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {addresses && addresses.length > 0 ? (
              <div className="space-y-3">
                {addresses.slice(0, 3).map((address) => (
                  <div key={address.id} className="p-3 border rounded-lg" data-testid={`address-${address.id}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{address.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {address.street}, {address.city}, {address.state} {address.zipCode}
                        </p>
                      </div>
                      {address.isDefault && (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                    </div>
                  </div>
                ))}
                {addresses.length > 3 && (
                  <p className="text-sm text-muted-foreground text-center">
                    +{addresses.length - 3} more addresses
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-6" data-testid="no-addresses">
                <p className="text-muted-foreground mb-4">No saved addresses</p>
                <Link href="/profile/addresses">
                  <Button>Add Address</Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Logout */}
        <Button
          variant="destructive"
          className="w-full"
          onClick={() => window.location.href = "/api/logout"}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Log Out
        </Button>
      </div>
    </div>
  );
}
