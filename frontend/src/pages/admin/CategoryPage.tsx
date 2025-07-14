import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Category {
  id: string;
  name: string;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000";

  const fetchCategories = useCallback(async () => {
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

      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erro ao carregar categorias.");
      }
      const data: Category[] = await response.json();
      setCategories(data);
    } catch (err: unknown) {
      console.error("Erro ao buscar categorias:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível carregar as categorias.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCreateOrUpdateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!newCategoryName.trim()) {
      setError("O nome da categoria não pode ser vazio.");
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
      if (editingCategory) {
        // Update
        response = await fetch(`${API_BASE_URL}/api/categories/${editingCategory.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify({ name: newCategoryName }),
          credentials: "include",
        });
      } else {
        // Create
        response = await fetch(`${API_BASE_URL}/api/categories`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN": csrfToken,
          },
          body: JSON.stringify({ name: newCategoryName }),
          credentials: "include",
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao ${editingCategory ? "atualizar" : "criar"} categoria.`);
      }

      setNewCategoryName("");
      setEditingCategory(null);
      fetchCategories(); // Recarregar a lista
    } catch (err: unknown) {
      console.error("Erro ao salvar categoria:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível salvar a categoria.");
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar esta categoria?")) {
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

      const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao deletar categoria.");
      }

      fetchCategories(); // Recarregar a lista
    } catch (err: unknown) {
      console.error("Erro ao deletar categoria:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível deletar a categoria.");
    }
  };

  const handleEditClick = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Gerenciar Categorias</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingCategory ? "Editar Categoria" : "Adicionar Nova Categoria"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrUpdateCategory} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Categoria</Label>
              <Input
                id="name"
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Ex: Seguidores, Curtidas, Visualizações"
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button type="submit">
                {editingCategory ? "Atualizar Categoria" : "Adicionar Categoria"}
              </Button>
              {editingCategory && (
                <Button variant="outline" onClick={() => {
                  setEditingCategory(null);
                  setNewCategoryName("");
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
          <CardTitle>Categorias Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando categorias...</p>
          ) : categories.length === 0 ? (
            <p>Nenhuma categoria cadastrada.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell className="font-medium">{cat.name}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(cat)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(cat.id)}>
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

export default CategoryPage;
