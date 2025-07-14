import Cookies from "js-cookie";

export const logout = () => {
  Cookies.remove("authToken");
  Cookies.remove("csrfToken");
  // Redirecionar para a página de login ou home
  window.location.href = "/login";
};

export const isAuthenticated = (): boolean => {
  return !!Cookies.get("authToken");
};
