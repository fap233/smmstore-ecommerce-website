import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] p-4">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
