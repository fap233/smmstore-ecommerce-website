import React from "react";

interface HowToUseStep {
  step: number;
  title: string;
  description: string;
}

interface ServiceHowToUseSectionProps {
  steps: HowToUseStep[];
}

const ServiceHowToUseSection: React.FC<ServiceHowToUseSectionProps> = ({
  steps,
}) => {
  return (
    <section className="bg-gray-100 py-16 px-4 rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-12">Como Funciona</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        {steps.map((step) => (
          <div key={step.step} className="flex flex-col items-center">
            <div className="size-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-xl font-bold mb-4">
              {step.step}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-700">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServiceHowToUseSection;
