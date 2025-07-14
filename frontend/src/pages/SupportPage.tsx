import React from "react";
import { Card, CardContent, CardHeader, CardTitle, Input, Label, Button, Textarea } from "@/components/ui";

const SupportPage: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para enviar o formulário de suporte
    alert("Sua mensagem foi enviada! Em breve entraremos em contato.");
    // Limpar formulário ou redirecionar
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight">
        Central de Suporte
      </h1>

      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Estamos aqui para ajudar! Se você tiver alguma dúvida, problema ou
        precisar de assistência, entre em contato conosco.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Seção de Contato Direto */}
        <Card className="shadow-lg rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Informações de Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-700">
            <p className="mb-4">
              <span className="font-semibold">Email:</span> suporte@hydrasmm.com
            </p>
            <p className="mb-4">
              <span className="font-semibold">Telefone:</span> +55 (11) 98765-4321
            </p>
            <p className="mb-4">
              <span className="font-semibold">Horário de Atendimento:</span>
              <br />
              Segunda a Sexta: 9h00 - 18h00 (Horário de Brasília)
            </p>
            <p>
              Estamos comprometidos em responder a todas as consultas o mais
              rápido possível.
            </p>
          </CardContent>
        </Card>

        {/* Seção de Formulário de Contato */}
        <Card className="shadow-lg rounded-xl p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Envie-nos uma Mensagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Seu Nome</Label>
                <Input id="name" type="text" placeholder="Seu nome" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Seu Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input id="subject" type="text" placeholder="Assunto da mensagem" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea
                  id="message"
                  placeholder="Descreva seu problema ou dúvida aqui..."
                  rows={5}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Enviar Mensagem
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupportPage;