import React from "react";
import { Link } from "react-router-dom"; // ONLY from react-router-dom
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu-styles";
import { logout, isAuthenticated } from "@/lib/auth";
import { Button } from "@/components/ui";
import Cookies from "js-cookie";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { serviceLinks } from "@/constants/service-links";

const Header: React.FC = () => {
  const loggedIn = isAuthenticated();
  const userRole = Cookies.get("userRole");

  const handleLogout = () => {
    logout();
  };

  const getDashboardLink = () => {
    if (!loggedIn) return "/";
    if (userRole === "ADMIN") return "/dashboard";
    return "/dashboard/user";
  };

  return (
    <header className="bg-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo/Nome do Site */}
        <Link to="/" className="text-2xl text-black font-bold">
          HydraSMM
        </Link>

        {/* Menu de Navegação Principal (Desktop) */}
        <NavigationMenu className="hidden md:flex">
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
            {loggedIn && (
                  <Link to={getDashboardLink()} className={navigationMenuTriggerStyle()}>
                    Dashboard
                  </Link>
                )}
              </NavigationMenuList>
            </NavigationMenu>

            {/* Botões de Ação (Desktop) */}
            <div className="hidden md:flex items-center gap-2">
              {loggedIn ? (
                <>
                  <Link to={getDashboardLink()} className={navigationMenuTriggerStyle()}>
                    Meu Painel
                  </Link>
                  <Button onClick={handleLogout} className="text-base px-4 py-2">
                    Sair
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login" className={navigationMenuTriggerStyle()}>
                    Entrar
                  </Link>
                  <Link to="/register" className={navigationMenuTriggerStyle()}>
                    Cadastro
                  </Link>
                </>
              )}
            </div>

            {/* Menu Hamburguer para Mobile */}
            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <nav className="flex flex-col gap-4 pt-8">
                    <Link to="/services" className="text-lg font-semibold" onClick={() => { /* close sheet */ }}>Serviços</Link>
                    <Link to="/blog" className="text-lg font-semibold" onClick={() => { /* close sheet */ }}>Blog</Link>
                    <Link to="/faq" className="text-lg font-semibold" onClick={() => { /* close sheet */ }}>FAQ</Link>
                    <Link to="/about" className="text-lg font-semibold" onClick={() => { /* close sheet */ }}>Sobre Nós</Link>
                    <Link to="/support" className="text-lg font-semibold" onClick={() => { /* close sheet */ }}>Suporte</Link>
                    {loggedIn && (
                      <Link to={getDashboardLink()} className="text-lg font-semibold" onClick={() => { /* close sheet */ }}>Meu Painel</Link>
                    )}
                    <div className="mt-4">
                      {loggedIn ? (
                        <Button onClick={handleLogout} className="w-full text-base px-4 py-2">
                          Sair
                        </Button>
                      ) : (
                        <div className="flex flex-col gap-2">
                          <Link to="/login">
                            <Button className="w-full text-base px-4 py-2">Entrar</Button>
                          </Link>
                          <Link to="/register">
                            <Button variant="outline" className="w-full text-base px-4 py-2">Cadastro</Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
      </nav>
    </header>
  );
};

export default Header;

import ListItem from "@/components/common/ListItem";
