import React from "react";
import { useParams } from "react-router-dom";
// Importe os novos componentes
import ServicePackagesSection from "@/components/services/ServicePackagesSection";
import ServiceHowToUseSection from "@/components/services/ServiceHowToUseSection";
import ServiceOrderFormSection from "@/components/services/ServiceOrderFormSection";
// Dados fictícios de um serviço detalhado
const sampleServiceDetails = {
  id: "1",
  title: "Seguidores Instagram (Pacotes)",
  description:
    "Escolha o pacote ideal para impulsionar seu perfil no Instagram.",
  packages: [
    {
      id: "p1",
      quantity: 500,
      price: 1.99,
      features: [
        "Entrega Rápida (1h)",
        "Garantia de Queda",
        "Suporte 24/7",
        "Usuários Reais",
      ],
    },
    {
      id: "p2",
      quantity: 1000,
      price: 2.99,
      features: [
        "Entrega Rápida (1h)",
        "Garantia de Queda",
        "Suporte 24/7",
        "Usuários Reais",
        "Mais Visibilidade",
      ],
    },
    {
      id: "p3",
      quantity: 2500,
      price: 5.99,
      features: [
        "Entrega Rápida (30min)",
        "Garantia de Queda",
        "Suporte 24/7",
        "Usuários Reais",
        "Maior Engajamento",
        "Suporte Prioritário",
      ],
    },
  ],
  howToUse: [
    {
      step: 1,
      title: "Selecione o Plano",
      description:
        "Escolha a quantidade de seguidores que você deseja para o seu perfil.",
    },
    {
      step: 2,
      title: "Informe seu Usuário",
      description:
        "Digite seu nome de usuário do Instagram e confirme as informações do perfil.",
    },
    {
      step: 3,
      title: "Finalize a Compra",
      description:
        "Prossiga para o pagamento seguro e aguarde a entrega dos seguidores.",
    },
  ],
  // Adicione uma propriedade para indicar o tipo de exibição, se for usar o formulário direto
  displayType: "packages_and_form", // 'packages_only', 'form_only', 'packages_and_form'
};

const ServiceDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Por enquanto, usaremos o sampleServiceDetails fixo. No futuro, você buscará pelo 'id'
  const service = sampleServiceDetails;

  if (!service) {
    return (
      <div className="container mx-auto py-8 text-center text-gray-800">
        <h1 className="text-3xl font-bold">Serviço não encontrado.</h1>
        <p className="mt-4">Verifique o ID do serviço.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-8">{service.title}</h1>
      <p className="text-center text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
        {service.description}
      </p>

      {/* Renderiza a seção de pacotes se o tipo de exibição permitir */}
      {(service.displayType === "packages_and_form" ||
        service.displayType === "packages_only") && (
        <ServicePackagesSection packages={service.packages} />
      )}

      {/* Renderiza a seção de formulário se o tipo de exibição permitir */}
      {(service.displayType === "packages_and_form" ||
        service.displayType === "form_only") && (
        // Passa o título do serviço para o formulário
        <ServiceOrderFormSection serviceTitle={service.title} />
      )}

      <ServiceHowToUseSection steps={service.howToUse} />
    </div>
  );
};

export default ServiceDetailsPage;
