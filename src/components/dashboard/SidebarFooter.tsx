import { Settings, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

type SidebarFooterProps = {
  collapsed: boolean;
};

export function SidebarFooter({ collapsed }: SidebarFooterProps) {
  return (
    <div className="p-4 border-t border-hacker-border bg-hacker-panel/30 flex items-center justify-between">
      <div className="flex items-center">
        <Terminal
          className={cn(
            "h-5 w-5 text-hacker-cyan",
            collapsed ? "mx-auto" : "mr-3"
          )}
        />
        <span
          className={cn(
            "text-sm font-medium text-hacker-text-secondary font-mono",
            collapsed ? "w-0 opacity-0" : "opacity-100"
          )}
        >
          Terminal
        </span>
      </div>
      {!collapsed && (
        <Settings className="h-5 w-5 text-hacker-text-muted hover:text-hacker-purple transition-colors cursor-pointer" />
      )}
    </div>
  );
}
