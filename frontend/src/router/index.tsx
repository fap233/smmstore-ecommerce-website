import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

//páginas serão importadas aqui
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import BlogPage from "../pages/BlogPage";
import FaqPage from "../pages/FaqPage";
import AboutPage from "../pages/AboutPage";
import SupportPage from "../pages/SupportPage";
import ServiceDetailsPage from "../pages/ServiceDetailsPage";

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
          path="/services/:id"
          element={
            <MainLayout>
              <ServiceDetailsPage />
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
        <Route
          path="/blog"
          element={
            <MainLayout>
              <BlogPage />
            </MainLayout>
          }
        />
        <Route
          path="/faq"
          element={
            <MainLayout>
              <FaqPage />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <AboutPage />
            </MainLayout>
          }
        />
        <Route
          path="/support"
          element={
            <MainLayout>
              <SupportPage />
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
