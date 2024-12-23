import { Button } from "@/components/ui/button";
import { Service } from "@/interfaces/appointments/api-data/Service.interface";
import { AxiosResponse } from "axios";
import { ChevronRight } from "lucide-react";
import { use } from "react";

interface HoursEmployee {
    availableTimes: string[];
}

export interface HoursComponentProps {
    dataPromise: Promise<HoursEmployee>;
}

export default function HoursComponent({dataPromise}: HoursComponentProps){
    const data = use(dataPromise);
    
    return (
        <div>
            {data.availableTimes.map((hour) => {
                return (
                    <div key={hour} className="flex items-center justify-between p-2 border-b border-gray-200">
                        <h3 className="font-semibold text-xl">{hour}</h3>
                    </div>
                )
            })}
        </div>
    )
}