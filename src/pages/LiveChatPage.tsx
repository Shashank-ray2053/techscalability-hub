
import { useState, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import { Container } from "@/components/ui/Container";
import { Server, Database, Cloud, MessageCircle, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { ConsultationForm } from "@/components/ConsultationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Navigation links
const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "#contact" },
  { name: "Live Chat", href: "/chat", highlight: true },
];

const LiveChatPage = () => {
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation directly on the LiveChatPage */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "py-2 bg-background/80 backdrop-blur-md shadow-sm"
            : "py-3 bg-transparent"
        )}
      >
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo container with absolute positioning to prevent affecting navbar height */}
            <div className="relative flex items-center">
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
                  className="h-60 md:h-56 w-auto absolute -top-14 md:-top-12" 
                />
              </button>
              {/* Invisible spacer to maintain proper layout with the absolutely positioned logo */}
              <div className="w-[120px] md:w-[140px] h-8 md:h-10"></div>
            </div>

            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                link.href.startsWith('#') || link.href === "/" ? (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={cn(
                      "px-4 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors rounded-full hover:bg-white/20",
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
                      "px-4 py-2 text-sm font-medium text-foreground/90 hover:text-primary transition-colors rounded-full hover:bg-white/20",
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
                  <Button className="ml-3 rounded-full">Get Started</Button>
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
              className="md:hidden p-2 rounded-full bg-white/10 backdrop-blur-sm text-foreground hover:bg-white/20 transition-colors"
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
              "md:hidden absolute top-full left-0 right-0 bg-background/80 backdrop-blur-md shadow-md transition-all duration-300 overflow-hidden",
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
                      "block w-full px-4 py-3 text-base font-medium text-foreground/90 hover:bg-white/20 rounded-full text-left",
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
                      "block px-4 py-3 text-base font-medium text-foreground/90 hover:bg-white/20 rounded-full",
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
                    <Button className="w-full rounded-full" onClick={() => setIsOpen(false)}>Get Started</Button>
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
      
      <main className="flex-grow pt-16 pb-16"> {/* Adjusted padding for standard navbar height */}
        <div className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30 py-12">
          {/* Tech-related background elements */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <Server className="absolute top-[10%] left-[5%] text-primary-200/10 w-32 h-32 rotate-12" />
            <Database className="absolute bottom-[15%] right-[10%] text-primary-300/10 w-36 h-36 -rotate-6" />
            <Cloud className="absolute top-[35%] right-[15%] text-primary-200/15 w-24 h-24" />
          </div>
          
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <h1 className="text-gradient">AI-Powered Support</h1>
                <p className="text-xl text-muted-foreground">
                  Get immediate assistance with our intelligent chatbot or connect with our specialists
                </p>
              </div>
              
              <div className="bg-card shadow-lg rounded-lg border">
                <LiveChat />
              </div>
              
              <div className="mt-12 text-center">
                <p className="text-muted-foreground">
                  Need more personalized assistance? Call us at <span className="font-medium">1-800-TECH-XPL</span> or email <a href="mailto:support@techxplore.com" className="text-primary hover:underline">support@techxplore.com</a>
                </p>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LiveChatPage;
