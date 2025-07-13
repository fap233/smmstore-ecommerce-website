import {
  SupplierProvider,
  upmidiassProvider,
} from "../providers/upmidiass/upmidiass.service";

const availableProviders: SupplierProvider[] = [
  upmidiassProvider,
  // outros provedores
];

// Função para selecionar um provedor específico pelo ID
function getProvider(providerId: string): SupplierProvider {
  const provider = availableProviders.find((p) => p.id === providerId);
  if (!provider) {
    throw new Error(
      `Provedor de serviço com ID '${providerId}' não encontrado.`,
    );
  }
  return provider;
}

// Métodos do serviço de fornecedor genérico
export const supplierService = {
  // Método para adicionar um pedido usando um provedor específico
  addOrder: async (
    providerId: string,
    serviceId: number | string,
    link: string,
    quantity: number | string,
  ) => {
    const provider = getProvider(providerId);
    return provider.addOrder(serviceId, link, quantity);
  },
  // Método para obter o status de um pedido usando um provedor específico
  getOrderStatus: async (providerId: string, orderId: number | string) => {
    const provider = getProvider(providerId);
    return provider.getOrderStatus(orderId);
  },
  // Método para listar provedores disponíveis
  getAvailableProviders: () => {
    return availableProviders.map((p) => ({ id: p.id, name: p.name }));
  },
};
