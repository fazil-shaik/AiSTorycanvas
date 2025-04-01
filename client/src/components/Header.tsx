import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { AuthDialog } from "./AuthDialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "register">("login");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch current user
  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await apiRequest("GET", "/api/auth/me");
        if (!res.ok) return null;
        return res.json();
      } catch (error) {
        return null;
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Library", path: "/library" },
    { name: "Explore", path: "/explore" },
    { name: "Dashboard", path: "/dashboard", authRequired: true },
    { name: "About", path: "/about" },
  ];

  // Filtered links for display
  const filteredLinks = navLinks.filter(link => 
    !link.authRequired || (link.authRequired && !!user)
  );

  const handleOpenAuthDialog = (tab: "login" | "register") => {
    setAuthDialogTab(tab);
    setAuthDialogOpen(true);
  };

  const handleLogout = async () => {
    try {
      const res = await apiRequest("POST", "/api/auth/logout");
      if (res.ok) {
        queryClient.setQueryData(["user"], null);
        queryClient.invalidateQueries({ queryKey: ["user"] });
        
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        
        if (location === "/dashboard") {
          navigate("/");
        }
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Something went wrong while logging out.",
      });
    }
  };

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled 
          ? "bg-black/30 backdrop-blur-md shadow-lg" 
          : "bg-transparent"
      }`}>
        <div className="relative glass-panel mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center space-x-2">
              <div className="orb w-10 h-10 animate-pulse-slow bg-gradient-to-br from-primary to-secondary rounded-full opacity-80"></div>
              <Link href="/">
                <div className="font-['Orbitron'] text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  StoryVerse
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex space-x-6 items-center">
              {filteredLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <div className={`transition-colors font-medium cursor-pointer ${
                    location === link.path 
                      ? "text-white" 
                      : "text-white/80 hover:text-white"
                  }`}>
                    {link.name}
                  </div>
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                className="hidden sm:flex items-center bg-white/10 hover:bg-white/20 text-white"
              >
                <svg 
                  className="mr-2 h-4 w-4" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                Search
              </Button>
              
              {!isLoading && !user ? (
                <Button 
                  className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all"
                  onClick={() => handleOpenAuthDialog("login")}
                >
                  Sign In
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white"
                    >
                      <User className="h-4 w-4" />
                      <span>{user?.username || "User"}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="md:hidden text-white"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-dark text-white">
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center py-4">
                      <div className="font-['Orbitron'] text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                        StoryVerse
                      </div>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <X className="h-5 w-5 text-white" />
                        </Button>
                      </SheetTrigger>
                    </div>
                    <nav className="flex flex-col space-y-4 mt-8">
                      {filteredLinks.map((link) => (
                        <Link key={link.path} href={link.path}>
                          <div className={`text-lg py-2 transition-colors cursor-pointer ${
                            location === link.path 
                              ? "text-primary font-medium" 
                              : "text-white/80 hover:text-white"
                          }`}>
                            {link.name}
                          </div>
                        </Link>
                      ))}
                    </nav>
                    <div className="mt-auto pb-8">
                      {!isLoading && !user ? (
                        <Button 
                          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all"
                          onClick={() => handleOpenAuthDialog("login")}
                        >
                          Sign In
                        </Button>
                      ) : (
                        <Button 
                          className="w-full bg-white/10 hover:bg-white/20 text-white"
                          variant="outline"
                          onClick={handleLogout}
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      )}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      
      <AuthDialog 
        open={authDialogOpen} 
        onOpenChange={setAuthDialogOpen} 
        defaultTab={authDialogTab} 
      />
    </>
  );
}
