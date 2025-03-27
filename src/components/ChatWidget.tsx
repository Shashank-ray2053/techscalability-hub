
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LiveChat } from "@/components/LiveChat";
import { MessageCircle, X } from "lucide-react";

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="rounded-lg shadow-xl border bg-background w-[360px] md:w-[400px] h-[600px] max-h-[80vh] flex flex-col overflow-hidden transition-all animate-in fade-in-50 slide-in-from-right-10">
          <div className="flex items-center justify-between p-3 border-b bg-primary/5">
            <h3 className="font-medium">TechXplore Support</h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <LiveChat />
          </div>
        </div>
      ) : (
        <Button 
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Open chat</span>
        </Button>
      )}
    </div>
  );
}
