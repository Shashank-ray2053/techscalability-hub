
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User, Calendar, BellRing, Clock, ArrowRight, Phone, Mail } from "lucide-react";
import { findBestResponse, generateFallbackResponse } from "@/utils/chatKnowledgeBase";
import { ChatUserForm } from "@/components/ChatUserForm";
import { ChatScheduleForm } from "@/components/ChatScheduleForm";
import { useToast } from "@/hooks/use-toast";

type MessageSender = "user" | "support" | "bot" | "system";

type Message = {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  action?: "collect-info" | "schedule" | "human-agent" | "download";
};

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! Welcome to TechXplore support. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [humanAgentRequested, setHumanAgentRequested] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessageId = Date.now();
    const userMessageText = newMessage;
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text: userMessageText,
        sender: "user",
        timestamp: new Date(),
      },
    ]);
    setNewMessage("");
    setLoading(true);

    // Process message to determine response
    setTimeout(() => {
      // Check for human agent keywords
      const humanKeywords = ["speak to agent", "talk to human", "real person", "live agent", "human"];
      const needsHuman = humanKeywords.some(keyword => 
        userMessageText.toLowerCase().includes(keyword)
      ) || humanAgentRequested;

      if (needsHuman) {
        if (!userInfo) {
          // Ask for user information before connecting to a human
          setMessages((prev) => [
            ...prev,
            {
              id: userMessageId + 1,
              text: "I'll connect you with one of our specialists. Could you please provide your contact details so they can reach out to you?",
              sender: "bot",
              timestamp: new Date(),
              action: "collect-info"
            },
          ]);
          setShowUserForm(true);
        } else {
          // User info already collected, confirm human connection
          setMessages((prev) => [
            ...prev,
            {
              id: userMessageId + 1,
              text: `Thanks ${userInfo.name}. A specialist will contact you shortly at ${userInfo.email || userInfo.phone}. Is there anything specific you'd like them to know?`,
              sender: "bot",
              timestamp: new Date(),
            },
          ]);
          // Add system message about notification
          setMessages((prev) => [
            ...prev,
            {
              id: userMessageId + 2,
              text: "Support team has been notified. An agent will respond shortly.",
              sender: "system",
              timestamp: new Date(),
            },
          ]);
          setHumanAgentRequested(true);
        }
        setLoading(false);
        return;
      }

      // Check for scheduling keywords
      const scheduleKeywords = ["schedule", "appointment", "meeting", "book", "consultation", "time"];
      const needsScheduling = scheduleKeywords.some(keyword => 
        userMessageText.toLowerCase().includes(keyword)
      );

      if (needsScheduling) {
        if (!userInfo) {
          // Ask for user information before scheduling
          setMessages((prev) => [
            ...prev,
            {
              id: userMessageId + 1,
              text: "I'd be happy to help you schedule a meeting. First, could you please provide your contact details?",
              sender: "bot",
              timestamp: new Date(),
              action: "collect-info"
            },
          ]);
          setShowUserForm(true);
        } else {
          // User info already collected, proceed to scheduling
          setMessages((prev) => [
            ...prev,
            {
              id: userMessageId + 1,
              text: `Let's schedule a meeting, ${userInfo.name}. Please select a date and time that works for you:`,
              sender: "bot",
              timestamp: new Date(),
              action: "schedule"
            },
          ]);
          setShowScheduleForm(true);
        }
        setLoading(false);
        return;
      }

      // Check for brochure/download keywords
      const downloadKeywords = ["brochure", "download", "pdf", "document"];
      const needsDownload = downloadKeywords.some(keyword => 
        userMessageText.toLowerCase().includes(keyword)
      );

      if (needsDownload) {
        setMessages((prev) => [
          ...prev,
          {
            id: userMessageId + 1,
            text: "You can download our comprehensive brochure with information about all our services here:",
            sender: "bot",
            timestamp: new Date(),
            action: "download"
          },
        ]);
        // Add download link as a system message
        setMessages((prev) => [
          ...prev,
          {
            id: userMessageId + 2,
            text: '<a href="/TechXplore-Brochure.pdf" target="_blank" class="flex items-center gap-2 text-primary hover:underline">Download TechXplore Brochure <ArrowRight className="h-4 w-4" /></a>',
            sender: "system",
            timestamp: new Date(),
          },
        ]);
        setLoading(false);
        return;
      }

      // Generate regular response
      try {
        const aiResponse = findBestResponse(userMessageText);
        setMessages((prev) => [
          ...prev,
          {
            id: userMessageId + 1,
            text: aiResponse,
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      } catch (error) {
        // Fallback for errors
        console.error("Error generating response:", error);
        setMessages((prev) => [
          ...prev,
          {
            id: userMessageId + 1,
            text: generateFallbackResponse(),
            sender: "bot",
            timestamp: new Date(),
          },
        ]);
      }
      
      setLoading(false);
    }, 1000);
  };

  const handleUserFormSubmit = (name: string, email: string, phone: string) => {
    setUserInfo({ name, email, phone });
    setShowUserForm(false);
    
    // Add confirmation message
    const contactMethod = email ? `email (${email})` : `phone (${phone})`;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `Thank you, ${name}. We have your contact information via ${contactMethod}.`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);

    // If human was requested, proceed with that flow
    if (humanAgentRequested) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Our specialist will contact you shortly. Is there anything specific you'd like them to know?",
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: Date.now() + 2,
          text: "Support team has been notified. An agent will respond shortly.",
          sender: "system",
          timestamp: new Date(),
        },
      ]);
    } else if (showScheduleForm) {
      // If scheduling was initiated, continue with scheduling
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Now, let's schedule your meeting. Please select a date and time:",
          sender: "bot",
          timestamp: new Date(),
          action: "schedule"
        },
      ]);
    }
  };

  const handleScheduleFormSubmit = (date: Date, time: string, notes: string) => {
    setShowScheduleForm(false);
    
    // Format the date for display
    const formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Add confirmation message
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: `Great! I've scheduled a meeting for you on ${formattedDate} at ${time}.`,
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    
    // Add calendar info as a system message
    const notesText = notes ? ` The following notes were included: "${notes}"` : '';
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 1,
        text: `Meeting scheduled: ${formattedDate}, ${time}.${notesText}`,
        sender: "system",
        timestamp: new Date(),
      },
      {
        id: Date.now() + 2,
        text: "A calendar invitation has been sent to your email. Our team is looking forward to speaking with you!",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
    
    // Show toast notification
    toast({
      title: "Meeting Scheduled",
      description: `Your meeting has been scheduled for ${formattedDate} at ${time}.`,
    });
  };

  const requestHumanAgent = () => {
    if (!userInfo) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "I'll connect you with one of our specialists. Could you please provide your contact details so they can reach out to you?",
          sender: "bot",
          timestamp: new Date(),
          action: "collect-info"
        },
      ]);
      setShowUserForm(true);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: `I'll have a specialist contact you at ${userInfo.email || userInfo.phone} shortly. Is there anything specific you'd like them to help with?`,
          sender: "bot",
          timestamp: new Date(),
        },
        {
          id: Date.now() + 1,
          text: "Support team has been notified. An agent will respond shortly.",
          sender: "system",
          timestamp: new Date(),
        },
      ]);
    }
    setHumanAgentRequested(true);
  };

  const renderMessageContent = (message: Message) => {
    if (message.sender === "system") {
      // Render system messages (which may contain HTML)
      return <div dangerouslySetInnerHTML={{ __html: message.text }} />;
    }
    return <p>{message.text}</p>;
  };

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] border rounded-lg shadow-lg bg-background">
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 border-b bg-primary/5">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src="/placeholder.svg" alt="TechXplore Support" />
            <AvatarFallback>TX</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">TechXplore Support</h3>
            <p className="text-xs text-muted-foreground">
              {humanAgentRequested 
                ? "Connecting to a specialist..." 
                : "AI Assistant • Available 24/7"}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 text-xs"
            onClick={requestHumanAgent}
          >
            <User className="h-3 w-3" /> 
            <span className="hidden sm:inline">Human Agent</span>
          </Button>
        </div>
      </div>

      {/* Messages container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.sender === "system" ? (
              <div className="w-full px-4 py-2 my-1 text-sm text-center text-muted-foreground bg-muted/50 rounded-md">
                {renderMessageContent(message)}
              </div>
            ) : (
              <div
                className={`flex ${
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                } items-start gap-2 max-w-[80%]`}
              >
                <Avatar className="h-8 w-8">
                  {message.sender === "user" ? (
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  ) : message.sender === "support" ? (
                    <>
                      <AvatarImage src="/placeholder.svg" alt="Support Agent" />
                      <AvatarFallback>SA</AvatarFallback>
                    </>
                  ) : (
                    <>
                      <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                      <AvatarFallback>AI</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : message.sender === "support"
                      ? "bg-secondary border border-border"
                      : "bg-secondary"
                  }`}
                >
                  {renderMessageContent(message)}
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* Special action buttons based on message type */}
                  {message.action === "human-agent" && (
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="mt-2 text-xs" 
                      onClick={requestHumanAgent}
                    >
                      Connect to Agent
                    </Button>
                  )}
                  
                  {message.action === "download" && (
                    <a 
                      href="/TechXplore-Brochure.pdf" 
                      target="_blank" 
                      className="inline-flex items-center gap-2 mt-2 text-primary hover:underline"
                    >
                      Download Brochure <ArrowRight className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* User information form */}
        {showUserForm && (
          <div className="bg-card border rounded-lg p-3 my-2">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4" /> Contact Information
            </h4>
            <ChatUserForm 
              onSubmit={handleUserFormSubmit}
              onCancel={() => setShowUserForm(false)}
            />
          </div>
        )}

        {/* Scheduling form */}
        {showScheduleForm && (
          <div className="bg-card border rounded-lg p-3 my-2">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Calendar className="h-4 w-4" /> Schedule a Meeting
            </h4>
            <ChatScheduleForm 
              onSubmit={handleScheduleFormSubmit}
              onCancel={() => setShowScheduleForm(false)}
            />
          </div>
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex flex-row items-start gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="AI Assistant" />
                <AvatarFallback>AI</AvatarFallback>
              </Avatar>
              <div className="rounded-lg p-3 bg-secondary">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Invisible element for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick action buttons */}
      {!showUserForm && !showScheduleForm && (
        <div className="flex gap-2 p-2 overflow-x-auto border-t">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs whitespace-nowrap"
            onClick={() => {
              setNewMessage("I'd like to schedule a consultation");
              handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            <Calendar className="h-3 w-3 mr-1" /> Schedule Meeting
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs whitespace-nowrap"
            onClick={() => {
              setNewMessage("I'd like to speak with a human agent");
              handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            <User className="h-3 w-3 mr-1" /> Human Agent
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-xs whitespace-nowrap"
            onClick={() => {
              setNewMessage("Can I get your brochure?");
              handleSendMessage({ preventDefault: () => {} } as React.FormEvent);
            }}
          >
            <ArrowRight className="h-3 w-3 mr-1" /> Download Brochure
          </Button>
        </div>
      )}

      {/* Input form */}
      {!showUserForm && !showScheduleForm && (
        <form onSubmit={handleSendMessage} className="border-t p-3 flex gap-2">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" size="icon" disabled={loading || !newMessage.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      )}
    </div>
  );
}
