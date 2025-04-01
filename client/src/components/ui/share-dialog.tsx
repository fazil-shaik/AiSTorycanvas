import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Twitter, Linkedin, Copy, Check, Mail } from "lucide-react";
import { FaReddit } from "react-icons/fa";
import { useToast } from "@/hooks/use-toast";

interface ShareDialogProps {
  title: string;
  url: string;
  summary?: string;
  isPublic?: boolean;
}

export function ShareDialog({ title, url, summary, isPublic = true }: ShareDialogProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      
      toast({
        title: "Link Copied",
        description: "The story link has been copied to your clipboard.",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy link. Please try again.",
        variant: "destructive",
      });
    }
  };

  const shareText = encodeURIComponent(`Check out this story: ${title}`);
  const shareUrl = encodeURIComponent(url);
  const shareSummary = summary ? encodeURIComponent(summary) : "";

  if (!isPublic) {
    return (
      <Button 
        variant="ghost"
        className="bg-white/10 hover:bg-white/20 text-white/50 cursor-not-allowed"
        disabled={true}
        title="Make story public to enable sharing"
      >
        <Share2 className="h-4 w-4 mr-2" />
        Share
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="ghost"
          className="bg-white/10 hover:bg-white/20 text-white"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Story</DialogTitle>
          <DialogDescription>
            Share this story with your friends and followers on social media.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-4 gap-4 py-4">
          <a 
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
          >
            <Facebook className="h-6 w-6 mb-1" />
            <span className="text-xs">Facebook</span>
          </a>
          <a 
            href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-sky-500 hover:bg-sky-600 text-white transition-colors"
          >
            <Twitter className="h-6 w-6 mb-1" />
            <span className="text-xs">Twitter</span>
          </a>
          <a 
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}&summary=${shareSummary}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-blue-700 hover:bg-blue-800 text-white transition-colors"
          >
            <Linkedin className="h-6 w-6 mb-1" />
            <span className="text-xs">LinkedIn</span>
          </a>
          <a 
            href={`https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors"
          >
            <FaReddit className="h-6 w-6 mb-1" />
            <span className="text-xs">Reddit</span>
          </a>
          <a 
            href={`mailto:?subject=${shareText}&body=${shareSummary}%0A%0A${shareUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-600 hover:bg-gray-700 text-white transition-colors"
          >
            <Mail className="h-6 w-6 mb-1" />
            <span className="text-xs">Email</span>
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <div className="flex items-center justify-between rounded-md border px-3 py-2">
              <span className="text-sm text-gray-500 truncate">{url}</span>
              <Button 
                type="button" 
                variant="ghost" 
                className="px-2" 
                onClick={handleCopy}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}