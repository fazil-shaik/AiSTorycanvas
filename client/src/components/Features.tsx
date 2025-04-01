import { Brain, Box, Mic, Palette, Share2, Smartphone } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="glass-panel p-6 rounded-xl transition-all hover:shadow-lg hover:shadow-primary/20">
      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="font-['Poppins'] font-semibold text-xl mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
}

export default function Features() {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI Story Generation",
      description: "Advanced AI algorithms create unique, engaging stories based on your preferences and inputs."
    },
    {
      icon: <Box className="h-6 w-6" />,
      title: "3D Visualization",
      description: "See your stories come to life with immersive 3D animations and interactive environments."
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: "Voice Narration",
      description: "Listen to your stories with high-quality text-to-speech narration in multiple voices and accents."
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Customization",
      description: "Personalize characters, settings, and plot elements to create stories that match your vision."
    },
    {
      icon: <Share2 className="h-6 w-6" />,
      title: "Easy Sharing",
      description: "Share your stories instantly across social media or save them for later enjoyment."
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Cross-Platform",
      description: "Enjoy StoryVerse on any device with a fully responsive design optimized for mobile and desktop."
    }
  ];

  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8 bg-dark/50">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-4">Craft Your Perfect Story</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-lg">
          Choose from multiple themes, customize characters, and watch your story come to life with stunning 3D visuals and narration.
        </p>
      </div>
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Feature
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
