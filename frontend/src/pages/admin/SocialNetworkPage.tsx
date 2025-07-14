import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SocialNetwork {
  id: string;
  name: string;
  icon?: string;
}

const SocialNetworkPage: React.FC = () => {
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSocialNetworkName, setNewSocialNetworkName] = useState("");
  const [newSocialNetworkIcon, setNewSocialNetworkIcon] = useState("");
  const [editingSocialNetwork, setEditingSocialNetwork] = useState<SocialNetwork | null>(null);

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000";

  const fetchSocialNetworks = useCallback(async () => {
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

      const response = await fetch(`${API_BASE_URL}/api/social-networks`, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erro ao carregar redes sociais.");
      }
      const data: SocialNetwork[] = await response.json();
      setSocialNetworks(data);
    } catch (err: unknown) {
      console.error("Erro ao buscar redes sociais:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível carregar as redes sociais.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchSocialNetworks();
  }, [fetchSocialNetworks]);

  const handleCreateOrUpdateSocialNetwork = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newSocialNetworkName.trim()) {
      setError("O nome da rede social não pode ser vazio.");
      return;
    }

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

      let response;
      if (editingSocialNetwork) {
        // Update
        response = await fetch(`${API_BASE_URL}/api/social-networks/${editingSocialNetwork.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify({ name: newSocialNetworkName, icon: newSocialNetworkIcon }),
          credentials: "include",
        });
      } else {
        // Create
        response = await fetch(`${API_BASE_URL}/api/social-networks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify({ name: newSocialNetworkName, icon: newSocialNetworkIcon }),
          credentials: "include",
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao ${editingSocialNetwork ? "atualizar" : "criar"} rede social.`);
      }

      setNewSocialNetworkName("");
      setNewSocialNetworkIcon("");
      setEditingSocialNetwork(null);
      fetchSocialNetworks(); // Recarregar a lista
    } catch (err: unknown) {
      console.error("Erro ao salvar rede social:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível salvar a rede social.");
    }
  };

  const handleDeleteSocialNetwork = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar esta rede social?")) {
      return;
    }
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

      const response = await fetch(`${API_BASE_URL}/api/social-networks/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao deletar rede social.");
      }

      fetchSocialNetworks(); // Recarregar a lista
    } catch (err: unknown) {
      console.error("Erro ao deletar rede social:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível deletar a rede social.");
    }
  };

  const handleEditClick = (socialNetwork: SocialNetwork) => {
    setEditingSocialNetwork(socialNetwork);
    setNewSocialNetworkName(socialNetwork.name);
    setNewSocialNetworkIcon(socialNetwork.icon || "");
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Gerenciar Redes Sociais</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingSocialNetwork ? "Editar Rede Social" : "Adicionar Nova Rede Social"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrUpdateSocialNetwork} className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Rede Social</Label>
              <Input
                id="name"
                type="text"
                value={newSocialNetworkName}
                onChange={(e) => setNewSocialNetworkName(e.target.value)}
                placeholder="Ex: Instagram, TikTok"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">URL do Ícone (Opcional)</Label>
              <Input
                id="icon"
                type="text"
                value={newSocialNetworkIcon}
                onChange={(e) => setNewSocialNetworkIcon(e.target.value)}
                placeholder="Ex: https://example.com/instagram.png"
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="submit">
                {editingSocialNetwork ? "Atualizar Rede Social" : "Adicionar Rede Social"}
              </Button>
              {editingSocialNetwork && (
                <Button variant="outline" onClick={() => {
                  setEditingSocialNetwork(null);
                  setNewSocialNetworkName("");
                  setNewSocialNetworkIcon("");
                }}>
                  Cancelar
                </Button>
              )}
            </div>
          </form>
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redes Sociais Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando redes sociais...</p>
          ) : socialNetworks.length === 0 ? (
            <p>Nenhuma rede social cadastrada.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Ícone</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {socialNetworks.map((sn) => (
                  <TableRow key={sn.id}>
                    <TableCell className="font-medium">{sn.name}</TableCell>
                    <TableCell>
                      {sn.icon ? (
                        <img src={sn.icon} alt={sn.name} className="h-6 w-6 object-contain" />
                      ) : (
                        "N/A"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(sn)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteSocialNetwork(sn.id)}>
                        Deletar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialNetworkPage;
