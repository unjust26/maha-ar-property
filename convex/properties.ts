import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  returns: v.any(),
  handler: async (ctx) => {
    return await ctx.db.query("properties").order("desc").collect();
  },
});

export const get = query({
  args: { id: v.id("properties") },
  returns: v.any(),
  handler: async (ctx, { id }) => {
    return await ctx.db.get(id);
  },
});

export const seed = mutation({
  args: {},
  returns: v.null(),
  handler: async (ctx) => {
    const existing = await ctx.db.query("properties").first();
    if (existing) return null;

    const properties = [
      {
        name: "Rimba Luxury Villa",
        description: "Stunning 4-bedroom luxury villa in Rimba with modern architecture, infinity pool, smart home automation, and panoramic garden views. Premium finishes throughout.",
        price: "BND 850,000",
        location: "Rimba, Brunei-Muara",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3200,
        type: "Villa",
        status: "For Sale",
        features: ["Infinity Pool", "Smart Home", "Garden", "Double Garage", "Solar Panels"],
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=500&fit=crop",
      },
      {
        name: "Kiulap Executive Apartment",
        description: "Modern 2-bedroom executive apartment in the heart of Kiulap. Walking distance to shopping centers, restaurants, and business district. Fully furnished with city views.",
        price: "BND 320,000",
        location: "Kiulap, Brunei-Muara",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1100,
        type: "Apartment",
        status: "For Sale",
        features: ["City View", "Gym Access", "Pool", "24h Security", "Parking"],
        imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
      },
      {
        name: "Jerudong Family Home",
        description: "Spacious 5-bedroom family home in prestigious Jerudong area. Large garden, separate living quarters, close to international schools and Jerudong Park.",
        price: "BND 680,000",
        location: "Jerudong, Brunei-Muara",
        bedrooms: 5,
        bathrooms: 4,
        sqft: 4500,
        type: "House",
        status: "For Sale",
        features: ["Large Garden", "Maid's Room", "BBQ Area", "Near Schools", "Quiet Area"],
        imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=500&fit=crop",
      },
      {
        name: "Seria Waterfront Bungalow",
        description: "Beautiful waterfront bungalow in Seria with stunning sea views. Recently renovated with modern interiors while maintaining classic Bruneian architectural charm.",
        price: "BND 450,000",
        location: "Seria, Belait",
        bedrooms: 3,
        bathrooms: 2,
        sqft: 2800,
        type: "Bungalow",
        status: "For Sale",
        features: ["Sea View", "Waterfront", "Renovated", "Covered Patio", "Fruit Trees"],
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
      },
      {
        name: "Gadong Commercial Unit",
        description: "Prime commercial unit in Gadong central. Ideal for office, retail, or F&B business. High foot traffic location with excellent visibility and ample parking.",
        price: "BND 15,000/month",
        location: "Gadong, Brunei-Muara",
        bedrooms: 0,
        bathrooms: 2,
        sqft: 1800,
        type: "Commercial",
        status: "For Rent",
        features: ["Prime Location", "High Traffic", "Parking", "AC Included", "Ground Floor"],
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=500&fit=crop",
      },
      {
        name: "Tutong Eco Retreat",
        description: "Unique eco-friendly retreat in Tutong district surrounded by lush rainforest. Off-grid solar power, rainwater harvesting, and sustainable design. Perfect weekend getaway or Airbnb investment.",
        price: "BND 280,000",
        location: "Tutong District",
        bedrooms: 2,
        bathrooms: 1,
        sqft: 1200,
        type: "Retreat",
        status: "For Sale",
        features: ["Eco-Friendly", "Solar Power", "Rainforest", "Privacy", "Investment"],
        imageUrl: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=500&fit=crop",
      },
    ];

    for (const p of properties) {
      await ctx.db.insert("properties", {
        ...p,
        createdAt: Date.now(),
      });
    }
    return null;
  },
});
