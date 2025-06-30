import React from "react";
import { Link } from "react-router-dom"; // Para links de navegação
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const PlatformSelector: React.FC = () => {
  return (
    <section className="py-16 px-4 w-full bg-gray-50 text-gray-800">
      <h2 className="text-4xl font-bold text-center mb-12">
        Escolha Sua Plataforma
      </h2>
      <div className="flex justify-center items-center gap-8 flex-wrap">
        {/* Ícone Instagram */}
        <Link
          to="/services#instagram"
          className="flex flex-col items-center p-6 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
        >
          <Avatar className="w-24 h-24 mb-2">
            <AvatarImage src="/instagram-logo.svg" alt="Instagram" />
            <AvatarFallback>IG</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold text-gray-800">Instagram</span>
        </Link>
        {/* Ícone TikTok */}
        <Link
          to="/services#tiktok"
          className="flex flex-col items-center p-6 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
        >
          <Avatar className="w-24 h-24 mb-2">
            <AvatarImage src="/tiktok-logo.webp" alt="TikTok" />
            <AvatarFallback>TK</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold text-gray-800">TikTok</span>
        </Link>
        {/* Ícone YouTube */}
        <Link
          to="/services#youtube"
          className="flex flex-col items-center p-6 bg-white rounded-full shadow-lg hover:shadow-xl transition-shadow transform hover:scale-105"
        >
          <Avatar className="w-24 h-24 mb-2">
            <AvatarImage src="/youtube-logo.svg" alt="YouTube" />
            <AvatarFallback>YT</AvatarFallback>
          </Avatar>
          <span className="text-lg font-semibold text-gray-800">YouTube</span>
        </Link>
        {/* Adicionar mais plataformas conforme necessário */}
      </div>
    </section>
  );
};

export default PlatformSelector;
