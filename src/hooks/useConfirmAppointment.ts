import { StepData } from "@/components/client-appointments/steps/types/step-data.interface";
import api from "@/services/apiService";
import { toast } from "./use-toast";
import { z } from "zod";
import { ConfirmationData } from "@/types/appoitment-confirmation.type";
import { confirmationSchema } from "@/schemas/appointment-confirmation";
import {create} from 'zustand';
import { AxiosError } from "axios";

type AppointmentConfirmationState = {
  confirmationData: ConfirmationData;
  confirmationErrors: Partial<Record<keyof ConfirmationData, string>>;
  setConfirmationData: (field: keyof ConfirmationData, value: string) => void;
  clearConfirmationErrors: (field: keyof ConfirmationData) => void;
  setConfirmationErrors: (errors: Partial<Record<keyof ConfirmationData, string>>) => void;
};

export const useAppointmentConfirmationStore = create<AppointmentConfirmationState>((set) => ({
  confirmationData: { name: '', phone: '' },
  confirmationErrors: {},
  setConfirmationData: (field, value) => set((state) => ({
    confirmationData: { ...state.confirmationData, [field]: value },
    confirmationErrors: { ...state.confirmationErrors, [field]: undefined },
  })),
  clearConfirmationErrors: (field) => set((state) => ({
    confirmationErrors: { ...state.confirmationErrors, [field]: undefined },
  })),
  setConfirmationErrors: (errors) => set({ confirmationErrors: errors }),
}));


export function useConfirmAppointment() {
    const {
        confirmationData,
        setConfirmationData,
        confirmationErrors,
        setConfirmationErrors,
      } = useAppointmentConfirmationStore();

    const handleInputChange = (field: keyof ConfirmationData, value: string) => {
        setConfirmationData(field, value);
    };

    const handleConfirm = async (stepData: StepData) => {
        try {
            confirmationSchema.parse(confirmationData);
            
            const response = await api.post('/appointment', stepData);

            toast({description: 'Agendamento realizado com sucesso', variant: 'default'});

            return response;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const fieldErrors: Partial<Record<keyof ConfirmationData, string>> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) {
                        fieldErrors[err.path[0] as keyof ConfirmationData] = err.message;
                    }
                });
                setConfirmationErrors(fieldErrors);
            }
            if(error instanceof AxiosError){
                toast({description: error.response?.data?.message || error?.message || 'Erro ao realizar agendamento', variant: 'destructive'});
            }
        }
    }

    return {
        handleConfirm,
        confirmationData,
        setConfirmationData,
        confirmationErrors,
        setConfirmationErrors,
        handleInputChange
    }
}