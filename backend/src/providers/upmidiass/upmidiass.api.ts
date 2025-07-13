import fetch from "node-fetch";

const SUPPLIER_API_KEY = process.env.SUPPLIER_API_KEY; // Chave API do fornecedor do .env
const SUPPLIER_API_URL = process.env.SUPPLIER_API_URL; // URL da API do fornecedor do .env

export async function callUpmidiassApi(
  action: string,
  params: Record<string, string | number>,
) {
  if (!SUPPLIER_API_KEY || !SUPPLIER_API_URL) {
    throw new Error(
      "Configuração da API do fornecedor Upmidiass ausente (API Key ou URL).",
    );
  }

  const bodyParams = new URLSearchParams({
    key: SUPPLIER_API_KEY,
    action: action,
    ...params,
  }).toString();

  const response = await fetch(SUPPLIER_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: bodyParams,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(
      `Erro HTTP na API do Fornecedor (${response.status}): ${errorText}`,
    );
    throw new Error(`Erro na API do Fornecedor: ${errorText}`);
  }

  const data = await response.json();
  return data;
}

// Funções específicas da API do upmidiass (para serem usadas pelo upmidiass.service.ts)
export async function addUpmidiassOrder(
  serviceId: number | string,
  link: string,
  quantity: number | string,
) {
  return callUpmidiassApi("add", {
    service: serviceId,
    link: link,
    quantity: quantity,
  });
}

export async function getUpmidiassOrderStatus(orderId: number | string) {
  return callUpmidiassApi("status", {
    order: orderId,
  });
}

export async function getUpmidiassServiceList() {
  return callUpmidiassApi("services", {});
}
