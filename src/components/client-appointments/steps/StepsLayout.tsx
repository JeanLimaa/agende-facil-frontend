"use client"

import React, { Suspense, useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { steps, StepType as Step } from '@/constants/steps.constant';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { StepIndicator } from './StepsIndicator';
import { StepData } from './types/step-data.interface';
import { Skeleton } from './Skeleton';
import { useAppointment } from '@/hooks/useAppointment';
import { useConfirmAppointment } from '@/hooks/useConfirmAppointment';

const Scheduling: React.FC = () => {
    const {
        currentStep,
        stepData,
        nextStep,
        previousStep,
        navigateToStep,
        handleDataUpdate,
        CurrentComponent
    } = useAppointment();
    
    const {
        handleConfirm
    } = useConfirmAppointment();

    const isConfirmationStep = steps.findIndex((s) => s.name === 'confirmation') === currentStep;

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

                    {isConfirmationStep && (
                        <Button
                            onClick={() => handleConfirm({
                                ...stepData,
                                 serviceId: stepData.services.map((service) => service.id)
                            })}
                        >
                            Confirmar
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <p className="text-gray-600 text-center">{steps[currentStep].description}</p>
        </div>
    );
};

export default Scheduling;