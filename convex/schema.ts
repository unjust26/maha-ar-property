import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

const schema = defineSchema({
  ...authTables,
  properties: defineTable({
    name: v.string(),
    description: v.string(),
    price: v.string(),
    location: v.string(),
    bedrooms: v.number(),
    bathrooms: v.number(),
    sqft: v.number(),
    type: v.string(),
    status: v.string(),
    features: v.array(v.string()),
    imageUrl: v.string(),
    floorPlanUrl: v.optional(v.string()),
    createdAt: v.number(),
  }),
  inquiries: defineTable({
    userId: v.id("users"),
    propertyId: v.id("properties"),
    message: v.string(),
    createdAt: v.number(),
  }).index("by_property", ["propertyId"]),
});

export default schema;
