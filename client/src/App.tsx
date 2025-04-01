import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import StoryViewer from "@/pages/story-viewer";
import Library from "@/pages/library";
import Explore from "@/pages/explore";
import About from "@/pages/about";
import Background from "./components/Background";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SceneTransition from "./components/SceneTransition";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/story/:id" component={StoryViewer} />
      <Route path="/library" component={Library} />
      <Route path="/explore" component={Explore} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Background />
      <div className="relative z-10 min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow">
          <Router />
        </div>
        <Footer />
      </div>
      <SceneTransition />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
