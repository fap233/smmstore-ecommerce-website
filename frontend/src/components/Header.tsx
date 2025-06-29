import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          E-commerce SMM
        </Link>
        <div>
          <Link to="/services" className="mx-2 hover:text-gray-300">
            Serviços
          </Link>
          <Link to="/login" className="mx-2 hover:text-gray-300">
            Login
          </Link>
          <Link to="/register" className="mx-2 hover:text-gray-300">
            Cadastrar
          </Link>

          {/*adicionar um botão de carrinho ou ícone aqui depois */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
