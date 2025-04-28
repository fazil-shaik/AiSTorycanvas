import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User, Session } from '@shared/schema';
import { db } from '../db';
import { sessions, users } from '@shared/schema';
import { eq } from 'drizzle-orm';

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // In production, use a secure environment variable
const SALT_ROUNDS = 10;
const TOKEN_EXPIRY = '24h';

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare a password with a hash
 */
export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Generate a JWT token
 */
export function generateToken(user: User): string {
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
    role: user.role
  };
  
  return jwt.sign(payload, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
}

/**
 * Create a new session record
 */
export async function createSession(userId: number, token: string): Promise<Session> {
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours from now
  
  const [session] = await db.insert(sessions)
    .values({ 
      userId,
      token,
      expiresAt
    })
    .returning();
  
  return session;
}

/**
 * Middleware to verify JWT tokens
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  // Get token from cookies or Authorization header
  const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
  
  // If no token is provided
  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    
    // Add the user info to the request
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string): Promise<User | undefined> {
  const [user] = await db.select()
    .from(users)
    .where(eq(users.email, email));
  
  return user;
}

/**
 * Delete a session
 */
export async function deleteSession(token: string): Promise<boolean> {
  const result = await db.delete(sessions)
    .where(eq(sessions.token, token));
  
  return result !== undefined;
}

// Extend Express Request interface
declare global {
  namespace Express {
    interface Request {
      user?: jwt.JwtPayload;
    }
  }
}