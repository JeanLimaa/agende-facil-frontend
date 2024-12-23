export interface Service {
    id: number;
    name: string;
    description: string | null;
    duration: number;
    price: number;
    companyId: number;
    categoryId: number;
}