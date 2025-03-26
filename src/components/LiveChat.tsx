
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, User } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "support";
  timestamp: Date;
};

const supportMessages = [
  "Hello! How can I help you today?",
  "I'd be happy to tell you more about our services. What specific area are you interested in?",
  "Great! One of our specialists will connect with you shortly. In the meantime, do you have any other questions?",
  "We offer 24/7 support for all our enterprise clients. Would you like to know more about our support packages?",
  "Thank you for your interest! I'll transfer you to our sales team who can provide more detailed information.",
];

export function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi there! Welcome to TechXplore support. How can I assist you today?",
      sender: "support",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Add user message
    const userMessageId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        text: newMessage,
        sender: "user",
        timestamp: new Date(),
      },
    ]);
    setNewMessage("");
    setLoading(true);

    // Simulate response
    setTimeout(() => {
      const randomResponse =
        supportMessages[Math.floor(Math.random() * supportMessages.length)];
      setMessages((prev) => [
        ...prev,
        {
          id: userMessageId + 1,
          text: randomResponse,
          sender: "support",
          timestamp: new Date(),
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[500px] max-h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              } items-start gap-2 max-w-[80%]`}
            >
              <Avatar className="h-8 w-8">
                {message.sender === "support" ? (
                  <AvatarImage src="/placeholder.svg" alt="Support" />
                ) : null}
                <AvatarFallback>
                  {message.sender === "support" ? "TX" : <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary"
                }`}
              >
                <p>{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex flex-row items-start gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg" alt="Support" />
                <AvatarFallback>TX</AvatarFallback>
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
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2">
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
    </div>
  );
}
