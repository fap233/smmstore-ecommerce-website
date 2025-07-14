import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const UserSupportPage: React.FC = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Lógica para enviar o ticket de suporte (placeholder)
    try {
      console.log("Enviando ticket:", { subject, message });
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simula delay da API
      setSuccess("Sua mensagem de suporte foi enviada com sucesso!");
      setSubject("");
      setMessage("");
    } catch (err: unknown) {
      console.error("Erro ao enviar ticket:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível enviar sua mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Suporte ao Usuário</h1>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Abrir um Novo Ticket de Suporte</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Assunto do seu problema"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Descreva seu problema ou dúvida aqui..."
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
            <Button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar Ticket"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSupportPage;
