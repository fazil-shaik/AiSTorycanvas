import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "wouter";

// Temporary placeholder for 3D elements
function StoryCardPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="absolute animate-float -top-6 -left-6 w-32 h-40 rounded-lg bg-gradient-to-br from-primary/60 to-secondary/60 transform rotate-6"></div>
        <div className="absolute animate-float top-4 -right-8 w-32 h-40 rounded-lg bg-gradient-to-br from-secondary/60 to-primary/60 transform -rotate-12"></div>
        <div className="relative animate-pulse-slow w-60 h-72 rounded-lg glass-panel flex items-center justify-center bg-gradient-to-br from-primary/30 to-secondary/30">
          <div className="text-center p-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-3">
              <svg className="w-8 h-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-['Orbitron'] text-lg font-bold text-white mb-1">StoryVerse</h3>
            <p className="text-white/70 text-sm">AI-Powered Stories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Temporary placeholder until we can install Three.js dependencies

export default function Hero() {
  return (
    <section className="relative z-10 pt-12 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          <div className="mb-12 lg:mb-0">
            <h1 className="font-['Poppins'] font-bold text-4xl md:text-5xl lg:text-6xl mb-4 leading-tight">
              <span className="block">Immersive Stories</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Created by AI</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-8 max-w-lg">
              Step into a world where your imagination meets artificial intelligence. Experience unique stories generated just for you, brought to life with stunning 3D visuals.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/explore">
                <Button 
                  size="lg"
                  className="floating-button bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all text-lg"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Button 
                size="lg"
                variant="outline"
                className="floating-button bg-white/10 hover:bg-white/20 text-white transition-all text-lg"
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
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                How It Works
              </Button>
            </div>
            
            <div className="mt-8 flex items-center">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-dark bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">JD</div>
                <div className="w-10 h-10 rounded-full border-2 border-dark bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white text-xs font-bold">AS</div>
                <div className="w-10 h-10 rounded-full border-2 border-dark bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center text-white text-xs font-bold">TK</div>
              </div>
              <div className="ml-4">
                <p className="text-white font-medium">Join 50,000+ storytellers</p>
                <div className="flex items-center mt-1">
                  <div className="flex text-amber-400">
                    <svg 
                      className="h-4 w-4 fill-current" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg 
                      className="h-4 w-4 fill-current" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg 
                      className="h-4 w-4 fill-current" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg 
                      className="h-4 w-4 fill-current" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <svg 
                      className="h-4 w-4 fill-current" 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  </div>
                  <span className="ml-2 text-white/70">4.8/5 (2.3k reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative w-full h-[400px] lg:h-[500px]">
            <StoryCardPlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
}
