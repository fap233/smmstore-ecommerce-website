import React from "react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

//Dados ficticios para os serviços (Substituiremos com dados da API do backend depois)
const services = [
  {
    id: "1",
    title: "Seguidores para Instagram",
    description:
      "Aumente rapidamente sua base de seguidores no Instagram com pacotes autênticos.",
    price: "A partir de R$ 9,90",
    platform: "Instagram",
  },
  {
    id: "2",
    title: "Curtidas para TikTok",
    description:
      "Dê um impulso aos seus vídeos do TikTok com curtidas reais e engajamento.",
    price: "A partir de R$ 7,50",
    platform: "TikTok",
  },
  {
    id: "3",
    title: "Visualizações para YouTube",
    description:
      "Aumente o alcance dos seus vídeos no YouTube com visualizações de alta retenção.",
    price: "A partir de R$ 12,00",
    platform: "YouTube",
  },
  {
    id: "4",
    title: "Comentários para Instagram",
    description:
      "Receba comentários autênticos em suas postagens do Instagram para mais interação.",
    price: "A partir de R$ 15,00",
    platform: "Instagram",
  },
  {
    id: "5",
    title: "Compartilhamentos no Facebook",
    description:
      "Amplie o alcance de suas publicações no Facebook com compartilhamentos.",
    price: "A partir de R$ 10,00",
    platform: "Facebook",
  },
  {
    id: "6",
    title: "Inscritos para Twitch",
    description:
      "Cresça seu canal na Twitch com novos inscritos e espectadores.",
    price: "A partir de R$ 20,00",
    platform: "Twitch",
  },
];

const ServiceCatalogSection: React.FC = () => {
  return (
    <section className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Catálogo de Serviços
      </h1>

      {/* Seção de Filtros e Categorias (Para implementação futura) */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          Filtrar por Plataforma:
        </h2>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button variant="outline" className="text-gray-800 hover:bg-gray-100">
            Todas
          </Button>
          <Button variant="outline" className="text-gray-800 hover:bg-gray-100">
            Instagram
          </Button>
          <Button variant="outline" className="text-gray-800 hover:bg-gray-100">
            TikTok
          </Button>
          <Button variant="outline" className="text-gray-800 hover:bg-gray-100">
            YouTube
          </Button>
          <Button variant="outline" className="text-gray-800 hover:bg-gray-100">
            Facebook
          </Button>
          <Button variant="outline" className="text-gray-800 hover:bg-gray-100">
            Twitch
          </Button>
        </div>
      </div>

      {/* Lista de serviços */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <Card
            key={service.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
          >
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900 mb-2">
                {service.title}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <p className="text-lg font-bold text-gray-700 mb-4">
                {service.price}
              </p>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Ver Detalhes
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServiceCatalogSection;
