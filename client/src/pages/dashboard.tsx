import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { PlusCircle, Library, Clock, Star, Sparkles, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import StoryGenerator from "@/components/StoryGenerator";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Story Card Interface
interface StoryCardProps {
  id: number;
  title: string;
  summary: string;
  genre: string;
  createdAt: Date;
  isPublic: boolean;
  views?: number;
  handleEdit?: () => void;
  handleDelete?: () => void;
}

function StoryCard({ 
  id, 
  title, 
  summary, 
  genre, 
  createdAt, 
  isPublic, 
  views = 0,
  handleEdit,
  handleDelete
}: StoryCardProps) {
  const [, navigate] = useLocation();
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
  
  return (
    <Card className="border border-muted-foreground/20 rounded-lg overflow-hidden hover:shadow-md transition duration-300 bg-card/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-semibold text-card-foreground line-clamp-1">
            {title}
          </CardTitle>
          <Badge variant={isPublic ? "default" : "outline"}>
            {isPublic ? "Public" : "Private"}
          </Badge>
        </div>
        <CardDescription className="flex gap-2 items-center text-sm text-card-foreground/60">
          <span>{genre}</span>
          <span>•</span>
          <span>{formattedDate}</span>
          {views > 0 && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                {views}
              </span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-card-foreground/80 line-clamp-2">
          {summary}
        </p>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <Button 
            variant="default" 
            className="text-xs h-8" 
            onClick={() => navigate(`/stories/${id}`)}
          >
            Read
          </Button>
          <div className="flex gap-2">
            {handleEdit && (
              <Button 
                variant="outline" 
                className="text-xs h-8" 
                onClick={handleEdit}
              >
                Edit
              </Button>
            )}
            {handleDelete && (
              <Button 
                variant="destructive" 
                className="text-xs h-8" 
                onClick={handleDelete}
              >
                Delete
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

// Dashboard Component
export default function Dashboard() {
  const [location, navigate] = useLocation();
  const [storyGeneratorOpen, setStoryGeneratorOpen] = useState(false);
  const { toast } = useToast();
  
  // Fetch user data
  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/auth/me");
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        return res.json();
      } catch (error) {
        throw error;
      }
    },
  });
  
  // Fetch user's stories
  const { data: stories, isLoading: isLoadingStories } = useQuery({
    queryKey: ["user-stories"],
    queryFn: async () => {
      try {
        if (!user) return [];
        const res = await apiRequest("GET", `/api/stories?userId=${user.id}`);
        if (!res.ok) return [];
        return res.json();
      } catch (error) {
        return [];
      }
    },
    enabled: !!user,
  });
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoadingUser && !user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please log in to access the dashboard.",
      });
      navigate("/");
    }
  }, [isLoadingUser, user, navigate, toast]);
  
  if (isLoadingUser) {
    return (
      <div className="container mx-auto py-12 flex justify-center items-center min-h-[60vh]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-48 bg-primary/20 rounded-md"></div>
          <div className="h-4 w-32 bg-muted rounded-md mt-4"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-muted rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (!user) return null;
  
  const userStories = stories || [];
  const publicStories = userStories.filter(story => story.isPublic);
  const privateStories = userStories.filter(story => !story.isPublic);
  
  const handleDeleteStory = async (id: number) => {
    try {
      const res = await apiRequest("DELETE", `/api/stories/${id}`);
      if (res.ok) {
        toast({
          title: "Story Deleted",
          description: "Your story has been successfully deleted.",
        });
        // Invalidate the stories query to refetch
        queryClient.invalidateQueries({ queryKey: ["user-stories"] });
      } else {
        throw new Error("Failed to delete story");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the story. Please try again.",
      });
    }
  };
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2">
          Dashboard
        </h1>
        <p className="text-muted-foreground text-lg">
          Welcome back, {user.username}! Create and manage your stories.
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-6">
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{userStories.length}</span>
            <span className="text-sm text-muted-foreground">Total Stories</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{publicStories.length}</span>
            <span className="text-sm text-muted-foreground">Published</span>
          </div>
          
          <div className="flex flex-col">
            <span className="text-3xl font-bold">{privateStories.length}</span>
            <span className="text-sm text-muted-foreground">Drafts</span>
          </div>
        </div>
        
        <Dialog open={storyGeneratorOpen} onOpenChange={setStoryGeneratorOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-secondary text-white">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Story
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create a New Story</DialogTitle>
            </DialogHeader>
            <StoryGenerator onComplete={() => {
              setStoryGeneratorOpen(false);
              queryClient.invalidateQueries({ queryKey: ["user-stories"] });
            }} />
          </DialogContent>
        </Dialog>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all" className="flex items-center">
            <Library className="mr-2 h-4 w-4" />
            All Stories
          </TabsTrigger>
          <TabsTrigger value="published" className="flex items-center">
            <Star className="mr-2 h-4 w-4" />
            Published
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Drafts
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          {isLoadingStories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 bg-muted/20 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : userStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userStories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  summary={story.summary}
                  genre={story.genre}
                  createdAt={story.createdAt}
                  isPublic={story.isPublic}
                  views={story.views}
                  handleEdit={() => navigate(`/edit-story/${story.id}`)}
                  handleDelete={() => handleDeleteStory(story.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-muted/10 rounded-lg">
              <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Stories Yet</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Start your creative journey by creating your first story with our AI-powered generator.
              </p>
              <Button 
                className="bg-gradient-to-r from-primary to-secondary text-white"
                onClick={() => setStoryGeneratorOpen(true)}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Your First Story
              </Button>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="published">
          {publicStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {publicStories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  summary={story.summary}
                  genre={story.genre}
                  createdAt={story.createdAt}
                  isPublic={story.isPublic}
                  views={story.views}
                  handleEdit={() => navigate(`/edit-story/${story.id}`)}
                  handleDelete={() => handleDeleteStory(story.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-muted/10 rounded-lg">
              <Star className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Published Stories</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                When you publish your stories, they will appear here for others to discover and enjoy.
              </p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="drafts">
          {privateStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {privateStories.map((story) => (
                <StoryCard
                  key={story.id}
                  id={story.id}
                  title={story.title}
                  summary={story.summary}
                  genre={story.genre}
                  createdAt={story.createdAt}
                  isPublic={story.isPublic}
                  handleEdit={() => navigate(`/edit-story/${story.id}`)}
                  handleDelete={() => handleDeleteStory(story.id)}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 bg-muted/10 rounded-lg">
              <Clock className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Draft Stories</h3>
              <p className="text-muted-foreground mb-6 text-center max-w-md">
                Stories you're working on but not ready to share will appear here.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}