import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ServiceOrderFormSectionProps {
  serviceTitle: string; // Para exibir o título do serviço no formulário
  minQuantity?: number; // Quantidade mínima para o input
  maxQuantity?: number; // Quantidade máxima para o input
  defaultQuantity?: number; // Quantidade padrão para o input
}

const ServiceOrderFormSection: React.FC<ServiceOrderFormSectionProps> = ({
  serviceTitle,
  minQuantity = 100, // Exemplo de valor padrão
  maxQuantity = 10000, // Exemplo de valor padrão
  defaultQuantity = 500, // Exemplo de valor padrão
}) => {
  // Estado local para o input de quantidade (exemplo)
  const [quantity, setQuantity] = React.useState<number>(defaultQuantity);
  const [username, setUsername] = React.useState<string>("");

  const handleOrder = () => {
    // Lógica para processar o pedido (futuramente enviará para o backend)
    console.log(`Pedido para ${serviceTitle}:`);
    console.log(`Usuário: ${username}`);
    console.log(`Quantidade: ${quantity}`);
    alert(
      `Pedido de ${quantity} para ${username} do serviço "${serviceTitle}" enviado! (Simulado)`,
    );
    // Limpar formulário
    setUsername("");
    setQuantity(defaultQuantity);
  };

  return (
    <section className="mt-16 bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">
        Comprar {serviceTitle}
      </h2>
      <div className="space-y-6">
        {" "}
        {/* Aumentei o espaçamento */}
        <div>
          <Label htmlFor="username" className="text-lg font-medium mb-2 block">
            Usuário do Instagram:
          </Label>
          <Input
            type="text"
            id="username"
            placeholder="Seu nome de usuário do Instagram"
            className="mt-1 p-3 text-base"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="quantity" className="text-lg font-medium mb-2 block">
            Quantidade:
          </Label>
          <Input
            type="number"
            id="quantity"
            placeholder={`Ex: ${defaultQuantity}`}
            className="mt-1 p-3 text-base"
            min={minQuantity}
            max={maxQuantity}
            value={quantity}
            onChange={(e) =>
              setQuantity(parseInt(e.target.value) || minQuantity)
            } // Garante que é um número
          />
        </div>
        <Button
          className="w-full bg-green-600 text-white hover:bg-green-700 text-lg py-3 rounded-md"
          onClick={handleOrder}
        >
          Finalizar Pedido
        </Button>
      </div>
    </section>
  );
};

export default ServiceOrderFormSection;
