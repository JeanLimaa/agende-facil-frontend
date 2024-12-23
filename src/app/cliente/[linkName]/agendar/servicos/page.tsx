//"use client"
import api from "@/services/apiService";
import { useStepsStore } from "@/store/StepsStore";
import ServicesComponent from "@/components/client-appointments/steps/children-components/Services/ServicesComponent";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export default function ServicesPage(){
    useStepsStore.setState({currentStep: 1});

    const stepsStore = useStepsStore.getState();
    const categoryId = stepsStore.stepData.categoria;

    if(!categoryId) {
        useStepsStore.setState({stepData: {}});
        stepsStore.navigateToStep(0);
    };

    const dataPromise = api.get(`/service/list/category/${categoryId}`);

    return <ServicesComponent dataPromise={dataPromise} />
}