
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";

interface MobileNavLinkProps {
  name: string;
  href: string;
  highlight?: boolean;
  onClick: (href: string) => void;
}

export function MobileNavLink({ name, href, highlight, onClick }: MobileNavLinkProps) {
  // For links that are anchors or homepage
  if (href.startsWith('#') || href === "/") {
    return (
      <button
        onClick={() => onClick(href)}
        className={cn(
          "block w-full px-5 py-3 text-base font-medium rounded-full text-left relative overflow-hidden hover-shimmer",
          highlight 
            ? "text-violet-600 font-semibold" 
            : "text-gray-700"
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
        "block px-5 py-3 text-base font-medium rounded-full relative overflow-hidden hover-shimmer",
        highlight 
          ? "text-violet-600 font-semibold" 
          : "text-gray-700"
      )}
    >
      {name === "Live Chat" ? (
        <span className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          {name}
        </span>
      ) : (
        name
      )}
    </Link>
  );
}
