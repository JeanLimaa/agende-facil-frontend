import { steps } from "@/constants/steps.constant";

interface StepIndicatorProps {
    currentStep: number; 
    navigateToStep: (stepIndex: number) => void;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, navigateToStep }) => (
    <div className="flex justify-center gap-10 w-full">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full text-white font-bold ${
              index === currentStep
                ? "bg-blue-600 cursor-not-allowed"
                : index < currentStep
                ? "bg-green-500 cursor-pointer"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={() => navigateToStep(index)}
          >
            {index + 1}
          </div>
          <span
            className={`mt-2 text-sm ${
              index === currentStep ? "text-blue-600 font-semibold" : "text-gray-500"
            }`}
          >
            {step.stepTitle}
          </span>
        </div>
      ))}
    </div>
);