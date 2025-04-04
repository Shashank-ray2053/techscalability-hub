
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
          "px-5 py-2 text-sm font-medium rounded-full relative overflow-hidden transition-all",
          "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-purple-500/20 before:to-indigo-500/20 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]",
          highlight 
            ? "text-indigo-500 font-semibold" 
            : scrolled 
              ? "text-gray-800 hover:text-indigo-600" 
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
        "px-5 py-2 text-sm font-medium rounded-full relative overflow-hidden transition-all",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-gradient-to-r before:from-purple-500/20 before:to-indigo-500/20 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]",
        highlight 
          ? "text-indigo-500 font-semibold" 
          : scrolled 
            ? "text-gray-800 hover:text-indigo-600" 
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
