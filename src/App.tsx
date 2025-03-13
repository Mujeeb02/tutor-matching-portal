
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/StudentDashboard";
import TutorDashboard from "./pages/TutorDashboard";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import Plans from "./pages/Plans";
import Tutors from "./pages/Tutors";

// Import tutor dashboard pages
import Schedule from "./pages/tutor/Schedule";
import Students from "./pages/tutor/Students";
import Messages from "./pages/tutor/Messages";
import Materials from "./pages/tutor/Materials";
import Earnings from "./pages/tutor/Earnings";
import Analytics from "./pages/tutor/Analytics";

// Import student dashboard pages
import FindTutors from "./pages/student/FindTutors";
import MyTutors from "./pages/student/MyTutors";
import StudentSchedule from "./pages/student/Schedule";
import StudentMessages from "./pages/student/Messages";
import StudentMaterials from "./pages/student/Materials";
import StudentPayments from "./pages/student/Payments";
import StudentAnalytics from "./pages/student/Analytics";
import StudentSettings from "./pages/student/Settings";
import StudentHelp from "./pages/student/Help";
import SettingsPage from "./pages/tutor/Settings";
import HelpPage from "./pages/tutor/Help";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/features" element={<Features />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/tutors" element={<Tutors />} />
          
          {/* Student Dashboard Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-dashboard/find-tutors" element={<FindTutors />} />
          <Route path="/student-dashboard/my-tutors" element={<MyTutors />} />
          <Route path="/student-dashboard/schedule" element={<StudentSchedule />} />
          <Route path="/student-dashboard/messages" element={<StudentMessages />} />
          <Route path="/student-dashboard/materials" element={<StudentMaterials />} />
          <Route path="/student-dashboard/payments" element={<StudentPayments />} />
          <Route path="/student-dashboard/analytics" element={<StudentAnalytics />} />
          <Route path="/student-dashboard/settings" element={<StudentSettings />} />
          <Route path="/student-dashboard/help" element={<StudentHelp />} />
          
          {/* Tutor Dashboard Routes */}
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/schedule" element={<Schedule />} />
          <Route path="/tutor-dashboard/students" element={<Students />} />
          <Route path="/tutor-dashboard/messages" element={<Messages />} />
          <Route path="/tutor-dashboard/materials" element={<Materials />} />
          <Route path="/tutor-dashboard/earnings" element={<Earnings />} />
          <Route path="/tutor-dashboard/analytics" element={<Analytics />} />
          <Route path="/tutor-dashboard/settings" element={<SettingsPage />} />
          <Route path="/tutor-dashboard/help" element={<HelpPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
