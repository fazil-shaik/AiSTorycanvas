import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Expand, Pause, Play, Save, Share2, Undo, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { storySettingsSchema } from "@shared/schema";
import { generateStory, generateSpeech } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { AudioPlayer } from "./ui/audio-player";
import { Progress } from "@/components/ui/progress";

export default function StoryGenerator() {
  const [story, setStory] = useState<{
    title: string;
    content: string;
    summary: string;
    imagePrompts: string[];
  } | null>(null);
  
  const [storyProgress, setStoryProgress] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();

  const { data: genres } = useQuery({ 
    queryKey: ['/api/genres'],
  });

  const { data: themes } = useQuery({ 
    queryKey: ['/api/themes'],
  });

  const generateMutation = useMutation({
    mutationFn: generateStory,
    onSuccess: (data) => {
      setStory(data);
      setStoryProgress(30);
      toast({
        title: "Story Generated",
        description: "Your story has been successfully created!",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to generate story: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const speechMutation = useMutation({
    mutationFn: generateSpeech,
    onSuccess: (audioData) => {
      setAudioSrc(audioData);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to generate speech: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const form = useForm({
    resolver: zodResolver(storySettingsSchema),
    defaultValues: {
      genre: "Fantasy",
      theme: "Hero's Journey",
      character: "",
      setting: "",
      storyLength: "Medium",
    },
  });

  const onSubmit = async (values) => {
    setIsGenerating(true);
    try {
      await generateMutation.mutateAsync(values);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAudioGeneration = () => {
    if (!story) return;
    
    // Generate audio for the first few paragraphs
    const firstParagraphs = story.content.split("\n\n").slice(0, 2).join("\n\n");
    speechMutation.mutate(firstParagraphs);
  };

  const handlePlayPause = () => {
    if (!audioSrc && story) {
      handleAudioGeneration();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-4 text-center">Create Your Story</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-center text-lg mb-12">
          Select a genre, add some details, and let our AI weave a unique tale just for you.
        </p>
        
        <div className="glass-panel p-8 rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <h3 className="font-['Poppins'] font-semibold text-xl mb-4">Story Settings</h3>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="genre"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Genre</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isGenerating}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select a genre" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-dark border-white/20">
                            {genres?.map((genre) => (
                              <SelectItem key={genre.id} value={genre.name}>
                                {genre.name}
                              </SelectItem>
                            )) || (
                              <>
                                <SelectItem value="Fantasy">Fantasy</SelectItem>
                                <SelectItem value="Science Fiction">Science Fiction</SelectItem>
                                <SelectItem value="Mystery">Mystery</SelectItem>
                                <SelectItem value="Adventure">Adventure</SelectItem>
                                <SelectItem value="Romance">Romance</SelectItem>
                                <SelectItem value="Horror">Horror</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="theme"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Theme</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isGenerating}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select a theme" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-dark border-white/20">
                            {themes?.map((theme) => (
                              <SelectItem key={theme.id} value={theme.name}>
                                {theme.name}
                              </SelectItem>
                            )) || (
                              <>
                                <SelectItem value="Coming of Age">Coming of Age</SelectItem>
                                <SelectItem value="Hero's Journey">Hero's Journey</SelectItem>
                                <SelectItem value="Redemption">Redemption</SelectItem>
                                <SelectItem value="Discovery">Discovery</SelectItem>
                                <SelectItem value="Survival">Survival</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="character"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Main Character</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Describe your protagonist..." 
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            disabled={isGenerating}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="setting"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Setting</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Where does your story take place?" 
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                            disabled={isGenerating}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="storyLength"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">Story Length</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isGenerating}
                          >
                            <SelectTrigger className="bg-white/10 border-white/20 text-white">
                              <SelectValue placeholder="Select length" />
                            </SelectTrigger>
                            <SelectContent className="bg-dark border-white/20">
                              <SelectItem value="Short">Short</SelectItem>
                              <SelectItem value="Medium">Medium</SelectItem>
                              <SelectItem value="Long">Long</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all text-lg"
                  >
                    {isGenerating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating...
                      </>
                    ) : (
                      <>
                        <svg 
                          className="mr-2 h-5 w-5" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/>
                          <path d="M12 6v8l4 2"/>
                        </svg>
                        Generate Story
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="lg:col-span-2">
              <div className="relative h-full rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 z-0"></div>
                
                {/* Story Display Area */}
                <div className="relative z-10 h-full flex flex-col p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-['Poppins'] font-semibold text-xl">
                      {story?.title || "Your Story Will Appear Here"}
                    </h3>
                    <div className="flex space-x-3">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white/70 hover:text-white hover:bg-white/10"
                        onClick={handleAudioGeneration}
                        disabled={!story || speechMutation.isPending}
                      >
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-white/70 hover:text-white hover:bg-white/10"
                      >
                        <Expand className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-auto story-content font-['Nunito']">
                    {story ? (
                      <div className="space-y-4">
                        {story.content.split("\n\n").map((paragraph, index) => (
                          <p key={index} className="text-white/90">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <p className="text-white/70 text-center text-lg">
                          Fill in the story settings and click "Generate Story" to create your tale
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {story && (
                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white/70">Story Progress</span>
                        <span className="text-white/70">{storyProgress}%</span>
                      </div>
                      <Progress value={storyProgress} className="h-2 bg-white/10" />
                    </div>
                  )}
                  
                  {story && (
                    <div className="flex justify-between items-center mt-4">
                      <Button 
                        variant="ghost"
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant="ghost"
                          size="icon" 
                          className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10"
                        >
                          <Undo className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost"
                          size="icon" 
                          className="bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10"
                          disabled={!audioSrc}
                        >
                          <Pause className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant={audioSrc ? "default" : "ghost"}
                          size="icon" 
                          className={`${
                            audioSrc 
                              ? "bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary" 
                              : "bg-white/10 hover:bg-white/20"
                          } text-white rounded-full w-10 h-10`}
                          onClick={handlePlayPause}
                          disabled={!story}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="ghost"
                        className="bg-white/10 hover:bg-white/20 text-white"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  )}
                  
                  {audioSrc && (
                    <div className="mt-4">
                      <AudioPlayer 
                        audioSrc={audioSrc} 
                        onEnded={() => setIsPlaying(false)}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
