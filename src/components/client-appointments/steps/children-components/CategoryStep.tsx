"use client";

import { Button } from "@/components/ui/button";
import { Category } from "@/interfaces/appointments/api-data/Category.interface";
import { ChevronRight } from "lucide-react";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetcher";
import { StepsProps } from "../types/steps-props.type";
import { useParams } from "next/navigation";

export default function CategoryComponent({onUpdate, onNext}: StepsProps){
    const { linkName } = useParams();
    const { data } = useSWR<Category[]>(`/category/list/${linkName}`, fetcher, {suspense: true});

    if(data?.length === 0) return <div>No data</div>;
    if(!data) return <div>Algum erro ocorreu</div>;

    const handleSelect = (category: string) => {
        onUpdate("categoryId", category);
        onNext();
    };

    return (
        <div>
            {data.map((item: Category) => {
                return (
                            <div key={item.id} className="flex items-center justify-between p-2 border-b border-gray-200">
                                <h3 className="font-semibold text-xl">{item.name}</h3>

                                <Button onClick={() => handleSelect(String(item.id))}>
                                    <ChevronRight />
                                </Button>
                            </div>
                    );
                })}
        </div>
    )
}