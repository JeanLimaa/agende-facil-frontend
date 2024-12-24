import CategoryStep from "@/components/client-appointments/steps/children-components/CategoryStep";
import ServiceStep from "@/components/client-appointments/steps/children-components/ServicesStep";
import ProfessionalStep from "@/components/client-appointments/steps/children-components/ProfessionalStep";
import ConfirmationStep from "@/components/client-appointments/steps/children-components/ConfirmationStep";
import HoursStep from "@/components/client-appointments/steps/children-components/HoursStep";

export type StepType = 'category' | 'service' | 'professional' | 'hours' | 'confirmation';

interface IStep {
    stepTitle: string;
    contentTitle: string;
    description: string;
    name: StepType;
    component: React.ElementType;
}

export const steps: IStep[] = [
    { stepTitle: "Categoria", contentTitle: "Escolha a Categoria", description: "Selecione a categoria do serviço.", name: "category", component: CategoryStep },
    { stepTitle: "Serviço", contentTitle: "Escolha o Serviço", description: "Escolha o serviço desejado.", name: "service", component: ServiceStep },
    { stepTitle: "Profissional", contentTitle: "Escolha o Profissional", description: "Selecione o profissional disponível.", name: "professional", component: ProfessionalStep },
    { stepTitle: "Horário", contentTitle: "Escolha o Horário", description: "Selecione um horário disponível.", name: "hours", component: HoursStep },
    { stepTitle: "Confirmação", contentTitle: "Realize a confirmação", description: "Confirme os detalhes do agendamento.", name: "confirmation", component: ConfirmationStep },
];