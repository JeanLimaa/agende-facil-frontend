import { use, useState } from "react";
import { Btn } from "./Button";

export interface ServicesComponentProps {
    dataPromise: Promise<any[]>;
}

export default function ProfessionalComponent({dataPromise}: ServicesComponentProps){
    const professionals = use(dataPromise);

    return (
        <div>
            {professionals.map((item) => {
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