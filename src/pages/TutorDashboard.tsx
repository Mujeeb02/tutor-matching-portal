
import { useState } from "react";
import { Link } from "react-router-dom";
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
  DollarSign, 
  CheckCircle, 
  XCircle,
  Menu
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import TutorSidebar from "@/components/TutorSidebar";
import { toast } from "sonner";

const TutorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAvailable, setIsAvailable] = useState(true);

  // Mock data for upcoming sessions
  const upcomingSessions = [
    {
      id: 1,
      studentName: "Alex Johnson",
      subject: "Mathematics",
      date: "Today, 4:00 PM",
      imageUrl: "https://i.pravatar.cc/150?img=33"
    },
    {
      id: 2,
      studentName: "Sam Wilson",
      subject: "Physics",
      date: "Tomorrow, 5:30 PM",
      imageUrl: "https://i.pravatar.cc/150?img=12"
    }
  ];
  
  // Mock data for session requests
  const sessionRequests = [
    {
      id: 1,
      studentName: "Emma Davis",
      subject: "Chemistry",
      date: "Friday, 3:00 PM",
      duration: "1 hour",
      imageUrl: "https://i.pravatar.cc/150?img=23"
    },
    {
      id: 2,
      studentName: "Ryan Thompson",
      subject: "Biology",
      date: "Saturday, 10:00 AM",
      duration: "2 hours",
      imageUrl: "https://i.pravatar.cc/150?img=53"
    }
  ];

  // Mock data for earnings overview
  const earningsData = {
    thisMonth: "$1,245",
    lastMonth: "$980",
    totalEarnings: "$4,580",
    pendingPayouts: "$320"
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleAvailabilityChange = (checked: boolean) => {
    setIsAvailable(checked);
    toast.success(`You are now ${checked ? 'available' : 'unavailable'} for new sessions`);
  };

  const handleAcceptRequest = (id: number, studentName: string) => {
    toast.success(`Session with ${studentName} accepted`);
    console.log("Accepted session request:", id);
  };

  const handleDeclineRequest = (id: number, studentName: string) => {
    toast.error(`Session with ${studentName} declined`);
    console.log("Declined session request:", id);
  };

  return (
    <div className="min-h-screen flex bg-background">
      <TutorSidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div 
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-20"
        )}
      >
        <main className="py-8 px-6 max-w-7xl mx-auto w-full">
          {/* Welcome Section */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, Prof. Michael!</h1>
              <p className="text-muted-foreground">Manage your tutoring sessions, schedule, and earnings.</p>
            </div>
            <div className="flex items-center gap-3">
              <Label htmlFor="availability" className={cn(isAvailable ? "text-green-500" : "text-muted-foreground")}>
                {isAvailable ? "Available for Sessions" : "Unavailable"}
              </Label>
              <Switch 
                id="availability" 
                checked={isAvailable} 
                onCheckedChange={handleAvailabilityChange}
              />
            </div>
          </div>
          
          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Students</p>
                    <h3 className="text-2xl font-bold mt-1">28</h3>
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
                    <p className="text-sm text-muted-foreground">Hours Taught</p>
                    <h3 className="text-2xl font-bold mt-1">156</h3>
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
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <h3 className="text-2xl font-bold mt-1">{earningsData.thisMonth}</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <h3 className="text-2xl font-bold mt-1">4.9/5</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-8">
              {/* Session Requests */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Session Requests</CardTitle>
                    <CardDescription>Pending session requests from students</CardDescription>
                  </div>
                  <Badge>{sessionRequests.length}</Badge>
                </CardHeader>
                <CardContent>
                  {sessionRequests.length > 0 ? (
                    <div className="space-y-4">
                      {sessionRequests.map((request) => (
                        <div key={request.id} className="flex items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                          <img 
                            src={request.imageUrl} 
                            alt={request.studentName}
                            className="w-12 h-12 rounded-full object-cover" 
                          />
                          <div className="flex-grow">
                            <h3 className="font-medium">{request.studentName}</h3>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                              <p className="text-sm">{request.subject}</p>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Calendar size={14} className="mr-1" />
                                {request.date}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                <Clock size={14} className="inline mr-1" />
                                {request.duration}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row gap-2">
                            <Button 
                              size="sm" 
                              className="rounded-full w-10 h-10 p-0"
                              onClick={() => handleAcceptRequest(request.id, request.studentName)}
                            >
                              <CheckCircle size={18} />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="rounded-full w-10 h-10 p-0"
                              onClick={() => handleDeclineRequest(request.id, request.studentName)}
                            >
                              <XCircle size={18} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">No Pending Requests</h3>
                      <p className="text-muted-foreground">You don't have any session requests at the moment.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
              
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
                            alt={session.studentName}
                            className="w-12 h-12 rounded-full object-cover" 
                          />
                          <div className="flex-grow">
                            <h3 className="font-medium">{session.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{session.subject}</p>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar size={16} />
                            <span>{session.date}</span>
                          </div>
                          <Button size="sm">Start</Button>
                        </div>
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
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Earnings Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Month</span>
                      <span className="font-medium">{earningsData.thisMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Month</span>
                      <span className="font-medium">{earningsData.lastMonth}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Earnings</span>
                      <span className="font-medium">{earningsData.totalEarnings}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Pending Payouts</span>
                      <span className="font-medium">{earningsData.pendingPayouts}</span>
                    </div>
                    <div className="pt-2">
                      <Button className="w-full">Withdraw Funds</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="mr-2" size={18} />
                    Update Availability
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="mr-2" size={18} />
                    Messages
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2" size={18} />
                    Manage Materials
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="mr-2" size={18} />
                    Performance Stats
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TutorDashboard;
