import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

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
}

const UserOrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_BASE_URL =
    import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUserOrders = async () => {
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

        const response = await fetch(`${API_BASE_URL}/api/orders/me`, {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
          credentials: "include",
        });

        if (response.status === 401 || response.status === 403) {
          setError(
            "Sua sessão expirou ou você não está autenticado. Por favor, faça login novamente.",
          );
          navigate("/login");
          return;
        }
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao carregar pedidos.");
        }

        const data: Order[] = await response.json();
        setOrders(data);
      } catch (err: unknown) {
        console.error("Erro ao buscar pedidos:", err);
        setError(
          (err instanceof Error ? err.message : "Erro desconhecido") ||
            "Não foi possível carregar seus pedidos. Tente novamente.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrders();
  }, [navigate, API_BASE_URL]);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Meus Pedidos</h1>

      {loading && <p className="text-center">Carregando pedidos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-lg text-gray-600">
          Você ainda não possui pedidos. Faça sua primeira compra!
        </p>
      )}

      {!loading && !error && orders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Id do Pedido</TableHead>
                  <TableHead>Serviço</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      {order.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {" "}
                      {order.orderLines.map((ol) => ol.service.name).join(", ")}
                    </TableCell>
                    <TableCell>
                      {order.orderLines.map((ol) => ol.quantity).join(", ")}
                    </TableCell>
                    <TableCell>
                      ${parseFloat(order.totalAmount).toFixed(2)}
                    </TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserOrdersPage;
