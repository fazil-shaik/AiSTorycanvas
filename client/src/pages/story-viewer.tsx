import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Story } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Share2, Save, Volume2 } from "lucide-react";
import { generateSpeech } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

function StoryHeader({ title, genre }: { title: string; genre: string }) {
  return (
    <div className="mb-6">
      <h1 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-2">{title}</h1>
      <div className="flex items-center">
        <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
          {genre}
        </span>
      </div>
    </div>
  );
}

function StoryContent({ content }: { content: string }) {
  return (
    <div className="prose prose-lg prose-invert max-w-none mb-8">
      {content.split("\n\n").map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

function Story3DTitle({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000">
      <div className="relative animate-float">
        <h2 
          className="font-['Orbitron'] text-4xl md:text-5xl text-center font-bold 
                    bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary 
                    animate-pulse-slow transform rotate-3d"
        >
          {title}
        </h2>
        <div className="absolute -z-10 -inset-2 blur-lg bg-gradient-to-r from-primary/40 to-secondary/40 opacity-70 animate-pulse-slow" />
      </div>
    </div>
  );
}

export default function StoryViewer() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<{ id: string }>("/story/:id");
  const [readingProgress, setReadingProgress] = useState(0);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();
  
  const { data: story, isLoading, error } = useQuery<Story>({
    queryKey: [`/api/stories/${params?.id}`],
    enabled: !!params?.id,
  });
  
  useEffect(() => {
    const handleScroll = () => {
      if (document.body.scrollHeight <= window.innerHeight) {
        setReadingProgress(100);
        return;
      }
      
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleGenerateSpeech = async () => {
    if (!story) return;
    
    try {
      // Generate audio for first few paragraphs
      const firstParagraphs = story.content.split("\n\n").slice(0, 3).join("\n\n");
      const audio = await generateSpeech(firstParagraphs);
      setAudioSrc(audio);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to generate speech: ${error?.message || 'Unknown error'}`,
        variant: "destructive",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="container max-w-4xl py-12 px-4">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => setLocation("/explore")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Stories
        </Button>
        
        <Skeleton className="h-10 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/4 mb-8" />
        
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full" />
          ))}
        </div>
      </div>
    );
  }
  
  if (error || !story) {
    return (
      <div className="container max-w-4xl py-12 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Story not found</h2>
        <p className="mb-8">The story you're looking for could not be found.</p>
        <Button onClick={() => setLocation("/explore")}>
          Browse Stories
        </Button>
      </div>
    );
  }
  
  return (
    <div className="relative">
      <div className="container max-w-4xl py-12 px-4">
        <Button 
          variant="ghost" 
          className="mb-8"
          onClick={() => setLocation("/explore")}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Stories
        </Button>
        
        <div className="glass-panel p-8 rounded-xl mb-8">
          <StoryHeader title={story.title} genre={story.genre} />
          
          <div className="h-[200px] mb-8">
            <Story3DTitle title={story.title} />
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <div>
              <p className="text-white/70 mb-1">Reading progress</p>
              <Progress value={readingProgress} className="w-32 h-2" />
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 hover:bg-white/20"
                onClick={handleGenerateSpeech}
              >
                <Volume2 className="mr-2 h-4 w-4" />
                Listen
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 hover:bg-white/20"
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/10 hover:bg-white/20"
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </div>
          
          {audioSrc && (
            <div className="mb-8">
              <AudioPlayer audioSrc={audioSrc} />
            </div>
          )}
          
          <StoryContent content={story.content} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary" style={{ width: `${readingProgress}%` }}></div>
    </div>
  );
}