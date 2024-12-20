import api from "@/services/apiService";
import { AxiosError } from "axios";

export default async function getData(endpoint: string){
    try {
        const response = await api.get(endpoint);
        return response.data;
    } catch (error) {
        if(error instanceof AxiosError){
            if(error.response){
                if(error.response.status === 404){
                    return <h1>404</h1>
                }
            }
        }
    }
}