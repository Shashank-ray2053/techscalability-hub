
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/Container";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Container className="py-16 text-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-7xl font-bold text-gradient mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <Button asChild>
            <a href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </a>
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default NotFound;
