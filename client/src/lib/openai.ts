import { apiRequest } from "./queryClient";
import { StorySettings } from "@shared/schema";

export interface GeneratedStory {
  title: string;
  content: string;
  summary: string;
  imagePrompts: string[];
}

export async function generateStory(settings: StorySettings): Promise<GeneratedStory> {
  const response = await apiRequest('POST', '/api/generate-story', settings);
  return await response.json();
}

export async function generateSpeech(text: string): Promise<string> {
  const response = await apiRequest('POST', '/api/generate-speech', { text });
  const data = await response.json();
  return data.audio;
}
