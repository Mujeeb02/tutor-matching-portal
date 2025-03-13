
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Search, Users, Star, MessageSquare, Filter } from "lucide-react";
import TutorSidebar from "@/components/TutorSidebar";
import { toast } from "sonner";

// Student data interface
interface Student {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  level: string;
  lastSession: string;
  nextSession?: string;
  sessions: number;
  rating: number;
  status: "active" | "inactive";
}

const StudentsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock student data
  const students: Student[] = [
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=33",
      subject: "Mathematics",
      level: "High School",
      lastSession: "Today",
      nextSession: "May 15, 2:00 PM",
      sessions: 12,
      rating: 4.8,
      status: "active"
    },
    {
      id: 2,
      name: "Emma Davis",
      avatar: "https://i.pravatar.cc/150?img=23",
      subject: "Chemistry",
      level: "College",
      lastSession: "Yesterday",
      nextSession: "May 18, 3:30 PM",
      sessions: 8,
      rating: 4.5,
      status: "active"
    },
    {
      id: 3,
      name: "Sam Wilson",
      avatar: "https://i.pravatar.cc/150?img=12",
      subject: "Physics",
      level: "High School",
      lastSession: "3 days ago",
      nextSession: "May 20, 4:00 PM",
      sessions: 15,
      rating: 5.0,
      status: "active"
    },
    {
      id: 4,
      name: "Ryan Thompson",
      avatar: "https://i.pravatar.cc/150?img=53",
      subject: "Biology",
      level: "Middle School",
      lastSession: "Last week",
      sessions: 6,
      rating: 4.2,
      status: "inactive"
    },
    {
      id: 5,
      name: "Olivia Martin",
      avatar: "https://i.pravatar.cc/150?img=25",
      subject: "Literature",
      level: "College",
      lastSession: "2 weeks ago",
      sessions: 4,
      rating: 4.7,
      status: "inactive"
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleContactStudent = (studentName: string) => {
    toast.info(`Opening chat with ${studentName}`);
  };

  const handleScheduleSession = (studentName: string) => {
    toast.info(`Scheduling session with ${studentName}`);
  };

  // Filter students based on search query
  const filteredStudents = searchQuery.length > 0
    ? students.filter(student => 
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        student.subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : students;

  const activeStudents = filteredStudents.filter(student => student.status === "active");
  const inactiveStudents = filteredStudents.filter(student => student.status === "inactive");

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
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Students</h1>
            <p className="text-muted-foreground">Manage your students and sessions</p>
          </div>
          
          <div className="space-y-6">
            {/* Search and filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input 
                  placeholder="Search students..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>
            
            {/* Stats overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <h3 className="text-2xl font-bold mt-1">{students.length}</h3>
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
                      <p className="text-sm text-muted-foreground">Active Students</p>
                      <h3 className="text-2xl font-bold mt-1">{students.filter(s => s.status === "active").length}</h3>
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
                      <p className="text-sm text-muted-foreground">Upcoming Sessions</p>
                      <h3 className="text-2xl font-bold mt-1">{students.filter(s => s.nextSession).length}</h3>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Students list */}
            <Tabs defaultValue="active" className="space-y-4">
              <TabsList>
                <TabsTrigger value="active">Active Students</TabsTrigger>
                <TabsTrigger value="inactive">Inactive Students</TabsTrigger>
                <TabsTrigger value="all">All Students</TabsTrigger>
              </TabsList>
              
              <TabsContent value="active">
                <Card>
                  <CardHeader>
                    <CardTitle>Active Students</CardTitle>
                    <CardDescription>Students with ongoing sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {activeStudents.length > 0 ? (
                      <div className="space-y-4">
                        {activeStudents.map((student) => (
                          <div key={student.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <h3 className="font-medium">{student.name}</h3>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                                    <span>{student.subject}</span>
                                    <span>{student.level}</span>
                                  </div>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <div className="flex items-center mr-4">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span>{student.rating}</span>
                                  </div>
                                  <Badge variant="outline" className="mr-2">
                                    {student.sessions} Sessions
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span>Last: {student.lastSession}</span>
                                  </div>
                                  {student.nextSession && (
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                      <span>Next: {student.nextSession}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex gap-2 mt-3 sm:mt-0">
                                  <Button size="sm" variant="outline" onClick={() => handleContactStudent(student.name)}>
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Contact
                                  </Button>
                                  <Button size="sm" onClick={() => handleScheduleSession(student.name)}>
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Schedule
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                        <h3 className="font-medium text-lg mb-1">No Active Students</h3>
                        <p className="text-muted-foreground">You don't have any active students at the moment.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="inactive">
                <Card>
                  <CardHeader>
                    <CardTitle>Inactive Students</CardTitle>
                    <CardDescription>Students without recent activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {inactiveStudents.length > 0 ? (
                      <div className="space-y-4">
                        {inactiveStudents.map((student) => (
                          <div key={student.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <h3 className="font-medium">{student.name}</h3>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                                    <span>{student.subject}</span>
                                    <span>{student.level}</span>
                                  </div>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <div className="flex items-center mr-4">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span>{student.rating}</span>
                                  </div>
                                  <Badge variant="outline" className="mr-2">
                                    {student.sessions} Sessions
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
                                <div className="flex items-center text-sm">
                                  <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>Last: {student.lastSession}</span>
                                </div>
                                
                                <div className="flex gap-2 mt-3 sm:mt-0">
                                  <Button size="sm" variant="outline" onClick={() => handleContactStudent(student.name)}>
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Contact
                                  </Button>
                                  <Button size="sm" onClick={() => handleScheduleSession(student.name)}>
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Schedule
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                        <h3 className="font-medium text-lg mb-1">No Inactive Students</h3>
                        <p className="text-muted-foreground">You don't have any inactive students at the moment.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="all">
                <Card>
                  <CardHeader>
                    <CardTitle>All Students</CardTitle>
                    <CardDescription>View all your students</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {filteredStudents.length > 0 ? (
                      <div className="space-y-4">
                        {filteredStudents.map((student) => (
                          <div key={student.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 border rounded-lg">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={student.avatar} alt={student.name} />
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <div className="flex items-center">
                                    <h3 className="font-medium">{student.name}</h3>
                                    <Badge className={cn(
                                      "ml-2",
                                      student.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                                    )}>
                                      {student.status === "active" ? "Active" : "Inactive"}
                                    </Badge>
                                  </div>
                                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground">
                                    <span>{student.subject}</span>
                                    <span>{student.level}</span>
                                  </div>
                                </div>
                                <div className="flex items-center mt-2 sm:mt-0">
                                  <div className="flex items-center mr-4">
                                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                                    <span>{student.rating}</span>
                                  </div>
                                  <Badge variant="outline" className="mr-2">
                                    {student.sessions} Sessions
                                  </Badge>
                                </div>
                              </div>
                              
                              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3">
                                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm">
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                    <span>Last: {student.lastSession}</span>
                                  </div>
                                  {student.nextSession && (
                                    <div className="flex items-center">
                                      <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                                      <span>Next: {student.nextSession}</span>
                                    </div>
                                  )}
                                </div>
                                
                                <div className="flex gap-2 mt-3 sm:mt-0">
                                  <Button size="sm" variant="outline" onClick={() => handleContactStudent(student.name)}>
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Contact
                                  </Button>
                                  <Button size="sm" onClick={() => handleScheduleSession(student.name)}>
                                    <Calendar className="h-4 w-4 mr-1" />
                                    Schedule
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                        <h3 className="font-medium text-lg mb-1">No Students Found</h3>
                        <p className="text-muted-foreground">We couldn't find any students matching your search.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentsPage;
