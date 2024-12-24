import { StepData } from "./step-data.interface";

export type StepsProps = {
    onNext: () => void;
    onPrevious: () => void;
    onUpdate: (field: keyof StepData, value: string) => void;
    stepData: StepData;
};