import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface StoryCardProps {
  id: number;
  title: string;
  summary: string;
  genre: string;
  username: string;
  rating: number;
  readingTime: string;
}

function StoryCard({ id, title, summary, genre, username, rating, readingTime }: StoryCardProps) {
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
  
  // Generate initials for avatar
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <motion.div 
      className="story-card glass-panel rounded-xl overflow-hidden transform-gpu"
      whileHover={{ y: -8, rotateY: 5, rotateX: 5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="h-48 relative overflow-hidden">
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
        <p className="text-white/70 text-sm line-clamp-2">{summary}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xs font-bold mr-2">
              {getInitials(username)}
            </div>
            <span className="text-white/70 text-sm">{username}</span>
          </div>
          <div className="flex items-center text-amber-400 text-sm">
            <Star className="w-4 h-4 mr-1 fill-current" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <span className="text-white/50 text-xs">{readingTime}</span>
          <Link href={`/story/${id}`}>
            <a className="text-secondary hover:text-white transition-colors text-sm">
              Read Now 
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
    </motion.div>
  );
}

function FeaturedStory() {
  return (
    <div className="glass-panel rounded-xl overflow-hidden mb-12">
      <div className="md:grid md:grid-cols-2 items-center">
        <div className="p-8 md:p-12">
          <div className="flex items-center mb-4">
            <Sparkles className="text-amber-400 h-5 w-5 mr-2" />
            <span className="text-amber-400 font-semibold">Featured Story</span>
          </div>
          <h2 className="font-['Poppins'] font-bold text-2xl md:text-3xl mb-3">The Crystal Kingdom</h2>
          <p className="text-white/80 mb-6">
            Princess Elara must venture beyond the Whispering Woods to find the ancient Guardian who knows 
            the secret to restoring the Heart of Lumina—a crystal that powers all magic in the realm.
          </p>
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold mr-2">
              AI
            </div>
            <div className="text-white/70 text-sm">
              AI Storyteller
              <div className="flex items-center text-amber-400">
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
                <Star className="h-3 w-3 fill-current" />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="bg-primary/30 text-white/90 text-xs px-2 py-1 rounded-full">Fantasy</span>
            <span className="bg-primary/30 text-white/90 text-xs px-2 py-1 rounded-full">Adventure</span>
            <span className="bg-primary/30 text-white/90 text-xs px-2 py-1 rounded-full">Magic</span>
          </div>
          <Link href="/story/1">
            <Button className="mt-6 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all">
              Read Story
            </Button>
          </Link>
        </div>
        <div className="h-64 md:h-full relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-blue-500/30"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center p-8">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <Sparkles className="h-10 w-10 text-white/90" />
              </div>
              <h3 className="font-['Orbitron'] text-xl font-bold text-white">Crystal Kingdom</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Explore() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  
  const { data: stories, isLoading } = useQuery({
    queryKey: ['/api/stories', activeGenre !== 'All' ? activeGenre : undefined],
    select: (data) => {
      // Add some additional fields for display purposes
      return data.map(story => ({
        ...story,
        username: "AI Storyteller", // Placeholder
        readingTime: `${Math.ceil(story.content.length / 1000)} min read`
      }));
    }
  });

  const { data: genres } = useQuery({ 
    queryKey: ['/api/genres'],
  });
  
  const handleGenreChange = (genre: string) => {
    setActiveGenre(genre);
  };
  
  const filteredStories = stories?.filter(story => 
    searchQuery === "" || 
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container max-w-7xl py-12 px-4">
      <h1 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-6">Explore Stories</h1>
      
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-white/60" />
          <Input 
            type="search"
            placeholder="Search stories by title, genre, theme..."
            className="pl-10 bg-white/10 border-white/20 text-white focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <FeaturedStory />
      
      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-start mb-8">
        <Button
          variant={activeGenre === "All" ? "default" : "ghost"}
          className={`mr-3 mb-3 rounded-full ${
            activeGenre === "All" 
              ? "bg-primary text-white" 
              : "bg-white/10 hover:bg-white/20 text-white"
          }`}
          onClick={() => handleGenreChange("All")}
        >
          All
        </Button>
        
        {(genres || []).map((genre) => (
          <Button
            key={genre.id}
            variant={activeGenre === genre.name ? "default" : "ghost"}
            className={`mr-3 mb-3 rounded-full ${
              activeGenre === genre.name 
                ? "bg-primary text-white" 
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            onClick={() => handleGenreChange(genre.name)}
          >
            {genre.name}
          </Button>
        ))}
      </div>
      
      {/* Stories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          // Skeleton loading state
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="glass-panel rounded-xl overflow-hidden">
              <Skeleton className="h-48 w-full" />
              <div className="p-6">
                <Skeleton className="h-7 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-2/3 mb-4" />
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-2" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-4 w-10" />
                </div>
                <div className="mt-4 flex justify-between">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))
        ) : filteredStories && filteredStories.length > 0 ? (
          // Display stories
          filteredStories.map((story) => (
            <StoryCard
              key={story.id}
              id={story.id}
              title={story.title}
              summary={story.summary}
              genre={story.genre}
              username={story.username}
              rating={story.rating || 4.8}
              readingTime={story.readingTime}
            />
          ))
        ) : (
          // No stories found
          <div className="col-span-full glass-panel rounded-xl py-12 px-6 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
              <Search className="h-8 w-8 text-white/60" />
            </div>
            <h3 className="font-['Poppins'] font-semibold text-xl mb-2">No Stories Found</h3>
            <p className="text-white/70 mb-6 max-w-md mx-auto">
              We couldn't find any stories matching your search. Try adjusting your filters or create your own story.
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all">
                Create Story
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      {filteredStories && filteredStories.length > 0 && (
        <div className="mt-12 text-center">
          <Button 
            variant="ghost"
            className="floating-button bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full transition-all text-lg"
          >
            Load More Stories
          </Button>
        </div>
      )}
    </div>
  );
}
