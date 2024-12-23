import { Button } from "@/components/ui/button";
import { Service } from "@/interfaces/appointments/api-data/Service.interface";
import { AxiosResponse } from "axios";
import { ChevronRight } from "lucide-react";
import { use } from "react";
import { Btn } from "./Button";

export interface ServicesComponentProps {
    dataPromise: Promise<AxiosResponse<Service[]>>;
}

export default function ServicesComponent({ dataPromise }: ServicesComponentProps){
    const data = use(dataPromise).data;
    
    return (
        <div>
            {data.map((item) => {
                return (
                    <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                        <h3 className="font-semibold text-xl">{item.name}</h3>
                        <Btn itemId={item.id} />
                    </div>
                )
            })}
        </div>
    )
}