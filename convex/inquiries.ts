import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const send = mutation({
  args: {
    propertyId: v.id("properties"),
    message: v.string(),
  },
  returns: v.id("inquiries"),
  handler: async (ctx, { propertyId, message }) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");
    return await ctx.db.insert("inquiries", {
      userId,
      propertyId,
      message,
      createdAt: Date.now(),
    });
  },
});

export const listByProperty = query({
  args: { propertyId: v.id("properties") },
  returns: v.any(),
  handler: async (ctx, { propertyId }) => {
    return await ctx.db
      .query("inquiries")
      .withIndex("by_property", (q) => q.eq("propertyId", propertyId))
      .order("desc")
      .collect();
  },
});
