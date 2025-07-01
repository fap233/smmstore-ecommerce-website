// frontend/src/pages/HomePage.tsx
import React from "react";
// Importe os novos componentes
import HeroSection from "@/components/home/HeroSection";
import StatsSection from "@/components/home/StatsSection";
import PlatformSelector from "@/components/home/PlatformSelector";
import ServiceSection from "@/components/home/ServiceSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection";

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
