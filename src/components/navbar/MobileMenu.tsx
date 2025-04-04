
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ConsultationForm } from "@/components/ConsultationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MobileNavLink } from "./MobileNavLink";

interface MobileMenuProps {
  isOpen: boolean;
  navLinks: Array<{ name: string; href: string; highlight?: boolean }>;
  handleNavClick: (href: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

export function MobileMenu({ isOpen, navLinks, handleNavClick, setIsOpen }: MobileMenuProps) {
  return (
    <div
      className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-screen" : "max-h-0"
      )}
    >
      <div className="px-4 py-5 space-y-3">
        {navLinks.map((link) => (
          <MobileNavLink 
            key={link.name}
            name={link.name}
            href={link.href}
            highlight={link.highlight}
            onClick={(href) => {
              handleNavClick(href);
              setIsOpen(false);
            }}
          />
        ))}
        <div className="pt-3 pb-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button 
                className="w-full rounded-full py-6 shadow-md bg-gradient-to-r from-indigo-600 to-purple-500 hover:from-indigo-500 hover:to-purple-400 hover:scale-105 transition-all duration-300 text-base" 
                onClick={() => setIsOpen(false)}
              >
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
        </div>
      </div>
    </div>
  );
}
