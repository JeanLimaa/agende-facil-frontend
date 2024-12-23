import { Button } from "@/components/ui/button";
import { Service } from "@/interfaces/appointments/api-data/Service.interface";
import { AxiosResponse } from "axios";
import { ChevronRight } from "lucide-react";
import { use } from "react";

export interface HoursComponentProps {
    dataPromise: Promise<AxiosResponse<Service[]>>;
}

export default function HoursComponent({dataPromise}: HoursComponentProps){
    const data = use(dataPromise).data;
    
    return (
        <div>
            {data.map((item) => {
                return (
                    <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                        <h3 className="font-semibold text-xl">{item.name}</h3>
                    </div>
                )
            })}
        </div>
    )
}