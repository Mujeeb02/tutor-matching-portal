import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Home,
  Calendar,
  Users,
  MessageSquare,
  FileText,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  Menu,
  DollarSign,
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

interface TutorSidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const TutorSidebar = ({ isOpen, toggleSidebar }: TutorSidebarProps) => {
  const location = useLocation();
  const tutorName = "Michael Smith";
  const tutorTitle = "Math & Physics Tutor";
  
  // Mock notification counts
  const messageCount = 3;
  const materialCount = 2;

  return (
    <>
      {/* Floating hamburger button when sidebar is closed */}
      {!isOpen && (
        <Button
          variant="outline"
          size="icon"
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 h-10 w-10 rounded-full shadow-md"
        >
          <Menu size={20} />
        </Button>
      )}

      <div
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-card border-r transition-all duration-300",
          isOpen ? "w-64 translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 flex items-center justify-between">
          <div className={cn("flex items-center gap-2", !isOpen && "hidden")}>
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://i.pravatar.cc/150?img=35" alt={tutorName} />
              <AvatarFallback>TS</AvatarFallback>
            </Avatar>
            <div className={cn("flex flex-col", !isOpen && "hidden")}>
              <span className="font-semibold text-sm">{tutorName}</span>
              <span className="text-xs text-muted-foreground">{tutorTitle}</span>
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
              href="/tutor-dashboard"
              active={location.pathname === "/tutor-dashboard"}
            />
            <SidebarItem
              icon={Calendar}
              label="Schedule"
              href="/tutor-dashboard/schedule"
              active={location.pathname === "/tutor-dashboard/schedule"}
            />
            <SidebarItem
              icon={Users}
              label="Students"
              href="/tutor-dashboard/students"
              active={location.pathname === "/tutor-dashboard/students"}
            />
            <SidebarItem
              icon={MessageSquare}
              label="Messages"
              href="/tutor-dashboard/messages"
              active={location.pathname === "/tutor-dashboard/messages"}
              badge={messageCount}
            />
            <SidebarItem
              icon={FileText}
              label="Materials"
              href="/tutor-dashboard/materials"
              active={location.pathname === "/tutor-dashboard/materials"}
              badge={materialCount}
            />
            <SidebarItem
              icon={DollarSign}
              label="Earnings"
              href="/tutor-dashboard/earnings"
              active={location.pathname === "/tutor-dashboard/earnings"}
            />
            <SidebarItem
              icon={BarChart3}
              label="Analytics"
              href="/tutor-dashboard/analytics"
              active={location.pathname === "/tutor-dashboard/analytics"}
            />
          </nav>

          <Separator className="my-4" />

          <nav className="space-y-1.5">
            <SidebarItem
              icon={Settings}
              label="Settings"
              href="/tutor-dashboard/settings"
              active={location.pathname === "/tutor-dashboard/settings"}
            />
            <SidebarItem
              icon={HelpCircle}
              label="Help & Support"
              href="/tutor-dashboard/help"
              active={location.pathname === "/tutor-dashboard/help"}
            />
            <SidebarItem icon={LogOut} label="Logout" href="/login" />
          </nav>
        </div>
      </div>
    </>
  );
};

export default TutorSidebar;
