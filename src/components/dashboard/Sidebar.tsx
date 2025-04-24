import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Home,
  AlertTriangle,
  BookOpen,
  GitFork,
  BarChart3,
  Bell,
  Shield,
  Settings,
} from "lucide-react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarNav } from "./SidebarNav";
import { SidebarFooter } from "./SidebarFooter";
import { NavItem } from "./types/sidebar";

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home,
    description: "Overview of Solana security status and recent incidents",
  },
  {
    title: "Exploit History",
    href: "/exploit-history",
    icon: AlertTriangle,
    description: "Historical record of security incidents on Solana",
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
    description: "Visualizations and trends of security incidents",
  },
  {
    title: "Monitoring",
    href: "/monitoring",
    icon: Bell,
    description: "Real-time alerts and monitoring system",
  },
  {
    title: "Security Hub",
    href: "/security-hub",
    icon: Shield,
    description: "Security resources and best practices",
  },
  {
    title: "Documentation",
    href: "/docs",
    icon: BookOpen,
    description: "Project documentation and guides",
  },
  {
    title: "Contribute",
    href: "/contribute",
    icon: GitFork,
    description: "Contribute to the Solana Security Dashboard",
  },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = React.useState(false);

  return (
    <div
      className={cn(
        "hidden md:flex flex-col border-r border-border/10 bg-sidebar/10 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <SidebarHeader 
        collapsed={collapsed} 
        onToggle={() => setCollapsed(!collapsed)} 
      />
      <div className="flex-1 py-4 overflow-auto">
        <SidebarNav items={navItems} collapsed={collapsed} />
      </div>
      <SidebarFooter collapsed={collapsed} />
    </div>
  );
}
