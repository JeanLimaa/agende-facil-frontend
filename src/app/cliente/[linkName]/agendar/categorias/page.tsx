import CategoryComponent from "@/components/client-appointments/steps/children-components/Category/CategoryComponent";
import { AppointmentsProps } from "@/interfaces/appointments/appointments.interface";
import api from "@/services/apiService";
import { useStepsStore } from "@/store/StepsStore";

export default function CategoryPage({params}: AppointmentsProps) {
    useStepsStore.setState({currentStep: 0});

    const promiseData = api.get(`/category/list/${params.linkName}`);

    return <CategoryComponent dataPromise={promiseData} />
}