import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStorySchema, insertUserSchema, storySettingsSchema } from "@shared/schema";
import OpenAI from "openai";
import { z } from "zod";

// Initialize OpenAI client
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || "dummy-key"
});

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
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
