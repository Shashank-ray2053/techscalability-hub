
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { CustomCard } from "@/components/ui/CustomCard";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2, Bookmark } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { blogPosts } from "@/data/blogData";

const BlogDetailPage = () => {
  const { id } = useParams();
  const postId = parseInt(id || "1");
  
  // Find the blog post with the matching id
  const post = blogPosts.find(post => post.id === postId) || blogPosts[0];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <Link to="/blog">
                <Button variant="ghost" className="gap-1 mb-4">
                  <ArrowLeft className="h-4 w-4" />
                  Back to all articles
                </Button>
              </Link>
              
              <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full mb-4">
                {post.category}
              </span>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
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
            </div>
            
            <div className="mb-8 rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-[300px] md:h-[400px] object-cover"
              />
            </div>
            
            <CustomCard className="mb-8">
              <div className="prose max-w-none">
                <p className="mb-4">
                  {post.excerpt}
                </p>
                <p className="mb-4">
                  In today's rapidly evolving technological landscape, businesses are constantly seeking innovative solutions to stay competitive and efficient. {post.category} represents one of the most significant areas of growth and transformation in the enterprise technology sector.
                </p>
                <h2 className="text-xl font-bold mt-6 mb-3">Why {post.category} Matters</h2>
                <p className="mb-4">
                  The adoption of cutting-edge {post.category} solutions enables organizations to streamline operations, enhance security, and deliver superior customer experiences. As we move further into 2023, several key trends have emerged that are reshaping how businesses approach their technology strategies.
                </p>
                <p className="mb-4">
                  Industry leaders are increasingly recognizing that investments in {post.category} are not merely operational expenses but strategic initiatives that can drive business growth and innovation. The most successful implementations share several common characteristics:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li className="mb-2">Seamless integration with existing systems</li>
                  <li className="mb-2">Scalability to accommodate business growth</li>
                  <li className="mb-2">Robust security features to protect sensitive data</li>
                  <li className="mb-2">User-friendly interfaces that require minimal training</li>
                  <li className="mb-2">Comprehensive analytics capabilities for data-driven decision making</li>
                </ul>
                <h2 className="text-xl font-bold mt-6 mb-3">Looking Ahead</h2>
                <p className="mb-4">
                  As we look to the future, it's clear that {post.category} will continue to evolve at a rapid pace. Organizations that stay abreast of these changes and adapt accordingly will be well-positioned to thrive in an increasingly digital business environment.
                </p>
                <p>
                  For more information on how your business can leverage the power of {post.category}, contact our team of experts who can provide tailored advice for your specific needs.
                </p>
              </div>
            </CustomCard>
            
            <div className="flex justify-between items-center mb-8">
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
              <Link to="/blog">
                <Button variant="default" size="sm">
                  More articles
                </Button>
              </Link>
            </div>
            
            <CustomCard className="mb-8">
              <h3 className="text-lg font-bold mb-4">Related Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {blogPosts
                  .filter(related => related.id !== post.id)
                  .slice(0, 2)
                  .map(related => (
                    <Link to={`/blog/${related.id}`} key={related.id} className="block hover:opacity-90 transition-opacity">
                      <div className="flex gap-3">
                        <img 
                          src={related.image}
                          alt={related.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2">{related.title}</h4>
                          <span className="text-xs text-muted-foreground">{related.date}</span>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </CustomCard>
          </div>
        </Container>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
};

export default BlogDetailPage;
