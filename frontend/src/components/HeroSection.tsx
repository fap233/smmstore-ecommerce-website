import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Para o botão linkar para serviços

const HeroSection: React.FC = () => {
  return (
    <section className="text-center py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white w-full">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Impulsione Suas Redes Sociais!
      </h1>
      <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
        Compre seguidores, curtidas, visualizações e muito mais para suas
        plataformas favoritas.
      </p>
      <Button
        size="lg"
        className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 rounded-full shadow-lg border-blue-600 hover:border-blue-700"
      >
        <Link to="/services">Ver Nossos Serviços</Link>
      </Button>
    </section>
  );
};

export default HeroSection;
