//"use client"
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { steps } from "@/constants/steps.constant";
import { useStepsStore } from "@/store/StepsStore";

export default function StepsLayout({children}: Readonly<{children: React.ReactNode}>) {
/*     const url = headers().get("x-url")?.split("/").pop();
    const currentStep = steps.findIndex((step) => step.link === url); */
    const currentStep = useStepsStore.getState().currentStep;
    console.log(currentStep);
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
{/*                     <Button variant="outline" onClick={handleBack} disabled={currentStep === 0}>
                        Voltar
                    </Button>
                    <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
                        {currentStep === steps.length - 1 ? "Finalizar" : "Próximo"}
                    </Button> */}
                </CardFooter>
            </Card>

            {/* Descrição */}
            <p className="text-gray-600 text-center">{steps[currentStep].description}</p>
        </div>
    );
}
