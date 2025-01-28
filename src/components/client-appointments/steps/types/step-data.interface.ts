/* export interface Service {
    id: number;
    name: string;
    description: string | null;
    duration: number;
    price: number;
    companyId: number;
    categoryId: number;
} */

import { Service } from "@/interfaces/appointments/api-data/Service.interface";


export interface StepData {
    categoryId: number;
    date: string | Date;
    services: Service[];
    employeeId: string;
    employeeName: string;
}