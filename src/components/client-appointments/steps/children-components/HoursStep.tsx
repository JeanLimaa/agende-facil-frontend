"use client";

import { Button } from "@/components/ui/button";
import { AxiosResponse } from "axios";
import { ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "@/helpers/fetcher";
import { StepsProps } from "../types/steps-props.type";
import { toast } from "@/hooks/use-toast";

interface HoursEmployee {
    availableTimes: string[];
}

export default function HoursComponent({onNext, onUpdate, stepData}: StepsProps) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    
    const { data, error } = useSWR<HoursEmployee>(
        selectedDate ? `/employee/${stepData.employeeId}/available-times?date=${selectedDate}&serviceId=${stepData.serviceId}` : null, 
        fetcher, 
        { suspense: true }
    );

    const handleDateSelect = (date: string) => {
        setSelectedDate(date);
    };

    const handleSelect = (hour: string) => {
        const date = new Date(`${selectedDate} ${hour}`).toISOString();

        if(!date || date === "Invalid Date") toast({description: "Data inválida", variant: "destructive"});

        onUpdate("date", date);
        onNext();
    };

    if (error) return <div>Algum erro ocorreu</div>;

    return (
        <div>
            {!selectedDate ? (
                <div>
                    <h3 className="font-semibold text-xl mb-4">Escolha uma data</h3>
                    
                    <div className="flex space-x-4">
                        {/* Algumas datas fixas de teste*/}
                        {['2024-12-23', '2024-12-24', '2025-02-15'].map((date) => (
                            <Button 
                                key={date} 
                                onClick={() => handleDateSelect(date)}
                                variant="outline"
                            >
                                {date}
                            </Button>
                        ))}
                    </div>
                </div>
            ) : (
                // Exibição dos horários após a seleção da data
                <div>
                    <h3 className="font-semibold text-xl mb-4">Horários Disponíveis para {selectedDate}</h3>
                    {data?.availableTimes?.length === 0 ? (
                        <div>No available times for the selected date.</div>
                    ) : (
                        data?.availableTimes?.map((hour) => (
                            <div key={hour} className="flex items-center justify-between p-2 border-b border-gray-200">
                                <h3 className="font-semibold text-xl">{hour}</h3>
                                <Button onClick={() => handleSelect(hour)}>
                                    <ChevronRight />
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}