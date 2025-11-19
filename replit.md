# FoodSwift - Food Delivery Application

## Project Overview
FoodSwift is a full-stack food delivery application built with React, Express, PostgreSQL, and Stripe. Users can browse restaurants, order food, track deliveries, and manage their profiles.

## Tech Stack
- **Frontend**: React 18, TypeScript, Tailwind CSS, Shadcn UI, Wouter (routing), TanStack Query
- **Backend**: Express.js, Node.js, TypeScript
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Authentication**: Replit Auth (OIDC)
- **Payments**: Stripe
- **Images**: Generated using AI for hero sections and menu items

## Architecture
- **Schema-first development**: All data models defined in `shared/schema.ts`
- **Type-safe**: Full TypeScript coverage across frontend and backend
- **RESTful API**: All endpoints prefixed with `/api`
- **Session-based auth**: Using Replit Auth with PostgreSQL session store

## Database Schema

### Users
- Managed by Replit Auth
- Fields: id, email, firstName, lastName, profileImageUrl, role, createdAt, updatedAt
- Role: 'customer' or 'restaurant_owner'

### Restaurants
- Fields: id, ownerId, name, description, imageUrl, cuisineType, rating, deliveryTime, deliveryFee, minOrder, isActive
- Relationship: belongs to User (owner)

### Menu Items
- Fields: id, restaurantId, name, description, imageUrl, price, category, dietaryInfo, isAvailable
- Relationship: belongs to Restaurant

### Addresses
- Fields: id, userId, label, street, city, state, zipCode, instructions, isDefault
- Relationship: belongs to User

### Orders
- Fields: id, userId, restaurantId, addressId, status, items (JSONB), subtotal, deliveryFee, tax, total, paymentIntentId, specialInstructions, estimatedDeliveryTime
- Status: 'pending', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'
- Relationship: belongs to User and Restaurant

### Sessions
- Required for Replit Auth
- Managed automatically by express-session and connect-pg-simple

## Features Implemented

### MVP Features (Completed)
1. **Authentication** - Replit Auth with role-based access
2. **Restaurant Browsing** - View all restaurants, filter by cuisine, search
3. **Menu Display** - View menu items by restaurant, categorized
4. **Shopping Cart** - Add/remove items, adjust quantities, local storage persistence
5. **Checkout** - Select delivery address, add special instructions, Stripe integration
6. **Order Tracking** - View order history, track order status with progress indicator
7. **User Profile** - Manage account info, view/edit delivery addresses
8. **Address Management** - Add, edit, delete, set default addresses

### Design System
- **Colors**: Warm orange primary (#EA6C26), neutral backgrounds
- **Typography**: Inter for UI, Poppins for headings
- **Components**: Shadcn UI with custom hover/active states
- **Responsive**: Mobile-first design, optimized for touch
- **Images**: AI-generated food photography for realistic appearance

## API Endpoints

### Authentication
- `GET /api/auth/user` - Get current user (protected)
- `GET /api/login` - Initiate login flow
- `GET /api/logout` - Logout user
- `GET /api/callback` - OIDC callback

### Restaurants
- `GET /api/restaurants` - List all active restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant (protected)

### Menu Items
- `GET /api/menu-items/:restaurantId` - List menu items for restaurant
- `POST /api/menu-items` - Create menu item (protected)
- `PATCH /api/menu-items/:id` - Update menu item (protected)
- `DELETE /api/menu-items/:id` - Delete menu item (protected)

### Addresses
- `GET /api/addresses` - List user's addresses (protected)
- `POST /api/addresses` - Create address (protected)
- `PATCH /api/addresses/:id` - Update address (protected)
- `DELETE /api/addresses/:id` - Delete address (protected)

### Orders
- `GET /api/orders` - List user's orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `POST /api/orders` - Create order with Stripe payment (protected)
- `PATCH /api/orders/:id/status` - Update order status (protected)

## Key Files

### Frontend
- `client/src/App.tsx` - Main app with routing
- `client/src/pages/` - All page components
- `client/src/lib/cart.ts` - Cart management utilities
- `client/src/lib/authUtils.ts` - Auth error handling
- `client/src/hooks/useAuth.ts` - Authentication hook

### Backend
- `server/routes.ts` - All API endpoints
- `server/storage.ts` - Database operations
- `server/db.ts` - Database connection
- `server/replitAuth.ts` - Replit Auth setup
- `server/seed.ts` - Seed data script

### Shared
- `shared/schema.ts` - Database schema and types

## Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption secret
- `STRIPE_SECRET_KEY` - Stripe API key
- `REPL_ID` - Replit project ID (auto-set)
- `ISSUER_URL` - OIDC issuer URL (defaults to Replit)

## Development Notes

### Seeding Database
Run `npx tsx server/seed.ts` to populate with sample restaurants and menu items.

### Database Migrations
Use `npm run db:push` to sync schema changes to database.

### Cart Implementation
Cart is stored in localStorage for persistence across sessions. When user places order, cart is cleared and order data is sent to backend.

### Payment Flow
1. User proceeds to checkout
2. Frontend sends order to backend
3. Backend creates Stripe PaymentIntent
4. Returns clientSecret to frontend
5. Order created with 'pending' status
6. Payment processed through Stripe (simplified for MVP)

### Design Adherence
- Follows `design_guidelines.md` strictly
- Food-first visual hierarchy
- Mobile-optimized with bottom navigation
- Warm, appetizing color palette
- High-quality food photography

## Future Enhancements (Not in MVP)
- Real-time order tracking with live maps
- Driver app and assignment
- Review and rating system
- AI-powered recommendations
- Push notifications
- Multiple payment methods
- Admin dashboard for platform management
