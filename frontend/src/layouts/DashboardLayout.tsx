import React from "react";
import { Link } from "react-router-dom";
import { Home, Settings, ShoppingCart, LogOut, LayoutDashboard } from "lucide-react";
import { adminNavLinks } from "@/constants/admin-nav-links";
import { logout } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import Cookies from "js-cookie";



interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const userRole = Cookies.get("userRole");
  const isAdmin = userRole === "ADMIN";

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      {/* Sidebar */}
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link to={isAdmin ? "/dashboard/admin" : "/dashboard/user"} className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-6 w-6" />
              <span className="">HydraSMM Dashboard</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {!isAdmin && (
                <Link
                  to="/dashboard/user"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <Home className="h-4 w-4" />
                  Visão Geral
                </Link>
              )}
              {!isAdmin && (
                <Link
                  to="/dashboard/user/orders"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Meus Pedidos
                </Link>
              )}
              {isAdmin && (
                <>
                  {adminNavLinks.map((section) => (
                    <React.Fragment key={section.section}>
                      <h3 className="mt-4 mb-2 px-3 text-xs font-semibold text-muted-foreground">{section.section}</h3>
                      {section.links.map((link) => (
                        <Link
                          key={link.href}
                          to={link.href}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                          <link.icon className="h-4 w-4" />
                          {link.title}
                        </Link>
                      ))}
                    </React.Fragment>
                  ))}
                </>
              )}
              <Link
                to="/dashboard/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Settings className="h-4 w-4" />
                Configurações
              </Link>
            </nav>
          </div>
          {/* Botão de Logout */}
          <div className="mt-auto p-4">
            <Button onClick={logout} className="w-full">
              <LogOut className="mr-2 h-4 w-4" /> Sair
            </Button>
          </div>
          
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col">
        {/* Top Navbar (simplificada para o dashboard) */}
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Link to="#" className="md:hidden">
            <ShoppingCart className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </Link>
          <div className="w-full flex-1">
            {/* Search or other header elements can go here */}
          </div>
          {/* User Dropdown (futuro) */}
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;