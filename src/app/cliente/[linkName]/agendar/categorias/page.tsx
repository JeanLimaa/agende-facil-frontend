import CategoryComponent from "@/components/client-appointments/steps/children-components/CategoryComponent";
import { Category } from "@/interfaces/appointments/api-data/Category.interface";
import { AppointmentsProps } from "@/interfaces/appointments/appointments.interface";
import api from "@/services/apiService";

export default function CategoryPage({params}: AppointmentsProps) {
    const categorysPromise = api.get(`/category/list/${params.linkName}`);

    return <CategoryComponent dataPromise={categorysPromise} />;
}
