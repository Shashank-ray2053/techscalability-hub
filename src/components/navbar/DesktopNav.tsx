
import { Button } from "@/components/ui/button";
import { ConsultationForm } from "@/components/ConsultationForm";
import { MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NavLink } from "./NavLink";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface DesktopNavProps {
  navLinks: Array<{ name: string; href: string; highlight?: boolean }>;
  scrolled: boolean;
  handleNavClick: (href: string) => void;
}

export function DesktopNav({ navLinks, scrolled, handleNavClick }: DesktopNavProps) {
  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navLinks.map((link) => (
        <NavLink
          key={link.name}
          name={link.name}
          href={link.href}
          highlight={link.highlight}
          scrolled={scrolled}
          onClick={handleNavClick}
        />
      ))}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-3 rounded-full px-6 shadow-md bg-gradient-to-r from-primary to-primary-400 hover:from-primary-500 hover:to-primary-300 hover:scale-105 transition-all duration-300">
            Get Started
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Free Consultation</DialogTitle>
            <DialogDescription>
              Fill out this form to request a free consultation with our experts.
            </DialogDescription>
          </DialogHeader>
          <ConsultationForm />
        </DialogContent>
      </Dialog>
    </nav>
  );
}
