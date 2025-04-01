import { 
  users, type User, type InsertUser, 
  stories, type Story, type InsertStory,
  genres, type Genre,
  themes, type Theme
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
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

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
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

export const storage = new MemStorage();
