import React from "react";
import { Card } from "@/components/ui/card"; // Importe Card aqui

const StatsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 w-full max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Nossos Números Falam Por Nós
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-black mb-2">2.5M</h3>
          <p className="text-lg text-gray-700">Seguidores Entregues</p>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-black mb-2">10.5M</h3>
          <p className="text-lg text-gray-700">Curtidas Entregues</p>
        </Card>
        <Card className="bg-white shadow-lg rounded-lg p-6 text-center">
          <h3 className="text-4xl font-bold text-black mb-2">150.5M</h3>
          <p className="text-lg text-gray-700">Visualizações Entregues</p>
        </Card>
      </div>
    </section>
  );
};

export default StatsSection;
