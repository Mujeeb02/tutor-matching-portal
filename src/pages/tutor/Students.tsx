
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  Filter,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

const StudentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock student data
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      joinDate: "2023-06-15",
      lastSession: "2023-11-02",
      subject: "Mathematics",
      level: "Advanced",
      sessionsCompleted: 12,
      upcomingSessions: 2,
      status: "active",
      avatarUrl: "https://i.pravatar.cc/150?img=33",
    },
    {
      id: 2,
      name: "Emma Wilson",
      email: "emma.wilson@example.com",
      joinDate: "2023-07-23",
      lastSession: "2023-10-29",
      subject: "Physics",
      level: "Intermediate",
      sessionsCompleted: 8,
      upcomingSessions: 1,
      status: "active",
      avatarUrl: "https://i.pravatar.cc/150?img=23",
    },
    {
      id: 3,
      name: "James Brown",
      email: "james.brown@example.com",
      joinDate: "2023-09-05",
      lastSession: "2023-10-27",
      subject: "Chemistry",
      level: "Beginner",
      sessionsCompleted: 5,
      upcomingSessions: 0,
      status: "inactive",
      avatarUrl: "https://i.pravatar.cc/150?img=67",
    },
    {
      id: 4,
      name: "Lily Chen",
      email: "lily.chen@example.com",
      joinDate: "2023-08-12",
      lastSession: "2023-11-01",
      subject: "Biology",
      level: "Intermediate",
      sessionsCompleted: 7,
      upcomingSessions: 1,
      status: "active",
      avatarUrl: "https://i.pravatar.cc/150?img=47",
    },
    {
      id: 5,
      name: "Ethan Davis",
      email: "ethan.davis@example.com",
      joinDate: "2023-10-03",
      lastSession: null,
      subject: "Computer Science",
      level: "Beginner",
      sessionsCompleted: 1,
      upcomingSessions: 1,
      status: "new",
      avatarUrl: "https://i.pravatar.cc/150?img=53",
    },
  ];

  // Filter students based on search query and active filter
  const filteredStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.subject.toLowerCase().includes(searchQuery.toLowerCase());

      if (activeFilter === "all") return matchesSearch;
      if (activeFilter === "active") return matchesSearch && student.status === "active";
      if (activeFilter === "inactive") return matchesSearch && student.status === "inactive";
      if (activeFilter === "new") return matchesSearch && student.status === "new";
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortDirection === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  const handleSortToggle = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const handleMessageStudent = (id: number, name: string) => {
    toast.success(`Opening chat with ${name}`);
    console.log("Messaging student:", id);
  };

  const handleScheduleSession = (id: number, name: string) => {
    toast.success(`Scheduling session with ${name}`);
    console.log("Scheduling session with student:", id);
  };

  const studentStatusCount = {
    all: students.length,
    active: students.filter((s) => s.status === "active").length,
    inactive: students.filter((s) => s.status === "inactive").length,
    new: students.filter((s) => s.status === "new").length,
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground mt-1">Manage your student relationships</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button variant="outline" className="flex items-center gap-2">
            <Users size={16} />
            <span>Add Student</span>
          </Button>
        </div>
      </div>

      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search students..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Select defaultValue={activeFilter} onValueChange={setActiveFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Filter students" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students ({studentStatusCount.all})</SelectItem>
                <SelectItem value="active">Active ({studentStatusCount.active})</SelectItem>
                <SelectItem value="inactive">Inactive ({studentStatusCount.inactive})</SelectItem>
                <SelectItem value="new">New ({studentStatusCount.new})</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={handleSortToggle}
              className="h-10 w-10"
            >
              {sortDirection === "asc" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
        </div>

        {filteredStudents.length > 0 ? (
          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border border-border">
                        <AvatarImage src={student.avatarUrl} alt={student.name} />
                        <AvatarFallback>{student.name.charAt(0)}{student.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{student.name}</h3>
                          {student.status === "new" && (
                            <Badge variant="default" className="bg-green-500">New</Badge>
                          )}
                          {student.status === "inactive" && (
                            <Badge variant="outline" className="text-yellow-500 border-yellow-500">Inactive</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-x-6 gap-y-3 flex-grow mt-4 md:mt-0">
                      <div>
                        <p className="text-xs text-muted-foreground">Subject</p>
                        <div className="flex items-center gap-1 mt-1">
                          <BookOpen size={14} />
                          <span className="text-sm">{student.subject} ({student.level})</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground">Sessions</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock size={14} />
                          <span className="text-sm">{student.sessionsCompleted} completed</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground">Last Session</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar size={14} />
                          <span className="text-sm">
                            {student.lastSession ? new Date(student.lastSession).toLocaleDateString() : "No sessions yet"}
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-muted-foreground">Upcoming</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Calendar size={14} />
                          <span className="text-sm">{student.upcomingSessions} session(s)</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4 md:mt-0 w-full md:w-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleMessageStudent(student.id, student.name)}
                      >
                        <MessageSquare size={14} />
                        <span>Message</span>
                      </Button>
                      
                      <Button
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => handleScheduleSession(student.id, student.name)}
                      >
                        <Calendar size={14} />
                        <span>Schedule</span>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="font-medium text-lg mb-1">No Students Found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria.</p>
            <Button onClick={() => { setSearchQuery(""); setActiveFilter("all"); }}>Reset Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
