import { ShieldCheckIcon, TagIcon, TruckIcon, UsersIcon } from "lucide-react";
import type React from "react";

const WhyChooseUsAltSection: React.FC = () => {
  return (
    <section className="bg-orange-500 text-white py-16 px-4">
      <div className="container mx-auto text-center max-w-5xl">
        <div className="relative inline-block px-4 py-1 text-sm font-semibold text-orange-600 bg-white rounded-full mb-8">
          POR QUE NOS ESCOLHER?
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-8">
          Experiencie Serviços de Qualidade com Resultados Reais
        </h2>
        <p className="text-lg mb-12 max-w-3xl mx-auto">
          Com nossos serviços seguros e de qualidade, nós oferecemos seguidores
          reais, entrega rápida e preços acessíveis com suporte 24/7 para seu
          conforto.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {/* item 1 */}
          <div className="flex items-start gap-4 p-4 rounded-lg">
            <ShieldCheckIcon className="size-10 text-white shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-2">
                Seguro e Protegido
              </h3>
              <p className="text-gray-100">
                A segurança da sua conta é nossa prioridade. Nós utilizamos
                métodos seguros para crescer seus seguidores no Instagram,
                garantindo privacidade completa e segurança durante todo o
                processo.
              </p>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-4 p-4 rounded-lg">
            <UsersIcon className="size-10 text-white shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Real Followers</h3>
              <p className="text-gray-100">
                Nós fornecemos seguidores genuínos, de alta qualidade que irão
                engajar ativamente com o seu conteúdo. Sem bots, sem contas
                falsas. Apenas pessoas reais interessadas nas suas publicações.
              </p>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-4 p-4 rounded-lg">
            <TruckIcon className="size-10 text-white shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Etrega Rápida</h3>
              <p className="text-gray-100">
                Nós sabemos que você quer resultados rápidos. Nossa serviço
                garante entrega rápida, garantindo que o seu crescimento de
                seguidores seja sem atrasos.
              </p>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-4 p-4 rounded-lg">
            <TagIcon className="size-10 text-white shrink-0" />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Preços acessíveis</h3>
              <p className="text-gray-100">
                Receba o melhor valor pelo seu dinheiro. Nossos planos de preços
                foram projetados para se adequar a qualquer orcamento,
                oferecendo uma maneira econômica de melhorar sua presença
                social.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsAltSection;
