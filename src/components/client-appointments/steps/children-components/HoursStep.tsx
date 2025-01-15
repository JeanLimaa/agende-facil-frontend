import { Button } from "@/components/ui/button";
import { Service } from "@/interfaces/appointments/api-data/Service.interface";
import { AxiosResponse } from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { use } from "react";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetcher";
import { StepsProps } from "../types/steps-props.type";

interface HoursEmployee {
    availableTimes: string[];
}


export default function HoursComponent({onNext, onPrevious, onUpdate, stepData}: StepsProps){
    const { data } = useSWR<HoursEmployee>(`/employee/${stepData.employeeId}/available-times?date=2024-12-23&serviceId=${stepData.serviceId}`, fetcher, {suspense: true});
    
    if(data?.availableTimes?.length === 0) return <div>No data</div>;
    if(!data) return <div>Algum erro ocorreu</div>;

    const handleSelect = (hour: string) => {
        onUpdate("hours", hour);
        onNext();
    };
    
    return (
        <div>
            {data.availableTimes.map((hour) => {
                return (
                    <div key={hour} className="flex items-center justify-between p-2 border-b border-gray-200">

                        <h3 className="font-semibold text-xl">{hour}</h3>

                        <Button onClick={() => handleSelect(hour)}>
                            <ChevronRight />
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}