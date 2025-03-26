
import { SectionContainer } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { 
  Cloud, Server, Network, Code, Workflow, ArrowRight 
} from "lucide-react";

const services = [
  {
    icon: Cloud,
    title: "Cloud Services",
    description: "Migration, infrastructure setup, and managed cloud services on AWS, Azure, and Google Cloud.",
  },
  {
    icon: Server,
    title: "IT & Infrastructure",
    description: "End-to-end IT support, server management, and data center optimization services.",
  },
  {
    icon: Network,
    title: "Network Management",
    description: "Network architecture, security implementation, and performance monitoring.",
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Custom web & mobile app development, API integration, and enterprise solutions.",
  },
  {
    icon: Workflow,
    title: "DevOps Solutions",
    description: "CI/CD implementation, infrastructure as code, and automated deployment strategies.",
  }
];

export function Services() {
  return (
    <SectionContainer id="services" className="relative">
      {/* Background gradient */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 rounded-full bg-gradient-to-br from-primary-300 to-primary-600 blur-3xl" />
      </div>

      <div className="space-y-16">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-gradient opacity-0 animate-reveal">Our Services</h2>
          <p className="text-xl text-muted-foreground opacity-0 animate-reveal-delay-1">
            Comprehensive IT solutions designed to transform your business operations
            and drive sustainable growth.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title} 
              hover={true} 
              className="flex flex-col h-full opacity-0"
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10 text-primary mb-5">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-muted-foreground flex-grow">{service.description}</p>
              <div className="mt-5 pt-4 border-t border-border">
                <Button variant="ghost" className="px-0 hover:px-2 h-8 group">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12 opacity-0 animate-reveal">
          <Button size="lg" className="font-medium">
            View All Services
          </Button>
        </div>
      </div>
    </SectionContainer>
  );
}
