import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, Heart, Filter, MapPin, CheckCircle, BookOpen, ThumbsUp, Clock, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

// Define a tutor interface for type safety
interface Tutor {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  specialty: string[];
  rating: number;
  hourlyRate: number;
  location: string;
  distance: string;
  availability: string;
  experience: string;
  bio: string;
  verified: boolean;
  sessions: number;
  reviews: number;
}

// Tutor card component
const TutorCard = ({ tutor }: { tutor: Tutor }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 p-6 flex flex-col items-center text-center bg-secondary/30">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src={tutor.avatar} alt={tutor.name} />
            <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h3 className="font-semibold text-lg">{tutor.name}</h3>
          <p className="text-sm text-muted-foreground mb-2">{tutor.subject}</p>
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={i < Math.floor(tutor.rating) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}
                />
              ))}
            </div>
            <span className="text-sm ml-1">{tutor.rating}/5</span>
            <span className="text-xs text-muted-foreground ml-1">({tutor.reviews})</span>
          </div>
          {tutor.verified && (
            <Badge variant="outline" className="flex items-center gap-1 mb-2">
              <CheckCircle size={12} className="text-green-500" />
              Verified
            </Badge>
          )}
          <p className="text-lg font-medium text-primary">${tutor.hourlyRate}/hr</p>
        </div>
        
        <div className="md:w-2/3 p-6">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {tutor.specialty.map((spec, index) => (
                  <Badge key={index} variant="secondary">{spec}</Badge>
                ))}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin size={14} className="mr-1" />
                {tutor.location} ({tutor.distance})
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart size={20} className={isFavorite ? "fill-red-500 text-red-500" : ""} />
            </Button>
          </div>
          
          <p className="text-sm mb-4 line-clamp-3">{tutor.bio}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
            <div className="flex items-center">
              <BookOpen size={16} className="mr-2 text-muted-foreground" />
              <span>{tutor.experience}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-muted-foreground" />
              <span>{tutor.sessions} sessions</span>
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2 text-muted-foreground" />
              <span>{tutor.availability}</span>
            </div>
          </div>
          
          <div className="flex flex-col xs:flex-row gap-3">
            <Button className="w-full">View Profile</Button>
            <Button variant="outline" className="w-full">Book Session</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

// Main Find Tutors Page
const FindTutorsPage = () => {
  // Mock data for tutors
  const tutors: Tutor[] = [
    {
      id: 1,
      name: "Dr. Michael Smith",
      avatar: "https://i.pravatar.cc/150?img=35",
      subject: "Mathematics Expert",
      specialty: ["Calculus", "Algebra", "Statistics"],
      rating: 4.9,
      hourlyRate: 45,
      location: "New York, NY",
      distance: "Remote",
      availability: "Evenings, Weekends",
      experience: "10+ years",
      bio: "PhD in Mathematics with extensive teaching experience. I specialize in making complex mathematical concepts easy to understand. I've helped hundreds of students improve their grades and develop a love for math.",
      verified: true,
      sessions: 240,
      reviews: 187
    },
    {
      id: 2,
      name: "Prof. Emily Chen",
      avatar: "https://i.pravatar.cc/150?img=45",
      subject: "English Literature",
      specialty: ["Essay Writing", "Literary Analysis", "Creative Writing"],
      rating: 4.8,
      hourlyRate: 40,
      location: "Boston, MA",
      distance: "Remote",
      availability: "Weekdays, Weekends",
      experience: "8 years",
      bio: "Master's in English Literature from Harvard. I'm passionate about helping students improve their writing skills and develop critical thinking through literature. My teaching approach is interactive and tailored to each student's needs.",
      verified: true,
      sessions: 186,
      reviews: 142
    },
    {
      id: 3,
      name: "Dr. Robert Wilson",
      avatar: "https://i.pravatar.cc/150?img=60",
      subject: "Physics Expert",
      specialty: ["Mechanics", "Quantum Physics", "Electromagnetism"],
      rating: 4.9,
      hourlyRate: 50,
      location: "San Francisco, CA",
      distance: "Remote",
      availability: "Afternoons, Weekends",
      experience: "12 years",
      bio: "Physics PhD with research experience at CERN. I excel at breaking down complex physics concepts into understandable parts. I use real-world examples and interactive simulations to help students grasp difficult topics.",
      verified: true,
      sessions: 210,
      reviews: 195
    },
    {
      id: 4,
      name: "Lisa Johnson",
      avatar: "https://i.pravatar.cc/150?img=20",
      subject: "Biology Tutor",
      specialty: ["Molecular Biology", "Genetics", "Ecology"],
      rating: 4.7,
      hourlyRate: 35,
      location: "Chicago, IL",
      distance: "Remote",
      availability: "Flexible",
      experience: "5 years",
      bio: "Biology researcher with publications in top journals. I make biology engaging and relevant by connecting textbook concepts to current research and applications. My students consistently improve their test scores and scientific thinking.",
      verified: false,
      sessions: 120,
      reviews: 98
    }
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const tutorsPerPage = 4;

  const indexOfLastTutor = currentPage * tutorsPerPage;
  const indexOfFirstTutor = indexOfLastTutor - tutorsPerPage;
  const currentTutors = tutors.slice(indexOfFirstTutor, indexOfLastTutor);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Your Perfect Tutor</h1>
        <p className="text-muted-foreground">Browse our certified tutors and find the right match for your learning needs</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Search Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Subject Filter */}
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="physics">Physics</SelectItem>
                    <SelectItem value="chemistry">Chemistry</SelectItem>
                    <SelectItem value="biology">Biology</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="language">Languages</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Price Range */}
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Price Range ($/hour)</Label>
                  <span className="text-sm">$25 - $75</span>
                </div>
                <Slider defaultValue={[25, 75]} min={10} max={100} step={5} />
              </div>
              
              {/* Availability */}
              <div className="space-y-2">
                <Label>Availability</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weekdays" />
                    <label htmlFor="weekdays" className="text-sm">Weekdays</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="weekends" />
                    <label htmlFor="weekends" className="text-sm">Weekends</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="mornings" />
                    <label htmlFor="mornings" className="text-sm">Mornings</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="afternoons" />
                    <label htmlFor="afternoons" className="text-sm">Afternoons</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="evenings" />
                    <label htmlFor="evenings" className="text-sm">Evenings</label>
                  </div>
                </div>
              </div>
              
              {/* Rating */}
              <div className="space-y-2">
                <Label>Minimum Rating</Label>
                <Select defaultValue="4.5">
                  <SelectTrigger>
                    <SelectValue placeholder="Minimum rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Rating</SelectItem>
                    <SelectItem value="3.0">3.0+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                    <SelectItem value="4.0">4.0+</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Other filters */}
              <div className="space-y-2">
                <Label>More Filters</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="verified" />
                    <label htmlFor="verified" className="text-sm">Verified Tutors Only</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="instant" />
                    <label htmlFor="instant" className="text-sm">Instant Booking Available</label>
                  </div>
                </div>
              </div>
              
              <Button className="w-full">Apply Filters</Button>
              <Button variant="outline" className="w-full">Clear All</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Search & Sort Bar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search tutors by name, subject, or keyword..." className="pl-9" />
            </div>
            <div className="flex items-center gap-2">
              <Label htmlFor="sort" className="whitespace-nowrap">Sort by:</Label>
              <Select defaultValue="relevance">
                <SelectTrigger id="sort" className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Relevance</SelectItem>
                  <SelectItem value="rating-high">Highest Rating</SelectItem>
                  <SelectItem value="price-low">Lowest Price</SelectItem>
                  <SelectItem value="price-high">Highest Price</SelectItem>
                  <SelectItem value="most-reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Results */}
          <div className="space-y-6">
            {currentTutors.map(tutor => (
              <TutorCard key={tutor.id} tutor={tutor} />
            ))}
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" onClick={() => paginate(currentPage - 1)}/>
              </Button>
              {Array.from({ length: Math.ceil(tutors.length / tutorsPerPage) }, (_, i) => i + 1).map(pageNumber => (
                <Button
                  key={pageNumber}
                  variant={currentPage === pageNumber ? "outline" : "ghost"}
                  size="sm"
                  className={currentPage === pageNumber ? "bg-primary text-primary-foreground" : ""}
                  onClick={() => paginate(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ))}
              <Button variant="outline" size="icon" disabled={currentPage === Math.ceil(tutors.length / tutorsPerPage)}>
                <ChevronRight className="h-4 w-4" onClick={() => paginate(currentPage + 1)}/>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindTutorsPage;
