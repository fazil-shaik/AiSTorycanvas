import React, { useState, useEffect } from "react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { Sun, Moon, CloudRain, CloudLightning, CloudFog, Wind, Sunrise, Sunset } from "lucide-react";

export type MoodType = 
  | "bright" 
  | "serene" 
  | "melancholic" 
  | "tense" 
  | "mysterious" 
  | "dramatic"
  | "romantic"
  | "dark";

interface MoodSliderProps {
  defaultValue?: number;
  onMoodChange?: (mood: MoodType, intensity: number) => void;
  className?: string;
}

interface MoodSetting {
  name: MoodType;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  fontStyle: string;
}

export const moodSettings: Record<MoodType, MoodSetting> = {
  bright: {
    name: "bright",
    icon: <Sun className="h-5 w-5" />,
    color: "text-amber-500",
    bgGradient: "from-amber-200/30 to-yellow-100/30",
    fontStyle: "font-['Nunito']"
  },
  serene: {
    name: "serene",
    icon: <Sunrise className="h-5 w-5" />,
    color: "text-sky-500",
    bgGradient: "from-blue-200/30 to-cyan-100/30",
    fontStyle: "font-['Lora']"
  },
  melancholic: {
    name: "melancholic",
    icon: <CloudRain className="h-5 w-5" />,
    color: "text-indigo-500",
    bgGradient: "from-indigo-200/30 to-purple-100/30",
    fontStyle: "font-['Georgia']"
  },
  tense: {
    name: "tense",
    icon: <CloudLightning className="h-5 w-5" />,
    color: "text-orange-500",
    bgGradient: "from-orange-200/30 to-red-100/30",
    fontStyle: "font-['Roboto Mono']"
  },
  mysterious: {
    name: "mysterious",
    icon: <CloudFog className="h-5 w-5" />,
    color: "text-purple-500",
    bgGradient: "from-purple-200/30 to-violet-100/30",
    fontStyle: "font-['Playfair Display']"
  },
  dramatic: {
    name: "dramatic",
    icon: <Wind className="h-5 w-5" />,
    color: "text-emerald-500",
    bgGradient: "from-emerald-200/30 to-green-100/30",
    fontStyle: "font-['Merriweather']"
  },
  romantic: {
    name: "romantic",
    icon: <Sunset className="h-5 w-5" />,
    color: "text-rose-500",
    bgGradient: "from-rose-200/30 to-pink-100/30",
    fontStyle: "font-['Dancing Script']"
  },
  dark: {
    name: "dark",
    icon: <Moon className="h-5 w-5" />,
    color: "text-slate-500",
    bgGradient: "from-slate-800/40 to-slate-900/40",
    fontStyle: "font-['Playfair Display']"
  }
};

export function MoodSlider({ defaultValue = 50, onMoodChange, className }: MoodSliderProps) {
  const [value, setValue] = useState<number[]>([defaultValue]);
  const [currentMood, setCurrentMood] = useState<MoodType>("serene");
  
  // Map slider value (0-100) to mood
  useEffect(() => {
    const moodValue = value[0];
    
    let newMood: MoodType;
    if (moodValue < 15) {
      newMood = "bright";
    } else if (moodValue < 30) {
      newMood = "serene";
    } else if (moodValue < 45) {
      newMood = "melancholic";
    } else if (moodValue < 60) {
      newMood = "romantic";
    } else if (moodValue < 75) {
      newMood = "mysterious";
    } else if (moodValue < 90) {
      newMood = "dramatic";
    } else {
      newMood = "dark";
    }
    
    setCurrentMood(newMood);
    
    // Calculate intensity (0-1) within the current mood range
    const rangeSize = 15; // Each mood spans 15 points on the slider
    const lowerBound = moodValue - (moodValue % rangeSize);
    const intensity = (moodValue - lowerBound) / rangeSize;
    
    if (onMoodChange) {
      onMoodChange(newMood, intensity);
    }
  }, [value, onMoodChange]);
  
  const currentMoodSetting = moodSettings[currentMood];
  
  return (
    <div className={cn("relative space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="text-sm">Story Mood</div>
        <div className={cn("flex items-center px-3 py-1 rounded-full bg-white/10", currentMoodSetting.color)}>
          {currentMoodSetting.icon}
          <span className="ml-1 capitalize text-xs">{currentMoodSetting.name}</span>
        </div>
      </div>
      
      <Slider
        value={value}
        min={0}
        max={100}
        step={1}
        className="mood-slider"
        onValueChange={setValue}
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Bright</span>
        <span>Dark</span>
      </div>
    </div>
  );
}

export function useMoodStyles(mood: MoodType, intensity: number = 0.5) {
  const moodSetting = moodSettings[mood];
  
  // Adjust opacity based on intensity
  const opacityClass = intensity > 0.75 
    ? "opacity-100" 
    : intensity > 0.5 
      ? "opacity-80" 
      : intensity > 0.25 
        ? "opacity-60" 
        : "opacity-40";
  
  return {
    containerClasses: cn("bg-gradient-to-br", moodSetting.bgGradient, opacityClass),
    textClasses: cn(moodSetting.fontStyle, moodSetting.color),
    moodSetting
  };
}