import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-120px)] text-center px-4">
      <h1 className="text-9xl font-extrabold text-gray-900 mb-4">
        404
      </h1>
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
        Página Não Encontrada
      </h2>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Ops! Parece que a página que você está procurando não existe ou foi
        movida. Não se preocupe, você pode voltar para a página inicial.
      </p>
      <Link to="/">
        <Button size="lg" className="text-lg px-8 py-4">
          Voltar para a Página Inicial
        </Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;