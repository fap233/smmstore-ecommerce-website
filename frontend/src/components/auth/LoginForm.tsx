import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Hook para buscar o token CSRF na montagem do componente
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch("http://localhost:5000/auth/csrf-token", {
          method: "GET",
          credentials: "include", // Para enviar cookies
        });
        const data = await response.json();
        setCsrfToken(data.csrfToken);
      } catch (err) {
        console.error("Erro ao buscar token CSRF na página de login:", err);
        setError("Falha ao carregar formulário. Tente novamente.");
      }
    };
    fetchCsrfToken();
  }, []); //executa apenas uma vez na montagem

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    //verificação extra
    if (!csrfToken) {
      setError("Token CSRF não carregado. Tente novamente.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Erro ao fazer login. Verifique suas credenciais.",
        );
        return;
      }

      // Se o login for bem-sucedido o backend já enviou o JWT e o CSRF nos cookies
      // Pegue o novo token CSRF da resposta JSON para as próximas requisições
      setCsrfToken(data.csrfToken);
      localStorage.setItem("authToken_debug", data.token);

      console.log("Login bem-sucedido:", data);
      // alert("Login bem-sucedido! Bem-vindo(a)!");
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
