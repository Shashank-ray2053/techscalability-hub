
import { Button } from "@/components/ui/button";
import { CheckCircle, Download } from "lucide-react";
import { services } from "@/components/Services";
import { ConsultationForm } from "@/components/ConsultationForm";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type ServiceDetailsProps = {
  service: typeof services[0];
};

export function ServiceDetails({ service }: ServiceDetailsProps) {
  const features = [
    "24/7 support and monitoring",
    "Dedicated account manager",
    "Regular performance reports",
    "Scalable solutions",
    "Industry-leading security practices",
  ];

  const handleBrochureDownload = () => {
    const link = document.createElement('a');
    link.href = '/TechXplore-Brochure.pdf';
    link.download = 'TechXplore-Brochure.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="py-4 space-y-6">
      <div className="grid grid-cols-1 gap-2">
        <h4 className="text-lg font-semibold">What We Offer</h4>
        <ul className="space-y-2">
          {service.details.map((detail, i) => (
            <li key={i} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="features">
          <AccordionTrigger>Features & Benefits</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 py-2">
              {features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5 mr-2" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="process">
          <AccordionTrigger>Our Process</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <p>Our streamlined process ensures efficient delivery and optimal results:</p>
              <ol className="list-decimal list-inside space-y-2 pl-2">
                <li>Initial consultation and requirement gathering</li>
                <li>Solution design and planning</li>
                <li>Implementation and configuration</li>
                <li>Testing and quality assurance</li>
                <li>Deployment and training</li>
                <li>Ongoing support and optimization</li>
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1">Request a Quote</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Free Consultation for {service.title}</DialogTitle>
              <DialogDescription>
                Fill out this form to request a free consultation with our experts.
              </DialogDescription>
            </DialogHeader>
            <ConsultationForm />
          </DialogContent>
        </Dialog>
        
        <Button variant="outline" className="flex-1 flex items-center justify-center" onClick={handleBrochureDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download Brochure
        </Button>
      </div>
    </div>
  );
}
