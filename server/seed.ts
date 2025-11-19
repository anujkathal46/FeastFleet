import { db } from "./db";
import { users, restaurants, menuItems } from "@shared/schema";

// Use direct paths for images (they will be served by Vite)
const burgerImage = "/attached_assets/generated_images/Burger_menu_item_874b3bde.png";
const pizzaImage = "/attached_assets/generated_images/Pizza_menu_item_283541d7.png";
const sushiImage = "/attached_assets/generated_images/Sushi_menu_item_6c5761bd.png";
const saladImage = "/attached_assets/generated_images/Salad_menu_item_0296329e.png";
const pastaImage = "/attached_assets/generated_images/Pasta_menu_item_2dddb208.png";

async function seed() {
  console.log("Seeding database...");

  // Create a seed user first
  const seedUserId = "seed-owner-001";
  
  // Insert seed user if not exists
  await db.insert(users).values({
    id: seedUserId,
    email: "seed@foodswift.com",
    firstName: "Admin",
    lastName: "User",
    role: "restaurant_owner",
  }).onConflictDoNothing();

  // Create restaurants
  const [restaurant1] = await db.insert(restaurants).values({
    ownerId: seedUserId,
    name: "Burger Palace",
    description: "Gourmet burgers and fries made with premium ingredients",
    imageUrl: burgerImage,
    cuisineType: "American",
    deliveryTime: 25,
    deliveryFee: "3.99",
    minOrder: "15.00",
    rating: "4.5",
    isActive: true,
  }).returning();

  const [restaurant2] = await db.insert(restaurants).values({
    ownerId: seedUserId,
    name: "Pizza Bella",
    description: "Authentic wood-fired pizza with fresh toppings",
    imageUrl: pizzaImage,
    cuisineType: "Italian",
    deliveryTime: 30,
    deliveryFee: "4.99",
    minOrder: "20.00",
    rating: "4.7",
    isActive: true,
  }).returning();

  const [restaurant3] = await db.insert(restaurants).values({
    ownerId: seedUserId,
    name: "Sushi Express",
    description: "Fresh sushi and Japanese cuisine",
    imageUrl: sushiImage,
    cuisineType: "Japanese",
    deliveryTime: 35,
    deliveryFee: "5.99",
    minOrder: "25.00",
    rating: "4.6",
    isActive: true,
  }).returning();

  const [restaurant4] = await db.insert(restaurants).values({
    ownerId: seedUserId,
    name: "Green Garden",
    description: "Healthy salads and fresh bowls",
    imageUrl: saladImage,
    cuisineType: "Healthy",
    deliveryTime: 20,
    deliveryFee: "2.99",
    minOrder: "12.00",
    rating: "4.4",
    isActive: true,
  }).returning();

  const [restaurant5] = await db.insert(restaurants).values({
    ownerId: seedUserId,
    name: "Pasta House",
    description: "Traditional Italian pasta dishes",
    imageUrl: pastaImage,
    cuisineType: "Italian",
    deliveryTime: 28,
    deliveryFee: "4.49",
    minOrder: "18.00",
    rating: "4.5",
    isActive: true,
  }).returning();

  // Add menu items for Burger Palace
  await db.insert(menuItems).values([
    {
      restaurantId: restaurant1.id,
      name: "Classic Burger",
      description: "Beef patty with lettuce, tomato, onion, and special sauce",
      imageUrl: burgerImage,
      price: "12.99",
      category: "Burgers",
      dietaryInfo: [],
      isAvailable: true,
    },
    {
      restaurantId: restaurant1.id,
      name: "Bacon Cheeseburger",
      description: "Classic burger with crispy bacon and cheddar cheese",
      imageUrl: burgerImage,
      price: "14.99",
      category: "Burgers",
      dietaryInfo: [],
      isAvailable: true,
    },
    {
      restaurantId: restaurant1.id,
      name: "Veggie Burger",
      description: "Plant-based patty with avocado and fresh vegetables",
      imageUrl: burgerImage,
      price: "11.99",
      category: "Burgers",
      dietaryInfo: ["vegetarian"],
      isAvailable: true,
    },
    {
      restaurantId: restaurant1.id,
      name: "French Fries",
      description: "Crispy golden fries",
      price: "4.99",
      category: "Sides",
      dietaryInfo: ["vegetarian", "vegan"],
      isAvailable: true,
    },
  ]);

  // Add menu items for Pizza Bella
  await db.insert(menuItems).values([
    {
      restaurantId: restaurant2.id,
      name: "Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, and basil",
      imageUrl: pizzaImage,
      price: "16.99",
      category: "Pizza",
      dietaryInfo: ["vegetarian"],
      isAvailable: true,
    },
    {
      restaurantId: restaurant2.id,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni with mozzarella cheese",
      imageUrl: pizzaImage,
      price: "18.99",
      category: "Pizza",
      dietaryInfo: [],
      isAvailable: true,
    },
    {
      restaurantId: restaurant2.id,
      name: "Mushroom & Truffle Pizza",
      description: "Wild mushrooms with truffle oil and parmesan",
      imageUrl: pizzaImage,
      price: "22.99",
      category: "Pizza",
      dietaryInfo: ["vegetarian"],
      isAvailable: true,
    },
    {
      restaurantId: restaurant2.id,
      name: "Caesar Salad",
      description: "Romaine lettuce with caesar dressing and croutons",
      price: "8.99",
      category: "Appetizers",
      dietaryInfo: ["vegetarian"],
      isAvailable: true,
    },
  ]);

  // Add menu items for Sushi Express
  await db.insert(menuItems).values([
    {
      restaurantId: restaurant3.id,
      name: "California Roll",
      description: "Crab, avocado, and cucumber",
      imageUrl: sushiImage,
      price: "10.99",
      category: "Rolls",
      dietaryInfo: [],
      isAvailable: true,
    },
    {
      restaurantId: restaurant3.id,
      name: "Salmon Nigiri",
      description: "Fresh salmon over seasoned rice (6 pieces)",
      imageUrl: sushiImage,
      price: "13.99",
      category: "Nigiri",
      dietaryInfo: [],
      isAvailable: true,
    },
    {
      restaurantId: restaurant3.id,
      name: "Spicy Tuna Roll",
      description: "Spicy tuna with cucumber and sesame",
      imageUrl: sushiImage,
      price: "12.99",
      category: "Rolls",
      dietaryInfo: [],
      isAvailable: true,
    },
    {
      restaurantId: restaurant3.id,
      name: "Vegetable Tempura",
      description: "Assorted vegetables in light tempura batter",
      price: "9.99",
      category: "Appetizers",
      dietaryInfo: ["vegetarian"],
      isAvailable: true,
    },
  ]);

  // Add menu items for Green Garden
  await db.insert(menuItems).values([
    {
      restaurantId: restaurant4.id,
      name: "Power Bowl",
      description: "Quinoa, kale, avocado, chickpeas, and tahini dressing",
      imageUrl: saladImage,
      price: "13.99",
      category: "Bowls",
      dietaryInfo: ["vegetarian", "vegan", "gluten-free"],
      isAvailable: true,
    },
    {
      restaurantId: restaurant4.id,
      name: "Grilled Chicken Salad",
      description: "Mixed greens with grilled chicken and balsamic vinaigrette",
      imageUrl: saladImage,
      price: "14.99",
      category: "Salads",
      dietaryInfo: ["gluten-free"],
      isAvailable: true,
    },
    {
      restaurantId: restaurant4.id,
      name: "Mediterranean Bowl",
      description: "Falafel, hummus, tabbouleh, and fresh vegetables",
      imageUrl: saladImage,
      price: "12.99",
      category: "Bowls",
      dietaryInfo: ["vegetarian", "vegan"],
      isAvailable: true,
    },
  ]);

  // Add menu items for Pasta House
  await db.insert(menuItems).values([
    {
      restaurantId: restaurant5.id,
      name: "Spaghetti Carbonara",
      description: "Creamy pasta with pancetta and parmesan",
      imageUrl: pastaImage,
      price: "16.99",
      category: "Pasta",
      dietaryInfo: [],
      isAvailable: true,
    },
    {
      restaurantId: restaurant5.id,
      name: "Penne Arrabbiata",
      description: "Spicy tomato sauce with garlic and herbs",
      imageUrl: pastaImage,
      price: "14.99",
      category: "Pasta",
      dietaryInfo: ["vegetarian", "vegan"],
      isAvailable: true,
    },
    {
      restaurantId: restaurant5.id,
      name: "Fettuccine Alfredo",
      description: "Rich cream sauce with parmesan cheese",
      imageUrl: pastaImage,
      price: "15.99",
      category: "Pasta",
      dietaryInfo: ["vegetarian"],
      isAvailable: true,
    },
    {
      restaurantId: restaurant5.id,
      name: "Tiramisu",
      description: "Classic Italian dessert with espresso and mascarpone",
      price: "7.99",
      category: "Desserts",
      dietaryInfo: ["vegetarian"],
      isAvailable: true,
    },
  ]);

  console.log("Seed data created successfully!");
  console.log(`Created ${5} restaurants`);
  console.log("Database seeded!");
}

seed()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
