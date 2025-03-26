
import { SectionContainer } from "@/components/ui/Container";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Download } from "lucide-react";
import { ConsultationForm } from "@/components/ConsultationForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiveChat } from "@/components/LiveChat";

export function Contact() {
  const handleBrochureDownload = () => {
    // Create a sample PDF link (in a real scenario, this would be a real PDF file path)
    const link = document.createElement('a');
    link.href = '/TechXplore-Brochure.pdf'; // This should be the path to the actual brochure
    link.download = 'TechXplore-Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <SectionContainer id="contact" className="relative">
      {/* Background gradient */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute right-1/4 bottom-0 w-[600px] h-[600px] opacity-10 rounded-full bg-gradient-to-tl from-primary-300 to-primary-600 blur-3xl" />
      </div>

      <div className="space-y-12">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-gradient opacity-0 animate-reveal">Contact Us</h2>
          <p className="text-xl text-muted-foreground opacity-0 animate-reveal-delay-1">
            Get in touch with our expert team to discuss your IT needs and discover how we can help your business grow.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact information */}
          <div className="space-y-6 opacity-0 animate-reveal-delay-2">
            <CustomCard className="p-8">
              <h3 className="text-xl font-bold mb-6">Reach Out to Us</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Our Office</h4>
                    <p className="text-muted-foreground">123 Tech Park, Silicon Valley, CA 94025, USA</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary shrink-0 mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="text-muted-foreground hover:text-primary transition-colors text-left">
                          +1 (234) 567-890
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[400px]">
                        <DialogHeader>
                          <DialogTitle>Contact Us</DialogTitle>
                          <DialogDescription>
                            Call us or use the live chat for immediate assistance.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="py-6 space-y-4">
                          <div className="flex items-center justify-between border p-3 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Sales & Inquiries</p>
                              <p className="text-primary">+1 (234) 567-890</p>
                            </div>
                            <a href="tel:+1234567890" className="text-primary hover:underline">Call Now</a>
                          </div>
                          <div className="flex items-center justify-between border p-3 rounded-lg">
                            <div>
                              <p className="text-sm font-medium">Support</p>
                              <p className="text-primary">+1 (234) 567-891</p>
                            </div>
                            <a href="tel:+1234567891" className="text-primary hover:underline">Call Now</a>
                          </div>
                          <div className="mt-4 text-center">
                            <Dialog>
                              <DialogTrigger asChild>
                                <button className="text-primary hover:underline">
                                  Or start live chat
                                </button>
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
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary shrink-0 mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <a href="mailto:info@techxplore.com" className="text-muted-foreground hover:text-primary transition-colors">
                      info@techxplore.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border">
                <h4 className="font-medium mb-4">Download Our Brochure</h4>
                <Button 
                  onClick={handleBrochureDownload} 
                  variant="outline" 
                  className="w-full flex items-center justify-center"
                >
                  <Download className="mr-2 h-4 w-4" />
                  TechXplore Services Brochure
                </Button>
              </div>
            </CustomCard>
          </div>

          {/* Contact form */}
          <div className="opacity-0 animate-reveal-delay-3">
            <CustomCard className="p-8">
              <h3 className="text-xl font-bold mb-6">Send Us a Message</h3>
              <ConsultationForm />
            </CustomCard>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
