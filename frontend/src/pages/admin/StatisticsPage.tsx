import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Users, Package, CheckCircle } from "lucide-react";

interface Statistics {
  totalUsers: number;
  totalServices: number;
  totalOrders: number;
  totalRevenue: number;
  completedOrders: number;
  newUsersLast30Days: number;
}

const StatisticsPage: React.FC = () => {
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchStatistics = async () => {
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

        const response = await fetch(`${API_BASE_URL}/api/statistics/general`, {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": csrfToken,
          },
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Erro ao carregar estatísticas.");
        }

        const data: Statistics = await response.json();
        setStats(data);
      } catch (err: unknown) {
        console.error("Erro ao buscar estatísticas:", err);
        setError(
          (err instanceof Error ? err.message : "Erro desconhecido") ||
            "Não foi possível carregar as estatísticas. Tente novamente.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStatistics();
  }, [API_BASE_URL]);

  if (loading) {
    return <div className="text-center py-8">Carregando estatísticas...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Erro: {error}</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">Nenhuma estatística disponível.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Visão Geral do Painel</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Faturamento Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+20.1% do mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Usuários</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">+{stats.newUsersLast30Days} novos usuários nos últimos 30 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pedidos Concluídos</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedOrders}</div>
            <p className="text-xs text-muted-foreground">Total de {stats.totalOrders} pedidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Serviços Ativos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalServices}</div>
            <p className="text-xs text-muted-foreground">Serviços disponíveis na plataforma</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e outras informações podem ser adicionados aqui */}
    </div>
  );
};

export default StatisticsPage;
