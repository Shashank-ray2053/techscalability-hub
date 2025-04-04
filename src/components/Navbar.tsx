
import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Menu, X, MessageCircle } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./navbar/Logo";
import { DesktopNav } from "./navbar/DesktopNav";
import { MobileMenu } from "./navbar/MobileMenu";
import { navLinks } from "./navbar/navLinksConfig";

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
          : "py-3 bg-transparent"
      )}
    >
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <DesktopNav 
            navLinks={navLinks} 
            scrolled={scrolled} 
            handleNavClick={handleNavClick} 
          />

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

        <MobileMenu 
          isOpen={isOpen}
          navLinks={navLinks}
          handleNavClick={handleNavClick}
          setIsOpen={setIsOpen}
        />
      </Container>
    </header>
  );
}
