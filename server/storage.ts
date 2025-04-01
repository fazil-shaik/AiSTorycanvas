import { 
  users, type User, type InsertUser, 
  stories, type Story, type InsertStory,
  genres, type Genre,
  themes, type Theme,
  sessions, type Session, type InsertSession,
  subscriptionPlans, type SubscriptionPlan, type InsertSubscriptionPlan,
  subscriptions, type Subscription, type InsertSubscription,
  payments, type Payment, type InsertPayment
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, sql, gte, lt } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User>;
  
  getStory(id: number): Promise<Story | undefined>;
  getStoriesByUser(userId: number): Promise<Story[]>;
  getPublicStories(limit?: number): Promise<Story[]>;
  getPremiumStories(limit?: number): Promise<Story[]>;
  getStoriesByGenre(genre: string, limit?: number): Promise<Story[]>;
  createStory(story: InsertStory): Promise<Story>;
  updateStory(id: number, story: Partial<InsertStory>): Promise<Story | undefined>;
  deleteStory(id: number): Promise<boolean>;
  incrementStoryViews(id: number): Promise<boolean>;
  
  getAllGenres(): Promise<Genre[]>;
  getAllThemes(): Promise<Theme[]>;
  
  // Subscription plan methods
  getAllSubscriptionPlans(): Promise<SubscriptionPlan[]>;
  getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined>;
  createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan>;
  updateSubscriptionPlan(id: number, plan: Partial<InsertSubscriptionPlan>): Promise<SubscriptionPlan | undefined>;
  deleteSubscriptionPlan(id: number): Promise<boolean>;
  
  // User subscription methods
  getUserSubscription(userId: number): Promise<Subscription | undefined>;
  getActiveUserSubscription(userId: number): Promise<Subscription | undefined>;
  createSubscription(subscription: InsertSubscription): Promise<Subscription>;
  updateSubscription(id: number, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined>;
  cancelSubscription(id: number): Promise<Subscription | undefined>;
  
  // Payment methods
  createPayment(payment: InsertPayment): Promise<Payment>;
  getPaymentsByUser(userId: number): Promise<Payment[]>;
  getPaymentsBySubscription(subscriptionId: number): Promise<Payment[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private stories: Map<number, Story>;
  private genresList: Genre[];
  private themesList: Theme[];
  private subscriptionPlansList: Map<number, SubscriptionPlan>;
  private subscriptionsList: Map<number, Subscription>;
  private paymentsList: Map<number, Payment>;
  private userIdCounter: number;
  private storyIdCounter: number;
  private genreIdCounter: number;
  private themeIdCounter: number;
  private planIdCounter: number;
  private subscriptionIdCounter: number;
  private paymentIdCounter: number;

  constructor() {
    this.users = new Map();
    this.stories = new Map();
    this.subscriptionPlansList = new Map();
    this.subscriptionsList = new Map();
    this.paymentsList = new Map();
    this.userIdCounter = 1;
    this.storyIdCounter = 1;
    this.genreIdCounter = 1;
    this.themeIdCounter = 1;
    this.planIdCounter = 1;
    this.subscriptionIdCounter = 1;
    this.paymentIdCounter = 1;
    
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
    
    // Initial subscription plans
    const now = new Date();
    const freePlan = {
      id: this.planIdCounter++,
      name: "Free",
      description: "Basic access to story generation with limited features",
      price: "0",
      billingCycle: "monthly",
      features: ["5 stories per month", "Basic AI generation", "Standard quality"],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    
    const basicPlan = {
      id: this.planIdCounter++,
      name: "Basic",
      description: "Enhanced access with more generation options",
      price: "9.99",
      billingCycle: "monthly",
      features: ["15 stories per month", "Advanced AI generation", "High quality", "Audio narration"],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    
    const premiumPlan = {
      id: this.planIdCounter++,
      name: "Premium",
      description: "Full access to all features and exclusive content",
      price: "19.99",
      billingCycle: "monthly",
      features: ["Unlimited stories", "Advanced AI generation", "Highest quality", "Audio narration", "Access to premium stories", "Priority support"],
      isActive: true,
      createdAt: now,
      updatedAt: now
    };
    
    this.subscriptionPlansList.set(freePlan.id, freePlan);
    this.subscriptionPlansList.set(basicPlan.id, basicPlan);
    this.subscriptionPlansList.set(premiumPlan.id, premiumPlan);
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
      isPremium: false,
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
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }
  
  async getPremiumStories(limit: number = 10): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.isPublic && story.isPremium)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }
  
  async getStoriesByGenre(genre: string, limit: number = 10): Promise<Story[]> {
    return Array.from(this.stories.values())
      .filter(story => story.genre === genre && story.isPublic)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, limit);
  }
  
  async createStory(insertStory: InsertStory): Promise<Story> {
    const id = this.storyIdCounter++;
    const now = new Date();
    const story: Story = {
      ...insertStory,
      id,
      isPremium: insertStory.isPremium || false,
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
    
    const updatedStory = { ...story, views: (story.views || 0) + 1 };
    this.stories.set(id, updatedStory);
    return true;
  }
  
  async getAllGenres(): Promise<Genre[]> {
    return this.genresList;
  }
  
  async getAllThemes(): Promise<Theme[]> {
    return this.themesList;
  }
  
  // Subscription plan methods
  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return Array.from(this.subscriptionPlansList.values()).filter(plan => plan.isActive);
  }

  async getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined> {
    return this.subscriptionPlansList.get(id);
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const id = this.planIdCounter++;
    const now = new Date();
    
    const newPlan: SubscriptionPlan = {
      ...plan,
      id,
      createdAt: now,
      updatedAt: now
    };
    
    this.subscriptionPlansList.set(id, newPlan);
    return newPlan;
  }

  async updateSubscriptionPlan(id: number, plan: Partial<InsertSubscriptionPlan>): Promise<SubscriptionPlan | undefined> {
    const existingPlan = this.subscriptionPlansList.get(id);
    if (!existingPlan) {
      return undefined;
    }
    
    const updatedPlan = { 
      ...existingPlan, 
      ...plan, 
      updatedAt: new Date() 
    };
    
    this.subscriptionPlansList.set(id, updatedPlan);
    return updatedPlan;
  }

  async deleteSubscriptionPlan(id: number): Promise<boolean> {
    const plan = this.subscriptionPlansList.get(id);
    if (!plan) {
      return false;
    }
    
    const updatedPlan = { ...plan, isActive: false, updatedAt: new Date() };
    this.subscriptionPlansList.set(id, updatedPlan);
    return true;
  }
  
  // User subscription methods
  async getUserSubscription(userId: number): Promise<Subscription | undefined> {
    const subscriptions = Array.from(this.subscriptionsList.values())
      .filter(sub => sub.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return subscriptions.length > 0 ? subscriptions[0] : undefined;
  }

  async getActiveUserSubscription(userId: number): Promise<Subscription | undefined> {
    const today = new Date();
    
    const activeSubscriptions = Array.from(this.subscriptionsList.values())
      .filter(sub => 
        sub.userId === userId && 
        sub.status === "active" && 
        new Date(sub.endDate) >= today
      )
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    return activeSubscriptions.length > 0 ? activeSubscriptions[0] : undefined;
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const id = this.subscriptionIdCounter++;
    const now = new Date();
    
    const newSubscription: Subscription = {
      ...subscription,
      id,
      createdAt: now,
      updatedAt: now
    };
    
    this.subscriptionsList.set(id, newSubscription);
    
    // Update user premium status
    const user = this.users.get(subscription.userId);
    if (user) {
      this.users.set(user.id, { ...user, isPremium: true, updatedAt: now });
    }
    
    return newSubscription;
  }

  async updateSubscription(id: number, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const existingSubscription = this.subscriptionsList.get(id);
    if (!existingSubscription) {
      return undefined;
    }
    
    const updatedSubscription = { 
      ...existingSubscription, 
      ...subscription, 
      updatedAt: new Date() 
    };
    
    this.subscriptionsList.set(id, updatedSubscription);
    return updatedSubscription;
  }

  async cancelSubscription(id: number): Promise<Subscription | undefined> {
    const subscription = this.subscriptionsList.get(id);
    if (!subscription) {
      return undefined;
    }
    
    const canceledSubscription = { 
      ...subscription, 
      status: "cancelled", 
      autoRenew: false,
      updatedAt: new Date() 
    };
    
    this.subscriptionsList.set(id, canceledSubscription);
    
    // Check if user has other active subscriptions
    const today = new Date();
    const activeSubscriptions = Array.from(this.subscriptionsList.values())
      .filter(sub => 
        sub.userId === subscription.userId && 
        sub.id !== id && 
        sub.status === "active" && 
        new Date(sub.endDate) >= today
      );
    
    // If no other active subscriptions, update user premium status
    if (activeSubscriptions.length === 0) {
      const user = this.users.get(subscription.userId);
      if (user) {
        this.users.set(user.id, { ...user, isPremium: false, updatedAt: new Date() });
      }
    }
    
    return canceledSubscription;
  }
  
  // Payment methods
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const id = this.paymentIdCounter++;
    const now = new Date();
    
    const newPayment: Payment = {
      ...payment,
      id,
      createdAt: now
    };
    
    this.paymentsList.set(id, newPayment);
    return newPayment;
  }

  async getPaymentsByUser(userId: number): Promise<Payment[]> {
    return Array.from(this.paymentsList.values())
      .filter(payment => payment.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  }

  async getPaymentsBySubscription(subscriptionId: number): Promise<Payment[]> {
    return Array.from(this.paymentsList.values())
      .filter(payment => payment.subscriptionId === subscriptionId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
    const [user] = await db.insert(users).values({
      ...insertUser,
      isPremium: false
    }).returning();
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
  
  async getPremiumStories(limit: number = 10): Promise<Story[]> {
    return await db.select()
      .from(stories)
      .where(and(
        eq(stories.isPublic, true),
        eq(stories.isPremium, true)
      ))
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
    const [story] = await db.insert(stories).values({
      ...insertStory,
      isPremium: insertStory.isPremium || false
    }).returning();
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
  
  // Subscription plan methods
  async getAllSubscriptionPlans(): Promise<SubscriptionPlan[]> {
    return await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.isActive, true));
  }

  async getSubscriptionPlan(id: number): Promise<SubscriptionPlan | undefined> {
    const [plan] = await db.select().from(subscriptionPlans).where(eq(subscriptionPlans.id, id));
    return plan;
  }

  async createSubscriptionPlan(plan: InsertSubscriptionPlan): Promise<SubscriptionPlan> {
    const [newPlan] = await db.insert(subscriptionPlans).values(plan).returning();
    return newPlan;
  }

  async updateSubscriptionPlan(id: number, plan: Partial<InsertSubscriptionPlan>): Promise<SubscriptionPlan | undefined> {
    const [updatedPlan] = await db.update(subscriptionPlans)
      .set({ ...plan, updatedAt: new Date() })
      .where(eq(subscriptionPlans.id, id))
      .returning();
    
    return updatedPlan;
  }

  async deleteSubscriptionPlan(id: number): Promise<boolean> {
    // Soft delete by setting isActive to false
    const result = await db.update(subscriptionPlans)
      .set({ isActive: false, updatedAt: new Date() })
      .where(eq(subscriptionPlans.id, id));
    
    return result !== undefined;
  }
  
  // User subscription methods
  async getUserSubscription(userId: number): Promise<Subscription | undefined> {
    const [subscription] = await db.select()
      .from(subscriptions)
      .where(eq(subscriptions.userId, userId))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);
    
    return subscription;
  }

  async getActiveUserSubscription(userId: number): Promise<Subscription | undefined> {
    const today = new Date();
    
    const [subscription] = await db.select()
      .from(subscriptions)
      .where(and(
        eq(subscriptions.userId, userId),
        eq(subscriptions.status, "active"),
        gte(subscriptions.endDate, today)
      ))
      .orderBy(desc(subscriptions.createdAt))
      .limit(1);
    
    return subscription;
  }

  async createSubscription(subscription: InsertSubscription): Promise<Subscription> {
    const [newSubscription] = await db.insert(subscriptions).values(subscription).returning();
    
    // Update the user's premium status
    await db.update(users)
      .set({ isPremium: true, updatedAt: new Date() })
      .where(eq(users.id, subscription.userId));
    
    return newSubscription;
  }

  async updateSubscription(id: number, subscription: Partial<InsertSubscription>): Promise<Subscription | undefined> {
    const [updatedSubscription] = await db.update(subscriptions)
      .set({ ...subscription, updatedAt: new Date() })
      .where(eq(subscriptions.id, id))
      .returning();
    
    return updatedSubscription;
  }

  async cancelSubscription(id: number): Promise<Subscription | undefined> {
    const [subscription] = await db.select().from(subscriptions).where(eq(subscriptions.id, id));
    
    if (!subscription) {
      return undefined;
    }
    
    const [canceledSubscription] = await db.update(subscriptions)
      .set({ 
        status: "cancelled", 
        autoRenew: false,
        updatedAt: new Date() 
      })
      .where(eq(subscriptions.id, id))
      .returning();
    
    // Check if user has any other active subscriptions
    const activeSubscriptions = await db.select()
      .from(subscriptions)
      .where(and(
        eq(subscriptions.userId, subscription.userId),
        eq(subscriptions.status, "active"),
        gte(subscriptions.endDate, new Date())
      ));
    
    // If no other active subscriptions, update user premium status
    if (activeSubscriptions.length === 0) {
      await db.update(users)
        .set({ isPremium: false, updatedAt: new Date() })
        .where(eq(users.id, subscription.userId));
    }
    
    return canceledSubscription;
  }
  
  // Payment methods
  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment).returning();
    return newPayment;
  }

  async getPaymentsByUser(userId: number): Promise<Payment[]> {
    return await db.select()
      .from(payments)
      .where(eq(payments.userId, userId))
      .orderBy(desc(payments.createdAt));
  }

  async getPaymentsBySubscription(subscriptionId: number): Promise<Payment[]> {
    return await db.select()
      .from(payments)
      .where(eq(payments.subscriptionId, subscriptionId))
      .orderBy(desc(payments.createdAt));
  }
}

// Use database storage
export const storage = new DatabaseStorage();
