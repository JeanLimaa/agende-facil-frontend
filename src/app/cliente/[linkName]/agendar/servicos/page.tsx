import ServicesComponent from "@/components/client-appointments/steps/children-components/ServicesComponent";
import { Suspense } from "react";

export default function ServicesPage(){
    return (
        <Suspense fallback={"Loading..."}>
            <ServicesComponent/>
        </Suspense>
    )
}