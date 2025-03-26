
import { Container } from "@/components/ui/Container";
import { MapPin, Phone, Mail, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
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

export function Footer() {
  return (
    <footer className="bg-white border-t border-border">
      <Container className="py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-gradient">TechXplore</h3>
            <p className="text-muted-foreground">
              Empowering businesses with scalable IT solutions and next-gen technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-foreground/60 hover:text-primary transition-colors">
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-primary transition-colors text-left">
                      Contact Us
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Contact Us</DialogTitle>
                      <DialogDescription>
                        Fill out this form to get in touch with our team.
                      </DialogDescription>
                    </DialogHeader>
                    <ConsultationForm />
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-primary transition-colors text-left">
                      Careers
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Join Our Team</DialogTitle>
                      <DialogDescription>
                        We're always looking for talented individuals to join our team.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="py-6">
                      <p>Please email your resume to <span className="text-primary">careers@techxplore.com</span></p>
                      <p className="mt-4">Current openings:</p>
                      <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Senior Cloud Engineer</li>
                        <li>DevOps Specialist</li>
                        <li>Frontend Developer</li>
                        <li>IT Security Analyst</li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Cloud Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  IT Infrastructure
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Network Management
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  DevOps Solutions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary shrink-0 mr-3 mt-1" />
                <span className="text-muted-foreground">
                  123 Tech Park, Silicon Valley, CA 94025, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary shrink-0 mr-3" />
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
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary shrink-0 mr-3" />
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-primary transition-colors text-left">
                      info@techxplore.com
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Email Us</DialogTitle>
                      <DialogDescription>
                        Fill out this form to send us an email.
                      </DialogDescription>
                    </DialogHeader>
                    <ConsultationForm />
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TechXplore. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Privacy Policy</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-h-[60vh] overflow-y-auto space-y-4">
                  <p>This Privacy Policy explains how TechXplore collects, uses, and protects your personal information.</p>
                  <h4 className="text-lg font-semibold">Information We Collect</h4>
                  <p>We may collect the following information:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Name and contact information</li>
                    <li>Demographic information</li>
                    <li>Technical information about your device and visit</li>
                    <li>Other information relevant to customer surveys and/or offers</li>
                  </ul>
                  <h4 className="text-lg font-semibold">How We Use Your Information</h4>
                  <p>We use this information to:</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Provide and improve our services</li>
                    <li>Communicate with you</li>
                    <li>Customize our website according to your interests</li>
                    <li>Send promotional emails about new products or services</li>
                  </ul>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Terms of Service</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-h-[60vh] overflow-y-auto space-y-4">
                  <p>These Terms of Service govern your use of the TechXplore website and services.</p>
                  <h4 className="text-lg font-semibold">Service Usage</h4>
                  <p>By using our services, you agree to comply with all applicable laws and regulations.</p>
                  <h4 className="text-lg font-semibold">Intellectual Property</h4>
                  <p>The content, logos, and other materials on this site are protected by intellectual property laws.</p>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Cookie Policy
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Cookie Policy</DialogTitle>
                </DialogHeader>
                <div className="py-4 max-h-[60vh] overflow-y-auto space-y-4">
                  <p>This Cookie Policy explains how TechXplore uses cookies and similar technologies.</p>
                  <h4 className="text-lg font-semibold">What are Cookies?</h4>
                  <p>Cookies are small text files that are placed on your device to help the site provide a better user experience.</p>
                  <h4 className="text-lg font-semibold">How We Use Cookies</h4>
                  <p>We use cookies to understand and save user preferences for future visits.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Container>
    </footer>
  );
}
