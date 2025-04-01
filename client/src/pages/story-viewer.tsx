import { useEffect, useState, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Story } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { AudioPlayer } from "@/components/ui/audio-player";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Share2, Save, Volume2, Play, Pause, VolumeX, Copy, CheckCheck } from "lucide-react";
import { generateSpeech } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent } from "@/components/ui/card";
import { ShareDialog } from "@/components/ui/share-dialog";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  const [audioProgress, setAudioProgress] = useState(0);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();
  
  // Increment the view count when the story is viewed
  const incrementViewsMutation = useMutation({
    mutationFn: async (storyId: number) => {
      return await apiRequest("POST", `/api/stories/${storyId}/view-count`);
    }
  });
  
  const { data: story, isLoading, error } = useQuery<Story>({
    queryKey: [`/api/stories/${params?.id}`],
    enabled: !!params?.id
  });
  
  // Use an effect to increment the view count once the story is loaded
  useEffect(() => {
    if (story?.id) {
      incrementViewsMutation.mutate(story.id);
    }
  }, [story?.id]);
  
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
  
  // Set up the audio element reference
  useEffect(() => {
    if (audioSrc && audioRef.current) {
      audioRef.current.onended = () => {
        setIsPlaying(false);
      };
      
      audioRef.current.ontimeupdate = () => {
        if (audioRef.current) {
          const progress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setAudioProgress(progress);
        }
      };
    }
  }, [audioSrc]);
  
  const handleGenerateSpeech = async () => {
    if (!story) return;
    
    try {
      setIsGeneratingAudio(true);
      
      // Generate audio for the first five paragraphs for a better experience
      const contentToRead = story.content.split("\n\n").slice(0, 5).join("\n\n");
      
      const audio = await generateSpeech(contentToRead);
      setAudioSrc(audio);
      setIsPlaying(true);
      
      // Auto-play the audio
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.error("Auto-play failed:", e));
        }
      }, 100);
    } catch (error: any) {
      toast({
        title: "Error",
        description: `Failed to generate speech: ${error?.message || 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAudio(false);
    }
  };
  
  const handlePlayPause = () => {
    if (!audioSrc) {
      handleGenerateSpeech();
      return;
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const handleMuteToggle = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setIsMuted(!isMuted);
    }
  };
  
  const handleCopyLink = () => {
    if (!story) return;
    
    const url = `${window.location.origin}/story/${story.id}`;
    navigator.clipboard.writeText(url);
    
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
    
    toast({
      title: "Link copied!",
      description: "Story link has been copied to clipboard",
    });
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
                className={`${isGeneratingAudio ? 'opacity-50 cursor-not-allowed' : 'bg-white/10 hover:bg-white/20'}`}
                onClick={handlePlayPause}
                disabled={isGeneratingAudio}
              >
                {isGeneratingAudio ? (
                  <>
                    <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                    Generating...
                  </>
                ) : (
                  <>
                    {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Volume2 className="mr-2 h-4 w-4" />}
                    {isPlaying ? "Pause" : "Listen"}
                  </>
                )}
              </Button>
              
              <ShareDialog
                title={story.title}
                url={window.location.origin + "/story/" + story.id}
                summary={story.summary}
                isPublic={story.isPublic}
              />
            </div>
          </div>
          
          {/* Audio player with ref */}
          {audioSrc && (
            <Card className="bg-primary/10 border-primary/20 mb-8 overflow-hidden">
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-medium">AI Voice Narration</h3>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleMuteToggle}
                    >
                      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                    </Button>
                  </div>
                  
                  <Progress 
                    value={audioProgress} 
                    className="h-2 mb-3" 
                  />
                  
                  <div className="flex justify-between items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={handlePlayPause}
                    >
                      {isPlaying ? "Pause" : "Play"}
                    </Button>
                    <span className="text-xs text-muted-foreground">AI-powered voice narration</span>
                  </div>
                  
                  <audio 
                    ref={audioRef}
                    src={audioSrc} 
                    className="hidden"
                    controls={false}
                  />
                </div>
              </CardContent>
            </Card>
          )}
          
          <StoryContent content={story.content} />
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary to-secondary" style={{ width: `${readingProgress}%` }}></div>
    </div>
  );
}