
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ChatWidget } from "@/components/ChatWidget";

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
  useEffect(() => {
    const cleanup = initAnimations();
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-36"> {/* Increased top padding from pt-32 to pt-36 to accommodate larger logo */}
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
