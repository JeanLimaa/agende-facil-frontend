"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StepsProps } from "../types/steps-props.type";
import { ConfirmationData } from "@/types/appoitment-confirmation.type";
import { useConfirmAppointment } from "@/hooks/useConfirmAppointment";
import InputMask from "react-input-mask";
import { formatDateInBrasiliaTimezone } from "@/helpers/date";
import { formatToCurrency } from "@/helpers/currency";

function ErrorText({ errorMessage }: { errorMessage: string }) {
    return <span className="text-red-500 text-xs ml-2">{errorMessage}</span>;
}

export default function ConfirmationComponent({ 
    stepData,
    footerActions
}: StepsProps & { footerActions?: React.ReactNode }) {
    const {
        confirmationData: data,
        setConfirmationData: setData,
        confirmationErrors: errors,
        setConfirmationErrors: setErrors
    } = useConfirmAppointment();

    const handleChange = (field: keyof ConfirmationData, value: string) => {
        setData(field, value);
    };

    function sumServicePrices() {
        return stepData.services.reduce((sum, service) => sum + service.price, 0);
    }

    return (
        <div className="flex flex-col gap-10">
            <div className="space-y-4">
                <h1 className="text-lg font-medium text-gray-800">Seus Dados</h1>

                <div className="flex flex-col gap-2">
                    
                    <Label htmlFor="name">
                        Seu nome {errors.name && <ErrorText errorMessage={errors.name} />}
                    </Label>
                    <Input
                        id="name"
                        placeholder="Ex: John Doe"
                        value={data.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        className={errors.name ? "border-red-500" : ""}
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">
                        Seu telefone
                        {errors.phone && <ErrorText errorMessage={errors.phone} />}
                    </Label>
                    <InputMask
                        mask="(99) 99999-9999"
                        value={data.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                    >
                        {(inputProps) => <Input {...inputProps} id="phone" className={errors.phone ? "border-red-500" : ""} />}
                    </InputMask>
                </div>
            </div>

            <div className="space-y-4 ">
                <h1 className="text-lg font-medium text-gray-800">Seu Agendamento</h1>

                <div className="flex flex-col gap-2">
                    <Label>Profissional</Label>
                    <p className="text-gray-600">{stepData.employeeName}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Serviços</Label>
                    {stepData.services.map((service) => (
                        <p key={service.id} className="text-gray-600">{service.name}</p>
                    ))}
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Data e Horário</Label>
                    <p className="text-gray-600">{formatDateInBrasiliaTimezone(stepData.date)}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Valor</Label>
                     <p>{formatToCurrency(sumServicePrices())}</p>
                </div>
            </div>

            {footerActions && <div className="mt-4">{footerActions}</div>}
        </div>
    );
}