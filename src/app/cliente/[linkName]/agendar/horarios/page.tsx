import HoursComponent from "@/components/client-appointments/steps/children-components/HoursComponent";
import ProfessionalComponent from "@/components/client-appointments/steps/children-components/Professional/ProfessionalComponent";
import api from "@/services/apiService";
import { useStepsStore } from "@/store/StepsStore";

async function getHours(employeId: string) {
    return (await api.get(`/employee-services/list/${employeId}`)).data;
}

export default function HoursPage(){
    const professionalId = useStepsStore.getState().stepData.profissional;

    if(!professionalId) {
        useStepsStore.setState({stepData: {}});
        useStepsStore.getState().navigateToStep(0);
    }

    const dataPromise = getHours(professionalId!)

    return <HoursComponent dataPromise={dataPromise} />
}