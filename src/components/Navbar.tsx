
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-background/80 backdrop-blur-lg shadow-md' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-xl md:text-2xl font-bold text-primary animate-pulse-slow">
            TutorMatch
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/features" className="text-foreground hover:text-primary transition-colors">
            Features
          </Link>
          <a href="/#how-it-works" className="text-foreground hover:text-primary transition-colors">
            How It Works
          </a>
          <Link to="/plans" className="text-foreground hover:text-primary transition-colors">
            Pricing
          </Link>
          <Link to="/tutors" className="text-foreground hover:text-primary transition-colors">
            Find Tutors
          </Link>
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="outline" className="rounded-full border-primary text-primary hover:text-primary-foreground hover:bg-primary" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button className="rounded-full bg-primary hover:bg-primary/90 text-white" asChild>
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg p-4 shadow-lg animate-fade-down">
            <nav className="flex flex-col space-y-4 py-4">
              <Link to="/features" className="text-foreground hover:text-primary transition-colors px-4 py-2">
                Features
              </Link>
              <a href="/#how-it-works" className="text-foreground hover:text-primary transition-colors px-4 py-2">
                How It Works
              </a>
              <Link to="/plans" className="text-foreground hover:text-primary transition-colors px-4 py-2">
                Pricing
              </Link>
              <Link to="/tutors" className="text-foreground hover:text-primary transition-colors px-4 py-2">
                Find Tutors
              </Link>
              <hr className="border-border" />
              <div className="flex flex-col space-y-3 pt-2">
                <Button variant="outline" className="rounded-full border-primary text-primary hover:text-primary-foreground hover:bg-primary w-full" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
                <Button className="rounded-full bg-primary hover:bg-primary/90 text-white w-full" asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
