import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="relative z-10 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="orb w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full opacity-80"></div>
              <h2 className="font-['Orbitron'] text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                StoryVerse
              </h2>
            </div>
            <p className="text-white/70 mb-4">
              Immersive AI-powered storytelling platform bringing your imagination to life with stunning 3D visuals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <path d="M17.5 6.5h.01" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-5 h-5"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <path d="m9.75 15.02 5.75-3.27-5.75-3.27v6.54Z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-['Poppins'] font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="text-white/70 hover:text-white transition-colors">Home</a></Link></li>
              <li><Link href="/explore"><a className="text-white/70 hover:text-white transition-colors">Explore Stories</a></Link></li>
              <li><Link href="/about"><a className="text-white/70 hover:text-white transition-colors">How It Works</a></Link></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Pricing</a></li>
              <li><Link href="/about"><a className="text-white/70 hover:text-white transition-colors">About Us</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Poppins'] font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Tutorials</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-['Poppins'] font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">Copyright Notice</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors">GDPR Compliance</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} StoryVerse. All rights reserved.
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-white/50 text-sm">Made with</span>
              <svg 
                className="text-secondary h-4 w-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span className="text-white/50 text-sm">and AI-powered imagination</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
