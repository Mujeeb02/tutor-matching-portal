
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MessageSquare, 
  Star, 
  Clock, 
  BookOpen, 
  Calendar as CalendarIcon,
  BarChart2
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Types
interface Tutor {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  lastSession: string;
  nextSession: string | null;
  totalSessions: number;
  rating: number | null;
  progress: number;
}

// Components
const TutorCard = ({ tutor }: { tutor: Tutor }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="h-20 w-20">
            <AvatarImage src={tutor.avatar} alt={tutor.name} />
            <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-lg font-medium">{tutor.name}</h3>
              <p className="text-sm text-muted-foreground">{tutor.subject}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Last Session</p>
                <p className="text-sm">{tutor.lastSession}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Next Session</p>
                <p className="text-sm">{tutor.nextSession || "None scheduled"}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-sm">{tutor.totalSessions}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Learning Progress</p>
                <p className="text-sm text-muted-foreground">{tutor.progress}%</p>
              </div>
              <Progress value={tutor.progress} className="h-2" />
            </div>
          </div>
          
          <div className="flex sm:flex-col gap-2">
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
  );
};

// Past tutor card with rating
const PastTutorCard = ({ tutor }: { tutor: Tutor }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
          <Avatar className="h-20 w-20">
            <AvatarImage src={tutor.avatar} alt={tutor.name} />
            <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <div className="flex-grow space-y-4 text-center md:text-left">
            <div>
              <h3 className="text-lg font-medium">{tutor.name}</h3>
              <p className="text-sm text-muted-foreground">{tutor.subject}</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Last Session</p>
                <p className="text-sm">{tutor.lastSession}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <p className="text-sm">{tutor.totalSessions}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <p className="text-sm text-muted-foreground mr-2">Your Rating:</p>
              {tutor.rating ? (
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < tutor.rating! ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}
                    />
                  ))}
                </div>
              ) : (
                <Badge variant="outline">Not Rated</Badge>
              )}
            </div>
          </div>
          
          <div className="flex sm:flex-col gap-2">
            <Button className="w-full sm:w-auto">
              <Calendar className="mr-2 h-4 w-4" />
              Book Again
            </Button>
            {!tutor.rating && (
              <Button variant="outline" className="w-full sm:w-auto">
                <Star className="mr-2 h-4 w-4" />
                Rate
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main component
const MyTutorsPage = () => {
  // Mock data
  const currentTutors: Tutor[] = [
    {
      id: 1,
      name: "Dr. Michael Smith",
      avatar: "https://i.pravatar.cc/150?img=35",
      subject: "Mathematics",
      lastSession: "May 15, 2023",
      nextSession: "June 1, 2023 - 4:00 PM",
      totalSessions: 12,
      rating: null,
      progress: 75
    },
    {
      id: 2,
      name: "Prof. Emily Chen",
      avatar: "https://i.pravatar.cc/150?img=45",
      subject: "English Literature",
      lastSession: "May 20, 2023",
      nextSession: null,
      totalSessions: 8,
      rating: null,
      progress: 60
    },
    {
      id: 3,
      name: "Dr. James Wilson",
      avatar: "https://i.pravatar.cc/150?img=59",
      subject: "Chemistry",
      lastSession: "May 18, 2023",
      nextSession: "May 30, 2023 - 2:30 PM",
      totalSessions: 5,
      rating: null,
      progress: 40
    }
  ];

  const pastTutors: Tutor[] = [
    {
      id: 4,
      name: "Lisa Johnson",
      avatar: "https://i.pravatar.cc/150?img=20",
      subject: "Biology",
      lastSession: "January 10, 2023",
      nextSession: null,
      totalSessions: 6,
      rating: 5,
      progress: 100
    },
    {
      id: 5,
      name: "Prof. Robert Brown",
      avatar: "https://i.pravatar.cc/150?img=68",
      subject: "History",
      lastSession: "December 12, 2022",
      nextSession: null,
      totalSessions: 4,
      rating: 4,
      progress: 100
    },
    {
      id: 6,
      name: "Dr. Sarah Lee",
      avatar: "https://i.pravatar.cc/150?img=47",
      subject: "Physics",
      lastSession: "February 15, 2023",
      nextSession: null,
      totalSessions: 3,
      rating: null,
      progress: 80
    }
  ];

  // Stats data
  const stats = {
    totalSessions: 38,
    totalHours: 52,
    activeTutors: 3,
    completedCourses: 2
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Tutors</h1>
        <p className="text-muted-foreground">Manage and view your tutoring relationships</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Sessions</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalSessions}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <CalendarIcon className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Learning Hours</p>
                <h3 className="text-2xl font-bold mt-1">{stats.totalHours}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Tutors</p>
                <h3 className="text-2xl font-bold mt-1">{stats.activeTutors}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Courses</p>
                <h3 className="text-2xl font-bold mt-1">{stats.completedCourses}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <BarChart2 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for Current and Past Tutors */}
      <Tabs defaultValue="current">
        <TabsList className="mb-6">
          <TabsTrigger value="current">Current Tutors</TabsTrigger>
          <TabsTrigger value="past">Past Tutors</TabsTrigger>
        </TabsList>
        
        <TabsContent value="current">
          <div className="space-y-6">
            {currentTutors.length > 0 ? (
              currentTutors.map(tutor => (
                <TutorCard key={tutor.id} tutor={tutor} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="font-medium text-lg mb-1">No Current Tutors</h3>
                  <p className="text-muted-foreground mb-4">
                    You don't have any active tutoring relationships at the moment.
                  </p>
                  <Button>Find Tutors</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="past">
          <div className="space-y-6">
            {pastTutors.length > 0 ? (
              pastTutors.map(tutor => (
                <PastTutorCard key={tutor.id} tutor={tutor} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="font-medium text-lg mb-1">No Past Tutors</h3>
                  <p className="text-muted-foreground">
                    You don't have any past tutoring relationships.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyTutorsPage;
