import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import AdminDashboardLayout from "@/layouts/AdminDashboardLayout";
import UserDashboardLayout from "@/layouts/UserDashboardLayout";
import { isAuthenticated } from "@/lib/auth";
import Cookies from "js-cookie";

// Páginas Públicas
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

// Páginas do Dashboard do Usuário
import UserDashboardPage from "../pages/UserDashboardPage";
import UserOrdersPage from "../pages/user/UserOrdersPage";
import UserProfilePage from "../pages/user/UserProfilePage";
import UserSupportPage from "../pages/user/UserSupportPage";
import UserGeneralSettingsPage from "../pages/user/UserGeneralSettingsPage";

// Páginas do Dashboard do Admin
import StatisticsPage from "../pages/admin/StatisticsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import SocialNetworkPage from "../pages/admin/SocialNetworkPage";
import CategoryPage from "../pages/admin/CategoryPage";
import ServiceManagementPage from "../pages/admin/ServiceManagementPage";
import OrderManagementPage from "../pages/admin/OrderManagementPage";
import TicketManagementPage from "../pages/admin/TicketManagementPage";
import CustomerManagementPage from "../pages/admin/CustomerManagementPage";
import ReviewManagementPage from "../pages/admin/ReviewManagementPage";
import TransactionManagementPage from "../pages/admin/TransactionManagementPage";
import SubscriberManagementPage from "../pages/admin/SubscriberManagementPage";
import BlogCategoryManagementPage from "../pages/admin/BlogCategoryManagementPage";
import BlogPostManagementPage from "../pages/admin/BlogPostManagementPage";
import IPBlacklistPage from "../pages/admin/IPBlacklistPage";
import EmailBlacklistPage from "../pages/admin/EmailBlacklistPage";
import OrderLinkBlacklistPage from "../pages/admin/OrderLinkBlacklistPage";
import GeneralSettingsPage from "../pages/admin/GeneralSettingsPage";
import MenuManagementPage from "../pages/admin/MenuManagementPage";
import PageManagementPage from "../pages/admin/PageManagementPage";
import ProviderManagementPage from "../pages/admin/ProviderManagementPage";
import CouponManagementPage from "../pages/admin/CouponManagementPage";
import PaymentSettingsPage from "../pages/admin/PaymentSettingsPage";
import ModuleManagementPage from "../pages/admin/ModuleManagementPage";
import LanguageManagementPage from "../pages/admin/LanguageManagementPage";

const DashboardRedirect: React.FC = () => {
  const loggedIn = isAuthenticated();
  const userRole = Cookies.get("userRole");

  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "ADMIN") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/dashboard/user" replace />;
};

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas Públicas */}
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

        {/* Rota de redirecionamento para o dashboard */}
        <Route path="/dashboard" element={<DashboardRedirect />} />

        {/* Rotas do Dashboard do Usuário */}
        <Route
          path="/dashboard/user"
          element={
            <UserDashboardLayout>
              <UserDashboardPage />
            </UserDashboardLayout>
          }
        />
        <Route
          path="/dashboard/user/orders"
          element={
            <UserDashboardLayout>
              <UserOrdersPage />
            </UserDashboardLayout>
          }
        />
        <Route
          path="/dashboard/user/profile"
          element={
            <UserDashboardLayout>
              <UserProfilePage />
            </UserDashboardLayout>
          }
        />
        <Route
          path="/dashboard/user/support"
          element={
            <UserDashboardLayout>
              <UserSupportPage />
            </UserDashboardLayout>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <UserDashboardLayout>
              <UserGeneralSettingsPage />
            </UserDashboardLayout>
          }
        />

        {/* Rotas do Dashboard do Admin */}
        <Route
          path="/dashboard/admin"
          element={
            <AdminDashboardLayout>
              <StatisticsPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/users"
          element={
            <AdminDashboardLayout>
              <AdminDashboardPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/social-networks"
          element={
            <AdminDashboardLayout>
              <SocialNetworkPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/categories"
          element={
            <AdminDashboardLayout>
              <CategoryPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/services"
          element={
            <AdminDashboardLayout>
              <ServiceManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/orders"
          element={
            <AdminDashboardLayout>
              <OrderManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/tickets"
          element={
            <AdminDashboardLayout>
              <TicketManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/customers"
          element={
            <AdminDashboardLayout>
              <CustomerManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/reviews"
          element={
            <AdminDashboardLayout>
              <ReviewManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/transactions"
          element={
            <AdminDashboardLayout>
              <TransactionManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/subscribers"
          element={
            <AdminDashboardLayout>
              <SubscriberManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/blog-categories"
          element={
            <AdminDashboardLayout>
              <BlogCategoryManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/blog-posts"
          element={
            <AdminDashboardLayout>
              <BlogPostManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/blacklist/ip"
          element={
            <AdminDashboardLayout>
              <IPBlacklistPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/blacklist/email"
          element={
            <AdminDashboardLayout>
              <EmailBlacklistPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/blacklist/order-link"
          element={
            <AdminDashboardLayout>
              <OrderLinkBlacklistPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/general"
          element={
            <AdminDashboardLayout>
              <GeneralSettingsPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/menu"
          element={
            <AdminDashboardLayout>
              <MenuManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/pages"
          element={
            <AdminDashboardLayout>
              <PageManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/providers"
          element={
            <AdminDashboardLayout>
              <ProviderManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/coupons"
          element={
            <AdminDashboardLayout>
              <CouponManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/payments"
          element={
            <AdminDashboardLayout>
              <PaymentSettingsPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/modules"
          element={
            <AdminDashboardLayout>
              <ModuleManagementPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/dashboard/admin/settings/languages"
          element={
            <AdminDashboardLayout>
              <LanguageManagementPage />
            </AdminDashboardLayout>
          }
        />

        {/* Rota 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;