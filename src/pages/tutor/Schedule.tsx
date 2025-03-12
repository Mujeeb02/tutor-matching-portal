
import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, User, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Schedule = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");
  
  // Mock data for scheduled sessions
  const scheduledSessions = [
    { 
      id: 1, 
      studentName: "Alex Johnson", 
      subject: "Mathematics",
      topic: "Calculus - Derivatives",
      time: "9:00 AM - 10:00 AM", 
      status: "upcoming",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0),
      imageUrl: "https://i.pravatar.cc/150?img=33"
    },
    { 
      id: 2, 
      studentName: "Emma Davis", 
      subject: "Physics",
      topic: "Mechanics - Forces",
      time: "11:30 AM - 12:30 PM", 
      status: "upcoming",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 30),
      imageUrl: "https://i.pravatar.cc/150?img=23"
    },
    { 
      id: 3, 
      studentName: "Sam Wilson", 
      subject: "Chemistry",
      topic: "Organic Chemistry - Alkanes",
      time: "2:00 PM - 3:30 PM", 
      status: "upcoming",
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0),
      imageUrl: "https://i.pravatar.cc/150?img=12"
    }
  ];

  // Navigate to previous/next day, week, or month
  const navigate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (viewMode === "day") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1));
    } else if (viewMode === "week") {
      newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7));
    } else {
      newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1));
    }
    setCurrentDate(newDate);
  };

  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
    if (viewMode === "day") {
      return currentDate.toLocaleDateString(undefined, options);
    } else if (viewMode === "week") {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString(undefined, { month: 'long', day: 'numeric' })} - ${endOfWeek.toLocaleDateString(undefined, options)}`;
    } else {
      return currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    }
  };

  const handleSessionStart = (id: number, studentName: string) => {
    toast.success(`Session with ${studentName} started`);
    console.log("Starting session:", id);
  };

  const handleCancelSession = (id: number, studentName: string) => {
    toast.error(`Session with ${studentName} cancelled`);
    console.log("Cancelling session:", id);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Schedule</h1>
          <p className="text-muted-foreground">Manage your tutoring sessions and availability</p>
        </div>
        <Button className="gap-2">
          <CalendarIcon size={16} />
          Set Availability
        </Button>
      </div>

      {/* Calendar Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => navigate("prev")}>
                <ChevronLeft size={16} />
              </Button>
              <div className="text-lg font-medium">
                {formatDateRange()}
              </div>
              <Button variant="outline" size="icon" onClick={() => navigate("next")}>
                <ChevronRight size={16} />
              </Button>
            </div>
            <div className="flex gap-2 items-center">
              <Select value={viewMode} onValueChange={(value) => setViewMode(value as "day" | "week" | "month")}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>Your upcoming sessions for today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledSessions.length > 0 ? (
              scheduledSessions.map((session) => (
                <div key={session.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-secondary/50 rounded-lg">
                  <img 
                    src={session.imageUrl} 
                    alt={session.studentName}
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <h3 className="font-medium">{session.studentName}</h3>
                      <Badge variant="outline" className="sm:ml-2 w-fit">
                        {session.subject}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{session.topic}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                      <div className="flex items-center text-sm">
                        <Clock size={14} className="mr-1" />
                        {session.time}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground sm:ml-4">
                        <User size={14} className="mr-1" />
                        1-on-1 Session
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3 sm:mt-0">
                    <Button size="sm" onClick={() => handleSessionStart(session.id, session.studentName)}>
                      Start
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleCancelSession(session.id, session.studentName)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6">
                <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="font-medium text-lg mb-1">No Sessions Today</h3>
                <p className="text-muted-foreground">You don't have any scheduled sessions for today.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Calendar View - Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View</CardTitle>
          <CardDescription>Your {viewMode} schedule at a glance</CardDescription>
        </CardHeader>
        <CardContent className="min-h-96">
          <div className="p-8 border border-dashed rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground text-center">
              Interactive {viewMode} calendar view would be displayed here, showing all scheduled sessions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Schedule;
