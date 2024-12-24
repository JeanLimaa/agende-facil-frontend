"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { steps, StepType as Step } from '@/constants/steps.constant';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { StepIndicator } from './StepsIndicator';
import { StepData } from './types/step-data.interface';
import { Skeleton } from './Skeleton';

const Scheduling: React.FC = () => {
    const [step, setStep] = useState<Step>('category');
    const [stepData, setStepData] = useState<StepData>({
        categoryId: '',
        serviceId: '',
        professionalId: '',
        hours: '',
    });

    const currentStep = steps.findIndex((s) => s.name === step);

    const nextStep = () => {
        setStep(steps[currentStep + 1].name);
    };

    const previousStep = () => {
        setStep(steps[currentStep - 1].name);
    };

    const navigateToStep = (stepIndex: number) => {
        if (stepIndex < 0 || stepIndex >= steps.length || stepIndex >= currentStep) return;

        setStep(steps[stepIndex].name);
    }

    const handleDataUpdate = (field: keyof StepData, value: string) => {
        setStepData((prev) => ({ ...prev, [field]: value }));
    };

    const CurrentComponent = steps[currentStep].component;

    // Add confirmation before unloading the page if the user has advanced in steps
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (currentStep > 0) {
                e.preventDefault();
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [currentStep]);

    return (
        <div className="flex flex-col items-center gap-6 p-4">
            <StepIndicator currentStep={currentStep} navigateToStep={navigateToStep} />

            <Card className="w-full max-w-4xl shadow-md">
                <CardHeader>
                    <h2 className="text-xl font-bold text-center">{steps[currentStep].contentTitle}</h2>
                </CardHeader>
                <CardContent>
                    <Suspense fallback={<Skeleton />}>
                        <CurrentComponent
                            onNext={nextStep}
                            onPrevious={previousStep}
                            onUpdate={handleDataUpdate}
                            stepData={stepData}
                        />
                    </Suspense>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {currentStep > 0 && <Button
                        variant="ghost"
                        className='text-xs text-gray-400'
                        onClick={previousStep}
                    >
                        <ChevronLeft />Voltar
                    </Button>}
                </CardFooter>
            </Card>

            <p className="text-gray-600 text-center">{steps[currentStep].description}</p>
        </div>
    );
};

export default Scheduling;