# Food Delivery App Design Guidelines

## Design Approach
**Reference-Based Strategy**: Draw inspiration from industry leaders DoorDash, Uber Eats, and Grubhub, focusing on their proven patterns for food presentation, navigation efficiency, and appetite appeal. Adapt these patterns with modern touches that prioritize visual food imagery and seamless ordering flow.

## Core Design Principles
1. **Food-First Visual Hierarchy**: High-quality food photography dominates, driving appetite appeal and conversions
2. **Friction-Free Ordering**: Minimize clicks from browse to checkout (target 3-tap ordering)
3. **Mobile-Optimized Everything**: Touch-friendly targets, thumb-zone navigation, one-hand operation

---

## Typography System

**Font Stack**: 
- Primary: Inter or DM Sans (clean, modern sans-serif for UI)
- Display: Poppins or Outfit (bold headings for restaurant names, categories)

**Hierarchy**:
- Hero Headlines: 3xl to 5xl, bold (600-700 weight)
- Restaurant Names: xl to 2xl, semibold (600)
- Food Item Names: base to lg, medium (500)
- Descriptions/Details: sm to base, regular (400)
- Micro-copy (delivery time, ratings): xs to sm, medium

---

## Layout & Spacing System

**Tailwind Units**: Standardize on 2, 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-4 (mobile), p-6 to p-8 (desktop)
- Section spacing: py-8 to py-12 (mobile), py-16 to py-20 (desktop)
- Card gaps: gap-4 to gap-6
- Container max-width: max-w-7xl with px-4 to px-6 edge padding

**Grid Structures**:
- Restaurant Cards: grid-cols-1 (mobile), md:grid-cols-2, lg:grid-cols-3
- Food Items: Single column list on mobile, 2-column on tablet+
- Category Pills: Horizontal scroll on mobile, wrapped grid on desktop

---

## Component Library

### Navigation
**Customer App**:
- Sticky top navigation with search bar (desktop) or icon (mobile)
- Bottom navigation bar (mobile): Home, Search, Orders, Profile icons
- Floating cart button with item count badge (fixed bottom-right on desktop)

**Restaurant Dashboard**:
- Side navigation (desktop): Menu Management, Orders, Analytics
- Top bar with restaurant switcher and notifications

### Hero Section (Customer Homepage)
**Full-bleed hero image** featuring appetizing food photography with subtle dark gradient overlay (for text legibility)
- Hero content: Centered headline "Food delivery in minutes", location search input with CTA
- Height: 60vh to 70vh (mobile), 75vh (desktop)
- Blurred background button treatment for CTAs over imagery

### Restaurant Browsing
**Card Design**:
- Aspect ratio 16:9 food/restaurant images
- Overlay gradient on hover with quick-add actions
- Metadata row: Rating stars, delivery time, cuisine tag, price range ($$)
- Rounded corners (rounded-lg to rounded-xl)

**Category Navigation**:
- Horizontal scrollable chips (mobile)
- Sticky below header with active state underline indicator

### Food Menu Items
**List-Based Layout** (proven better for food ordering than pure grid):
- Left: Square food image (80px mobile, 120px desktop)
- Right: Item name, description (2-line truncate), price, add button
- Expansion panel for customization options (modifiers, special instructions)

### Shopping Cart
**Slide-out Panel** (desktop) or full-screen overlay (mobile):
- Item list with thumbnail, name, quantity stepper, price
- Promo code input field
- Fee breakdown (subtotal, delivery, tax)
- Prominent checkout CTA (sticky bottom on mobile)

### Order Tracking
**Timeline/Stepper Component**:
- Vertical progress indicator with status icons
- Estimated time for each stage
- Live map integration showing driver location (when out for delivery)
- Restaurant contact and driver contact actions

### Restaurant Owner Dashboard
**Data-Dense Tables**:
- Order queue with status badges (New, Preparing, Ready, Completed)
- Quick action buttons (Accept, Start Prep, Mark Ready)
- Menu management with drag-and-drop reordering
- Image upload with preview and crop functionality

---

## Animations & Interactions
Use sparingly for performance:
- Cart button pulse on item add (scale + opacity)
- Smooth transitions on card hover (transform: translateY)
- Loading skeleton screens for image lazy loading
- Progress bar for order status updates

---

## Form Patterns
**Address Management**:
- Google Places autocomplete integration
- Saved addresses list with "Add New" card
- Map pin confirmation before saving

**Payment**:
- Stripe-styled input fields (single-line, focused state)
- Saved cards display with last 4 digits, edit/delete actions

---

## Images Strategy

**Hero Section**: Full-width appetizing food spread (burgers, pizza, salads arranged artfully) with shallow depth of field
**Restaurant Cards**: High-quality signature dish photos (16:9 ratio)
**Food Items**: Consistent square crop (1:1), bright lighting, clean backgrounds
**Empty States**: Friendly food-themed illustrations (empty cart = empty plate illustration)
**Category Icons**: Simple line icons for cuisine types (Italian, Chinese, Mexican, etc.)

**Image Placement**:
- Homepage hero: Full-bleed background
- Restaurant listings: Card thumbnails
- Food menu: Thumbnail left-aligned in list items
- Order confirmation: Small circular restaurant logo
- Tracking: Static map or live map embed

---

## Responsive Breakpoints
- Mobile: < 768px (default)
- Tablet: 768px to 1024px (md:)
- Desktop: > 1024px (lg:)

**Mobile-Specific**:
- Bottom sheet modals for filters and actions
- Full-screen cart and checkout flows
- Swipeable restaurant cards

**Desktop Enhancements**:
- Multi-column layouts for better space utilization
- Hover states on interactive elements
- Sidebar cart visibility

---

## Accessibility
- Minimum touch target: 44x44px for all interactive elements
- Focus indicators on all keyboard-navigable elements
- Alt text for all food images describing dish name
- ARIA labels for icon-only buttons
- Color contrast ratio 4.5:1 minimum for all text