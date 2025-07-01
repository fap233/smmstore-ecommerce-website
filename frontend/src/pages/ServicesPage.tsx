import FAQSection from "@/components/sections/FAQSection";
import HowItWorksSection from "@/components/sections/HowItWorksSection";
import ServiceCatalogSection from "@/components/services/ServiceCatalogSection";
import WhyChooseUsAltSection from "@/components/sections/WhyChooseUsAltSection";
import type React from "react";

const ServicesPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Container principal da página */}
      <ServiceCatalogSection />
      <HowItWorksSection />
      <WhyChooseUsAltSection />
      <FAQSection />
      {/* Adicionaro outras seções no futuro */}
    </div>
  );
};

export default ServicesPage;
