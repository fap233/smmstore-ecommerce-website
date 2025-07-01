import type React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const faqItems = [
  {
    question: "Como funciona a comrpa de seguidores/curtidas?",
    answer:
      "Você escolhe o plano, informa o link/usuário do seu perfil, realiza o pagamento e nosso sistema começa a entregar os serviços rapidamente.",
  },
  {
    question: "Os seguidores/curtidas são reais?",
    answer:
      "Sim, garantimos que nossos serviços vêm de usuários reais e ativos para garantir o engajamento e a segurança da sua conta.",
  },
  {
    question: "É seguro para minha conta?",
    answer:
      "Absolutamente. Utilizamos métodos seguros e em conformidade com as diretrizes das plataformas para proteger a sua conta durante e após a entrega dos serviços.",
  },
  {
    question: "Qual o prazo de entrega?",
    answer:
      "A maioria dos nossos serviços começa a ser entregue em minutos e é concluída em poucas horas, dependendo do volume do pedido.",
  },
  {
    question: "Existe garantia?",
    answer:
      "Sim, oferecemos garantia de satisfação. Caso haja alguma queda significativa, fazemos a reposição conforme nossos termos.",
  },
];

const FAQSection: React.FC = () => {
  return (
    <section className="py-16 px-4 bg-gray-10 text-gray-800">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          Perguntas Frequentes (FAQ)
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem value={`item-${index + 1}`} key={index}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
