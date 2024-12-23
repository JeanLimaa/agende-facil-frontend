import { Button } from "@/components/ui/button";
import { Category } from "@/interfaces/appointments/api-data/Category.interface";
import axios, { AxiosResponse } from "axios";
import { ChevronRight } from "lucide-react";
import { use } from "react";
import { Btn } from "./Button";

export interface CategoryComponentProps {
    dataPromise: Promise<AxiosResponse<Category[]>>;
}

export default function CategoryComponent({dataPromise}: CategoryComponentProps){
    const data = use(dataPromise).data;
    
    return (
        <div>
            {data.map((item: Category) => {
                return (
                            <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                                <h3 className="font-semibold text-xl">{item.name}</h3>
                                <Btn itemId={String(item.id)} />
                            </div>
                    );
                })}
        </div>
    )
}