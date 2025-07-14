import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const AboutPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight">
        Sobre Nós
      </h1>

      <section className="mb-12">
        <Card className="shadow-lg border-none rounded-xl p-6 bg-gradient-to-br from-blue-50 to-indigo-50">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold text-blue-800 mb-4">
              Nossa Missão
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">
            <p className="mb-4">
              Na HydraSMM, nossa missão é capacitar indivíduos e empresas a
              alcançarem seu potencial máximo nas redes sociais. Acreditamos
              que o crescimento orgânico e a visibilidade são cruciais no mundo
              digital de hoje, e estamos aqui para fornecer as ferramentas e o
              suporte necessários para que você se destaque.
            </p>
            <p>
              Comprometemo-nos a oferecer serviços de alta qualidade, seguros e
              eficazes, sempre com foco na satisfação do cliente e na entrega
              de resultados reais.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Nossa História
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-md rounded-lg p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                O Início
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                A HydraSMM nasceu da paixão por conectar pessoas e marcas no
                ambiente digital. Percebemos a crescente demanda por soluções
                de marketing de mídia social acessíveis e confiáveis, e nos
                propusemos a preencher essa lacuna.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-lg p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800">
                Crescimento e Inovação
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>
                Desde então, temos crescido exponencialmente, sempre buscando
                inovar e expandir nossa gama de serviços. Nossa equipe é
                composta por especialistas em marketing digital, tecnologia e
                atendimento ao cliente, todos dedicados ao seu sucesso.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">
          Nossos Valores
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-md rounded-lg p-6 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                Transparência
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>Agimos com honestidade e clareza em todas as nossas operações.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-lg p-6 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                Qualidade
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>Oferecemos serviços que realmente entregam resultados.</p>
            </CardContent>
          </Card>
          <Card className="shadow-md rounded-lg p-6 text-center">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-800 mb-2">
                Suporte
              </CardTitle>
            </CardHeader>
            <CardContent className="text-gray-700">
              <p>Estamos sempre disponíveis para ajudar nossos clientes.</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="text-center">
        <p className="text-xl text-gray-800 font-semibold">
          Junte-se à família HydraSMM e comece a crescer hoje mesmo!
        </p>
      </section>
    </div>
  );
};

export default AboutPage;