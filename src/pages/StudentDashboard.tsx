
import { useState } from "react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, MapPin, Calendar, BookOpen, MessageSquare, Star, Heart, History, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const StudentDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      tutorName: "Sarah Johnson",
      subject: "Mathematics",
      date: "Tomorrow, 4:00 PM",
      imageUrl: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      tutorName: "David Chen",
      subject: "Physics",
      date: "Friday, 5:30 PM",
      imageUrl: "https://i.pravatar.cc/150?img=11"
    }
  ];
  
  // Mock data for recommended tutors
  const recommendedTutors = [
    {
      id: 1,
      name: "Michael Roberts",
      subject: "Chemistry",
      rating: 4.9,
      price: "$35/hr",
      distance: "1.2 miles away",
      imageUrl: "https://i.pravatar.cc/150?img=68"
    },
    {
      id: 2,
      name: "Emily Zhang",
      subject: "English Literature",
      rating: 4.8,
      price: "$30/hr",
      distance: "0.8 miles away",
      imageUrl: "https://i.pravatar.cc/150?img=47"
    },
    {
      id: 3,
      name: "James Wilson",
      subject: "Computer Science",
      rating: 4.7,
      price: "$40/hr",
      distance: "2.5 miles away",
      imageUrl: "https://i.pravatar.cc/150?img=12"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Alex!</h1>
          <p className="text-muted-foreground">Find tutors, manage your sessions, and track your learning progress.</p>
        </div>
        
        {/* Search Bar */}
        <div className="relative mb-8">
          <div className="flex gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                type="text"
                placeholder="Search for tutors, subjects or keywords..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="rounded-md">
              <MapPin size={18} className="mr-2" /> Near Me
            </Button>
          </div>
        </div>
        
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>Your scheduled tutoring sessions</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-sm">
                  View all <ChevronRight size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                        <img 
                          src={session.imageUrl} 
                          alt={session.tutorName}
                          className="w-12 h-12 rounded-full object-cover" 
                        />
                        <div className="flex-grow">
                          <h3 className="font-medium">{session.tutorName}</h3>
                          <p className="text-sm text-muted-foreground">{session.subject}</p>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar size={16} />
                          <span>{session.date}</span>
                        </div>
                        <Button size="sm">Join</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                    <h3 className="font-medium text-lg mb-1">No Upcoming Sessions</h3>
                    <p className="text-muted-foreground mb-4">You don't have any scheduled sessions yet.</p>
                    <Button>Find a Tutor</Button>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Recommended Tutors */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Recommended Tutors</CardTitle>
                  <CardDescription>Based on your learning preferences</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="gap-1 text-sm">
                  View all <ChevronRight size={16} />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedTutors.map((tutor) => (
                    <div key={tutor.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors">
                      <img 
                        src={tutor.imageUrl} 
                        alt={tutor.name}
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      <div className="flex-grow">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{tutor.name}</h3>
                          <div className="flex items-center text-yellow-500">
                            <Star size={14} className="fill-yellow-500" />
                            <span className="text-sm ml-1">{tutor.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{tutor.subject}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <Badge variant="outline" className="text-xs font-normal">
                            {tutor.price}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            <MapPin size={12} className="inline mr-1" />
                            {tutor.distance}
                          </span>
                        </div>
                      </div>
                      <Button>View Profile</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pt-2">
                <Button variant="outline">Browse More Tutors</Button>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  <Search className="mr-2" size={18} />
                  Find Tutors
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2" size={18} />
                  My Subjects
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="mr-2" size={18} />
                  Schedule Session
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="mr-2" size={18} />
                  Messages
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="mr-2" size={18} />
                  Favorite Tutors
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <History className="mr-2" size={18} />
                  Session History
                </Button>
              </CardContent>
            </Card>
            
            {/* Learning Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Learning Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Total Sessions</span>
                    <span className="font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Hours Learned</span>
                    <span className="font-medium">24.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Subjects</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Tutors Worked With</span>
                    <span className="font-medium">5</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default StudentDashboard;
