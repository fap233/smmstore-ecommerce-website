import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Erro ao fazer login. Verifique suas credenciais.",
        );
        return;
      }

      localStorage.setItem("authToken", data.token);
      console.log("Login bem-sucedido:", data);
      alert("Login bem-sucedido! Bem-vindo(a)!");
      navigate("/");
      window.location.reload(); // Força um recarregamento para a Navbar atualizar se tiver lógica de login
    } catch (err) {
      console.error("Erro na requisição de login:", err);
      setError(
        "Não foi possível conectar ao servidor. Verifique se o backend está rodando e tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Bem-vindo(a) de volta!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Acesse sua conta HydraSMM
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seuemail@exemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <div className="flex items-center">
                  <Label htmlFor="password">Senha</Label>
                  <Link
                    to="/forgot-password"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </div>
          </form>
          {/* Opcional: Seção "Or continue with" e botões de login social removidos por enquanto (MVP) */}
        </CardContent>
      </Card>
      <div className="text-center text-sm text-muted-foreground mt-4">
        Não tem uma conta?{""}
        <Link
          to="/register"
          className="underline underline-offset-4 hover:text-primary"
        >
          Cadastre-se
        </Link>
      </div>
    </div>
  );
}

export default LoginForm;
