import ProfessionalComponent from "@/components/client-appointments/steps/children-components/Professional/ProfessionalComponent";
import api from "@/services/apiService";
import { useStepsStore } from "@/store/StepsStore";

async function getEmployees(serviceId: string) {
    return (await api.get(`/employee-services/list/${serviceId}`)).data;
}

export default function ProfessionalPage(){
    const serviceId = useStepsStore.getState().stepData.servico;

    if(!serviceId) {
        useStepsStore.setState({stepData: {}});
        useStepsStore.getState().navigateToStep(0);
    }

    const dataPromise = getEmployees(serviceId!)

    return <ProfessionalComponent dataPromise={dataPromise} />
}