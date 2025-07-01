import React from "react";

const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="py-16 px-4 w-full bg-gray-50 text-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">
        Por que nos escolher?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Entrega Rápida</h3>
          <p className="text-gray-700">Comece a ver resultados em minutos.</p>
        </div>
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Suporte 24/7</h3>
          <p className="text-gray-700">Estamos sempre aqui para ajudar.</p>
        </div>
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Preços Competitivos</h3>
          <p className="text-gray-700">Melhor custo-benefício do mercado.</p>
        </div>
        <div className="text-center p-6 bg-white shadow-md rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Garantia de Satisfação</h3>
          <p className="text-gray-700">Sua felicidade é nossa prioridade.</p>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
