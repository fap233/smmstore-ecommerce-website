import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface OrderLine {
  id: string;
  quantity: number;
  unitPrice: string; // Prisma retorna Decimal como string
  subtotal: string;
  service: { name: string };
}

interface Order {
  id: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  orderLines: OrderLine[];
  user: { email: string; name?: string };
}

const OrderManagementPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000";

  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const csrfResponse = await fetch(`${API_BASE_URL}/auth/csrf-token`, {
        method: "GET",
        credentials: "include",
      });
      if (!csrfResponse.ok) {
        throw new Error("Falha ao obter token CSRF.");
      }
      const csrfData = await csrfResponse.json();
      const csrfToken = csrfData.csrfToken;

      const response = await fetch(`${API_BASE_URL}/api/orders/all`, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erro ao carregar pedidos.");
      }
      const data: Order[] = await response.json();
      setOrders(data);
    } catch (err: unknown) {
      console.error("Erro ao buscar todos os pedidos:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível carregar os pedidos.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Gerenciar Todos os Pedidos</h1>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Pedidos</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
        <p>Carregando pedidos...</p>
      ) : error ? (
        <p className="text-red-500">Erro: {error}</p>
      ) : orders.length === 0 ? (
        <p>Nenhum pedido encontrado.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID do Pedido</TableHead>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Serviço(s)</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                    <TableCell>{order.user.name || order.user.email}</TableCell>
                    <TableCell>
                      {order.orderLines.map((ol) => ol.service.name).join(", ")}
                    </TableCell>
                    <TableCell>R$ {parseFloat(order.totalAmount).toFixed(2)}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">Ver Detalhes</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderManagementPage;
