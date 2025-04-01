import { apiRequest } from "./queryClient";
import { StorySettings } from "@shared/schema";
import { useLocation } from "wouter";

export interface GeneratedStory {
  title: string;
  content: string;
  summary: string;
  imagePrompts: string[];
}

export interface RateLimitError extends Error {
  hoursRemaining?: number;
}

export async function generateStory(settings: StorySettings): Promise<GeneratedStory> {
  try {
    const response = await apiRequest('POST', '/api/generate-story', settings);
    return await response.json();
  } catch (error) {
    // Check if this is a rate limit error
    if (error instanceof Error) {
      try {
        const errorResponse = JSON.parse(error.message.split(': ')[1]);
        
        if (errorResponse.hoursRemaining) {
          const rateError = new Error(`Rate limit exceeded. You can generate another story in ${errorResponse.hoursRemaining} hours.`) as RateLimitError;
          rateError.hoursRemaining = errorResponse.hoursRemaining;
          throw rateError;
        }
      } catch (parseError) {
        // If we can't parse the error, just pass through the original error
      }
    }
    throw error;
  }
}

export async function generateSpeech(text: string): Promise<string> {
  const response = await apiRequest('POST', '/api/generate-speech', { text });
  const data = await response.json();
  return data.audio;
}
