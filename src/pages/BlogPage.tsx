
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatWidget } from "@/components/ChatWidget";

// Sample blog post data
const blogPosts = [
  {
    id: 1,
    title: "Top 5 Cloud Solutions for Enterprise Business in 2023",
    excerpt: "Discover the most effective cloud solutions that are transforming enterprise operations and driving efficiency.",
    author: "Sarah Johnson",
    date: "Oct 15, 2023",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800",
    category: "Cloud Computing"
  },
  {
    id: 2,
    title: "Securing Your IT Infrastructure: Best Practices for 2023",
    excerpt: "Learn the essential strategies to protect your business from emerging cyber threats and security vulnerabilities.",
    author: "Michael Chen",
    date: "Sep 28, 2023",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800",
    category: "Cybersecurity"
  },
  {
    id: 3,
    title: "The Future of DevOps: Automation and AI Integration",
    excerpt: "Explore how artificial intelligence is revolutionizing DevOps practices and accelerating software delivery pipelines.",
    author: "Alex Rivera",
    date: "Sep 12, 2023",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800",
    category: "DevOps"
  },
  {
    id: 4,
    title: "Digital Transformation: How to Lead Your Company Through Change",
    excerpt: "A comprehensive guide to navigating digital transformation and fostering an innovative culture in your organization.",
    author: "Emily Watson",
    date: "Aug 30, 2023",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800",
    category: "Digital Transformation"
  },
  {
    id: 5,
    title: "5G Technology: Implications for Business IT Infrastructure",
    excerpt: "How 5G is changing the landscape of business connectivity and creating new opportunities for innovation.",
    author: "Daniel Park",
    date: "Aug 15, 2023",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800",
    category: "Networking"
  },
];

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <div className="relative bg-gradient-to-b from-background to-secondary/20 py-12">
          {/* Background tech elements */}
          <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
            <svg className="absolute top-0 left-0 w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path d="M0 50 L100 50 M50 0 L50 100" stroke="currentColor" strokeWidth="1" fill="none" />
                  <circle cx="50" cy="50" r="5" fill="currentColor" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
          </div>
          
          <Container>
            <div className="max-w-4xl mx-auto mb-16">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-gradient">TechXplore Blog</h1>
                <p className="text-xl text-muted-foreground">
                  Insights, trends, and expertise from our technology specialists
                </p>
              </div>
              
              {/* Featured categories */}
              <div className="flex flex-wrap justify-center gap-3 mb-12">
                {["All", "Cloud Computing", "Cybersecurity", "DevOps", "Digital Transformation", "IT Infrastructure"].map((category) => (
                  <Button key={category} variant={category === "All" ? "default" : "outline"} className="rounded-full">
                    {category}
                  </Button>
                ))}
              </div>
              
              {/* Blog posts grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {blogPosts.map((post) => (
                  <CustomCard key={post.id} className="overflow-hidden flex flex-col h-full">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                      <p className="text-muted-foreground mb-4 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4 mt-2">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {post.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {post.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {post.readTime}
                        </div>
                      </div>
                      <Button className="mt-4 w-full" variant="outline">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CustomCard>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="flex justify-center mt-12">
                <Button variant="outline" size="sm" className="mx-1">1</Button>
                <Button variant="ghost" size="sm" className="mx-1">2</Button>
                <Button variant="ghost" size="sm" className="mx-1">3</Button>
                <Button variant="ghost" size="sm" className="mx-1">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogPage;
