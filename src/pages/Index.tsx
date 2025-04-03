
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, MessageCircle } from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";
import { Link } from "react-router-dom";
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

// Initialization function to handle animations
const initAnimations = () => {
  const animateElements = () => {
    const elements = document.querySelectorAll('.opacity-0');
    
    elements.forEach(element => {
      if (isElementInViewport(element)) {
        // Get animation class from element
        const classes = element.classList;
        let animationClass = 'animate-reveal';
        
        if (classes.contains('animate-reveal-delay-1')) {
          animationClass = 'animate-reveal-delay-1';
        } else if (classes.contains('animate-reveal-delay-2')) {
          animationClass = 'animate-reveal-delay-2';
        } else if (classes.contains('animate-reveal-delay-3')) {
          animationClass = 'animate-reveal-delay-3';
        } else if (classes.contains('animate-reveal-delay-4')) {
          animationClass = 'animate-reveal-delay-4';
        }
        
        // Apply the animation
        element.classList.add(animationClass);
      }
    });
  };

  const isElementInViewport = (el: Element) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.9
    );
  };

  // Run on load
  animateElements();

  // Run on scroll
  window.addEventListener('scroll', animateElements);
  return () => window.removeEventListener('scroll', animateElements);
};

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cleanup = initAnimations();
    return cleanup;
  }, []);

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
      window.scrollTo(0, 0);
      return;
    }
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
    
    if (isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {/* Navigation directly on the landing page */}
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

      <main className="flex-grow pt-16"> {/* Adjusted padding for standard navbar height */}
        <Hero />
        <Services />
        <WhyChooseUs />
        <Contact />
        {/* More sections will be added in future iterations */}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default Index;
