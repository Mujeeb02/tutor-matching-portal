
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  Clock,
  MessageSquare,
  FileText,
  BarChart3,
  ChevronRight,
  CreditCard,
  CheckCircle,
  Star,
  Search,
  BookOpen,
  TrendingUp
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Create a simple component for the upcoming session
const UpcomingSession = ({ session }: { session: any }) => (
  <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
    <Avatar className="h-12 w-12">
      <AvatarImage src={session.tutorAvatar} alt={session.tutorName} />
      <AvatarFallback>{session.tutorName.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-grow">
      <h3 className="font-medium">{session.subject}</h3>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{session.tutorName}</span>
        <span>•</span>
        <Clock size={14} className="inline" />
        <span>{session.time}</span>
      </div>
    </div>
    <Button size="sm">Join</Button>
  </div>
);

// Create a component for the recommended tutor card
const RecommendedTutor = ({ tutor }: { tutor: any }) => (
  <Card>
    <CardContent className="pt-6 pb-4">
      <div className="flex flex-col items-center text-center">
        <Avatar className="h-20 w-20 mb-4">
          <AvatarImage src={tutor.avatar} alt={tutor.name} />
          <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-lg">{tutor.name}</h3>
        <p className="text-sm text-muted-foreground">{tutor.subject}</p>
        <div className="flex items-center mt-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < tutor.rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}
              />
            ))}
          </div>
          <span className="text-sm ml-1">{tutor.rating}/5</span>
        </div>
        <p className="text-sm text-muted-foreground mb-4">{tutor.description}</p>
        <Button className="w-full">View Profile</Button>
      </div>
    </CardContent>
  </Card>
);

// Create a component for the progress card
const SubjectProgress = ({ subject }: { subject: any }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium">{subject.name}</span>
      <span className="text-sm text-muted-foreground">{subject.progress}%</span>
    </div>
    <Progress value={subject.progress} className="h-2" />
  </div>
);

const StudentDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      tutorName: "Dr. Michael Smith",
      tutorAvatar: "https://i.pravatar.cc/150?img=35",
      subject: "Advanced Calculus",
      time: "Today, 4:00 PM",
      duration: "60 min"
    },
    {
      id: 2,
      tutorName: "Prof. Emily Chen",
      tutorAvatar: "https://i.pravatar.cc/150?img=45",
      subject: "English Literature",
      time: "Tomorrow, 3:30 PM",
      duration: "90 min"
    }
  ];

  // Mock data for recommended tutors
  const recommendedTutors = [
    {
      id: 1,
      name: "Dr. Robert Wilson",
      avatar: "https://i.pravatar.cc/150?img=60",
      subject: "Physics Expert",
      rating: 4.9,
      description: "Specializes in quantum mechanics and theoretical physics."
    },
    {
      id: 2,
      name: "Prof. Lisa Johnson",
      avatar: "https://i.pravatar.cc/150?img=20",
      subject: "Biology Tutor",
      rating: 4.8,
      description: "Molecular biology expert with 10+ years teaching experience."
    },
    {
      id: 3,
      name: "Dr. James Lee",
      avatar: "https://i.pravatar.cc/150?img=68",
      subject: "Chemistry Specialist",
      rating: 4.7,
      description: "PhD in Organic Chemistry, passionate about making complex concepts simple."
    }
  ];

  // Mock data for subject progress
  const subjectsProgress = [
    { id: 1, name: "Mathematics", progress: 75 },
    { id: 2, name: "Physics", progress: 60 },
    { id: 3, name: "English Literature", progress: 90 },
    { id: 4, name: "Chemistry", progress: 45 }
  ];

  // Mock data for recent activities
  const recentActivities = [
    { 
      id: 1, 
      type: "session", 
      description: "Completed a Calculus session with Dr. Smith", 
      time: "Yesterday, 5:30 PM" 
    },
    { 
      id: 2, 
      type: "material", 
      description: "Downloaded Physics study guide", 
      time: "2 days ago" 
    },
    { 
      id: 3, 
      type: "payment", 
      description: "Paid for 5 tutoring sessions", 
      time: "3 days ago" 
    },
    { 
      id: 4, 
      type: "session", 
      description: "Scheduled a Literature review with Prof. Chen", 
      time: "4 days ago" 
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Function to render different content based on the current route
  const renderContent = () => {
    const path = location.pathname;

    // Default student dashboard view
    if (path === "/student-dashboard") {
      return (
        <div className="space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">My Tutors</p>
                    <h3 className="text-2xl font-bold mt-1">5</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                    <h3 className="text-2xl font-bold mt-1">32</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Hours Learned</p>
                    <h3 className="text-2xl font-bold mt-1">48</h3>
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
                    <p className="text-sm text-muted-foreground">Avg. Progress</p>
                    <h3 className="text-2xl font-bold mt-1">67%</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
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
                        <UpcomingSession key={session.id} session={session} />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">No Upcoming Sessions</h3>
                      <p className="text-muted-foreground">You don't have any scheduled sessions yet.</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  <Button>Schedule New Session</Button>
                </CardFooter>
              </Card>
              
              {/* Recent Learning Activity */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent learning activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentActivities.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <div className={cn(
                          "h-9 w-9 rounded-full flex items-center justify-center",
                          activity.type === "session" ? "bg-green-100 text-green-600" :
                          activity.type === "material" ? "bg-blue-100 text-blue-600" :
                          "bg-purple-100 text-purple-600"
                        )}>
                          {activity.type === "session" ? <Calendar size={18} /> : 
                           activity.type === "material" ? <FileText size={18} /> : 
                           <CreditCard size={18} />}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm mb-1">{activity.description}</p>
                          <p className="text-xs text-muted-foreground">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - right column */}
            <div className="space-y-6">
              {/* Learning Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Learning Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {subjectsProgress.map((subject) => (
                      <SubjectProgress key={subject.id} subject={subject} />
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      <BarChart3 className="mr-2 h-4 w-4" />
                      View Detailed Analytics
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recommended Tutors */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Tutors</CardTitle>
                </CardHeader>
                <CardContent className="px-3 pb-3">
                  <div className="grid gap-4">
                    {recommendedTutors.slice(0, 1).map((tutor) => (
                      <RecommendedTutor key={tutor.id} tutor={tutor} />
                    ))}
                    <Button variant="outline" className="w-full">
                      <Search className="mr-2 h-4 w-4" />
                      Find More Tutors
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2" size={18} />
                    Browse All Tutors
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2" size={18} />
                    Check Messages
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="mr-2" size={18} />
                    Access Learning Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2" size={18} />
                    Manage Payments
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      );
    }
    
    // Simple placeholder for other routes in student dashboard
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold capitalize">{path.split('/').pop()?.replace('-', ' ')}</h1>
        <Card>
          <CardContent className="pt-6">
            <p>This is the {path.split('/').pop()?.replace('-', ' ')} page content. This section is currently under development.</p>
          </CardContent>
        </Card>
      </div>
    );
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h1>
            <p className="text-muted-foreground">Track your learning progress and upcoming sessions.</p>
          </div>
          
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
