import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Clock, Star, BookOpen } from "lucide-react";

interface StoryCardProps {
  id: number;
  title: string;
  summary: string;
  genre: string;
  createdAt: Date;
}

function StoryCard({ id, title, summary, genre, createdAt }: StoryCardProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  // Generate a gradient based on genre
  const getGradient = (genre: string) => {
    const gradients = {
      "Fantasy": "from-purple-600/30 to-blue-500/30",
      "Science Fiction": "from-blue-600/30 to-cyan-500/30",
      "Mystery": "from-indigo-600/30 to-purple-500/30",
      "Adventure": "from-orange-600/30 to-amber-500/30",
      "Romance": "from-pink-600/30 to-rose-500/30",
      "Horror": "from-red-600/30 to-rose-900/30",
    };
    
    return gradients[genre] || "from-primary/30 to-secondary/30";
  };

  return (
    <div className="story-card glass-panel rounded-xl overflow-hidden">
      <div className="h-32 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(genre)}`}></div>
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <span className="bg-primary/80 text-white text-xs px-2 py-1 rounded-full">
            {genre}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-['Poppins'] font-semibold text-xl mb-2">{title}</h3>
        <p className="text-white/70 text-sm line-clamp-2 mb-4">{summary}</p>
        
        <div className="flex justify-between items-center">
          <span className="text-white/50 text-xs flex items-center">
            <Clock className="h-3 w-3 mr-1" /> {formattedDate}
          </span>
          <Link href={`/story/${id}`}>
            <a className="text-secondary hover:text-white transition-colors text-sm">
              Continue Reading 
              <svg 
                className="inline-block ml-1 h-3 w-3" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="glass-panel rounded-xl py-12 px-6 text-center">
      <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
        <BookOpen className="h-8 w-8 text-white/60" />
      </div>
      <h3 className="font-['Poppins'] font-semibold text-xl mb-2">No Stories Yet</h3>
      <p className="text-white/70 mb-6 max-w-md mx-auto">
        Your library is empty. Generate a new story or explore popular stories to add to your collection.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/explore">
          <Button variant="outline" className="bg-white/10 hover:bg-white/20">
            Explore Stories
          </Button>
        </Link>
        <Link href="/">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all">
            Create Story
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Simulated user ID for the demo
  const userId = 1;
  
  const { data: stories, isLoading } = useQuery({
    queryKey: ['/api/stories/user', userId],
    enabled: false, // Disable this query as we don't have real user auth yet
  });
  
  // For demo purposes, we'll use this empty array
  const userStories = [];
  
  const filteredStories = userStories.filter(story => 
    story?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story?.summary?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-7xl py-12 px-4">
      <h1 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-6">Your Story Library</h1>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
          <Input 
            type="search"
            placeholder="Search your stories..."
            className="pl-10 bg-white/10 border-white/20 text-white focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList className="bg-white/10">
          <TabsTrigger value="all">All Stories</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-panel rounded-xl overflow-hidden">
                  <Skeleton className="h-32 w-full" />
                  <div className="p-6">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <div className="flex justify-between">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredStories && filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  summary={story.summary}
                  genre={story.genre}
                  createdAt={story.createdAt}
                />
              ))}
            </div>
          ) : (
            <EmptyState />
          )}
        </TabsContent>
        
        <TabsContent value="favorites" className="mt-6">
          <EmptyState />
        </TabsContent>
        
        <TabsContent value="recent" className="mt-6">
          <EmptyState />
        </TabsContent>
      </Tabs>
    </div>
  );
}
