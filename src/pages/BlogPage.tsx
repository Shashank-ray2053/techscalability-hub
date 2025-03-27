
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ChatWidget } from "@/components/ChatWidget";
import { blogPosts } from "@/data/blogData";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

const BlogPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16 bg-secondary/20">
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
                    <Link to={`/blog/${post.id}`}>
                      <Button className="mt-4 w-full" variant="outline">
                        Read Article
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CustomCard>
              ))}
            </div>
            
            {/* Pagination */}
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink isActive>1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">
                    <ArrowRight className="h-4 w-4" />
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </Container>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogPage;
