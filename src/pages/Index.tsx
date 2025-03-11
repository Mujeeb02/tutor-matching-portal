
import { useState } from 'react';
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureCard from "@/components/FeatureCard";
import SearchFilters from "@/components/SearchFilters";
import TutorCard from "@/components/TutorCard";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Search,
  MapPin,
  Star,
  MessageSquare,
  Calendar,
  Filter,
  Clock,
  Video,
  CheckCircle2,
  Bookmark,
  Heart
} from "lucide-react";

// Mock data for tutors
const tutors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    rating: 4.9,
    reviewCount: 124,
    location: "New York, NY",
    subjects: ["Mathematics", "Physics", "Calculus"],
    hourlyRate: 45,
    experience: 8,
    available: true
  },
  {
    id: "2",
    name: "Prof. Michael Chen",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    rating: 4.7,
    reviewCount: 98,
    location: "Boston, MA",
    subjects: ["Computer Science", "Python", "Data Science"],
    hourlyRate: 50,
    experience: 6,
    available: false
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1922&auto=format&fit=crop",
    rating: 4.8,
    reviewCount: 87,
    location: "Chicago, IL",
    subjects: ["English", "Literature", "Writing"],
    hourlyRate: 40,
    experience: 5,
    available: true
  },
  {
    id: "4",
    name: "David Wilson",
    image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=1887&auto=format&fit=crop",
    rating: 4.6,
    reviewCount: 56,
    location: "Austin, TX",
    subjects: ["Chemistry", "Biology", "Science"],
    hourlyRate: 42,
    experience: 7,
    available: true
  },
  {
    id: "5",
    name: "Sophia Patel",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop",
    rating: 5.0,
    reviewCount: 41,
    location: "San Francisco, CA",
    subjects: ["Economics", "Business", "Statistics"],
    hourlyRate: 55,
    experience: 4,
    available: false
  },
  {
    id: "6",
    name: "James Williams",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop",
    rating: 4.5,
    reviewCount: 63,
    location: "Denver, CO",
    subjects: ["History", "Geography", "Social Studies"],
    hourlyRate: 38,
    experience: 9,
    available: true
  }
];

const Index = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-purple-700/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
              Why Choose <span className="text-gradient">TutorMatch</span>
            </h2>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              We make it easy to find the perfect tutor for your specific needs,
              with a seamless experience from search to session.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={Search}
              title="Find Nearby Tutors"
              description="Search for qualified tutors in your area based on subject, ratings, and availability."
              delay={0.1}
            />
            <FeatureCard 
              icon={Filter}
              title="Advanced Filtering"
              description="Filter tutors by experience, price range, and specialized subjects to find your perfect match."
              delay={0.2}
            />
            <FeatureCard 
              icon={Star}
              title="Verified Reviews"
              description="Read authentic reviews from other students to make informed decisions."
              delay={0.3}
            />
            <FeatureCard 
              icon={MessageSquare}
              title="Direct Communication"
              description="Message tutors directly to discuss your learning needs before booking."
              delay={0.4}
            />
            <FeatureCard 
              icon={Calendar}
              title="Easy Scheduling"
              description="Book sessions at times that work for you with our flexible scheduling system."
              delay={0.5}
            />
            <FeatureCard 
              icon={CheckCircle2}
              title="Quality Assurance"
              description="All tutors are verified for qualifications and experience before joining our platform."
              delay={0.6}
            />
          </div>
          
          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full animate-fade-up" style={{ animationDelay: "0.7s" }}>
              Explore All Features
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gradient-to-b from-background via-accent/5 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
              How <span className="text-gradient">TutorMatch</span> Works
            </h2>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              A simple process to connect with qualified tutors and start learning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-5">
                <Search size={24} className="text-primary" />
              </div>
              <div className="relative">
                <span className="absolute -top-10 right-0 text-6xl font-bold text-primary/10">1</span>
                <h3 className="text-xl font-semibold mb-3">Search & Filter</h3>
                <p className="text-muted-foreground">Find tutors based on subject, location, price, and availability that match your requirements.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-5">
                <MessageSquare size={24} className="text-primary" />
              </div>
              <div className="relative">
                <span className="absolute -top-10 right-0 text-6xl font-bold text-primary/10">2</span>
                <h3 className="text-xl font-semibold mb-3">Connect & Discuss</h3>
                <p className="text-muted-foreground">Message tutors to discuss your learning goals and confirm they're the right fit for you.</p>
              </div>
            </div>

            <div className="flex flex-col items-center text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-5">
                <Calendar size={24} className="text-primary" />
              </div>
              <div className="relative">
                <span className="absolute -top-10 right-0 text-6xl font-bold text-primary/10">3</span>
                <h3 className="text-xl font-semibold mb-3">Book & Learn</h3>
                <p className="text-muted-foreground">Schedule sessions at convenient times and start your personalized learning journey.</p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="rounded-full animate-fade-up" style={{ animationDelay: "0.5s" }}>
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Tutor Search Section */}
      <section id="tutors" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-96 -left-96 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-96 -right-96 w-[600px] h-[600px] bg-purple-700/5 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-up">
              Find Your Perfect <span className="text-gradient">Tutor</span>
            </h2>
            <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Browse our selection of qualified tutors and find the one who matches your learning style and needs.
            </p>
          </div>

          <SearchFilters onFilterChange={setFilters} />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tutors.map((tutor, index) => (
              <TutorCard 
                key={tutor.id} 
                {...tutor} 
                delay={0.1 * (index % 3)}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" className="rounded-full animate-fade-up">
              View All Tutors
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/20 to-primary/20"></div>
        
        <div className="container mx-auto px-4 md:px-6">
          <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of students who have found their perfect tutor match and improved their academic performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="rounded-full">
                Find a Tutor Now
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Become a Tutor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
