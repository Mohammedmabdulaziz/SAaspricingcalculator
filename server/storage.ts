import { users, pricingConfigurations, type User, type InsertUser, type PricingConfiguration, type InsertPricingConfiguration } from "@shared/schema";
import session from "express-session";
import { db } from "./db";
import { eq } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import { pool } from "./db";

const PostgresSessionStore = connectPg(session);

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getPricingConfigurations(userId: number): Promise<PricingConfiguration[]>;
  getPricingConfiguration(id: number): Promise<PricingConfiguration | undefined>;
  createPricingConfiguration(config: InsertPricingConfiguration): Promise<PricingConfiguration>;
  deletePricingConfiguration(id: number): Promise<boolean>;
  
  sessionStore: any;
}

export class DatabaseStorage implements IStorage {
  sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool,
      createTableIfMissing: true
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }
  
  async getPricingConfigurations(userId: number): Promise<PricingConfiguration[]> {
    return await db
      .select()
      .from(pricingConfigurations)
      .where(eq(pricingConfigurations.userId, userId));
  }
  
  async getPricingConfiguration(id: number): Promise<PricingConfiguration | undefined> {
    const [config] = await db
      .select()
      .from(pricingConfigurations)
      .where(eq(pricingConfigurations.id, id));
    return config;
  }
  
  async createPricingConfiguration(insertConfig: InsertPricingConfiguration): Promise<PricingConfiguration> {
    const [config] = await db
      .insert(pricingConfigurations)
      .values(insertConfig)
      .returning();
    return config;
  }
  
  async deletePricingConfiguration(id: number): Promise<boolean> {
    const result = await db
      .delete(pricingConfigurations)
      .where(eq(pricingConfigurations.id, id))
      .returning({ id: pricingConfigurations.id });
    
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
