import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

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
    { name: "About", path: "/about" },
  ];

  return (
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
              <a className="font-['Orbitron'] text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                StoryVerse
              </a>
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <a className={`transition-colors font-medium ${
                  location === link.path 
                    ? "text-white" 
                    : "text-white/80 hover:text-white"
                }`}>
                  {link.name}
                </a>
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
            
            <Button 
              className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all"
            >
              Sign In
            </Button>
            
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
                    {navLinks.map((link) => (
                      <Link key={link.path} href={link.path}>
                        <a className={`text-lg py-2 transition-colors ${
                          location === link.path 
                            ? "text-primary font-medium" 
                            : "text-white/80 hover:text-white"
                        }`}>
                          {link.name}
                        </a>
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8">
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all"
                    >
                      Sign In
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
