"use client";

import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetcher";
import { StepsProps } from "../types/steps-props.type";
import { toast } from "@/hooks/use-toast";
import Calendar from "react-calendar"; // Importando o componente de calendário
import "react-calendar/dist/Calendar.css"; // Importando o estilo padrão
import { format } from "date-fns";

interface HoursEmployee {
    availableTimes: string[];
}

export default function HoursComponent({ onNext, onUpdate, stepData }: StepsProps) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    const { data, error } = useSWR<HoursEmployee>(
        selectedDate ? `/employee/${stepData.employeeId}/available-times?date=${selectedDate}` : null,
        fetcher,
        {
            suspense: false,
            onLoadingSlow: () => setLoading(true), 
            onSuccess: () => setLoading(false), 
            onError: () => setLoading(false)
        }
    );

    const handleDateSelect = (date: Date) => {
        const formattedDate = date.toISOString().split("T")[0];
        setSelectedDate(formattedDate);
    };

    const handleSelect = (hour: string) => {
        const date = new Date(`${selectedDate} ${hour}`).toISOString();

        if (!date || date === "Invalid Date") {
            toast({ description: "Data inválida", variant: "destructive" });
            return;
        }

        onUpdate("date", date);
        onNext();
    };

    if (error) return <div>Algum erro ocorreu</div>;

    return (
        <div>
                <div>
                    <h3 className="font-semibold text-xl mb-4">Escolha uma data</h3>
                    <Calendar
                        onChange={(value) => handleDateSelect(value as Date)} 
                        value={new Date()}
                        minDate={new Date()} // Impede a seleção de datas passadas
                    />
                </div>

                {/* // Exibição dos horários disponíveis após a seleção da data */}
                {selectedDate && <div>
                    <h3 className="font-semibold text-xl mb-4">Horários Disponíveis para {format(selectedDate, "dd/MM/yyyy")}</h3>

                    {loading ? (
                        <div>Carregando horários...</div>
                    ) : data?.availableTimes?.length === 0 ? (
                        <div>Não há horários disponíveis para essa data.</div>
                    ) : (
                        data?.availableTimes?.map((hour) => (
                            <div key={hour} className="flex items-center justify-between p-2 border-b border-gray-200">
                                <h3 className="font-semibold text-xl">{hour}</h3>
                                <Button onClick={() => handleSelect(hour)} disabled={loading}>
                                    <ChevronRight />
                                </Button>
                            </div>
                        ))
                    )}
                </div>}
        </div>
    );
}
