import { addUpmidiassOrder, getUpmidiassOrderStatus } from "./upmidiass.api";

export interface SupplierProvider {
  id: string;
  name: string;
  // Métodos padronizados
  addOrder(
    serviceId: number | string,
    link: string,
    quantity: number | string,
  ): Promise<any>;
  getOrderStatus(orderId: number | string): Promise<any>;
  // getServiceList(): Promise<any>; //adicionar quando precisar
}

// Implementação do provedor Upmidiass
export const upmidiassProvider: SupplierProvider = {
  id: "upmidiass",
  name: "Upmidiass SMM Panel",
  addOrder: async (serviceId, link, quantity) => {
    return addUpmidiassOrder(serviceId, link, quantity);
  },
  getOrderStatus: async (orderId) => {
    return getUpmidiassOrderStatus(orderId);
  },
  // getServiceList: async () => { /* Chamar getUpmidiassServiceList */ }
};
