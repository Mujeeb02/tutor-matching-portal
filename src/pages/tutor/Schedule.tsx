
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowLeft,
  ArrowRight,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  Users,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format, addDays, subDays, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import TutorSidebar from "@/components/TutorSidebar";

// Define session interface
interface Session {
  id: number;
  studentName: string;
  studentAvatar: string;
  subject: string;
  startTime: string;
  endTime: string;
  date: Date;
}

// Custom date rendering component
const CustomDay = (props: any) => {
  const { day, selectedDay, sessions } = props;
  
  // Find all sessions for this day
  const dayHasSessions = sessions?.some((session: Session) => 
    isSameDay(session.date, day.date)
  );
  
  return (
    <div
      onClick={() => props.onSelect(day.date)}
      className={`relative h-9 w-9 p-0 font-normal aria-selected:opacity-100 flex items-center justify-center rounded-md text-sm ${
        dayHasSessions ? "font-semibold" : ""
      } ${
        isSameDay(day.date, selectedDay)
          ? "bg-primary text-primary-foreground"
          : dayHasSessions
          ? "bg-primary/10"
          : ""
      }`}
    >
      {format(day.date, "d")}
      {dayHasSessions && (
        <div 
          className={`absolute bottom-1 w-1 h-1 rounded-full ${
            isSameDay(day.date, selectedDay) 
              ? "bg-primary-foreground" 
              : "bg-primary"
          }`} 
        />
      )}
    </div>
  );
};

const SchedulePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showDialog, setShowDialog] = useState(false);
  const [view, setView] = useState<"day" | "week">("day");
  
  // Mock session data
  const sessions: Session[] = [
    {
      id: 1,
      studentName: "Alex Johnson",
      studentAvatar: "https://i.pravatar.cc/150?img=33",
      subject: "Algebra II",
      startTime: "09:00 AM",
      endTime: "10:00 AM",
      date: new Date(),
    },
    {
      id: 2,
      studentName: "Sam Wilson",
      studentAvatar: "https://i.pravatar.cc/150?img=12",
      subject: "Physics",
      startTime: "11:30 AM",
      endTime: "12:30 PM",
      date: new Date(),
    },
    {
      id: 3,
      studentName: "Emma Davis",
      studentAvatar: "https://i.pravatar.cc/150?img=23",
      subject: "Chemistry",
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      date: addDays(new Date(), 1),
    },
    {
      id: 4,
      studentName: "Ryan Thompson",
      studentAvatar: "https://i.pravatar.cc/150?img=53",
      subject: "Biology",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      date: addDays(new Date(), 2),
    },
  ];

  // Filter sessions for the selected date
  const getSessionsForDate = (date: Date) => {
    return sessions.filter(session => isSameDay(session.date, date));
  };

  // Navigation for days
  const nextDay = () => setSelectedDate(addDays(selectedDate, 1));
  const prevDay = () => setSelectedDate(subDays(selectedDate, 1));

  // Navigation for weeks
  const nextWeek = () => setSelectedDate(addDays(selectedDate, 7));
  const prevWeek = () => setSelectedDate(subDays(selectedDate, 7));

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Custom renderer for days in the calendar
  const renderDay = (day: any) => (
    <CustomDay
      day={day}
      selectedDay={selectedDate}
      sessions={sessions}
      onSelect={(date: Date) => setSelectedDate(date)}
    />
  );

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
            <h1 className="text-3xl font-bold mb-2">Schedule</h1>
            <p className="text-muted-foreground">Manage your tutoring sessions and appointments</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Calendar */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>Manage your schedule</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => date && setSelectedDate(date)}
                  className="rounded-md border"
                  components={{
                    Day: renderDay
                  }}
                  modifiers={{ today: new Date() }}
                />
                <div className="p-4">
                  <Button 
                    className="w-full"
                    onClick={() => setShowDialog(true)}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Session
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Daily Schedule */}
            <Card className="md:col-span-3">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Schedule</CardTitle>
                  <Tabs value={view} onValueChange={(v) => setView(v as "day" | "week")}>
                    <TabsList>
                      <TabsTrigger value="day">Day</TabsTrigger>
                      <TabsTrigger value="week">Week</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <Button variant="outline" size="icon" onClick={view === "day" ? prevDay : prevWeek}>
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="font-medium">
                    {view === "day" 
                      ? format(selectedDate, "MMMM d, yyyy")
                      : `${format(subDays(selectedDate, 3), "MMM d")} - ${format(addDays(selectedDate, 3), "MMM d, yyyy")}`
                    }
                  </span>
                  <Button variant="outline" size="icon" onClick={view === "day" ? nextDay : nextWeek}>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs value={view}>
                  <TabsContent value="day" className="m-0">
                    {getSessionsForDate(selectedDate).length > 0 ? (
                      <div className="space-y-4">
                        {getSessionsForDate(selectedDate)
                          .sort((a, b) => a.startTime.localeCompare(b.startTime))
                          .map((session) => (
                            <div key={session.id} className="flex items-center gap-4 p-4 border rounded-lg">
                              <div className="bg-primary/10 text-primary rounded-lg p-3">
                                <Clock className="h-5 w-5" />
                              </div>
                              <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="font-medium">{session.subject}</h3>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                      <Clock size={14} className="mr-1" />
                                      {session.startTime} - {session.endTime}
                                    </div>
                                  </div>
                                  <Button variant="outline" size="sm">Details</Button>
                                </div>
                                <div className="flex items-center mt-2 gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage src={session.studentAvatar} alt={session.studentName} />
                                    <AvatarFallback>{session.studentName[0]}</AvatarFallback>
                                  </Avatar>
                                  <span className="text-sm">{session.studentName}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                        <h3 className="font-medium text-lg mb-1">No Sessions Scheduled</h3>
                        <p className="text-muted-foreground mb-4">
                          You don't have any sessions scheduled for this day.
                        </p>
                        <Button onClick={() => setShowDialog(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Session
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="week" className="m-0">
                    <div className="text-center py-12">
                      <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                      <h3 className="font-medium text-lg mb-1">Week View Coming Soon</h3>
                      <p className="text-muted-foreground">
                        We're working on implementing a comprehensive week view.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Add Session Dialog */}
          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="sm:max-w-[475px]">
              <DialogHeader>
                <DialogTitle>Add New Session</DialogTitle>
                <DialogDescription>
                  Schedule a new tutoring session with a student.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="student">Student</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alex">Alex Johnson</SelectItem>
                      <SelectItem value="sam">Sam Wilson</SelectItem>
                      <SelectItem value="emma">Emma Davis</SelectItem>
                      <SelectItem value="ryan">Ryan Thompson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="date">Date</Label>
                    <div className="relative">
                      <Input 
                        id="date" 
                        type="text" 
                        value={format(selectedDate, "MMM d, yyyy")} 
                        readOnly 
                      />
                      <CalendarIcon className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="time">Time</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="9:00">9:00 AM - 10:00 AM</SelectItem>
                        <SelectItem value="10:00">10:00 AM - 11:00 AM</SelectItem>
                        <SelectItem value="11:00">11:00 AM - 12:00 PM</SelectItem>
                        <SelectItem value="1:00">1:00 PM - 2:00 PM</SelectItem>
                        <SelectItem value="2:00">2:00 PM - 3:00 PM</SelectItem>
                        <SelectItem value="3:00">3:00 PM - 4:00 PM</SelectItem>
                        <SelectItem value="4:00">4:00 PM - 5:00 PM</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Input id="notes" placeholder="Add session notes..." />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Schedule Session</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default SchedulePage;
