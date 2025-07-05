import { RocketIcon } from "lucide-react";
import React from "react";

const HowItWorksSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-white text-gray-800 text-center">
      <div className="relative inline-block px-4 py-1 text-sm front-semibold text-orange-600 bg-orange-100 rounded-full mb-8">
        Como funciona?
      </div>
      <h2 className="text-4xl font-bold mb-12">
        Seguindo os processos abaixo você pode fazer quantos pedidos desejar.
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-12 max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center size-20 rounded-full border-2 border-blue-600 mb-4 text-blue-600 text-3xl font-bold">
            1
          </div>
          <h3 className="text-xl font-semibold mb-2">Escolha seu plano</h3>
          <p className="text-gray-700 max-w-xs">
            Nós oferecemos uma variedade de planos para atender suas
            necessidades, desde um pequeno impulsionamento até pacotes maiores.
            Selecione o plano que funcione melhor para você
          </p>
        </div>

        <div className="text-blue-600 hidden md:block">
          <RocketIcon className="size-8" />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center size-20 rounded-full border-2 border-blue-600 mb-4 text-blue-600 text-3xl font-bold">
            2
          </div>
          <h3 className="text-xl font-semibold mb-2">Faça seu pedido</h3>
          <p className="to-grey-700 max-w-xs">
            Assim que escolher seu pacote, simplesmente nos forneça seu usuário
            do Instagram e faça o pagamento.
          </p>
        </div>
        <div className="text-blue-600 hidden md:block">
          <RocketIcon className="size-8" />
        </div>

        <div className="flex flex-col items-center">
          <div className="relative flex items-center justify-center size-20 rounded-full border-2 border-blue-600 mb-4 text-blue-600 text-3xl font-bold">
            3
          </div>
          <h3 className="text-xl font-semibold mb-2">
            Observe seus seguidores crescerem
          </h3>
          <p className="text-gray-700 max-w-xs">
            Nosso time irá começar a entregar seguidores reais na sua conta do
            Instagram rapidamente. Você começará a perceber os resultados dentro
            de algumas horas!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
