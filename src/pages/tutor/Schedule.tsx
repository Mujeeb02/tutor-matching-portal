
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format, addDays, parseISO, isWithinInterval } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const SchedulePage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showSessionModal, setShowSessionModal] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock data
  const upcomingSessions = [
    {
      id: 1,
      studentName: "Alex Johnson",
      subject: "Mathematics",
      topic: "Calculus II - Integrals",
      date: addDays(new Date(), 1).toISOString(),
      startTime: "14:00",
      endTime: "15:30",
      status: "confirmed",
    },
    {
      id: 2,
      studentName: "Emma Wilson",
      subject: "Physics",
      topic: "Mechanics - Forces and Motion",
      date: addDays(new Date(), 2).toISOString(),
      startTime: "10:00",
      endTime: "11:00",
      status: "confirmed",
    },
    {
      id: 3,
      studentName: "James Brown",
      subject: "Chemistry",
      topic: "Organic Chemistry - Alkanes",
      date: addDays(new Date(), 3).toISOString(),
      startTime: "16:00",
      endTime: "17:30",
      status: "pending",
    },
  ];

  const availabilityHours = [
    { day: "Monday", hours: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }] },
    { day: "Tuesday", hours: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }] },
    { day: "Wednesday", hours: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }] },
    { day: "Thursday", hours: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }] },
    { day: "Friday", hours: [{ start: "09:00", end: "12:00" }, { start: "14:00", end: "18:00" }] },
    { day: "Saturday", hours: [{ start: "10:00", end: "14:00" }] },
    { day: "Sunday", hours: [] },
  ];

  const [newSession, setNewSession] = useState({
    subject: "",
    topic: "",
    date: new Date().toISOString(),
    startTime: "",
    endTime: "",
    notes: "",
  });

  const handleAddSession = () => {
    // Validation and processing would go here
    toast.success("Session added to your schedule!");
    setShowSessionModal(false);
  };

  const handleCancelSession = (id: number) => {
    toast.success("Session cancelled successfully!");
    console.log("Cancelled session:", id);
  };

  const handleViewDay = (day: Date) => {
    setDate(day);
    setShowCalendarModal(false);
  };

  const getDaySessionCount = (day: Date) => {
    return upcomingSessions.filter((session) => {
      const sessionDate = parseISO(session.date);
      return (
        sessionDate.getDate() === day.getDate() &&
        sessionDate.getMonth() === day.getMonth() &&
        sessionDate.getFullYear() === day.getFullYear()
      );
    }).length;
  };

  const getSessionsForDay = (day: Date) => {
    return upcomingSessions.filter((session) => {
      const sessionDate = parseISO(session.date);
      return (
        sessionDate.getDate() === day.getDate() &&
        sessionDate.getMonth() === day.getMonth() &&
        sessionDate.getFullYear() === day.getFullYear()
      );
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Schedule</h1>
          <p className="text-muted-foreground mt-1">Manage your tutoring sessions and availability</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button 
            variant="outline" 
            onClick={() => setShowCalendarModal(true)}
            className="flex items-center gap-2"
          >
            <CalendarIcon size={16} />
            <span>View Calendar</span>
          </Button>
          <Button 
            onClick={() => setShowSessionModal(true)}
            className="flex items-center gap-2"
          >
            <Plus size={16} />
            <span>Add Session</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
          <TabsTrigger value="daily">Daily View</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingSessions.length > 0 ? (
            upcomingSessions.map((session) => (
              <Card key={session.id} className="mb-4 hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row justify-between gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-2 mb-3">
                        <h3 className="text-lg font-semibold">{session.subject}</h3>
                        <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                          {session.status === "confirmed" ? "Confirmed" : "Pending"}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2">{session.topic}</p>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mt-3">
                        <div className="flex items-center">
                          <CalendarIcon size={16} className="mr-2 text-muted-foreground" />
                          <span>{format(parseISO(session.date), "MMM dd, yyyy")}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock size={16} className="mr-2 text-muted-foreground" />
                          <span>{`${session.startTime} - ${session.endTime}`}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://i.pravatar.cc/150?img=${session.id + 30}`} 
                          alt={session.studentName} 
                          className="w-10 h-10 rounded-full border border-border" 
                        />
                        <span className="font-medium">{session.studentName}</span>
                      </div>
                      <div className="flex gap-2 mt-3 sm:mt-0">
                        <Button variant="default" size="sm">Start</Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleCancelSession(session.id)}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-12">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="text-lg font-medium mb-1">No Upcoming Sessions</h3>
              <p className="text-muted-foreground mb-4">You don't have any sessions scheduled yet.</p>
              <Button onClick={() => setShowSessionModal(true)}>Add New Session</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="daily" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle>
                <div className="flex items-center gap-3">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setDate(addDays(date, -1))}
                  >
                    <ChevronLeft size={18} />
                  </Button>
                  <span>{format(date, "EEEE, MMMM d, yyyy")}</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setDate(addDays(date, 1))}
                  >
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </CardTitle>
              <Button 
                variant="outline" 
                onClick={() => setShowCalendarModal(true)}
                className="flex items-center gap-2"
              >
                <CalendarIcon size={16} />
                <span className="hidden sm:inline">Choose Date</span>
              </Button>
            </CardHeader>
            <CardContent className="pt-4">
              {getSessionsForDay(date).length > 0 ? (
                <div className="space-y-4">
                  {getSessionsForDay(date).map((session) => (
                    <div 
                      key={session.id} 
                      className="flex items-center p-4 rounded-lg border border-border"
                    >
                      <div className="ml-3 flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{session.startTime} - {session.endTime}</span>
                          <Badge variant={session.status === "confirmed" ? "default" : "secondary"}>
                            {session.status === "confirmed" ? "Confirmed" : "Pending"}
                          </Badge>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-0 sm:gap-6 mt-1">
                          <p>{session.subject} - {session.topic}</p>
                          <p className="text-sm text-muted-foreground flex items-center mt-1 sm:mt-0">
                            <span>with</span> 
                            <img 
                              src={`https://i.pravatar.cc/150?img=${session.id + 30}`} 
                              alt={session.studentName} 
                              className="w-5 h-5 rounded-full mx-1" 
                            />
                            <span>{session.studentName}</span>
                          </p>
                        </div>
                      </div>
                      <div className="ml-2">
                        <Button size="sm">Start</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No Sessions Today</h3>
                  <p className="text-muted-foreground mb-4">You don't have any sessions scheduled for this day.</p>
                  <Button onClick={() => setShowSessionModal(true)}>Add Session</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Availability</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {availabilityHours.map((day) => (
                  <div key={day.day} className="border-b border-border pb-4 last:border-0">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">{day.day}</h3>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                    {day.hours.length > 0 ? (
                      <div className="space-y-2">
                        {day.hours.map((hour, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <Badge variant="outline" className="text-sm font-normal">
                              {hour.start} - {hour.end}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">Not available</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-border">
                <Button className="w-full">Update Availability</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Calendar Modal */}
      <Dialog open={showCalendarModal} onOpenChange={setShowCalendarModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Calendar View</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day) => day && handleViewDay(day)}
              className="rounded-md border"
              components={{
                DayContent: ({ day }) => (
                  <div className="relative flex h-8 w-8 items-center justify-center">
                    {day.day}
                    {getDaySessionCount(day.date) > 0 && (
                      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                    )}
                  </div>
                ),
              }}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCalendarModal(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Session Modal */}
      <Dialog open={showSessionModal} onOpenChange={setShowSessionModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Session</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="student">Student</Label>
                <Select defaultValue="alex">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a student" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alex">Alex Johnson</SelectItem>
                    <SelectItem value="emma">Emma Wilson</SelectItem>
                    <SelectItem value="james">James Brown</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  value={newSession.subject}
                  onChange={(e) => setNewSession({...newSession, subject: e.target.value})}
                  placeholder="e.g. Mathematics, Physics" 
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="topic">Topic</Label>
                <Input 
                  id="topic" 
                  value={newSession.topic}
                  onChange={(e) => setNewSession({...newSession, topic: e.target.value})}
                  placeholder="e.g. Calculus, Mechanics" 
                />
              </div>
              
              <div className="col-span-2">
                <Label>Date</Label>
                <div className="mt-1">
                  <Calendar
                    mode="single"
                    selected={parseISO(newSession.date)}
                    onSelect={(day) => day && setNewSession({...newSession, date: day.toISOString()})}
                    className="rounded-md border p-3"
                    initialFocus
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input 
                  id="startTime" 
                  type="time"
                  value={newSession.startTime}
                  onChange={(e) => setNewSession({...newSession, startTime: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input 
                  id="endTime" 
                  type="time"
                  value={newSession.endTime}
                  onChange={(e) => setNewSession({...newSession, endTime: e.target.value})}
                />
              </div>
              
              <div className="col-span-2">
                <Label htmlFor="notes">Session Notes (Optional)</Label>
                <Textarea 
                  id="notes" 
                  value={newSession.notes}
                  onChange={(e) => setNewSession({...newSession, notes: e.target.value})}
                  placeholder="Add any notes or preparation details for the session" 
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSessionModal(false)}>Cancel</Button>
            <Button onClick={handleAddSession}>Add Session</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SchedulePage;
