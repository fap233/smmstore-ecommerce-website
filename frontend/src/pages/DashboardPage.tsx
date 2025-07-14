import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface OrderLine {
  id: string;
  quantity: number;
  unitPrice: string; // Prisma retorna Decimal como string
  subtotal: string;
  service: {
    name: string;
  };
}

interface Order {
  id: string;
  status: string;
  totalAmount: string;
  createdAt: string;
  orderLines: OrderLine[];
}

const DashboardPage: React.FC = () => {
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
        // Primeira requisição para obter o token CSRF
        const csrfResponse = await fetch(`${API_BASE_URL}/auth/csrf-token`, {
          method: "GET",
          credentials: "include",
        });
        if (!csrfResponse.ok) {
          throw new Error("Falha ao obter token CSRF.");
        }
        const csrfData = await csrfResponse.json();
        const csrfToken = csrfData.csrfToken;

        // Requisição para buscar os pedidos do usuário
        const response = await fetch(`${API_BASE_URL}/api/orders/me`, {
          method: "GET",
          headers: {
            // O navegador envia o authToken httpOnly automaticamente
            "X-CSRF-TOKEN": csrfToken, // Envia o token CSRF no header
          },
          credentials: "include", // Para enviar os cookies (authToken e csrfToken)
        });

        if (response.status === 401 || response.status === 403) {
          // Usuário não autenticado ou token inválido/expirado
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
  }, [navigate, API_BASE_URL]); // navigate como dependência do useEffect

  return (
    <div className="container mx-auto py-8 px-4 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-12">Meu Dashboard</h1>

      {loading && <p className="text-center">Carregando pedidos...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-lg text-gray-600">
          Você ainda não possui pedidos. Faça sua primeira compra!
        </p>
      )}

      {!loading && !error && orders.length > 0 && (
        <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900">
              Histórico de Pedidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableCaption>Uma lista dos seus pedidos recentes.</TableCaption>
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

export default DashboardPage;
