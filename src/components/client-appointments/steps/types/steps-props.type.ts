import { Service } from "@/interfaces/appointments/api-data/Service.interface";
import { StepData } from "./step-data.interface";

export type StepsProps = {
    onNext: () => void;
    onPrevious: () => void;
    onUpdate: (field: keyof StepData, value: string | number | number[] | Service[]) => void;
    stepData: StepData;
};