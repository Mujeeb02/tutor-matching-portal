
import React, { useState } from "react";
import { Search, Filter, Mail, Calendar, Star, MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const Students = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  
  // Mock data for students
  const students = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      subject: "Mathematics",
      level: "High School",
      sessions: 12,
      lastSession: "2 days ago",
      nextSession: "Tomorrow, 4:00 PM",
      rating: 4.8,
      status: "active",
      imageUrl: "https://i.pravatar.cc/150?img=33"
    },
    {
      id: 2,
      name: "Emma Davis",
      email: "emma.davis@example.com",
      subject: "Physics",
      level: "University",
      sessions: 8,
      lastSession: "1 week ago",
      nextSession: "Friday, 3:00 PM",
      rating: 4.5,
      status: "active",
      imageUrl: "https://i.pravatar.cc/150?img=23"
    },
    {
      id: 3,
      name: "Sam Wilson",
      email: "sam.wilson@example.com",
      subject: "Chemistry",
      level: "High School",
      sessions: 5,
      lastSession: "3 days ago",
      nextSession: "Next Monday, 5:30 PM",
      rating: 4.9,
      status: "active",
      imageUrl: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 4,
      name: "Ryan Thompson",
      email: "ryan.thompson@example.com",
      subject: "Biology",
      level: "Middle School",
      sessions: 3,
      lastSession: "2 weeks ago",
      nextSession: null,
      rating: 4.2,
      status: "inactive",
      imageUrl: "https://i.pravatar.cc/150?img=53"
    }
  ];

  const filteredStudents = students.filter(student => {
    // Filter by search query
    if (searchQuery && !student.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by status
    if (filter === "active" && student.status !== "active") return false;
    if (filter === "inactive" && student.status !== "inactive") return false;
    
    return true;
  });

  const handleScheduleSession = (studentId: number, studentName: string) => {
    toast.success(`Scheduling session with ${studentName}`);
    console.log("Schedule session with student:", studentId);
  };

  const handleMessageStudent = (studentId: number, studentName: string) => {
    toast.success(`Opening chat with ${studentName}`);
    console.log("Message student:", studentId);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground">Manage your student relationships</p>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <TabsList>
            <TabsTrigger value="all" onClick={() => setFilter("all")}>All Students</TabsTrigger>
            <TabsTrigger value="active" onClick={() => setFilter("active")}>Active</TabsTrigger>
            <TabsTrigger value="inactive" onClick={() => setFilter("inactive")}>Inactive</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter size={16} />
            </Button>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Your Students</CardTitle>
                  <CardDescription>You have {filteredStudents.length} {filter !== "all" ? filter : ""} students</CardDescription>
                </div>
                <Select defaultValue="default">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Most recent</SelectItem>
                    <SelectItem value="name-asc">Name (A-Z)</SelectItem>
                    <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                    <SelectItem value="sessions">Most sessions</SelectItem>
                    <SelectItem value="rating">Highest rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student) => (
                    <div key={student.id} className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                      <img 
                        src={student.imageUrl} 
                        alt={student.name}
                        className="w-12 h-12 rounded-full object-cover" 
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 flex-grow">
                        <div>
                          <h3 className="font-medium">{student.name}</h3>
                          <p className="text-sm text-muted-foreground">{student.email}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {student.subject}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {student.level}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <p className="text-muted-foreground w-24">Sessions:</p>
                            <p>{student.sessions}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-muted-foreground w-24">Last session:</p>
                            <p>{student.lastSession}</p>
                          </div>
                          <div className="flex items-center">
                            <p className="text-muted-foreground w-24">Next session:</p>
                            <p>{student.nextSession || "Not scheduled"}</p>
                          </div>
                        </div>
                        <div className="text-sm space-y-1">
                          <div className="flex items-center">
                            <p className="text-muted-foreground w-24">Rating:</p>
                            <div className="flex items-center">
                              <span>{student.rating}</span>
                              <Star className="h-3.5 w-3.5 fill-primary text-primary ml-1" />
                            </div>
                          </div>
                          <div className="flex items-center">
                            <p className="text-muted-foreground w-24">Status:</p>
                            <Badge variant={student.status === "active" ? "default" : "secondary"} className="text-xs">
                              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex sm:flex-col gap-2 mt-3 sm:mt-0">
                        <Button size="sm" variant="outline" className="gap-2" onClick={() => handleMessageStudent(student.id, student.name)}>
                          <Mail size={14} />
                          <span className="hidden sm:inline">Message</span>
                        </Button>
                        <Button size="sm" className="gap-2" onClick={() => handleScheduleSession(student.id, student.name)}>
                          <Calendar size={14} />
                          <span className="hidden sm:inline">Schedule</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <h3 className="font-medium text-lg mb-1">No Students Found</h3>
                    <p className="text-muted-foreground">Try adjusting your search or filters.</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          {/* Content will be controlled by the filter state */}
        </TabsContent>
        
        <TabsContent value="inactive" className="mt-0">
          {/* Content will be controlled by the filter state */}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Students;
