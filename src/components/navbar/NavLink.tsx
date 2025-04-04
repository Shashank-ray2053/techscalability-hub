
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

interface NavLinkProps {
  name: string;
  href: string;
  highlight?: boolean;
  scrolled: boolean;
  onClick: (href: string) => void;
}

export function NavLink({ name, href, highlight, scrolled, onClick }: NavLinkProps) {
  // For links that are anchors or homepage
  if (href.startsWith('#') || href === "/") {
    return (
      <button
        onClick={() => onClick(href)}
        className={cn(
          "px-5 py-2 text-sm font-medium rounded-full relative overflow-hidden transition-all hover-expand",
          highlight 
            ? "text-violet-500 font-semibold" 
            : scrolled 
              ? "text-gray-800 hover:text-violet-600" 
              : "text-white hover:text-white"
        )}
      >
        {name}
      </button>
    );
  }
  
  // For regular links
  return (
    <Link
      to={href}
      className={cn(
        "px-5 py-2 text-sm font-medium rounded-full relative overflow-hidden transition-all hover-expand",
        highlight 
          ? "text-violet-500 font-semibold" 
          : scrolled 
            ? "text-gray-800 hover:text-violet-600" 
            : "text-white hover:text-white"
      )}
    >
      {name === "Live Chat" ? (
        <span className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          {name}
        </span>
      ) : (
        name
      )}
    </Link>
  );
}
