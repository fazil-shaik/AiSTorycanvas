import { Share, Users, TrendingUp, Megaphone } from "lucide-react";

export default function AudienceGrowth() {
  return (
    <section className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-['Poppins'] font-bold text-3xl md:text-4xl mb-4 text-center">Audience Growth Strategy</h2>
        <p className="text-white/70 max-w-2xl mx-auto text-center text-lg mb-12">
          Our comprehensive plan to attract and retain a large audience of storytellers and readers.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="glass-panel rounded-xl overflow-hidden h-[400px] flex items-center justify-center">
            <div className="p-8 text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-4">
                <TrendingUp className="h-10 w-10 text-primary" />
              </div>
              <h3 className="font-['Poppins'] font-semibold text-2xl mb-2">Growth Strategy</h3>
              <p className="text-white/70">
                Visualizing our comprehensive approach to attracting and retaining storytellers and readers.
              </p>
            </div>
          </div>
          
          <div>
            <div className="space-y-8">
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mr-4">
                  <Share className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-xl mb-2">Social Media Integration</h3>
                  <p className="text-white/70">
                    Seamless sharing to popular platforms with visually appealing story cards that drive engagement and new user acquisition.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mr-4">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-xl mb-2">Community Building</h3>
                  <p className="text-white/70">
                    Creating an engaged community through comments, ratings, and collaborative storytelling features that foster user retention.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mr-4">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-xl mb-2">Analytics & Personalization</h3>
                  <p className="text-white/70">
                    Leveraging user data to provide personalized story recommendations and continually improve the AI generation algorithms.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white mr-4">
                  <Megaphone className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-['Poppins'] font-semibold text-xl mb-2">Content Marketing</h3>
                  <p className="text-white/70">
                    Regularly publishing featured stories and behind-the-scenes looks at the AI creation process to attract content creators and storytelling enthusiasts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-16 glass-panel p-8 rounded-2xl">
          <h3 className="font-['Poppins'] font-semibold text-2xl mb-6 text-center">Growth Roadmap</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 bg-white/5 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/20 to-primary/40 flex items-center justify-center text-white mb-4">
                <span className="font-['Poppins'] font-bold text-xl">1</span>
              </div>
              <h4 className="font-['Poppins'] font-semibold text-lg mb-2">Launch Phase</h4>
              <p className="text-white/70 text-sm">
                Initial platform release with core features and limited-time free premium access to drive early adoption.
              </p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/30 to-primary/50 flex items-center justify-center text-white mb-4">
                <span className="font-['Poppins'] font-bold text-xl">2</span>
              </div>
              <h4 className="font-['Poppins'] font-semibold text-lg mb-2">Community Phase</h4>
              <p className="text-white/70 text-sm">
                Building active user groups, implementing feedback, and introducing sharing incentives to promote growth.
              </p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/40 to-primary/60 flex items-center justify-center text-white mb-4">
                <span className="font-['Poppins'] font-bold text-xl">3</span>
              </div>
              <h4 className="font-['Poppins'] font-semibold text-lg mb-2">Expansion Phase</h4>
              <p className="text-white/70 text-sm">
                Adding advanced features, multiple languages, and partnerships with educational institutions and publishers.
              </p>
            </div>
            
            <div className="p-6 bg-white/5 rounded-xl text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary/50 to-primary/80 flex items-center justify-center text-white mb-4">
                <span className="font-['Poppins'] font-bold text-xl">4</span>
              </div>
              <h4 className="font-['Poppins'] font-semibold text-lg mb-2">Monetization Phase</h4>
              <p className="text-white/70 text-sm">
                Introducing premium subscription models, exclusive content, and API access for developers while maintaining a freemium core.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
