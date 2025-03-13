
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface TutorSession {
  id: number;
  tutorName: string;
  tutorAvatar: string;
  subject: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

// Session card component
const SessionCard = ({ session }: { session: TutorSession }) => {
  const dateFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(session.date);

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={session.tutorAvatar} alt={session.tutorName} />
            <AvatarFallback>{session.tutorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{session.subject}</h3>
                <p className="text-sm text-muted-foreground">with {session.tutorName}</p>
              </div>
              <Badge 
                className={cn(
                  session.status === "upcoming" ? "bg-blue-100 text-blue-800" : 
                  session.status === "completed" ? "bg-green-100 text-green-800" : 
                  "bg-red-100 text-red-800"
                )}
              >
                {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
              </Badge>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-sm">
                <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{dateFormatted}</span>
              </div>
              <div className="flex items-center text-sm">
                <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>{session.startTime} - {session.endTime}</span>
              </div>
            </div>
            {session.notes && (
              <div className="mt-3 p-3 bg-secondary/40 rounded-md text-sm">
                <span className="font-medium">Notes: </span>{session.notes}
              </div>
            )}
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          {session.status === "upcoming" ? (
            <>
              <Button size="sm" variant="outline" onClick={() => toast.info("Rescheduling session...")}>
                Reschedule
              </Button>
              <Button size="sm" variant="secondary" onClick={() => toast.info("Joining session...")}>
                Join Session
              </Button>
            </>
          ) : session.status === "completed" ? (
            <Button size="sm" variant="outline" onClick={() => toast.info("Leaving feedback...")}>
              Leave Feedback
            </Button>
          ) : (
            <Button size="sm" variant="outline" onClick={() => toast.info("Rescheduling cancelled session...")}>
              Reschedule
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const SchedulePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "week" | "month">("week");
  const [selectedTab, setSelectedTab] = useState<string>("completed");
  
  // Mock data for upcoming sessions
  const sessions: TutorSession[] = [
    {
      id: 1,
      tutorName: "Dr. Michael Smith",
      tutorAvatar: "https://i.pravatar.cc/150?img=35",
      subject: "Advanced Calculus",
      date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // tomorrow
      startTime: "4:00 PM",
      endTime: "5:00 PM",
      status: "upcoming",
      notes: "Prepare questions about derivatives and integrals"
    },
    {
      id: 2,
      tutorName: "Prof. Emily Chen",
      tutorAvatar: "https://i.pravatar.cc/150?img=45",
      subject: "English Literature - Shakespeare Analysis",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // day after tomorrow
      startTime: "3:30 PM",
      endTime: "5:00 PM",
      status: "upcoming"
    },
    {
      id: 3,
      tutorName: "Dr. James Lee",
      tutorAvatar: "https://i.pravatar.cc/150?img=68",
      subject: "Organic Chemistry",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      status: "completed",
      notes: "Covered aromatic compounds and reaction mechanisms"
    },
    {
      id: 4,
      tutorName: "Prof. Lisa Johnson",
      tutorAvatar: "https://i.pravatar.cc/150?img=20",
      subject: "Molecular Biology",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      startTime: "10:00 AM",
      endTime: "11:30 AM",
      status: "cancelled"
    }
  ];

  const upcomingSessions = sessions.filter(session => session.status === "upcoming");
  const completedSessions = sessions.filter(session => session.status === "completed");
  const cancelledSessions = sessions.filter(session => session.status === "cancelled");

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
            <h1 className="text-3xl font-bold mb-2">Schedule</h1>
            <p className="text-muted-foreground">Manage your tutoring sessions and appointments</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar View */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Calendar</CardTitle>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" onClick={() => setDate(new Date())}>
                        Today
                      </Button>
                      <div className="flex">
                        <Button variant="ghost" size="icon" onClick={() => {
                          const newDate = new Date(date);
                          newDate.setDate(newDate.getDate() - 7);
                          setDate(newDate);
                        }}>
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => {
                          const newDate = new Date(date);
                          newDate.setDate(newDate.getDate() + 7);
                          setDate(newDate);
                        }}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <CardDescription>
                      {date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </CardDescription>
                    <Tabs value={view} onValueChange={(value) => setView(value as "day" | "week" | "month")}>
                      <TabsList>
                        <TabsTrigger value="day">Day</TabsTrigger>
                        <TabsTrigger value="week">Week</TabsTrigger>
                        <TabsTrigger value="month">Month</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    className="rounded-md border"
                  />
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button onClick={() => toast.success("New session scheduling dialog will open here")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule New Session
                  </Button>
                </CardFooter>
              </Card>
              
              {/* Sessions List */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Upcoming Sessions</CardTitle>
                  <CardDescription>
                    You have {upcomingSessions.length} upcoming sessions scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingSessions.length > 0 ? (
                    upcomingSessions.map(session => (
                      <SessionCard key={session.id} session={session} />
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">No Upcoming Sessions</h3>
                      <p className="text-muted-foreground mb-4">You don't have any scheduled sessions yet.</p>
                      <Button onClick={() => toast.success("New session scheduling dialog will open here")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Schedule New Session
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Session History */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Session History</CardTitle>
                  <CardDescription>
                    View your past and cancelled sessions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="completed" value={selectedTab} onValueChange={setSelectedTab}>
                    <TabsList className="w-full mb-4">
                      <TabsTrigger value="completed">Completed</TabsTrigger>
                      <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                    </TabsList>
                    <TabsContent value="completed">
                      {completedSessions.length > 0 ? (
                        completedSessions.map(session => (
                          <SessionCard key={session.id} session={session} />
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">No completed sessions yet</p>
                        </div>
                      )}
                    </TabsContent>
                    <TabsContent value="cancelled">
                      {cancelledSessions.length > 0 ? (
                        cancelledSessions.map(session => (
                          <SessionCard key={session.id} session={session} />
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <p className="text-muted-foreground">No cancelled sessions</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" 
                    onClick={() => toast.success("New session scheduling dialog will open here")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Schedule New Session
                  </Button>
                  <Button variant="outline" className="w-full justify-start"
                    onClick={() => toast.info("Calendar export functionality will be here")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Export to Calendar
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

export default SchedulePage;
