import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Subscribed!",
        description: "You have successfully joined our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-dark/50">
      <div className="max-w-3xl mx-auto text-center">
        <div className="orb w-20 h-20 mx-auto mb-8 animate-pulse-slow bg-gradient-to-br from-primary to-secondary rounded-full opacity-70"></div>
        <h2 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-4">Join the StoryVerse Community</h2>
        <p className="text-white/70 text-lg mb-8">
          Subscribe to our newsletter for early access, exclusive stories, and updates on new features.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-6">
          <Input
            type="email"
            required
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow bg-white/10 border-white/20 text-white focus:ring-primary focus:border-primary"
          />
          <Button 
            type="submit"
            disabled={isSubmitting}
            className="floating-button bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all text-lg"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subscribing...
              </>
            ) : (
              "Subscribe"
            )}
          </Button>
        </form>
        
        <p className="text-white/50 text-sm">We respect your privacy. Unsubscribe at any time.</p>
      </div>
    </section>
  );
}
