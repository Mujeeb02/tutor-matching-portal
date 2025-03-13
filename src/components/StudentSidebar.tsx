
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Search,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  CreditCard,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
}

const SidebarItem = ({ icon: Icon, label, href, active, badge }: SidebarItemProps) => {
  return (
    <Link to={href}>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-start gap-3 font-normal h-11",
          active && "bg-primary/10 text-primary font-medium"
        )}
      >
        <Icon size={20} />
        <span className="flex-grow text-left">{label}</span>
        {badge !== undefined && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-medium rounded-full bg-primary/20 text-primary">
            {badge}
          </span>
        )}
      </Button>
    </Link>
  );
};

interface StudentSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const StudentSidebar = ({ isOpen, toggleSidebar }: StudentSidebarProps) => {
  const location = useLocation();
  const studentName = "Sarah Johnson";
  const studentTitle = "Premium Plan";
  
  // Mock notification counts
  const messageCount = 2;
  const materialCount = 1;

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-40 h-screen bg-card transition-all duration-300 border-r",
        isOpen ? "w-64" : "w-20"
      )}
    >
      <div className="p-4 flex items-center justify-between">
        <div className={cn("flex items-center gap-2", !isOpen && "hidden")}>
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://i.pravatar.cc/150?img=5" alt={studentName} />
            <AvatarFallback>SJ</AvatarFallback>
          </Avatar>
          <div className={cn("flex flex-col", !isOpen && "hidden")}>
            <span className="font-semibold text-sm">{studentName}</span>
            <span className="text-xs text-muted-foreground">{studentTitle}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="shrink-0">
          <Menu size={20} />
        </Button>
      </div>

      <Separator />

      <div className="px-3 py-4 overflow-y-auto h-[calc(100vh-64px)]">
        <nav className="space-y-1.5">
          <SidebarItem
            icon={Home}
            label="Dashboard"
            href="/student-dashboard"
            active={location.pathname === "/student-dashboard"}
          />
          <SidebarItem
            icon={Search}
            label="Find Tutors"
            href="/student-dashboard/find-tutors"
            active={location.pathname === "/student-dashboard/find-tutors"}
          />
          <SidebarItem
            icon={Users}
            label="My Tutors"
            href="/student-dashboard/my-tutors"
            active={location.pathname === "/student-dashboard/my-tutors"}
          />
          <SidebarItem
            icon={Calendar}
            label="Schedule"
            href="/student-dashboard/schedule"
            active={location.pathname === "/student-dashboard/schedule"}
          />
          <SidebarItem
            icon={MessageSquare}
            label="Messages"
            href="/student-dashboard/messages"
            active={location.pathname === "/student-dashboard/messages"}
            badge={messageCount}
          />
          <SidebarItem
            icon={FileText}
            label="Learning Materials"
            href="/student-dashboard/materials"
            active={location.pathname === "/student-dashboard/materials"}
            badge={materialCount}
          />
          <SidebarItem
            icon={CreditCard}
            label="Payments"
            href="/student-dashboard/payments"
            active={location.pathname === "/student-dashboard/payments"}
          />
          <SidebarItem
            icon={BarChart3}
            label="Progress Analytics"
            href="/student-dashboard/analytics"
            active={location.pathname === "/student-dashboard/analytics"}
          />
        </nav>

        <Separator className="my-4" />

        <nav className="space-y-1.5">
          <SidebarItem
            icon={Settings}
            label="Settings"
            href="/student-dashboard/settings"
            active={location.pathname === "/student-dashboard/settings"}
          />
          <SidebarItem
            icon={HelpCircle}
            label="Help & Support"
            href="/student-dashboard/help"
            active={location.pathname === "/student-dashboard/help"}
          />
          <SidebarItem icon={LogOut} label="Logout" href="/login" />
        </nav>
      </div>
    </div>
  );
};

export default StudentSidebar;
