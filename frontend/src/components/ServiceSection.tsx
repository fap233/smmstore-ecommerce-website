import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dados fictícios para os serviços (se você quiser manter esses aqui, ou passar via props)
const services = [
  {
    id: "1",
    title: "Seguidores Instagram",
    description: "Aumente sua popularidade rapidamente.",
    price: "A partir de R$ 9,90",
  },
  {
    id: "2",
    title: "Curtidas TikTok",
    description: "Dê um boost nos seus vídeos.",
    price: "A partir de R$ 7,50",
  },
  {
    id: "3",
    title: "Visualizações YouTube",
    description: "Seu conteúdo alcançando mais pessoas.",
    price: "A partir de R$ 12,00",
  },
];

const ServiceSection: React.FC = () => {
  return (
    <section className="py-16 px-4 w-full max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Serviços Populares
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                {service.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 mb-4">{service.price}</p>
              <Button className="w-full bg-gray-800 text-white hover:bg-gray-700">
                Comprar Agora
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServiceSection;
