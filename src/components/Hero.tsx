
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { ArrowRight, Check, Cpu, Database, Server } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConsultationForm } from "@/components/ConsultationForm";
import { LiveChat } from "@/components/LiveChat";

export function Hero() {
  return (
    <div className="relative pt-20 overflow-hidden">
      {/* Background Elements */}
      <div aria-hidden="true" className="select-none pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] opacity-20 rounded-full bg-gradient-to-br from-primary-300 to-primary-600 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] opacity-20 rounded-full bg-gradient-to-tr from-primary-300 to-primary-600 blur-3xl" />
        
        {/* Tech-related background elements */}
        <Server className="absolute top-[20%] right-[15%] text-primary-200/20 w-32 h-32" />
        <Cpu className="absolute bottom-[30%] left-[10%] text-primary-300/15 w-40 h-40" />
        <Database className="absolute top-[40%] left-[20%] text-primary-200/10 w-24 h-24" />
      </div>

      <Container className="pt-16 pb-24 md:pt-20 md:pb-32">
        <div className="flex flex-col items-center text-center space-y-10 md:space-y-12">
          {/* Tag */}
          <div className="inline-flex items-center rounded-full border border-border bg-background/50 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-muted-foreground animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Solving IT Problems
          </div>
          
          {/* Headline */}
          <h1 className="max-w-4xl font-bold leading-tight tracking-tighter opacity-0 animate-reveal">
            <span className="text-gradient">Empowering Businesses</span> with Scalable IT Solutions & Next-Gen Technology
          </h1>
          
          {/* Subheadline */}
          <p className="max-w-2xl text-xl text-muted-foreground opacity-0 animate-reveal-delay-1">
            We help organizations navigate the digital landscape with custom IT solutions that drive growth, enhance security, and optimize performance.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 opacity-0 animate-reveal-delay-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="font-medium px-6 py-6">
                  Get Free Consultation
                  <ArrowRight className="ml-2 h-4 w-4" />
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
            
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" variant="outline" className="font-medium px-6 py-6">
                  Live Chat Support
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Live Chat Support</DialogTitle>
                  <DialogDescription>
                    Chat with our support team for immediate assistance.
                  </DialogDescription>
                </DialogHeader>
                <LiveChat />
              </DialogContent>
            </Dialog>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 pt-8 opacity-0 animate-reveal-delay-3">
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Certified IT Professionals</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Scalable Solutions</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Cutting-Edge Technology</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
