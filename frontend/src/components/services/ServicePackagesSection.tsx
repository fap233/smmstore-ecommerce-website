import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircleIcon } from "lucide-react";

interface ServicePackage {
  id: string;
  quantity: number;
  price: number;
  features: string[];
}

interface ServicePackagesSectionProps {
  packages: ServicePackage[];
}

const ServicePackagesSection: React.FC<ServicePackagesSectionProps> = ({
  packages,
}) => {
  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Escolha seu Pacote
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
          >
            <CardHeader className="w-full">
              <CardTitle className="text-4xl font-bold text-blue-600 mb-2">
                {pkg.quantity}
              </CardTitle>
              <CardDescription className="text-lg text-gray-700">
                Seguidores
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between items-center w-full">
              <p className="text-5xl font-extrabold text-gray-900 mb-4">
                ${pkg.price.toFixed(2)}
              </p>
              <ul className="text-sm text-left w-full space-y-1 mb-6">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-gray-700">
                    <CheckCircleIcon className="size-4 text-green-500 mr-2 shrink-0" />{" "}
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700">
                Order now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ServicePackagesSection;
