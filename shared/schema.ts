import { pgTable, text, serial, integer, boolean, json, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  avatar: text("avatar"),
  theme: text("theme").default("system").notNull(),
  bio: text("bio"),
  role: text("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const sessions = pgTable("sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  token: text("token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stories = pgTable("stories", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  summary: text("summary").notNull(),
  genre: text("genre").notNull(),
  theme: text("theme").notNull(),
  character: text("character").notNull(),
  setting: text("setting").notNull(),
  storyLength: text("story_length").notNull(),
  images: json("images").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isPublic: boolean("is_public").default(false).notNull(),
  rating: integer("rating").default(0),
  views: integer("views").default(0),
});

export const genres = pgTable("genres", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const themes = pgTable("themes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  theme: true,
});

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const updateThemeSchema = z.object({
  theme: z.enum(["light", "dark", "system"]),
});

export const insertStorySchema = createInsertSchema(stories).omit({
  id: true,
  createdAt: true,
  views: true,
  rating: true,
});

export const storySettingsSchema = z.object({
  genre: z.string().min(1, "Genre is required"),
  theme: z.string().min(1, "Theme is required"),
  character: z.string().min(1, "Main character is required"),
  setting: z.string().min(1, "Setting is required"),
  storyLength: z.string().min(1, "Story length is required"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginInput = z.infer<typeof loginSchema>;
export type UpdateTheme = z.infer<typeof updateThemeSchema>;

export type Session = typeof sessions.$inferSelect;
export type InsertSession = typeof sessions.$inferInsert;

export type InsertStory = z.infer<typeof insertStorySchema>;
export type Story = typeof stories.$inferSelect;

export type StorySettings = z.infer<typeof storySettingsSchema>;
export type Genre = typeof genres.$inferSelect;
export type Theme = typeof themes.$inferSelect;
