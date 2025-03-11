
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-accent/40 to-background"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-down">
            FIND THE PERFECT HOME TUTOR
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 animate-fade-down" style={{ animationDelay: "0.1s" }}>
            Learn From The Best <span className="text-gradient">Home Tutors</span> In Your Area
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl animate-fade-down" style={{ animationDelay: "0.2s" }}>
            Connect with qualified and experienced tutors near you. Personalized learning, 
            better results, and complete flexibility - all at your fingertips.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl mb-12 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-muted-foreground" size={20} />
              <input 
                type="text" 
                placeholder="Search by subject, location, or tutor name..." 
                className="w-full pl-12 pr-32 py-4 rounded-full bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
              />
              <Button className="absolute right-1.5 rounded-full bg-primary hover:bg-primary/90 text-white px-6">
                Search
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-3 text-sm text-muted-foreground">
              <span className="px-2 py-1 bg-secondary/50 rounded-full">Mathematics</span>
              <span className="px-2 py-1 bg-secondary/50 rounded-full">Physics</span>
              <span className="px-2 py-1 bg-secondary/50 rounded-full">English</span>
              <span className="px-2 py-1 bg-secondary/50 rounded-full">Programming</span>
              <span className="px-2 py-1 bg-secondary/50 rounded-full">Science</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">10,000+</p>
              <p className="text-sm text-muted-foreground">Qualified Tutors</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">25,000+</p>
              <p className="text-sm text-muted-foreground">Happy Students</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">50+</p>
              <p className="text-sm text-muted-foreground">Subject Areas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">4.8/5</p>
              <p className="text-sm text-muted-foreground">Average Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
