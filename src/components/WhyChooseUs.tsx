
import { SectionContainer } from "@/components/ui/Container";
import { GlassCard } from "@/components/ui/CustomCard";
import { 
  Clock, Award, TrendingUp, Cpu
} from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "24/7 Support",
    description: "Round-the-clock technical support and monitoring to ensure your systems run smoothly at all times.",
  },
  {
    icon: Award,
    title: "Certified Professionals",
    description: "Team of certified IT experts with extensive experience across various technology domains.",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "Flexible and cost-effective solutions that grow with your business needs and objectives.",
  },
  {
    icon: Cpu,
    title: "Cutting-Edge Technology",
    description: "Implementation of the latest technologies and best practices to keep you ahead of the competition.",
  },
];

export function WhyChooseUs() {
  return (
    <SectionContainer id="about" className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      <div className="space-y-16">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <h2 className="text-gradient opacity-0 animate-reveal">Why Choose Us</h2>
          <p className="text-xl text-muted-foreground opacity-0 animate-reveal-delay-1">
            We combine technical expertise with business insights to deliver 
            results-driven IT solutions tailored to your unique challenges.
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <GlassCard 
              key={benefit.title} 
              hover={true} 
              className={`flex flex-col h-full p-8 opacity-0 animate-reveal`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 text-primary mb-5">
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
