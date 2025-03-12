
import React, { useState } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("month");
  
  // Mock data
  const sessionData = [
    { name: "Jan", sessions: 12, hours: 18 },
    { name: "Feb", sessions: 15, hours: 21 },
    { name: "Mar", sessions: 18, hours: 24 },
    { name: "Apr", sessions: 16, hours: 22 },
    { name: "May", sessions: 20, hours: 27 },
    { name: "Jun", sessions: 22, hours: 30 },
    { name: "Jul", sessions: 25, hours: 35 },
    { name: "Aug", sessions: 28, hours: 38 },
    { name: "Sep", sessions: 30, hours: 42 },
    { name: "Oct", sessions: 26, hours: 36 },
    { name: "Nov", sessions: 0, hours: 0 },
    { name: "Dec", sessions: 0, hours: 0 },
  ];

  const subjectDistribution = [
    { name: "Mathematics", value: 45 },
    { name: "Physics", value: 30 },
    { name: "Chemistry", value: 15 },
    { name: "Biology", value: 10 },
  ];
  
  const studentGrowth = [
    { name: "Jan", students: 5 },
    { name: "Feb", students: 8 },
    { name: "Mar", students: 12 },
    { name: "Apr", students: 15 },
    { name: "May", students: 18 },
    { name: "Jun", students: 20 },
    { name: "Jul", students: 23 },
    { name: "Aug", students: 25 },
    { name: "Sep", students: 28 },
    { name: "Oct", students: 30 },
    { name: "Nov", students: 0 },
    { name: "Dec", students: 0 },
  ];
  
  const ratingData = [
    { name: "Week 1", rating: 4.6 },
    { name: "Week 2", rating: 4.7 },
    { name: "Week 3", rating: 4.8 },
    { name: "Week 4", rating: 4.9 },
    { name: "Week 5", rating: 4.8 },
    { name: "Week 6", rating: 4.9 },
    { name: "Week 7", rating: 5.0 },
    { name: "Week 8", rating: 4.9 },
  ];
  
  const timeOfDayData = [
    { name: "8-10 AM", sessions: 15 },
    { name: "10-12 PM", sessions: 20 },
    { name: "12-2 PM", sessions: 10 },
    { name: "2-4 PM", sessions: 25 },
    { name: "4-6 PM", sessions: 35 },
    { name: "6-8 PM", sessions: 30 },
    { name: "8-10 PM", sessions: 15 },
  ];
  
  const studentFeedback = [
    { name: "Very Satisfied", value: 65 },
    { name: "Satisfied", value: 25 },
    { name: "Neutral", value: 7 },
    { name: "Unsatisfied", value: 3 },
  ];

  // Colors for pie charts
  const COLORS = ["hsl(var(--primary))", "hsl(var(--primary) / 0.8)", "hsl(var(--primary) / 0.6)", "hsl(var(--primary) / 0.4)"];
  const FEEDBACK_COLORS = ["#10b981", "#60a5fa", "#f59e0b", "#ef4444"];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your tutoring performance and growth</p>
        </div>
        <Select defaultValue={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Students</p>
              <h3 className="text-2xl font-bold mt-1">30</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                +10% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Sessions This Month</p>
              <h3 className="text-2xl font-bold mt-1">26</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                +8% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Hours Taught</p>
              <h3 className="text-2xl font-bold mt-1">36</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                +5% from last month
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <h3 className="text-2xl font-bold mt-1">4.9/5.0</h3>
              <p className="text-xs text-green-500 flex items-center mt-1">
                +0.1 from last month
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for different analytics views */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="w-full justify-start mb-6">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance" className="space-y-6">
          {/* Sessions & Hours Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Sessions & Hours</CardTitle>
              <CardDescription>Track your tutoring sessions and hours taught</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sessionData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-muted-foreground" />
                  <YAxis axisLine={false} tickLine={false} className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
                  />
                  <Legend />
                  <Bar dataKey="sessions" name="Sessions" fill="hsl(var(--primary))" />
                  <Bar dataKey="hours" name="Hours" fill="hsl(var(--primary) / 0.6)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Subject Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Distribution</CardTitle>
                <CardDescription>Sessions by subject area</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={subjectDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {subjectDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value) => [`${value}%`, "Percentage"]}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Popular Teaching Times */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Teaching Times</CardTitle>
                <CardDescription>When you conduct most sessions</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={timeOfDayData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-muted-foreground" />
                    <YAxis axisLine={false} tickLine={false} className="text-muted-foreground" />
                    <Tooltip
                      formatter={(value) => [`${value} sessions`, "Count"]}
                      contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
                    />
                    <Bar dataKey="sessions" name="Sessions" fill="hsl(var(--primary) / 0.8)" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="students" className="space-y-6">
          {/* Student Growth */}
          <Card>
            <CardHeader>
              <CardTitle>Student Growth</CardTitle>
              <CardDescription>Track your student acquisition over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={studentGrowth}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-muted-foreground" />
                  <YAxis axisLine={false} tickLine={false} className="text-muted-foreground" />
                  <Tooltip
                    formatter={(value) => [`${value} students`, "Total"]}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="students" 
                    stroke="hsl(var(--primary))" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Student Retention */}
          <Card>
            <CardHeader>
              <CardTitle>Student Retention</CardTitle>
              <CardDescription>Students by duration</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-secondary/40 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold">8</h3>
                  <p className="text-sm text-muted-foreground">New Students</p>
                  <Badge className="mt-2">Last 30 days</Badge>
                </div>
                <div className="bg-secondary/40 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold">12</h3>
                  <p className="text-sm text-muted-foreground">1-3 Months</p>
                  <Badge variant="outline" className="mt-2">Returning</Badge>
                </div>
                <div className="bg-secondary/40 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold">7</h3>
                  <p className="text-sm text-muted-foreground">3-6 Months</p>
                  <Badge variant="outline" className="mt-2">Regular</Badge>
                </div>
                <div className="bg-secondary/40 rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold">3</h3>
                  <p className="text-sm text-muted-foreground">6+ Months</p>
                  <Badge variant="secondary" className="mt-2">Loyal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="feedback" className="space-y-6">
          {/* Rating Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Rating Trend</CardTitle>
              <CardDescription>Your rating over time</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={ratingData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} className="text-muted-foreground" />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    className="text-muted-foreground" 
                    domain={[4, 5]}
                    ticks={[4, 4.2, 4.4, 4.6, 4.8, 5]}
                  />
                  <Tooltip 
                    formatter={(value) => [`${value}/5.0`, "Rating"]}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="hsl(var(--primary))" 
                    activeDot={{ r: 8 }} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Student Satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle>Student Satisfaction</CardTitle>
              <CardDescription>Based on post-session feedback</CardDescription>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={studentFeedback}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentFeedback.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={FEEDBACK_COLORS[index % FEEDBACK_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{ backgroundColor: "hsl(var(--card))", borderRadius: "0.5rem", border: "1px solid hsl(var(--border))" }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
