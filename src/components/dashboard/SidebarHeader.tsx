import { Shield, ChevronLeft, ChevronRight, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarHeaderProps = {
  collapsed: boolean;
  onToggle: () => void;
};

export function SidebarHeader({ collapsed, onToggle }: SidebarHeaderProps) {
  return (
    <div className="p-4 flex items-center justify-between border-b border-hacker-border bg-hacker-panel/30">
      <div
        className={cn(
          "flex items-center overflow-hidden",
          collapsed ? "w-0" : "w-full"
        )}
      >
        <div className="relative">
          <Shield className="h-6 w-6 text-hacker-purple" />
          <div className="absolute inset-0 rounded-full animate-pulse border border-hacker-purple/30"></div>
        </div>
        <span className="font-display whitespace-nowrap text-hacker-text-primary ml-2 tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-hacker-purple to-hacker-cyan">
          SOLGuardian
        </span>
      </div>
      <button
        onClick={onToggle}
        className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-hacker-panel/50 border border-hacker-border/50 hover:border-hacker-purple/30 transition-colors"
      >
        {collapsed ? (
          <ChevronRight className="h-4 w-4 text-hacker-purple" />
        ) : (
          <ChevronLeft className="h-4 w-4 text-hacker-purple" />
        )}
      </button>
    </div>
  );
}
