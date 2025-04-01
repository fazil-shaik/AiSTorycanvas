import Hero from "@/components/Hero";
import Features from "@/components/Features";
import StoryGenerator from "@/components/StoryGenerator";
import StoryGallery from "@/components/StoryGallery";
import AudienceGrowth from "@/components/AudienceGrowth";
import Newsletter from "@/components/Newsletter";
import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [showScrollButton, setShowScrollButton] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <div>
      <Hero />
      <Features />
      <StoryGenerator />
      <StoryGallery />
      <AudienceGrowth />
      <Newsletter />
      
      {/* Floating Action Button */}
      <Button
        className={`fixed bottom-8 right-8 z-50 floating-button bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white w-14 h-14 rounded-full shadow-lg transition-all ${
          showScrollButton ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={scrollToTop}
      >
        <Wand2 className="h-6 w-6" />
      </Button>
    </div>
  );
}
