import { StepData } from "@/components/client-appointments/steps/types/step-data.interface";
import { steps, StepType as Step } from "@/constants/steps.constant";
import api from "@/services/apiService";
import { useEffect, useState } from "react";
import { toast } from "./use-toast";
import { z } from "zod";
import { ConfirmationData } from "@/types/appoitment-confirmation.type";
import { confirmationSchema } from "@/schemas/appointment-confirmation";

export function useAppointment() {
    const [step, setStep] = useState<Step>('category');
    const [stepData, setStepData] = useState<StepData>({
        categoryId: '',
        serviceId: '',
        professionalId: '',
        hours: '',
    });

    
    const [confirmationData, setConfirmationData] = useState<ConfirmationData>({
        name: "",
        phone: "",
    });
    const [confirmationErrors, setConfirmationErrors] = useState<Partial<Record<keyof ConfirmationData, string>>>({});

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

    const handleConfirm = async () => {
        try {
            confirmationSchema.parse(confirmationData);
            console.log(confirmationData)
            alert('Agendamento realizado com sucesso');
            toast({description: 'Agendamento realizado com sucesso', variant: 'default'});
            const response = await api.post('/appointments', stepData);

            if (response.status === 201) {
                toast({description: 'Agendamento realizado com sucesso', variant: 'default'});
            }

            return response;
        } catch (error) {
            alert(error);
            if (error instanceof z.ZodError) {
                const fieldErrors: Partial<Record<keyof ConfirmationData, string>> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as keyof ConfirmationData] = err.message;
                    }
                });
                setConfirmationErrors(fieldErrors);
            }
            
        }
    }

    return {
        handleConfirm,
        currentStep,
        stepData,
        nextStep,
        previousStep,
        navigateToStep,
        handleDataUpdate,
        CurrentComponent,
        confirmationData,
        setConfirmationData,
        confirmationErrors,
        setConfirmationErrors,
    }
}