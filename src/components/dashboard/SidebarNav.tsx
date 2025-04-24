import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { NavItem } from "./types/sidebar";

type SidebarNavProps = {
  items: NavItem[];
  collapsed: boolean;
};

export function SidebarNav({ items, collapsed }: SidebarNavProps) {
  const location = useLocation();

  return (
    <nav className="space-y-1 px-2">
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            "flex items-center px-3 py-2 rounded-md group transition-colors",
            location.pathname === item.href
              ? "bg-purple-100/10 text-white"
              : "hover:bg-sidebar-accent/10 text-white/70 hover:text-white"
          )}
        >
          <item.icon
            className={cn(
              "h-5 w-5 mr-3",
              location.pathname === item.href
                ? "text-white"
                : "text-white/50 group-hover:text-white"
            )}
          />
          <span
            className={cn(
              "text-sm font-medium",
              collapsed ? "w-0 opacity-0" : "opacity-100"
            )}
          >
            {item.title}
          </span>
        </Link>
      ))}
    </nav>
  );
}
