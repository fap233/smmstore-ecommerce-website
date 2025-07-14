import React, { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  socialNetworkId: string;
  unitCount: number;
  unitType: string;
  minPackages: number;
  maxPackages: number;
  isActive: boolean;
  providerServiceId?: string;
  providerRate?: number;
  category: { name: string };
  socialNetwork: { name: string };
}

interface Category {
  id: string;
  name: string;
}

interface SocialNetwork {
  id: string;
  name: string;
}

const ServiceManagementPage: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [socialNetworks, setSocialNetworks] = useState<SocialNetwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<Service>>({
    name: "",
    description: "",
    price: 0,
    categoryId: "",
    socialNetworkId: "",
    unitCount: 0,
    unitType: "",
    minPackages: 1,
    maxPackages: 100,
    isActive: true,
    providerServiceId: "",
    providerRate: 0,
  });
  const [editingService, setEditingService] = useState<Service | null>(null);

  const API_BASE_URL = import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:5000";

  const fetchDependencies = useCallback(async () => {
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

      const [categoriesRes, socialNetworksRes] = await Promise.all([
        fetch(`${API_BASE_URL}/api/categories`, { headers: { "X-CSRF-TOKEN": csrfToken }, credentials: "include" }),
        fetch(`${API_BASE_URL}/api/social-networks`, { headers: { "X-CSRF-TOKEN": csrfToken }, credentials: "include" }),
      ]);

      if (!categoriesRes.ok || !socialNetworksRes.ok) {
        throw new Error("Erro ao carregar categorias ou redes sociais.");
      }

      const categoriesData: Category[] = await categoriesRes.json();
      const socialNetworksData: SocialNetwork[] = await socialNetworksRes.json();

      setCategories(categoriesData);
      setSocialNetworks(socialNetworksData);
    } catch (err: unknown) {
      console.error("Erro ao buscar dependências:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível carregar dados essenciais.");
    }
  }, [API_BASE_URL]);

  const fetchServices = useCallback(async () => {
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

      const response = await fetch(`${API_BASE_URL}/api/services`, {
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Erro ao carregar serviços.");
      }
      const data: Service[] = await response.json();
      setServices(data);
    } catch (err: unknown) {
      console.error("Erro ao buscar serviços:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível carregar os serviços.");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchDependencies();
    fetchServices();
  }, [fetchDependencies, fetchServices]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const checked = (e.target as HTMLInputElement).checked; // Cast para HTMLInputElement para 'checked'

    setFormData((prev) => ({
      ...prev,
      [id]: e.target.type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (value: string, id: string) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCreateOrUpdateService = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validação básica
    if (!formData.name || !formData.description || !formData.price || !formData.categoryId || !formData.socialNetworkId || !formData.unitCount || !formData.unitType) {
      setError("Por favor, preencha todos os campos obrigatórios.");
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

      const method = editingService ? "PUT" : "POST";
      const url = editingService ? `${API_BASE_URL}/api/services/${editingService.id}` : `${API_BASE_URL}/api/services`;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-TOKEN": csrfToken,
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Erro ao ${editingService ? "atualizar" : "criar"} serviço.`);
      }

      setFormData({
        name: "",
        description: "",
        price: 0,
        categoryId: "",
        socialNetworkId: "",
        unitCount: 0,
        unitType: "",
        minPackages: 1,
        maxPackages: 100,
        isActive: true,
        providerServiceId: "",
        providerRate: 0,
      });
      setEditingService(null);
      fetchServices(); // Recarregar a lista
    } catch (err: unknown) {
      console.error("Erro ao salvar serviço:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível salvar o serviço.");
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!window.confirm("Tem certeza que deseja deletar este serviço?")) {
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

      const response = await fetch(`${API_BASE_URL}/api/services/${id}`, {
        method: "DELETE",
        headers: {
          "X-CSRF-TOKEN": csrfToken,
        },
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao deletar serviço.");
      }

      fetchServices(); // Recarregar a lista
    } catch (err: unknown) {
      console.error("Erro ao deletar serviço:", err);
      setError((err instanceof Error ? err.message : "Erro desconhecido") || "Não foi possível deletar o serviço.");
    }
  };

  const handleEditClick = (service: Service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      categoryId: service.categoryId,
      socialNetworkId: service.socialNetworkId,
      unitCount: service.unitCount,
      unitType: service.unitType,
      minPackages: service.minPackages,
      maxPackages: service.maxPackages,
      isActive: service.isActive,
      providerServiceId: service.providerServiceId || "",
      providerRate: service.providerRate || 0,
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Gerenciar Serviços</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingService ? "Editar Serviço" : "Adicionar Novo Serviço"}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateOrUpdateService} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome do Serviço</Label>
              <Input id="name" type="text" value={formData.name} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea id="description" value={formData.description} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">Preço</Label>
              <Input id="price" type="number" step="0.01" value={formData.price} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="categoryId">Categoria</Label>
              <Select onValueChange={(value: string) => handleSelectChange(value, "categoryId")} value={formData.categoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="socialNetworkId">Rede Social</Label>
              <Select onValueChange={(value: string) => handleSelectChange(value, "socialNetworkId")} value={formData.socialNetworkId}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma rede social" />
                </SelectTrigger>
                <SelectContent>
                  {socialNetworks.map((sn) => (
                    <SelectItem key={sn.id} value={sn.id}>{sn.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unitCount">Contagem de Unidades</Label>
              <Input id="unitCount" type="number" value={formData.unitCount} onChange={handleChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unitType">Tipo de Unidade</Label>
              <Input id="unitType" type="text" value={formData.unitType} onChange={handleChange} placeholder="Ex: seguidores, curtidas" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="minPackages">Pacotes Mínimos</Label>
              <Input id="minPackages" type="number" value={formData.minPackages} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maxPackages">Pacotes Máximos</Label>
              <Input id="maxPackages" type="number" value={formData.maxPackages} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="providerServiceId">ID do Serviço do Provedor</Label>
              <Input id="providerServiceId" type="text" value={formData.providerServiceId} onChange={handleChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="providerRate">Taxa do Provedor</Label>
              <Input id="providerRate" type="number" step="0.00001" value={formData.providerRate} onChange={handleChange} />
            </div>
            <div className="flex items-center space-x-2 md:col-span-2 lg:col-span-3">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData((prev) => ({ ...prev, isActive: e.target.checked }))}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="isActive">Serviço Ativo</Label>
            </div>
            <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-2">
              <Button type="submit">
                {editingService ? "Atualizar Serviço" : "Adicionar Serviço"}
              </Button>
              {editingService && (
                <Button variant="outline" onClick={() => {
                  setEditingService(null);
                  setFormData({
                    name: "",
                    description: "",
                    price: 0,
                    categoryId: "",
                    socialNetworkId: "",
                    unitCount: 0,
                    unitType: "",
                    minPackages: 1,
                    maxPackages: 100,
                    isActive: true,
                    providerServiceId: "",
                    providerRate: 0,
                  });
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
          <CardTitle>Serviços Existentes</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Carregando serviços...</p>
          ) : services.length === 0 ? (
            <p>Nenhum serviço cadastrado.</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Rede Social</TableHead>
                  <TableHead>Ativo</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {services.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell className="font-medium">{service.name}</TableCell>
                    <TableCell>R$ {service.price.toFixed(2)}</TableCell>
                    <TableCell>{service.category.name}</TableCell>
                    <TableCell>{service.socialNetwork.name}</TableCell>
                    <TableCell>{service.isActive ? "Sim" : "Não"}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="mr-2" onClick={() => handleEditClick(service)}>
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteService(service.id)}>
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

export default ServiceManagementPage;
