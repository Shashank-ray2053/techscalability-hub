import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
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
        navigate('/', {
          state: {
            scrollTo: href
          }
        });
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
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
          element.scrollIntoView({
            behavior: 'smooth'
          });
          navigate(location.pathname, {
            replace: true,
            state: {}
          });
        }
      }, 100);
    }
  }, [location, navigate]);
  return <header className="bg-slate-50">
      <Container>
        <div className="flex items-center justify-between">
          <Logo />
          <DesktopNav navLinks={navLinks} scrolled={scrolled} handleNavClick={handleNavClick} />

          <button className={cn("md:hidden p-2 rounded-full backdrop-blur-sm transition-colors", scrolled ? "bg-violet-100 text-violet-800 hover:bg-violet-200" : "bg-white/10 text-white hover:bg-white/20")} onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen}>
            <span className="sr-only">
              {isOpen ? "Close menu" : "Open menu"}
            </span>
            {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>

        <MobileMenu isOpen={isOpen} navLinks={navLinks} handleNavClick={handleNavClick} setIsOpen={setIsOpen} />
      </Container>
    </header>;
}