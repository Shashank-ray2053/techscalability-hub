
import { Footer } from "@/components/Footer";
import { LiveChat } from "@/components/LiveChat";
import { Container } from "@/components/ui/Container";
import { Server, Database, Cloud } from "lucide-react";
import { Navigation } from "@/components/Navigation";

const LiveChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation transparent={false} />
      
      <main className="flex-grow pt-24 pb-16"> {/* Adjusted padding for the new header */}
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
                  Need more personalized assistance? Call us at <span className="font-medium">1-800-TECH-XPL</span> or email 
                  <a href="mailto:support@techxplore.com" className="text-primary hover:underline ml-1">support@techxplore.com</a>
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
