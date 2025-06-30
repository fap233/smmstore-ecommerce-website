// frontend/src/pages/HomePage.tsx
import React from "react";
// Importe os novos componentes
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import PlatformSelector from "@/components/PlatformSelector";
import ServiceSection from "@/components/ServiceSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      {/* Chama a seção hero */}
      <HeroSection />
      {/* Chama a seção de status */}
      <StatsSection />
      {/* Chama a seção de plataformas */}
      <PlatformSelector />
      {/* Chama a seção de serviços */}
      <ServiceSection />
      {/* Chama a seção de vantagens */}
      <WhyChooseUsSection />
    </div>
  );
};

export default HomePage;
