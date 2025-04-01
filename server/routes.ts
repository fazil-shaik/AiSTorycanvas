import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStorySchema, insertUserSchema, storySettingsSchema, loginSchema, updateThemeSchema } from "@shared/schema";
import OpenAI from "openai";
import { z } from "zod";
import { hashPassword, comparePassword, generateToken, createSession, deleteSession, authMiddleware } from "./utils/auth";

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "dummy-key"
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({
          message: "Username already exists"
        });
      }
      
      // Hash password
      const hashedPassword = await hashPassword(userData.password);
      
      // Create user with hashed password
      const user = await storage.createUser({
        ...userData,
        password: hashedPassword
      });
      
      // Generate token
      const token = generateToken(user);
      
      // Create session
      await createSession(user.id, token);
      
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      return res.status(201).json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        theme: user.theme,
        role: user.role
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid registration data",
          errors: error.errors
        });
      }
      console.error("Registration error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      // Find user by email
      const user = await storage.getUserByEmail(loginData.email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Verify password
      const isPasswordValid = await comparePassword(loginData.password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // Generate token
      const token = generateToken(user);
      
      // Create session
      await createSession(user.id, token);
      
      // Set cookie
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });
      
      return res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        theme: user.theme,
        role: user.role
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid login data",
          errors: error.errors
        });
      }
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.post("/api/auth/logout", async (req: Request, res: Response) => {
    const token = req.cookies.token;
    
    if (token) {
      // Delete session
      await deleteSession(token);
      
      // Clear cookie
      res.clearCookie('token');
    }
    
    return res.status(200).json({ message: "Logged out successfully" });
  });
  
  app.get("/api/auth/me", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      return res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        theme: user.theme,
        role: user.role
      });
    } catch (error) {
      console.error("Auth me error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.put("/api/auth/theme", authMiddleware, async (req: Request, res: Response) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const themeData = updateThemeSchema.parse(req.body);
      
      const user = await storage.getUser(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const updatedUser = await storage.updateUser(userId, { theme: themeData.theme });
      
      return res.json({
        theme: updatedUser.theme
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid theme data",
          errors: error.errors
        });
      }
      console.error("Update theme error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });
  
  // User routes (legacy)
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(409).json({
          message: "Username already exists",
        });
      }
      
      const user = await storage.createUser(userData);
      return res.status(201).json({
        id: user.id,
        username: user.username,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid user data",
          errors: error.errors,
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Genres and Themes routes
  app.get("/api/genres", async (_req: Request, res: Response) => {
    try {
      const genres = await storage.getAllGenres();
      return res.json(genres);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/themes", async (_req: Request, res: Response) => {
    try {
      const themes = await storage.getAllThemes();
      return res.json(themes);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Story routes
  app.get("/api/stories", async (req: Request, res: Response) => {
    try {
      const genre = req.query.genre as string;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      
      let stories;
      if (genre) {
        stories = await storage.getStoriesByGenre(genre, limit);
      } else {
        stories = await storage.getPublicStories(limit);
      }
      
      return res.json(stories);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/stories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const story = await storage.getStory(id);
      
      if (!story) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      await storage.incrementStoryViews(id);
      return res.json(story);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/stories", async (req: Request, res: Response) => {
    try {
      const storyData = insertStorySchema.parse(req.body);
      const story = await storage.createStory(storyData);
      return res.status(201).json(story);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid story data",
          errors: error.errors,
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/stories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const storyData = insertStorySchema.partial().parse(req.body);
      const updatedStory = await storage.updateStory(id, storyData);
      
      if (!updatedStory) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      return res.json(updatedStory);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid story data",
          errors: error.errors,
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/stories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteStory(id);
      
      if (!success) {
        return res.status(404).json({ message: "Story not found" });
      }
      
      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // OpenAI story generation endpoint
  app.post("/api/generate-story", async (req: Request, res: Response) => {
    try {
      const storySettings = storySettingsSchema.parse(req.body);
      
      // Construct prompt for OpenAI
      const prompt = `
        Create an engaging story with the following parameters:
        - Genre: ${storySettings.genre}
        - Theme: ${storySettings.theme}
        - Main Character: ${storySettings.character}
        - Setting: ${storySettings.setting}
        - Length: ${storySettings.storyLength} (Short/Medium/Long)

        Respond with a JSON object containing:
        - title: A catchy title for the story
        - content: The full story content with proper paragraphs
        - summary: A brief summary of the story (2-3 sentences)
        - imagePrompts: An array of 1-3 scene descriptions that would make good illustrations for this story
      `;

      // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
        temperature: 0.7,
        max_tokens: 2000,
      });

      const result = JSON.parse(response.choices[0].message.content || "{}");
      return res.json(result);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid story settings",
          errors: error.errors,
        });
      }
      console.error("Error generating story:", error);
      return res.status(500).json({ message: "Error generating story" });
    }
  });

  // Text-to-speech generation endpoint
  app.post("/api/generate-speech", async (req: Request, res: Response) => {
    try {
      const { text } = req.body;
      
      if (!text || typeof text !== 'string') {
        return res.status(400).json({ message: "Text is required" });
      }
      
      // Using OpenAI's TTS API
      const response = await openai.audio.speech.create({
        model: "tts-1",
        voice: "nova",
        input: text,
      });
      
      // Convert to base64
      const buffer = Buffer.from(await response.arrayBuffer());
      const audioBase64 = buffer.toString('base64');
      
      return res.json({ 
        audio: `data:audio/mp3;base64,${audioBase64}` 
      });
    } catch (error) {
      console.error("Error generating speech:", error);
      return res.status(500).json({ message: "Error generating speech" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
