import { LayoutDashboard, GitPullRequest, List, Tag, Globe, Ticket, DollarSign, Book, Ban, Mail, Link2, Menu, FileText, HardDrive, Percent, CreditCard, Puzzle, Languages, Users, Settings } from "lucide-react";

export const adminNavLinks = [
  {
    section: "GERAL",
    links: [
      { title: "Visão Geral", href: "/dashboard/admin", icon: LayoutDashboard },
    ],
  },
  {
    section: "SERVIÇOS",
    links: [
      { title: "Redes Sociais", href: "/dashboard/admin/social-networks", icon: Globe },
      { title: "Categorias", href: "/dashboard/admin/categories", icon: Tag },
      { title: "Serviços", href: "/dashboard/admin/services", icon: List },
      { title: "Todos os Pedidos", href: "/dashboard/admin/orders", icon: GitPullRequest },
    ],
  },
  {
    section: "ÁREA DE SUPORTE",
    links: [
      { title: "Tickets", href: "/dashboard/admin/tickets", icon: Ticket },
    ],
  },
  {
    section: "GERENCIAR USUÁRIOS",
    links: [
      { title: "Clientes", href: "/dashboard/admin/users", icon: Users },
      { title: "Gerenciar Avaliações", href: "/dashboard/admin/reviews", icon: Book },
      { title: "Transações", href: "/dashboard/admin/transactions", icon: DollarSign },
      { title: "Inscritos", href: "/dashboard/admin/subscribers", icon: Mail },
    ],
  },
  {
    section: "BLOG",
    links: [
      { title: "Categorias do Blog", href: "/dashboard/admin/blog-categories", icon: Tag },
      { title: "Posts do Blog", href: "/dashboard/admin/blog-posts", icon: List },
    ],
  },
  {
    section: "LISTA NEGRA",
    links: [
      { title: "Endereço IP", href: "/dashboard/admin/blacklist/ip", icon: Ban },
      { title: "Email", href: "/dashboard/admin/blacklist/email", icon: Mail },
      { title: "Link de Pedido", href: "/dashboard/admin/blacklist/order-link", icon: Link2 },
    ],
  },
  {
    section: "CONFIGURAÇÕES",
    links: [
      { title: "Gerais", href: "/dashboard/admin/settings/general", icon: Settings },
      { title: "Gerenciar Menu", href: "/dashboard/admin/settings/menu", icon: Menu },
      { title: "Gerenciar Páginas", href: "/dashboard/admin/settings/pages", icon: FileText },
      { title: "Provedores", href: "/dashboard/admin/settings/providers", icon: HardDrive },
      { title: "Cupons", href: "/dashboard/admin/settings/coupons", icon: Percent },
      { title: "Pagamentos", href: "/dashboard/admin/settings/payments", icon: CreditCard },
      { title: "Módulos", href: "/dashboard/admin/settings/modules", icon: Puzzle },
      { title: "Idiomas", href: "/dashboard/admin/settings/languages", icon: Languages },
    ],
  },
];
