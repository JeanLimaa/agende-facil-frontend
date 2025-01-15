"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { StepsProps } from "../types/steps-props.type";
import { ConfirmationData } from "@/types/appoitment-confirmation.type";
import { useAppointment } from "@/hooks/useAppointment";
import { useConfirmAppointment } from "@/hooks/useConfirmAppointment";
import InputMask from "react-input-mask";

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
                    <p className="text-gray-600">{stepData.categoryId}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Serviços</Label>
                    <p className="text-gray-600">{stepData.serviceId}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Horário</Label>
                    <p className="text-gray-600">{stepData.hours}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <Label>Valor</Label>
                    <p className="text-gray-600">R$ 100,00</p>
                </div>
            </div>

            {footerActions && <div className="mt-4">{footerActions}</div>}
        </div>
    );
}