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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
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
                className="h-32 md:h-28 mr-2"
              />
            </button>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              link.href.startsWith('#') || link.href === "/" ? (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors rounded-md text-left",
                    link.highlight && "text-primary"
                  )}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "px-4 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors rounded-md",
                    link.highlight && "text-primary"
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
                <Button className="ml-4">Get Started</Button>
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
            className="md:hidden p-2 rounded-md text-foreground"
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
            "md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-md transition-all duration-300 overflow-hidden",
            isOpen ? "max-h-screen" : "max-h-0"
          )}
        >
          <div className="px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              link.href.startsWith('#') || link.href === "/" ? (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "block w-full px-4 py-3 text-base font-medium text-foreground/90 hover:bg-secondary rounded-md text-left",
                    link.highlight && "text-primary"
                  )}
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium text-foreground/90 hover:bg-secondary rounded-md",
                    link.highlight && "text-primary"
                  )}
                  onClick={() => setIsOpen(false)}
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
            <div className="pt-2 pb-1">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full" onClick={() => setIsOpen(false)}>Get Started</Button>
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
