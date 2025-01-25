import { StepData } from "./step-data.interface";

export type StepsProps = {
    onNext: () => void;
    onPrevious: () => void;
    onUpdate: (field: keyof StepData, value: string | number | number[]) => void;
    stepData: StepData;
};