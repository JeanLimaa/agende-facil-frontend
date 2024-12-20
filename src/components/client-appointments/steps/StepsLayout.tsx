"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { usePathname, useRouter } from "next/navigation";
import CategoryComponent from "@/components/client-appointments/steps/children-components/CategoryComponent";
import ServicesComponent from "@/components/client-appointments/steps/children-components/ServicesComponent";
import ProfessionalComponent from "@/components/client-appointments/steps/children-components/ProfessionalComponent";
import HoursComponent from "@/components/client-appointments/steps/children-components/HoursComponent";
import ConfirmationComponent from "@/components/client-appointments/steps/children-components/ConfirmationComponent";
import PaymentComponent from "@/components/client-appointments/steps/children-components/PaymentComponent";

interface Step {
    stepTitle: string;
    contentTitle: string;
    description: string;
    link: string;
}

const steps: Step[] = [
    { stepTitle: "Categoria", contentTitle: "Escolha a Categoria", description: "Selecione a categoria do serviço.", link: "categorias" },
    { stepTitle: "Serviço", contentTitle: "Escolha o Serviço", description: "Escolha o serviço desejado.", link: "servicos" },
    { stepTitle: "Profissional", contentTitle: "Escolha o Profissional", description: "Selecione o profissional disponível.", link: "profissional" },
    { stepTitle: "Horário", contentTitle: "Escolha o Horário", description: "Selecione um horário disponível.", link: "horarios", },
    { stepTitle: "Pagamento", contentTitle: "Realize o Pagamento", description: "Realize o pagamento.", link: "pagamento" },
    { stepTitle: "Confirmação", contentTitle: "Realize a confirmação", description: "Confirme os detalhes do agendamento.", link: "confirmar" },
];

export default function StepsLayout({children}: Readonly<{children: React.ReactNode}>) {
    const [currentStep, setCurrentStep] = useState(0);
    const pathname = usePathname();
    const router = useRouter();

    // Navega para o próximo link
    const navigateToStep = (stepIndex: number) => {
        setCurrentStep(stepIndex);
        const newPathname = pathname.split("/").slice(0, -1).join("/");
        router.push(`${newPathname}/${steps[stepIndex].link}`);
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) navigateToStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 0) navigateToStep(currentStep - 1);
    };

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            {/* Stepper Indicators */}
            <div className="flex justify-center gap-10 w-full">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
                                index === currentStep
                                    ? "bg-blue-600"
                                    : index < currentStep
                                    ? "bg-green-500"
                                    : "bg-gray-300"
                            }`}
                        >
                            {index + 1}
                        </div>
                        <span
                            className={`mt-2 text-sm ${
                                index === currentStep ? "text-blue-600 font-semibold" : "text-gray-500"
                            }`}
                        >
                            {step.stepTitle}
                        </span>
                    </div>
                ))}
            </div>

            {/* Step Content */}
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <h2 className="text-xl font-bold text-center">{steps[currentStep].contentTitle}</h2>
                </CardHeader>
                <CardContent>{children}</CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                        Voltar
                    </Button>
                    <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
                        {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                    </Button>
                </CardFooter>
            </Card>

            {/* Descrição */}
            <p className="text-gray-600 text-center">{steps[currentStep].description}</p>
        </div>
    );
}
