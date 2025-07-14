import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqData } from "@/constants/faq-data";

const FaqPage: React.FC = () => {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-5xl font-extrabold text-center text-gray-900 mb-12 leading-tight">
        Perguntas Frequentes
      </h1>

      <p className="text-center text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
        Encontre respostas para as perguntas mais comuns sobre nossos serviços
        e como a HydraSMM funciona.
      </p>

      <Accordion type="single" collapsible className="w-full max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-blue-600">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-gray-700 text-base leading-relaxed">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FaqPage;