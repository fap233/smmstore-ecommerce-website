import RegisterForm from "@/components/auth/RegisterForm";
import React from "react";

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h[calc(100vh-120px)] p-4">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
