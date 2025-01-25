import { Button } from "@/components/ui/button";
import { Service } from "@/interfaces/appointments/api-data/Service.interface";
import { fetcher } from "@/helpers/fetcher";
import useSWR from "swr";
import { StepsProps } from "../types/steps-props.type";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

export default function ServicesComponent({ onUpdate, onNext, stepData }: StepsProps) {
    const { data } = useSWR<Service[]>(`/service/list/category/${stepData.categoryId}`, fetcher, { suspense: true });

    if (data?.length === 0) return <div>A empresa ainda não possui serviços associados.</div>;
    if (!data) return <div>Algum erro ocorreu</div>;

    const [selectedServices, setSelectedServices] = useState<Set<number>>(new Set());

    const toggleSelectService = (serviceId: number) => {
        const newSelection = new Set(selectedServices);
        if (newSelection.has(serviceId)) {
            newSelection.delete(serviceId); // Remove se já estiver selecionado
        } else {
            newSelection.add(serviceId); // Adiciona se não estiver selecionado
        }
        setSelectedServices(newSelection);
    };

    const handleConfirmSelection = () => {
        if (selectedServices.size < 1) {
            toast({description: "Selecione ao menos um serviço", variant: "destructive"});
            return;
        };
         console.log("serviceId", Array.from(selectedServices), selectedServices);
        onUpdate("serviceId", Array.from(selectedServices)[0]);
        onNext();
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold mb-4">Selecione os serviços desejados</h2>

            <div className="flex flex-col gap-5">
                {data.map((item) => {
                    const isSelected = selectedServices.has(item.id);
                    return (
                        <div
                            key={item.id}
                            className={`flex items-center justify-between p-6 border rounded-lg shadow-sm cursor-pointer ${isSelected ? "bg-gray-300 text-white" : "bg-white"}`}
                            onClick={() => toggleSelectService(item.id)}
                        >
                            <div>
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-gray-600">Descrição do serviço...</p>
                            </div>
                                <Button
                                    className={`w-32 ${isSelected && "bg-green-400 hover:bg-green-500 text-white"}`}
                                    variant={`outline`}
                                    onClick={(e) => {
                                        e.stopPropagation(); // Impede que o clique no botão altere a seleção
                                        toggleSelectService(item.id);
                                    }}
                                >
                                    {isSelected ? "Selecionado" : "Selecionar"}
                                </Button>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6">
                <Button onClick={handleConfirmSelection} disabled={selectedServices.size === 0} className="w-full">
                    Confirmar Seleção
                </Button>
            </div>
        </div>
    );
}