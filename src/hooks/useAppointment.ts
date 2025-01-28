import { StepData } from "@/components/client-appointments/steps/types/step-data.interface";
import { steps, StepType as Step } from "@/constants/steps.constant";
import { useEffect, useState } from "react";

export function useAppointment() {
    const [step, setStep] = useState<Step>('category');
    const [stepData, setStepData] = useState<StepData>({
        categoryId: 0,
        serviceId: [],
        employeeId: '',
        date: '',
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

    const handleDataUpdate = (field: keyof StepData, value: string | number) => {
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

    return {
        currentStep,
        stepData,
        nextStep,
        previousStep,
        navigateToStep,
        handleDataUpdate,
        CurrentComponent,
    }
}