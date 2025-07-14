import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const UserDashboardPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Bem-vindo ao seu Painel de Usuário!</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Meus Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Visualize o histórico e o status dos seus pedidos.</p>
            <Link to="/dashboard/user/orders">
              <Button variant="outline" className="w-full">
                Ver Pedidos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Minha Conta</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Gerencie suas informações de perfil e segurança.</p>
            <Link to="/dashboard/user/profile">
              <Button variant="outline" className="w-full">
                Editar Perfil <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Suporte</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">Entre em contato com nossa equipe de suporte.</p>
            <Link to="/dashboard/user/support">
              <Button variant="outline" className="w-full">
                Obter Suporte <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboardPage;
