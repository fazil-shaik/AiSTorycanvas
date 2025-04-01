import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "./button";
import { Slider } from "./slider";

interface AudioPlayerProps {
  audioSrc: string;
  onEnded?: () => void;
}

export function AudioPlayer({ audioSrc, onEnded }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    
    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };
    
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onEnded) {
        onEnded();
      }
    };
    
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  
  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  const handleProgressChange = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };
  
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      setIsMuted(false);
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  
  return (
    <div className="flex flex-col p-3 glass-panel rounded-lg">
      <audio ref={audioRef} src={audioSrc} />
      
      <div className="flex items-center space-x-4 mb-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10"
          onClick={togglePlayPause}
        >
          {isPlaying ? <Pause size={18} /> : <Play size={18} />}
        </Button>
        
        <div className="flex-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleProgressChange}
            className="cursor-pointer"
          />
        </div>
        
        <div className="text-xs text-white/70 w-16 text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/10"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </Button>
        
        <div className="w-20">
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
