
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Check, MessageCircle, Star, Video } from "lucide-react";
import StudentSidebar from "@/components/StudentSidebar";
import SearchFilters from "@/components/SearchFilters";

// Define types for the filter state
interface FilterState {
  subject: string;
  priceRange: [number, number];
  availability: string;
  rating: number;
  experience: string;
  searchQuery: string;
}

// Define props for SearchFilters component
interface FilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

// Mock tutor data
const tutors = [
  {
    id: 1,
    name: "Dr. Michael Smith",
    avatar: "https://i.pravatar.cc/150?img=35",
    rating: 4.9,
    reviews: 127,
    subject: "Mathematics",
    specialization: "Calculus, Linear Algebra",
    hourlyRate: 45,
    education: "Ph.D. in Mathematics, Stanford University",
    bio: "Experienced math tutor with 10+ years of teaching at university level. I specialize in making complex concepts easy to understand.",
    availability: "Weekdays evenings, Weekends",
    badges: ["Top Rated", "Quick Responder"],
    isOnline: true,
  },
  {
    id: 2,
    name: "Prof. Emily Chen",
    avatar: "https://i.pravatar.cc/150?img=45",
    rating: 4.8,
    reviews: 98,
    subject: "English Literature",
    specialization: "Shakespeare, Creative Writing",
    hourlyRate: 40,
    education: "M.A. in English Literature, Yale University",
    bio: "Passionate about literature and helping students improve their writing skills. I've published several papers on modern literature.",
    availability: "Flexible schedule",
    badges: ["English Expert"],
    isOnline: false,
  },
  {
    id: 3,
    name: "Dr. James Lee",
    avatar: "https://i.pravatar.cc/150?img=68",
    rating: 4.7,
    reviews: 156,
    subject: "Chemistry",
    specialization: "Organic Chemistry, Biochemistry",
    hourlyRate: 50,
    education: "Ph.D. in Chemistry, MIT",
    bio: "Chemistry professor with a knack for explaining complex reactions. I've helped hundreds of students excel in their chemistry courses.",
    availability: "Weekends, Thursday afternoons",
    badges: ["Science Expert", "Top Rated"],
    isOnline: true,
  },
  {
    id: 4,
    name: "Prof. Lisa Johnson",
    avatar: "https://i.pravatar.cc/150?img=20",
    rating: 4.9,
    reviews: 210,
    subject: "Biology",
    specialization: "Molecular Biology, Genetics",
    hourlyRate: 48,
    education: "Ph.D. in Molecular Biology, Harvard University",
    bio: "I make biology fun and engaging! With my visual teaching style, complex concepts become easy to understand and remember.",
    availability: "Monday-Friday, afternoons",
    badges: ["Science Expert", "Quick Responder"],
    isOnline: false,
  },
];

const FindTutorsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    subject: "all",
    priceRange: [20, 100],
    availability: "all",
    rating: 4,
    experience: "all",
    searchQuery: "",
  });

  // Handler for filter changes
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <StudentSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <main className="py-8 px-6 max-w-7xl mx-auto w-full">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Find Tutors</h1>
            <p className="text-muted-foreground">Discover expert tutors for any subject or topic</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Search and Filters */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <Label htmlFor="search" className="text-base font-medium">Search Tutors</Label>
                    <Input 
                      id="search" 
                      placeholder="Search by name or subject..." 
                      className="mt-1"
                      value={filters.searchQuery}
                      onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
                    />
                  </div>
                  
                  <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
                </CardContent>
              </Card>
            </div>
            
            {/* Tutor List */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="grid">
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">
                    Showing <span className="font-medium">{tutors.length}</span> tutors
                  </div>
                  <TabsList>
                    <TabsTrigger value="grid">Grid</TabsTrigger>
                    <TabsTrigger value="list">List</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutors.map((tutor) => (
                      <Card key={tutor.id} className="overflow-hidden">
                        <CardContent className="p-0">
                          <div className="relative">
                            <div className={cn(
                              "w-3 h-3 rounded-full absolute top-3 right-3",
                              tutor.isOnline ? "bg-green-500" : "bg-gray-300"
                            )} />
                            <div className="p-6 pb-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16 border-2 border-white">
                                  <AvatarImage src={tutor.avatar} alt={tutor.name} />
                                  <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-semibold text-lg leading-tight mb-1">{tutor.name}</h3>
                                  <p className="text-sm text-muted-foreground">{tutor.subject} Tutor</p>
                                  <div className="flex items-center mt-1">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                    <span className="text-sm font-medium">{tutor.rating}</span>
                                    <span className="text-xs text-muted-foreground ml-1">({tutor.reviews} reviews)</span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="text-sm font-medium">Specialization</span>
                                  <span className="text-sm">{tutor.specialization}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm font-medium">Hourly Rate</span>
                                  <span className="text-sm font-bold">${tutor.hourlyRate}/hr</span>
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mt-3">
                                {tutor.badges.map((badge) => (
                                  <Badge key={badge} variant="secondary" className="text-xs">
                                    <Check className="h-3 w-3 mr-1" />
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="border-t px-6 py-3 flex justify-between">
                              <Button variant="ghost" size="sm" className="h-8 px-2">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm" className="h-8 px-3">
                                <Video className="h-4 w-4 mr-1" />
                                Book Session
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="list" className="mt-0 space-y-4">
                  {tutors.map((tutor) => (
                    <Card key={tutor.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="flex items-start gap-4">
                            <Avatar className="h-16 w-16 border-2 border-white">
                              <AvatarImage src={tutor.avatar} alt={tutor.name} />
                              <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-lg">{tutor.name}</h3>
                                {tutor.isOnline && <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Online</Badge>}
                              </div>
                              <p className="text-sm text-muted-foreground">{tutor.subject} Tutor</p>
                              <div className="flex items-center mt-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">{tutor.rating}</span>
                                <span className="text-xs text-muted-foreground ml-1">({tutor.reviews} reviews)</span>
                              </div>
                              <div className="text-sm mt-1 font-medium">${tutor.hourlyRate}/hr</div>
                            </div>
                          </div>
                          
                          <div className="flex-grow">
                            <p className="text-sm mb-2">{tutor.bio}</p>
                            <div className="text-xs text-muted-foreground mb-3">
                              <span className="font-medium">Education:</span> {tutor.education}
                            </div>
                            
                            <div className="flex flex-wrap gap-1">
                              {tutor.badges.map((badge) => (
                                <Badge key={badge} variant="secondary" className="text-xs">
                                  <Check className="h-3 w-3 mr-1" />
                                  {badge}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col justify-between md:items-end gap-2">
                            <div className="text-sm">
                              <span className="font-medium block mb-1">Available:</span>
                              <span className="text-muted-foreground">{tutor.availability}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm">
                                <MessageCircle className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm">
                                <Video className="h-4 w-4 mr-1" />
                                Book
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FindTutorsPage;
