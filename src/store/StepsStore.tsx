//"use server";
//"use client"
import { create } from "zustand";
import { steps } from "@/constants/steps.constant";
import { redirect, useRouter } from "next/navigation";
import { headers } from "next/headers";

export interface StepData {
  categoria?: string;
  servico?: string;
  profissional?: string;
  horario?: string;
}

interface StepsStore {
  currentStep: number;
  stepData: StepData;
  setStepData: <K extends keyof StepData>(key: K, value: any) => void;
  nextStep: () => void;
  prevStep: () => void;
  navigateToStep: (stepIndex: number) => void;
}

export const useStepsStore = create<StepsStore>((set, get) => ({
  currentStep: 0,
  stepData: {},
  setStepData: (key, value) =>
    set((state) => ({
      stepData: { ...state.stepData, [key]: value },
    })),
  nextStep: () => {
    const { currentStep, navigateToStep } = get();
    if (currentStep < steps.length - 1) {
      navigateToStep(currentStep + 1);
    }
  },
  prevStep: () => {
    const { currentStep, navigateToStep } = get();
    if (currentStep > 0) {
      navigateToStep(currentStep - 1);
    }
  },
  navigateToStep: (stepIndex: number) => {
    set({ currentStep: stepIndex });

    const pathname = headers().get("x-url");
    const newPathname = pathname?.split("/").slice(0, -1).join("/");

    redirect(`${newPathname}/${steps[stepIndex].link}`);
  },
/*   navigateToStep: (stepIndex: number) => {
    const router = useRouter();
    set({ currentStep: stepIndex });

    const pathname = window.location.pathname;
    const newPathname = pathname?.split("/").slice(0, -1).join("/");

    router.push(`${newPathname}/${steps[stepIndex].link}`);
  }, */
}));