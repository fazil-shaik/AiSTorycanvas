import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Brain, 
  Code, 
  Cpu, 
  Lock, 
  Sparkles, 
  Users, 
  Wand2, 
  BookOpen,
  MessageCircle,
  Layers,
  Share2,
  HeartHandshake,
  Box
} from "lucide-react";

function Logo3DPlaceholder() {
  return (
    <div className="w-full h-full flex items-center justify-center perspective-1000">
      <div className="relative animate-float">
        <h2 
          className="font-['Orbitron'] text-5xl md:text-6xl text-center font-bold 
                    bg-clip-text text-transparent bg-gradient-to-br from-primary to-secondary 
                    animate-pulse-slow transform rotate-3d"
        >
          StoryVerse
        </h2>
        <div className="absolute -z-10 -inset-4 blur-xl bg-gradient-to-r from-primary/40 to-secondary/40 opacity-70 animate-pulse-slow" />
      </div>
    </div>
  );
}

interface TeamMemberProps {
  name: string;
  role: string;
  avatar: string;
}

function TeamMember({ name, role, avatar }: TeamMemberProps) {
  return (
    <div className="glass-panel p-6 rounded-xl text-center">
      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xl font-bold text-white">
          {name.split(' ').map((n: string) => n[0]).join('')}
        </div>
      </div>
      <h3 className="font-['Poppins'] font-semibold text-lg mb-1">{name}</h3>
      <p className="text-white/70 text-sm">{role}</p>
    </div>
  );
}

interface TechItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function TechItem({ icon, title, description }: TechItemProps) {
  return (
    <div className="flex">
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mr-4">
        {icon}
      </div>
      <div>
        <h3 className="font-['Poppins'] font-semibold text-lg mb-1">{title}</h3>
        <p className="text-white/70 text-sm">{description}</p>
      </div>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl">
      <div className="w-14 h-14 mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="font-['Poppins'] font-semibold text-xl mb-2">{title}</h3>
      <p className="text-white/70">{description}</p>
    </div>
  );
}

export default function About() {
  return (
    <div>
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-['Poppins'] font-bold text-4xl md:text-5xl mb-4">About StoryVerse</h1>
            <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
              Revolutionizing storytelling with artificial intelligence and immersive experiences.
            </p>
          </div>
          
          <div className="h-[300px] mb-12">
            <Logo3DPlaceholder />
          </div>
          
          <div className="glass-panel p-8 rounded-xl mb-12">
            <div className="md:grid md:grid-cols-2 md:gap-12 items-center">
              <div>
                <h2 className="font-['Poppins'] font-bold text-2xl md:text-3xl mb-4">Our Mission</h2>
                <p className="text-white/80 mb-4">
                  At StoryVerse, we're on a mission to democratize storytelling and make it accessible to everyone. 
                  We believe that everyone has stories to tell, and our AI-powered platform removes the barriers 
                  of writer's block and technical limitations.
                </p>
                <p className="text-white/80 mb-4">
                  Our cutting-edge technology combines artificial intelligence with immersive visualization to 
                  transform simple ideas into captivating narratives that engage readers on multiple sensory levels.
                </p>
                <p className="text-white/80">
                  We're building a global community of storytellers and readers who can share experiences, cultures, 
                  and imaginations across borders and languages.
                </p>
              </div>
              <div className="mt-8 md:mt-0">
                <div className="glass-panel p-6 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20">
                  <h3 className="font-['Poppins'] font-semibold text-xl mb-4 text-center">Our Vision</h3>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Sparkles className="h-5 w-5 text-secondary mr-2" />
                        <span className="font-medium">Unlimited Creativity</span>
                      </div>
                      <p className="text-white/70 text-sm">
                        A world where anyone can turn their ideas into captivating stories.
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <HeartHandshake className="h-5 w-5 text-secondary mr-2" />
                        <span className="font-medium">Cultural Exchange</span>
                      </div>
                      <p className="text-white/70 text-sm">
                        Bridging cultural gaps through shared stories and experiences.
                      </p>
                    </div>
                    <div className="bg-white/5 p-4 rounded-lg">
                      <div className="flex items-center mb-2">
                        <Layers className="h-5 w-5 text-secondary mr-2" />
                        <span className="font-medium">Immersive Narratives</span>
                      </div>
                      <p className="text-white/70 text-sm">
                        Evolving storytelling into multi-sensory experiences with cutting-edge technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Poppins'] font-bold text-3xl mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ValueCard 
              icon={<Wand2 className="h-6 w-6" />}
              title="Creativity Without Limits"
              description="We believe in enabling unlimited creative expression for everyone, regardless of writing experience."
            />
            
            <ValueCard 
              icon={<MessageCircle className="h-6 w-6" />}
              title="Inclusive Storytelling"
              description="Stories should reflect diverse perspectives and experiences from all cultures and backgrounds."
            />
            
            <ValueCard 
              icon={<Share2 className="h-6 w-6" />}
              title="Community Connection"
              description="Building meaningful connections through shared stories and collaborative creativity."
            />
            
            <ValueCard 
              icon={<Lock className="h-6 w-6" />}
              title="Ethical AI"
              description="Developing AI technology responsibly with transparency and strong content safeguards."
            />
            
            <ValueCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Educational Impact"
              description="Empowering learning through interactive storytelling that enhances literacy and imagination."
            />
            
            <ValueCard 
              icon={<Users className="h-6 w-6" />}
              title="User-Centered Design"
              description="Creating intuitive experiences that put users' creative needs at the center of our platform."
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Poppins'] font-bold text-3xl mb-12 text-center">Our Technology</h2>
          
          <div className="glass-panel p-8 rounded-xl">
            <div className="md:grid md:grid-cols-2 md:gap-12">
              <div className="space-y-8">
                <TechItem 
                  icon={<Brain className="h-5 w-5" />}
                  title="Advanced AI Generation"
                  description="Our AI models have been trained on diverse literary works to create unique, engaging, and coherent narratives based on minimal input."
                />
                
                <TechItem 
                  icon={<Box className="h-5 w-5" />}
                  title="Immersive Environments"
                  description="Beautiful animations and visual effects power our interactive visualizations, bringing stories to life in an engaging way."
                />
                
                <TechItem 
                  icon={<Sparkles className="h-5 w-5" />}
                  title="Real-time Rendering"
                  description="Dynamic story elements are rendered in real-time, creating a responsive and engaging reading experience."
                />
                
                <TechItem 
                  icon={<Cpu className="h-5 w-5" />}
                  title="Cross-platform Architecture"
                  description="Our system is built to work seamlessly across devices, from mobile phones to desktop computers."
                />
              </div>
              
              <div className="mt-8 md:mt-0">
                <div className="relative h-full min-h-[300px] rounded-lg overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                    <div className="text-center max-w-xs p-6">
                      <div className="w-20 h-20 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-4">
                        <Code className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-['Poppins'] font-semibold text-xl mb-2">Built With Modern Stack</h3>
                      <p className="text-white/70 text-sm">
                        React, Node.js, and advanced AI capabilities come together to create a seamless storytelling experience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-dark/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-['Poppins'] font-bold text-3xl mb-12 text-center">Our Team</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <TeamMember 
              name="Alex Morgan"
              role="Founder & AI Lead"
              avatar=""
            />
            
            <TeamMember 
              name="Samantha Lee"
              role="Creative Director"
              avatar=""
            />
            
            <TeamMember 
              name="David Chen"
              role="Visualization Lead"
              avatar=""
            />
            
            <TeamMember 
              name="Maya Patel"
              role="UX/UI Designer"
              avatar=""
            />
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-['Poppins'] font-bold text-3xl mb-6">Ready to Start Your Journey?</h2>
          <p className="text-white/80 text-lg mb-8">
            Join thousands of storytellers and readers in the StoryVerse community and unlock the power of AI-generated narratives.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-white transition-all">
                Create Your Story
              </Button>
            </Link>
            <Link href="/explore">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white">
                Explore Stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}