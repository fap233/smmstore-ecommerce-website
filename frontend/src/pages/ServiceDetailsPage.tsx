import React from "react";
// Importe os novos componentes
import ServicePackagesSection from "@/components/services/ServicePackagesSection";
import ServiceHowToUseSection from "@/components/services/ServiceHowToUseSection";
import ServiceOrderFormSection from "@/components/services/ServiceOrderFormSection";
import { sampleServiceDetails } from "@/constants/sample-service-details";

const ServiceDetailsPage: React.FC = () => {
  // const { id } = useParams<{ id: string }>();

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
