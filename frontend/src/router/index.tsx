import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//páginas serão importadas aqui
import HomePage from "../pages/HomePage.tsx";
import ServicesPage from "../pages/ServicesPage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import RegisterPage from "../pages/RegisterPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";
import MainLayout from "@/layouts/MainLayout.tsx";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/*Rotas Públicas*/}
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/services"
          element={
            <MainLayout>
              <ServicesPage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <MainLayout>
              <LoginPage />
            </MainLayout>
          }
        />
        <Route
          path="/register"
          element={
            <MainLayout>
              <RegisterPage />
            </MainLayout>
          }
        />

        {/*Rotas de usuário (Protegidas - Adicionar autenticação depois) */}
        {/*<Route path="/dashboard" element={<DashboardPage />} />*/}

        {/*Rotas de admin (Protegidas - Adicionar autenticação depois) */}
        {/*<Route path="/admin" element={<AdminPage />} />*/}

        {/*Rota 404 (Página Not Found)*/}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
