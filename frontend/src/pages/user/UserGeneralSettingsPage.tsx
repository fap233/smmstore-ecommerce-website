import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UserGeneralSettingsPage: React.FC = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Configurações da Conta</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Preferências Gerais</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="language">Idioma Preferido</Label>
              <Input id="language" type="text" defaultValue="Português (Brasil)" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="timezone">Fuso Horário</Label>
              <Input id="timezone" type="text" defaultValue="America/Sao_Paulo" />
            </div>
            <Button type="submit">Salvar Preferências</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserGeneralSettingsPage;
