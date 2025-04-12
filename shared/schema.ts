import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
});

export const pricingConfigurations = pgTable("pricing_configurations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  name: text("name").notNull(),
  configuration: jsonb("configuration").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPricingConfigSchema = createInsertSchema(pricingConfigurations).pick({
  userId: true,
  name: true,
  configuration: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type PricingConfiguration = typeof pricingConfigurations.$inferSelect;
export type InsertPricingConfiguration = z.infer<typeof insertPricingConfigSchema>;

export type PricingFeatures = {
  analytics: boolean;
  support: boolean;
  sso: boolean;
};

export type PricingConfig = {
  users: number;
  storage: number;
  apiCalls: number;
  features: PricingFeatures;
  billingCycle: 'monthly' | 'annual';
};
