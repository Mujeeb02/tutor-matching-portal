
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
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/student-dashboard/find-tutors" element={<StudentDashboard />} />
          <Route path="/student-dashboard/my-tutors" element={<StudentDashboard />} />
          <Route path="/student-dashboard/schedule" element={<StudentDashboard />} />
          <Route path="/student-dashboard/messages" element={<StudentDashboard />} />
          <Route path="/student-dashboard/materials" element={<StudentDashboard />} />
          <Route path="/student-dashboard/payments" element={<StudentDashboard />} />
          <Route path="/student-dashboard/analytics" element={<StudentDashboard />} />
          <Route path="/student-dashboard/settings" element={<StudentDashboard />} />
          <Route path="/student-dashboard/help" element={<StudentDashboard />} />
          <Route path="/tutor-dashboard" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/schedule" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/students" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/messages" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/materials" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/earnings" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/analytics" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/settings" element={<TutorDashboard />} />
          <Route path="/tutor-dashboard/help" element={<TutorDashboard />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
