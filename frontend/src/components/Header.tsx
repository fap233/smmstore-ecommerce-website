import React from "react";
import { Link } from "react-router-dom"; // ONLY from react-router-dom
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
// No need for lucide-react imports if not used visually in this snippet, but keep if planning to use icons elsewhere

// Definição dos links de serviço para o dropdown (adapte conforme seus serviços reais)
const serviceLinks: { title: string; href: string; description: string }[] = [
  {
    title: "Instagram",
    href: "/services#instagram",
    description: "Seguidores, Curtidas, Comentários.",
  },
  {
    title: "TikTok",
    href: "/services#tiktok",
    description: "Visualizações, Likes, Compartilhamentos.",
  },
  {
    title: "YouTube",
    href: "/services#youtube",
    description: "Inscritos, Views, Horas de Exibição.",
  },
];

const Header: React.FC = () => {
  return (
    <header className="bg-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo/Nome do Site */}
        <Link to="/" className="text-2xl text-black font-bold">
          HydraSMM
        </Link>

        {/* Menu de Navegação Principal */}
        <NavigationMenu>
          <NavigationMenuList>
            {/* Item: Serviços com Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    {/* Aqui usamos NavigationMenuLink asChild e passamos o Link do react-router-dom para ele */}
                    <NavigationMenuLink asChild>
                      <Link
                        to="/services"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Explore Nossos Serviços
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Aumente sua presença online com seguidores, curtidas e
                          mais!
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  {serviceLinks.map((link) => (
                    <ListItem
                      key={link.title}
                      title={link.title}
                      href={link.href}
                    >
                      {link.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Itens Simples de Navegação */}
            <NavigationMenuItem>
              <Link to="/blog" className={navigationMenuTriggerStyle()}>
                {" "}
                {/* Simplesmente Link com os estilos */}
                Blog
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/faq" className={navigationMenuTriggerStyle()}>
                FAQ
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/about" className={navigationMenuTriggerStyle()}>
                Sobre Nós
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link to="/support" className={navigationMenuTriggerStyle()}>
                Suporte
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Botões de Ação (Login/Registro) */}
        <div className="flex items-center gap-2">
          <Link to="/login" className={navigationMenuTriggerStyle()}>
            Entrar
          </Link>
          <Link to="/register" className={navigationMenuTriggerStyle()}>
            Cadastro
          </Link>
          {/* Adicionar um botão de carrinho ou ícone aqui depois */}
        </div>
      </nav>
    </header>
  );
};

export default Header;

// Componente auxiliar para os itens da lista de navegação
const ListItem = React.forwardRef<
  HTMLAnchorElement, // ListItem ainda renderiza um 'a'
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        {/* Aqui, o Link do React Router DOM pode ser o 'a' que NavigationMenuLink espera */}
        <Link
          to={href || "#"} // href agora é 'to' para Link do react-router-dom
          ref={ref} // 'as any' para o ref forwarding
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
