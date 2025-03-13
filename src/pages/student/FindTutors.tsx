
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Calendar, Star, MessageSquare, GraduationCap, Users, BookOpen, Clock } from "lucide-react";
import SearchFilters from "@/components/SearchFilters";

const FindTutorsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mock data for tutors
  const tutors = [
    {
      id: 1,
      name: "Dr. Robert Wilson",
      avatar: "https://i.pravatar.cc/150?img=60",
      subject: "Physics",
      specialization: "Quantum Mechanics, Theoretical Physics",
      rating: 4.9,
      reviews: 124,
      hourlyRate: 45,
      availability: "Mon, Wed, Fri",
      bio: "PhD in Physics with 10+ years teaching experience at university level. Specializes in making complex concepts easy to understand."
    },
    {
      id: 2,
      name: "Prof. Lisa Johnson",
      avatar: "https://i.pravatar.cc/150?img=20",
      subject: "Biology",
      specialization: "Molecular Biology, Genetics",
      rating: 4.8,
      reviews: 98,
      hourlyRate: 40,
      availability: "Tue, Thu, Sat",
      bio: "Professor with extensive research experience. Patient and methodical teaching style with focus on practical applications."
    },
    {
      id: 3,
      name: "Dr. James Lee",
      avatar: "https://i.pravatar.cc/150?img=68",
      subject: "Chemistry",
      specialization: "Organic Chemistry, Biochemistry",
      rating: 4.7,
      reviews: 87,
      hourlyRate: 42,
      availability: "Mon, Tue, Thu",
      bio: "PhD in Chemistry with industry and academic experience. Passionate about making science accessible to all students."
    },
    {
      id: 4,
      name: "Sarah Miller",
      avatar: "https://i.pravatar.cc/150?img=34",
      subject: "Mathematics",
      specialization: "Calculus, Linear Algebra, Statistics",
      rating: 4.9,
      reviews: 156,
      hourlyRate: 38,
      availability: "Mon-Sat",
      bio: "Mathematics expert with a gift for explaining complex concepts in simple terms. Tailors teaching to individual learning styles."
    },
    {
      id: 5,
      name: "Prof. Michael Brown",
      avatar: "https://i.pravatar.cc/150?img=53",
      subject: "English Literature",
      specialization: "Shakespeare, Modern Literature, Essay Writing",
      rating: 4.6,
      reviews: 112,
      hourlyRate: 35,
      availability: "Wed, Fri, Sat",
      bio: "Literature professor with published works. Focuses on developing critical thinking and writing skills through literary analysis."
    },
    {
      id: 6,
      name: "Dr. Emily Chen",
      avatar: "https://i.pravatar.cc/150?img=45",
      subject: "Computer Science",
      specialization: "Programming, Data Structures, AI",
      rating: 4.8,
      reviews: 104,
      hourlyRate: 50,
      availability: "Tue, Thu, Sun",
      bio: "Computer Science PhD with Silicon Valley experience. Practical teaching approach with real-world programming challenges."
    }
  ];

  // Featured subjects
  const subjects = [
    { name: "Mathematics", count: 45, icon: BookOpen },
    { name: "Physics", count: 32, icon: GraduationCap },
    { name: "Chemistry", count: 28, icon: BookOpen },
    { name: "Biology", count: 35, icon: BookOpen },
    { name: "Computer Science", count: 40, icon: BookOpen },
    { name: "English", count: 42, icon: BookOpen },
    { name: "History", count: 25, icon: BookOpen },
    { name: "Economics", count: 20, icon: BookOpen }
  ];

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
            <p className="text-muted-foreground">Discover the perfect tutor for your learning needs</p>
          </div>

          {/* Search and Filter Section */}
          <div className="mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input 
                      placeholder="Search by subject, name, or keyword" 
                      className="pl-10"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button>
                      <Search className="mr-2 h-4 w-4" />
                      Search
                    </Button>
                    <Button variant="outline">
                      <Filter className="mr-2 h-4 w-4" />
                      Filters
                    </Button>
                  </div>
                </div>

                <SearchFilters />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tutor Listings */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="all">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="all">All Tutors</TabsTrigger>
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="popular">Popular</TabsTrigger>
                  </TabsList>
                  <div className="text-sm text-muted-foreground">
                    Showing {tutors.length} tutors
                  </div>
                </div>
                
                <TabsContent value="all" className="space-y-6">
                  {tutors.map(tutor => (
                    <Card key={tutor.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                          <Avatar className="h-24 w-24">
                            <AvatarImage src={tutor.avatar} />
                            <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-grow space-y-3 text-center md:text-left">
                            <div>
                              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                <h3 className="text-xl font-medium">{tutor.name}</h3>
                                <div className="flex items-center justify-center md:justify-end gap-1 mt-1 md:mt-0">
                                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                  <span className="font-medium">{tutor.rating}</span>
                                  <span className="text-muted-foreground">({tutor.reviews})</span>
                                </div>
                              </div>
                              <p className="text-primary font-medium">{tutor.subject} Tutor</p>
                              <p className="text-sm text-muted-foreground mt-1">{tutor.specialization}</p>
                            </div>
                            
                            <p className="text-sm">{tutor.bio}</p>
                            
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="flex items-center">
                                <Calendar className="mr-1 h-3 w-3" />
                                {tutor.availability}
                              </Badge>
                              <Badge variant="outline" className="flex items-center">
                                <Clock className="mr-1 h-3 w-3" />
                                ${tutor.hourlyRate}/hour
                              </Badge>
                            </div>
                          </div>
                          
                          <div className="flex sm:flex-col gap-2 w-full md:w-auto">
                            <Button className="w-full sm:w-auto">
                              <Calendar className="mr-2 h-4 w-4" />
                              Schedule
                            </Button>
                            <Button variant="outline" className="w-full sm:w-auto">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Message
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>
                
                <TabsContent value="recommended">
                  <Card>
                    <CardContent className="p-6">
                      <p>Personalized recommendations will appear here based on your learning profile and history.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="popular">
                  <Card>
                    <CardContent className="p-6">
                      <p>The most popular tutors on our platform will be shown here.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Featured Subjects */}
              <Card>
                <CardHeader>
                  <CardTitle>Featured Subjects</CardTitle>
                  <CardDescription>Browse tutors by subject area</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {subjects.map((subject, i) => (
                      <Button key={i} variant="outline" className="justify-start h-auto py-3">
                        <subject.icon className="mr-2 h-4 w-4" />
                        <div className="text-left">
                          <div className="font-medium">{subject.name}</div>
                          <div className="text-xs text-muted-foreground">{subject.count} tutors</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Platform Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Active Tutors</span>
                    </div>
                    <span className="font-medium">500+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Subjects</span>
                    </div>
                    <span className="font-medium">50+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Avg. Rating</span>
                    </div>
                    <span className="font-medium">4.8/5</span>
                  </div>
                </CardContent>
              </Card>
              
              {/* Need Help */}
              <Card>
                <CardHeader>
                  <CardTitle>Need Help?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">Not sure which tutor to choose? Our team can help match you with the perfect tutor.</p>
                  <Button className="w-full">Get Personalized Help</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FindTutorsPage;
