import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
      {/*Seção Hero - Destaque */}
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
          Ver Nossos Serviços
        </Button>
      </section>
      {/* Seção Serviços - Destaque (Exemplo com cards) */}
      <section className="py-16 px-4 w-full max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Serviços Populares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Seguidores Instagram
              </CardTitle>
              <CardDescription className="text-gray-600">
                Aumente sua popularidade rapidamente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 mb-4">
                Pacotes a partir de R$ 9,90
              </p>
              <Button className="w-full">Comprar Agora</Button>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Curtidas TikTok
              </CardTitle>
              <CardDescription className="text-gray-600">
                Dê um boost nos seus vídeos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 mb-4">
                Pacotes a partir de R$ 7,50
              </p>
              <Button className="w-full">Comprar Agora</Button>
            </CardContent>
          </Card>

          {/* Card 3 */}
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Visualizações YouTube
              </CardTitle>
              <CardDescription className="text-gray-600">
                Seu conteúdo alcançando mais pessoas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-gray-700 mb-4">
                Pacotes a partir de R$ 12,00
              </p>
              <Button className="w-full">Comprar Agora</Button>
            </CardContent>
          </Card>
        </div>
      </section>
      {/*Seção de Vantagens/Depoimentos (Exemplo) */}
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
            <h3 className="text-xl font-semibold mb-2">
              Garantia de Satisfação
            </h3>
            <p className="text-gray-700">Sua felicidade é nossa prioridade.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
