import { useState, useEffect, createContext, useContext } from "react";

// Create a context for managing transitions
const TransitionContext = createContext({
  startTransition: (callback?: () => void) => {},
});

// Export a hook to use the transition
export const useTransition = () => useContext(TransitionContext);

// Create a div with CSS for the transition and add it to the document
export function createThemeContext() {
  // Add CSS for transitions to document
  const style = document.createElement('style');
  style.textContent = `
    .scene-transition {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(145deg, #5D3FD3 0%, #4158D0 50%, #6A82FB 100%);
      z-index: 100;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.4s ease;
    }
    
    .scene-transition.active {
      opacity: 1;
      pointer-events: all;
    }
    
    .floating-button {
      backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
      transition: all 0.3s ease;
    }
    
    .floating-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 40px rgba(93, 63, 211, 0.4);
    }
    
    .glass-panel {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(15px);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 15px;
    }
    
    .orb {
      background: radial-gradient(circle at 30% 30%, rgba(93, 63, 211, 0.8), rgba(93, 63, 211, 0));
      border-radius: 50%;
      filter: blur(20px);
    }
    
    .story-card {
      transform-style: preserve-3d;
      transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .progress-bar-container {
      height: 6px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 3px;
      overflow: hidden;
    }
    
    .progress-bar {
      height: 100%;
      background: linear-gradient(145deg, #00CED1 0%, #0099AA 100%);
      width: 0%;
      transition: width 0.3s ease;
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-10px); }
    }
    
    .animate-float {
      animation: float 6s ease-in-out infinite;
    }
    
    .animate-pulse-slow {
      animation: pulse 4s ease-in-out infinite;
    }
    
    .animate-spin-slow {
      animation: spin 8s linear infinite;
    }
  `;
  document.head.appendChild(style);
}

export default function SceneTransition() {
  const [isActive, setIsActive] = useState(false);
  const [callback, setCallback] = useState<(() => void) | null>(null);
  
  const startTransition = (onComplete?: () => void) => {
    setIsActive(true);
    if (onComplete) {
      setCallback(() => onComplete);
    }
  };
  
  useEffect(() => {
    if (isActive) {
      const timeout = setTimeout(() => {
        if (callback) {
          callback();
          setCallback(null);
        }
        setIsActive(false);
      }, 800);
      
      return () => clearTimeout(timeout);
    }
  }, [isActive, callback]);
  
  return (
    <>
      <TransitionContext.Provider value={{ startTransition }}>
        <div className={`scene-transition ${isActive ? 'active' : ''}`}></div>
      </TransitionContext.Provider>
    </>
  );
}
