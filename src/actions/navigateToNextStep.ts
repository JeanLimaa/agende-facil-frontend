"use server";

import { useStepsStore } from "@/store/StepsStore";
import { StepData } from "@/store/StepsStore";

export async function navigateToNextStep(stepData: keyof StepData, id: number) {
    const stepStore = useStepsStore.getState();
    stepStore.setStepData(stepData, id);
    stepStore.navigateToStep(stepStore.currentStep + 1);
}