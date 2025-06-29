import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} E-commerce SMM. Todos os direitos
          reservados.
        </p>
        {/* Adicione o link para a política de privacidade aqui */}
      </div>
    </footer>
  );
};

export default Footer;
