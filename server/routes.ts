import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertPricingConfigSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // Get user's pricing configurations
  app.get("/api/pricing-configurations", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const userId = req.user!.id;
    const configurations = await storage.getPricingConfigurations(userId);
    res.json(configurations);
  });
  
  // Get specific pricing configuration
  app.get("/api/pricing-configurations/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const configId = parseInt(req.params.id);
    if (isNaN(configId)) {
      return res.status(400).json({ message: "Invalid configuration ID" });
    }
    
    const config = await storage.getPricingConfiguration(configId);
    
    if (!config) {
      return res.status(404).json({ message: "Configuration not found" });
    }
    
    if (config.userId !== req.user!.id) {
      return res.status(403).json({ message: "Not authorized to access this configuration" });
    }
    
    res.json(config);
  });
  
  // Create new pricing configuration
  app.post("/api/pricing-configurations", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const userId = req.user!.id;
      
      // Validate request body
      const configData = insertPricingConfigSchema.parse({
        ...req.body,
        userId
      });
      
      const newConfig = await storage.createPricingConfiguration(configData);
      res.status(201).json(newConfig);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid configuration data", errors: error.errors });
      }
      res.status(500).json({ message: "Error creating configuration" });
    }
  });
  
  // Delete pricing configuration
  app.delete("/api/pricing-configurations/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const configId = parseInt(req.params.id);
    if (isNaN(configId)) {
      return res.status(400).json({ message: "Invalid configuration ID" });
    }
    
    const config = await storage.getPricingConfiguration(configId);
    
    if (!config) {
      return res.status(404).json({ message: "Configuration not found" });
    }
    
    if (config.userId !== req.user!.id) {
      return res.status(403).json({ message: "Not authorized to delete this configuration" });
    }
    
    const success = await storage.deletePricingConfiguration(configId);
    if (success) {
      res.status(200).json({ message: "Configuration deleted successfully" });
    } else {
      res.status(500).json({ message: "Error deleting configuration" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
