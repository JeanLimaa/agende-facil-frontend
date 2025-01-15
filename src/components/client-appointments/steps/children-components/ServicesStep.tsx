import { Button } from "@/components/ui/button";
import { Service } from "@/interfaces/appointments/api-data/Service.interface";
import { ChevronRight } from "lucide-react";
import { fetcher } from "@/helpers/fetcher";
import useSWR from "swr";
import { StepsProps } from "../types/steps-props.type";


export default function ServicesComponent({ onUpdate, onNext, stepData }: StepsProps){
    const { data } = useSWR<Service[]>(`/service/list/category/${stepData.categoryId}`, fetcher, {suspense: true});

    if(data?.length === 0) return <div>No data</div>;
    if(!data) return <div>Algum erro ocorreu</div>;

    const handleSelect = (service: number) => {
        onUpdate("serviceId", service);
        onNext();
    };

    return (
        <div>
            {data.map((item) => {
                return (
                    <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                        <h3 className="font-semibold text-xl">{item.name}</h3>

                        <Button onClick={() => handleSelect(item.id)}>
                            <ChevronRight />
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}
