
import { useState } from "react";
import { cn } from "@/lib/utils";
import StudentSidebar from "@/components/StudentSidebar";
import { 
  BarChart,
  BarChart3,
  TrendingUp,
  Clock,
  Calendar,
  LineChart,
  PieChart,
  Users,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Legend
} from "recharts";

const AnalyticsPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Mock data for charts
  const sessionData = [
    { month: 'Jan', sessions: 5 },
    { month: 'Feb', sessions: 8 },
    { month: 'Mar', sessions: 12 },
    { month: 'Apr', sessions: 10 },
    { month: 'May', sessions: 15 },
    { month: 'Jun', sessions: 18 },
  ];

  const hoursData = [
    { month: 'Jan', hours: 7 },
    { month: 'Feb', hours: 12 },
    { month: 'Mar', hours: 18 },
    { month: 'Apr', hours: 15 },
    { month: 'May', hours: 23 },
    { month: 'Jun', hours: 27 },
  ];

  const subjectDistribution = [
    { name: 'Mathematics', value: 45 },
    { name: 'Physics', value: 20 },
    { name: 'Chemistry', value: 15 },
    { name: 'Literature', value: 20 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  // Mock data for progress by subject
  const subjectsProgress = [
    { id: 1, name: "Mathematics", progress: 75 },
    { id: 2, name: "Physics", progress: 60 },
    { id: 3, name: "English Literature", progress: 90 },
    { id: 4, name: "Chemistry", progress: 45 },
    { id: 5, name: "Biology", progress: 55 },
  ];

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
            <h1 className="text-3xl font-bold mb-2">Learning Analytics</h1>
            <p className="text-muted-foreground">Track your progress and learning patterns</p>
          </div>

          {/* Overview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Sessions</p>
                    <h3 className="text-2xl font-bold mt-1">68</h3>
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
                    <h3 className="text-2xl font-bold mt-1">102</h3>
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
                    <p className="text-sm text-muted-foreground">Subjects</p>
                    <h3 className="text-2xl font-bold mt-1">5</h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-primary" />
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

          {/* Main Analytics Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Charts */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Learning Progress Over Time</CardTitle>
                  <CardDescription>Track your sessions and hours spent learning</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="sessions" className="w-full">
                    <TabsList className="mb-4">
                      <TabsTrigger value="sessions">Sessions</TabsTrigger>
                      <TabsTrigger value="hours">Hours</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sessions">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsBarChart
                            data={sessionData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <RechartsTooltip />
                            <Bar dataKey="sessions" fill="#8884d8" />
                          </RechartsBarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                    <TabsContent value="hours">
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsLineChart
                            data={hoursData}
                            margin={{
                              top: 10,
                              right: 30,
                              left: 0,
                              bottom: 5,
                            }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <RechartsTooltip />
                            <Line type="monotone" dataKey="hours" stroke="#8884d8" activeDot={{ r: 8 }} />
                          </RechartsLineChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subject Progress</CardTitle>
                  <CardDescription>Your progress across different subjects</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjectsProgress.map((subject) => (
                      <div key={subject.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{subject.name}</span>
                          <span className="text-sm text-muted-foreground">{subject.progress}%</span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Cards */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Subject Distribution</CardTitle>
                  <CardDescription>Time spent on each subject</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[240px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={subjectDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          paddingAngle={5}
                          dataKey="value"
                          label
                        >
                          {subjectDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Learning Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Total Days Studied</span>
                    </div>
                    <span className="font-medium">42</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Different Tutors</span>
                    </div>
                    <span className="font-medium">7</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b">
                    <div className="flex items-center gap-2">
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Avg. Session Length</span>
                    </div>
                    <span className="font-medium">75 min</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Growth Rate</span>
                    </div>
                    <span className="font-medium text-green-600">+12%</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Generate Full Report
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AnalyticsPage;
