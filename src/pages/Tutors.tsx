
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Star, Search, BookOpen, GraduationCap, DollarSign } from "lucide-react";

const Tutors = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([30]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-accent/40 to-background"></div>
            <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-700/20 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 md:px-6 text-center">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-primary bg-primary/10 rounded-full animate-fade-down">
              OUR TUTORS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-down" style={{ animationDelay: "0.1s" }}>
              Find Your <span className="text-gradient">Perfect Tutor</span> Match
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-fade-down" style={{ animationDelay: "0.2s" }}>
              Browse our extensive network of qualified tutors and find the perfect match for your learning needs.
            </p>
          </div>
        </section>
        
        {/* Search & Filter Section */}
        <section className="pb-12">
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass p-6 rounded-2xl mb-8 animate-fade-up">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="col-span-1 md:col-span-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search by subject, name, or keyword..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  </div>
                </div>
                
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="programming">Programming</SelectItem>
                      <SelectItem value="languages">Languages</SelectItem>
                      <SelectItem value="music">Music</SelectItem>
                      <SelectItem value="art">Art</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Button className="w-full">Search</Button>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Max Price: ${priceRange[0]}/hr</p>
                  <Slider
                    defaultValue={[30]}
                    max={100}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Experience Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (1-2 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (3-5 years)</SelectItem>
                      <SelectItem value="expert">Expert (5+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekdays">Weekdays</SelectItem>
                      <SelectItem value="evenings">Evenings</SelectItem>
                      <SelectItem value="weekends">Weekends</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 Stars</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tutors Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {tutorsData.map((tutor, index) => (
                <div
                  key={index}
                  className="glass rounded-2xl overflow-hidden flex flex-col h-full hover:shadow-lg transition-all hover:scale-105 duration-300 animate-fade-up"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="relative">
                    <img 
                      src={tutor.image} 
                      alt={tutor.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent py-2 px-4">
                      <div className="flex items-center text-white">
                        <span className="font-medium">{tutor.rating}</span>
                        <div className="flex items-center ml-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={12} 
                              className={i < Math.floor(tutor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-400"} 
                            />
                          ))}
                        </div>
                        <span className="text-xs ml-1">({tutor.reviews})</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-5 flex-grow">
                    <h3 className="text-lg font-semibold mb-1">{tutor.name}</h3>
                    <p className="text-primary text-sm mb-2">{tutor.subject}</p>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <GraduationCap size={14} className="mr-1.5" />
                      <span>{tutor.education}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <BookOpen size={14} className="mr-1.5" />
                      <span>{tutor.experience}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <DollarSign size={14} className="mr-1.5" />
                      <span>${tutor.hourlyRate}/hour</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                      {tutor.bio}
                    </p>
                  </div>
                  
                  <div className="p-5 pt-0">
                    <Button className="w-full rounded-full">View Profile</Button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex space-x-2">
                <Button variant="outline" className="w-10 h-10 p-0">1</Button>
                <Button variant="outline" className="w-10 h-10 p-0">2</Button>
                <Button variant="outline" className="w-10 h-10 p-0">3</Button>
                <span className="flex items-center px-2">...</span>
                <Button variant="outline" className="w-10 h-10 p-0">10</Button>
              </nav>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-purple-900/20 to-primary/20"></div>
          
          <div className="container mx-auto px-4 md:px-6">
            <div className="glass rounded-3xl p-8 md:p-12 text-center max-w-4xl mx-auto animate-fade-up">
              <h2 className="text-3xl font-bold mb-4">
                Can't Find the Right Tutor?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let us help you find the perfect match. Complete our tutoring questionnaire
                and we'll connect you with tutors that match your specific needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="rounded-full" asChild>
                  <a href="/match-me">Match Me with a Tutor</a>
                </Button>
                <Button variant="outline" size="lg" className="rounded-full" asChild>
                  <a href="/help">Get Help</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

// Mock tutors data
const tutorsData = [
  {
    name: "Dr. Rebecca Johnson",
    subject: "Mathematics & Physics",
    education: "Ph.D. in Applied Mathematics",
    experience: "12 years of teaching experience",
    hourlyRate: 45,
    rating: 4.9,
    reviews: 128,
    bio: "Specialized in making complex math concepts easy to understand. I focus on building strong foundations and critical thinking skills.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Michael Chen",
    subject: "Computer Science",
    education: "M.S. Computer Science",
    experience: "8 years of programming experience",
    hourlyRate: 40,
    rating: 4.8,
    reviews: 93,
    bio: "Expert in teaching programming languages, algorithms, and software development. I help students build real-world projects.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Sarah Williams",
    subject: "English Literature",
    education: "M.A. in English Literature",
    experience: "10 years of teaching experience",
    hourlyRate: 35,
    rating: 4.7,
    reviews: 112,
    bio: "Passionate about literature and helping students improve their writing skills, critical analysis, and creative expression.",
    image: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Prof. James Wilson",
    subject: "Chemistry",
    education: "Ph.D. in Chemistry",
    experience: "15 years in academia and research",
    hourlyRate: 50,
    rating: 4.9,
    reviews: 87,
    bio: "Former university professor with a passion for making chemistry accessible and interesting. Specializing in organic chemistry.",
    image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Emma Rodriguez",
    subject: "Spanish & French",
    education: "B.A. in Modern Languages",
    experience: "7 years of language teaching",
    hourlyRate: 30,
    rating: 4.6,
    reviews: 76,
    bio: "Native Spanish speaker with fluent French. I make language learning fun and practical through conversation and cultural immersion.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Dr. Ahmed Khan",
    subject: "Biology & Medicine",
    education: "M.D. with specialization in Pediatrics",
    experience: "10 years in medicine, 5 years teaching",
    hourlyRate: 55,
    rating: 4.9,
    reviews: 64,
    bio: "Medical doctor helping pre-med students and those interested in health sciences. Specializing in anatomy, physiology, and biochemistry.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Lisa Thompson",
    subject: "History & Political Science",
    education: "Ph.D. in History",
    experience: "9 years of university teaching",
    hourlyRate: 40,
    rating: 4.7,
    reviews: 58,
    bio: "Passionate about bringing historical events to life and helping students see connections between past and present political systems.",
    image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "David Martinez",
    subject: "Music Theory & Piano",
    education: "Conservatory trained pianist",
    experience: "12 years of teaching experience",
    hourlyRate: 45,
    rating: 4.8,
    reviews: 92,
    bio: "Professional pianist with experience teaching students of all ages and levels. Specializing in classical and jazz piano.",
    image: "https://images.unsplash.com/photo-1549057446-9f5c6ac91a04?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
  }
];

export default Tutors;
