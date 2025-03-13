import React, { useState } from "react";
import {
  Calendar,
  Download,
  DollarSign,
  ArrowUp,
  ArrowDown,
  CreditCard,
  Filter,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import TutorSidebar from "@/components/TutorSidebar";
import { cn } from "@/lib/utils";

interface TransactionType {
  id: number;
  amount: number;
  description: string;
  student: string;
  date: string;
  status: "completed" | "pending" | "cancelled";
  type: "session" | "subscription" | "withdrawal";
}

const Earnings = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [timeRange, setTimeRange] = useState("month");

  // Mock data for earnings
  const earningsData = {
    totalEarnings: "$4,580",
    thisMonth: "$1,245",
    lastMonth: "$980",
    pendingPayouts: "$320",
    totalSessions: 156,
    totalHours: 235,
    avgSessionRate: "$45",
  };

  // Mock data for transactions
  const transactions: TransactionType[] = [
    {
      id: 1,
      amount: 60,
      description: "1 hour Math session",
      student: "Alex Johnson",
      date: "Today",
      status: "completed",
      type: "session",
    },
    {
      id: 2,
      amount: 90,
      description: "1.5 hour Physics session",
      student: "Emma Davis",
      date: "Yesterday",
      status: "completed",
      type: "session",
    },
    {
      id: 3,
      amount: 120,
      description: "2 hour Chemistry session",
      student: "Sam Wilson",
      date: "3 days ago",
      status: "completed",
      type: "session",
    },
    {
      id: 4,
      amount: 200,
      description: "Monthly subscription",
      student: "Ryan Thompson",
      date: "1 week ago",
      status: "completed",
      type: "subscription",
    },
    {
      id: 5,
      amount: -500,
      description: "Withdrawal to bank account",
      student: "",
      date: "2 weeks ago",
      status: "completed",
      type: "withdrawal",
    },
    {
      id: 6,
      amount: 45,
      description: "45 min Biology session",
      student: "Jane Miller",
      date: "2 weeks ago",
      status: "pending",
      type: "session",
    },
  ];

  // Mock chart data
  const monthlyData = [
    { name: "Jan", earnings: 920 },
    { name: "Feb", earnings: 850 },
    { name: "Mar", earnings: 1100 },
    { name: "Apr", earnings: 1250 },
    { name: "May", earnings: 900 },
    { name: "Jun", earnings: 1400 },
    { name: "Jul", earnings: 1300 },
    { name: "Aug", earnings: 1580 },
    { name: "Sep", earnings: 1780 },
    { name: "Oct", earnings: 1245 },
    { name: "Nov", earnings: 0 },
    { name: "Dec", earnings: 0 },
  ];

  const weeklyData = [
    { name: "Mon", earnings: 250 },
    { name: "Tue", earnings: 320 },
    { name: "Wed", earnings: 180 },
    { name: "Thu", earnings: 290 },
    { name: "Fri", earnings: 205 },
    { name: "Sat", earnings: 0 },
    { name: "Sun", earnings: 0 },
  ];

  const dailyData = [
    { name: "9 AM", earnings: 60 },
    { name: "10 AM", earnings: 45 },
    { name: "11 AM", earnings: 0 },
    { name: "12 PM", earnings: 90 },
    { name: "1 PM", earnings: 0 },
    { name: "2 PM", earnings: 120 },
    { name: "3 PM", earnings: 45 },
    { name: "4 PM", earnings: 90 },
    { name: "5 PM", earnings: 0 },
    { name: "6 PM", earnings: 60 },
    { name: "7 PM", earnings: 0 },
    { name: "8 PM", earnings: 0 },
  ];

  // Subject earnings breakdown
  const subjectData = [
    { name: "Mathematics", earnings: 2150 },
    { name: "Physics", earnings: 1350 },
    { name: "Chemistry", earnings: 650 },
    { name: "Biology", earnings: 430 },
  ];

  const handleWithdraw = () => {
    toast.success("Withdrawal process initiated");
  };

  const handleDownloadReport = () => {
    toast.success("Earnings report downloaded");
  };

  const chartData =
    timeRange === "day"
      ? dailyData
      : timeRange === "week"
      ? weeklyData
      : monthlyData;

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <main className="container p-6 space-y-8">
          <div className="flex justify-between items-start sm:items-center flex-col sm:flex-row gap-4">
            <div>
              <h1 className="text-3xl font-bold">Earnings</h1>
              <p className="text-muted-foreground">
                Track your income and payment history
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadReport}>
                <Download size={16} className="mr-2" />
                Download Report
              </Button>
              <Button onClick={handleWithdraw}>Withdraw Funds</Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Earnings
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {earningsData.totalEarnings}
                    </h3>
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
                    <p className="text-sm text-muted-foreground">This Month</p>
                    <h3 className="text-2xl font-bold mt-1">
                      {earningsData.thisMonth}
                    </h3>
                    <p className="text-xs text-green-500 flex items-center mt-1">
                      <ArrowUp size={12} className="mr-1" />
                      27% from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                    <ArrowUp className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Pending Payouts
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {earningsData.pendingPayouts}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Sessions
                    </p>
                    <h3 className="text-2xl font-bold mt-1">
                      {earningsData.totalSessions}
                    </h3>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Earnings Chart */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Your earnings over time</CardDescription>
                </div>
                <Select defaultValue={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">Today</SelectItem>
                    <SelectItem value="week">This Week</SelectItem>
                    <SelectItem value="month">This Month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chartData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="colorEarnings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    className="stroke-muted"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                    className="text-muted-foreground"
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Earnings"]}
                    labelFormatter={(label) => `${label}`}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderRadius: "0.5rem",
                      border: "1px solid hsl(var(--border))",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="earnings"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorEarnings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Earnings By Subject */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle>Earnings By Subject</CardTitle>
                <CardDescription>Distribution by subject area</CardDescription>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={subjectData}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={true}
                      vertical={false}
                      className="stroke-muted"
                    />
                    <XAxis
                      type="number"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      tickFormatter={(value) => `$${value}`}
                    />
                    <YAxis
                      dataKey="name"
                      type="category"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      className="text-muted-foreground"
                      width={100}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Earnings"]}
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        borderRadius: "0.5rem",
                        border: "1px solid hsl(var(--border))",
                      }}
                    />
                    <Bar dataKey="earnings" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Transactions */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>
                      Your recent earnings and withdrawals
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter size={16} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 hover:bg-secondary/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-10 w-10 rounded-full flex items-center justify-center ${
                            transaction.type === "withdrawal"
                              ? "bg-destructive/20"
                              : transaction.status === "pending"
                              ? "bg-yellow-500/20"
                              : "bg-green-500/20"
                          }`}
                        >
                          {transaction.type === "withdrawal" ? (
                            <ArrowDown className={`h-5 w-5 text-destructive`} />
                          ) : transaction.type === "subscription" ? (
                            <CreditCard
                              className={`h-5 w-5 ${
                                transaction.status === "pending"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            />
                          ) : (
                            <DollarSign
                              className={`h-5 w-5 ${
                                transaction.status === "pending"
                                  ? "text-yellow-500"
                                  : "text-green-500"
                              }`}
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {transaction.description}
                          </p>
                          <div className="flex items-center gap-1">
                            {transaction.student && (
                              <span className="text-sm text-muted-foreground">
                                {transaction.student}
                              </span>
                            )}
                            {transaction.status === "pending" && (
                              <Badge
                                variant="outline"
                                className="ml-2 text-yellow-500 text-xs"
                              >
                                Pending
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-medium ${
                            transaction.amount < 0 ? "text-destructive" : ""
                          }`}
                        >
                          {transaction.amount < 0 ? "-" : "+"} $
                          {Math.abs(transaction.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing last 6 transactions
                </p>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Earnings;
