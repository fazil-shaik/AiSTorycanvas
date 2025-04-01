import { useEffect, useState } from "react";

export default function Background() {
  const [stars, setStars] = useState<Array<{
    id: number;
    top: string;
    left: string;
    size: string;
    opacity: number;
    animationDuration: string;
  }>>([]);
  
  useEffect(() => {
    // Create 100 stars with random positions and sizes
    const newStars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 0.2 + 0.1}rem`,
      opacity: Math.random() * 0.8 + 0.2,
      animationDuration: `${Math.random() * 50 + 20}s`,
    }));
    
    setStars(newStars);
  }, []);
  
  return (
    <div 
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}
    >
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full animate-twinkle"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            backgroundColor: '#ffffff',
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      {/* Nebula effect */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-purple-800 via-transparent to-indigo-900" />
      
      {/* Moving nebula cloud */}
      <div className="absolute inset-0 opacity-10 animate-float-slow bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHg9IjAiIHk9IjAiPjxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIuMDA3NSIgbnVtT2N0YXZlcz0iNSIgc3RpdGNoVGlsZXM9InN0aXRjaCIvPjxmZUNvbG9yTWF0cml4IHZhbHVlcz0iMSAwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAgMCAwIDAgMCAxIi8+PC9maWx0ZXI+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
      
      {/* Light source */}
      <div className="absolute top-1/3 left-1/2 w-96 h-96 rounded-full bg-gradient-radial from-purple-500/10 to-transparent transform -translate-x-1/2 -translate-y-1/2 blur-3xl" />
    </div>
  );
}
