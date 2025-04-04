
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, MessageCircle } from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "#contact" },
  { name: "Live Chat", href: "/chat", highlight: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    if (href === "/") {
      navigate("/");
      setIsOpen(false);
      window.scrollTo(0, 0);
      return;
    }
    
    if (href.startsWith('#')) {
      if (location.pathname !== '/') {
        navigate('/', { state: { scrollTo: href } });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(href);
    }
    
    if (isOpen) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          navigate(location.pathname, { replace: true, state: {} });
        }
      }, 100);
    }
  }, [location, navigate]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "py-3 bg-background/90 backdrop-blur-lg shadow-md"
          : "py-3 bg-transparent"  // Reduced padding to keep the menubar height consistent
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo with improved visibility and extended width */}
          <div className="flex items-center h-14 overflow-visible">
            <button 
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
              }} 
              className="flex items-center"
            >
              <img 
                src="/lovable-uploads/8ba19533-60ad-4952-b0e3-9764de070c12.png" 
                alt="TechXplore Logo" 
                className="h-20 w-auto max-w-[200px] translate-y-1" // Extended width and slightly adjusted position
              />
            </button>
          </div>

          <nav className="hidden md:flex items-center space-x-2">
            {navLinks.map((link) => (
              link.href.startsWith('#') || link.href === "/" ? (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "px-5 py-2 text-sm font-medium rounded-full relative overflow-hidden transition-all",
                    "before:content-[''] before:absolute before:inset-0 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]",
                    link.highlight 
                      ? "text-white before:bg-primary-600" 
                      : scrolled 
                        ? "text-foreground/90 hover:text-primary before:bg-primary/10" 
                        : "text-white hover:text-white before:bg-white/20"
                  )}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-5 py-2 text-sm font-medium rounded-full relative overflow-hidden transition-all",
                    "before:content-[''] before:absolute before:inset-0 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]",
                    link.highlight 
                      ? "text-white before:bg-primary-600" 
                      : scrolled 
                        ? "text-foreground/90 hover:text-primary before:bg-primary/10" 
                        : "text-white hover:text-white before:bg-white/20"
                  )}
                >
                  {link.name === "Live Chat" ? (
                    <span className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      {link.name}
                    </span>
                  ) : (
                    link.name
                  )}
                </Link>
              )
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

          <button
            className={cn(
              "md:hidden p-2 rounded-full backdrop-blur-sm transition-colors",
              scrolled
                ? "bg-white/10 text-foreground hover:bg-white/20"
                : "bg-black/10 text-white hover:bg-black/20"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
          >
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
            {isOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div
          className={cn(
            "md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg shadow-lg transition-all duration-300 overflow-hidden",
            isOpen ? "max-h-screen" : "max-h-0"
          )}
        >
          <div className="px-4 py-5 space-y-3">
            {navLinks.map((link) => (
              link.href.startsWith('#') || link.href === "/" ? (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "block w-full px-5 py-3 text-base font-medium rounded-full text-left relative overflow-hidden",
                    "before:content-[''] before:absolute before:inset-0 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]",
                    link.highlight 
                      ? "text-primary font-semibold before:bg-primary/10" 
                      : "before:bg-primary/5"
                  )}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "block px-5 py-3 text-base font-medium rounded-full relative overflow-hidden",
                    "before:content-[''] before:absolute before:inset-0 before:scale-x-0 before:origin-right before:transition-transform before:duration-300 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]",
                    link.highlight 
                      ? "text-primary font-semibold before:bg-primary/10" 
                      : "before:bg-primary/5"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name === "Live Chat" ? (
                    <span className="flex items-center gap-2">
                      <MessageCircle className="h-4 w-4" />
                      {link.name}
                    </span>
                  ) : (
                    link.name
                  )}
                </Link>
              )
            ))}
            <div className="pt-3 pb-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full rounded-full py-6 shadow-md bg-gradient-to-r from-primary to-primary-400 hover:from-primary-500 hover:to-primary-300 hover:scale-105 transition-all duration-300 text-base" 
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
      </Container>
    </header>
  );
}
