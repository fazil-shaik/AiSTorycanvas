import { 
  users, type User, type InsertUser, 
  stories, type Story, type InsertStory,
  genres, type Genre,
  themes, type Theme,
  sessions, type Session, type InsertSession
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  
  getStory(id: number): Promise<Story | undefined>;
  getStoriesByUser(userId: number): Promise<Story[]>;
  getPublicStories(limit?: number): Promise<Story[]>;
  getStoriesByGenre(genre: string, limit?: number): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
  updateStory(id: number, story: Partial<InsertStory>): Promise<Story | undefined>;
  deleteStory(id: number): Promise<boolean>;
  incrementStoryViews(id: number): Promise<boolean>;
  
  getAllGenres(): Promise<Genre[]>;
  getAllThemes(): Promise<Theme[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private genresList: Genre[];
  private themesList: Theme[];
  private userIdCounter: number;
  private storyIdCounter: number;
  private genreIdCounter: number;
  private themeIdCounter: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.userIdCounter = 1;
    this.storyIdCounter = 1;
    this.genreIdCounter = 1;
    this.themeIdCounter = 1;
    
    // Initial genres
    this.genresList = [
      { id: this.genreIdCounter++, name: "Fantasy" },
      { id: this.genreIdCounter++, name: "Science Fiction" },
      { id: this.genreIdCounter++, name: "Mystery" },
      { id: this.genreIdCounter++, name: "Adventure" },
      { id: this.genreIdCounter++, name: "Romance" },
      { id: this.genreIdCounter++, name: "Horror" }
    ];
    
    // Initial themes
    this.themesList = [
      { id: this.themeIdCounter++, name: "Coming of Age" },
      { id: this.themeIdCounter++, name: "Hero's Journey" },
      { id: this.themeIdCounter++, name: "Redemption" },
      { id: this.themeIdCounter++, name: "Discovery" },
      { id: this.themeIdCounter++, name: "Survival" }
    ];
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    
    const user: User = { 
      ...insertUser, 
      id,
      avatar: null,
      bio: null,
      role: "user",
      createdAt: now,
      updatedAt: now
    };
    
    this.users.set(id, user);
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const user = this.users.get(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    
    const updatedUser = { ...user, ...userData, updatedAt: new Date() };
    this.users.set(id, updatedUser);
    return updatedUser;
  }
  
  async getStory(id: number): Promise<Story | undefined> {
    return this.stories.get(id);
  }
  
  async getStoriesByUser(userId: number): Promise<Story[]> {
    return Array.from(this.stories.values()).filter(
      (story) => story.userId === userId
    );
  }
  
  async getPublicStories(limit: number = 10): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.isPublic)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }
  
  async getStoriesByGenre(genre: string, limit: number = 10): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.genre === genre && story.isPublic)
      .sort((a, b) => b.views - a.views)
      .slice(0, limit);
  }
  
  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.storyIdCounter++;
    const now = new Date();
    const story: Story = {
      ...insertStory,
      id,
      createdAt: now,
      views: 0,
      rating: 0
    };
    this.stories.set(id, story);
    return story;
  }
  
  async updateStory(id: number, storyUpdate: Partial<InsertStory>): Promise<Story | undefined> {
    const story = this.stories.get(id);
    if (!story) {
      return undefined;
    }
    
    const updatedStory: Story = { ...story, ...storyUpdate };
    this.stories.set(id, updatedStory);
    return updatedStory;
  }
  
  async deleteStory(id: number): Promise<boolean> {
    return this.stories.delete(id);
  }
  
  async incrementStoryViews(id: number): Promise<boolean> {
    const story = this.stories.get(id);
    if (!story) {
      return false;
    }
    
    const updatedStory = { ...story, views: story.views + 1 };
    this.stories.set(id, updatedStory);
    return true;
  }
  
  async getAllGenres(): Promise<Genre[]> {
    return this.genresList;
  }
  
  async getAllThemes(): Promise<Theme[]> {
    return this.themesList;
  }
}

export class DatabaseStorage implements IStorage {
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
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  async updateUser(id: number, userData: Partial<User>): Promise<User> {
    const [updatedUser] = await db.update(users)
      .set({ ...userData, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    
    if (!updatedUser) {
      throw new Error(`User with id ${id} not found`);
    }
    
    return updatedUser;
  }

  async getStory(id: number): Promise<Story | undefined> {
    const [story] = await db.select().from(stories).where(eq(stories.id, id));
    return story;
  }

  async getStoriesByUser(userId: number): Promise<Story[]> {
    return await db.select().from(stories).where(eq(stories.userId, userId));
  }

  async getPublicStories(limit: number = 10): Promise<Story[]> {
    return await db.select()
      .from(stories)
      .where(eq(stories.isPublic, true))
      .orderBy(desc(stories.views))
      .limit(limit);
  }

  async getStoriesByGenre(genre: string, limit: number = 10): Promise<Story[]> {
    return await db.select()
      .from(stories)
      .where(and(
        eq(stories.genre, genre),
        eq(stories.isPublic, true)
      ))
      .orderBy(desc(stories.views))
      .limit(limit);
  }

  async createStory(insertStory: InsertStory): Promise<Story> {
    const [story] = await db.insert(stories).values(insertStory).returning();
    return story;
  }

  async updateStory(id: number, storyUpdate: Partial<InsertStory>): Promise<Story | undefined> {
    const [updatedStory] = await db.update(stories)
      .set(storyUpdate)
      .where(eq(stories.id, id))
      .returning();
    
    return updatedStory;
  }

  async deleteStory(id: number): Promise<boolean> {
    const result = await db.delete(stories).where(eq(stories.id, id));
    return result !== undefined;
  }

  async incrementStoryViews(id: number): Promise<boolean> {
    const result = await db.update(stories)
      .set({ views: sql`${stories.views} + 1` })
      .where(eq(stories.id, id));
    
    return result !== undefined;
  }

  async getAllGenres(): Promise<Genre[]> {
    return await db.select().from(genres);
  }

  async getAllThemes(): Promise<Theme[]> {
    return await db.select().from(themes);
  }
}

// Use database storage
export const storage = new DatabaseStorage();
