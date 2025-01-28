import useSWR from "swr";
import { fetcher } from "@/helpers/fetcher";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { StepsProps } from "../types/steps-props.type";

export default function ProfessionalComponent({onNext, onPrevious, onUpdate, stepData}: StepsProps){
    const { data: professionals } = useSWR<any[]>(`/employee-services/list/${stepData.categoryId}`, fetcher, {suspense: true});

    if(professionals?.length === 0) return <div>No data</div>;
    if(!professionals) return <div>Algum erro ocorreu</div>;

    const handleSelect = (professionalId: number) => {
        onUpdate("employeeId", professionalId);
        onNext();
    };

    return (
        <div>
            {professionals.map((item) => {
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