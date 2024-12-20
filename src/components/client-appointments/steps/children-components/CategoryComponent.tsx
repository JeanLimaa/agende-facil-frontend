import { Button } from "@/components/ui/button";
import { Category } from "@/interfaces/appointments/api-data/Category.interface";
import { AxiosResponse } from "axios";
import { ChevronRight } from "lucide-react";
import { use } from "react";

export interface CategoryComponentProps {
    dataPromise: Promise<AxiosResponse<Category[]>>;
}

export default function CategoryComponent({ dataPromise }: CategoryComponentProps){
    const data = use(dataPromise).data;
    
    return (
        <div>
            {data.map((item: any) => {
                return (
                    <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                        <h3 className="font-semibold text-xl">{item.name}</h3>
                        <Button variant="outline" size="icon">
                            <ChevronRight />
                        </Button>
                    </div>
                )
            })}
        </div>
    )
}