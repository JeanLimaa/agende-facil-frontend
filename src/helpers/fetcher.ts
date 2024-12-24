import api from "@/services/apiService";

type reqType = "get" | "post" | "put" | "delete";
export const fetcher = (url: string, reqType: reqType = "get") => api[reqType](url).then((res) => res.data);
//export const fetcher = (url: string, reqType: reqType = "get") => fetch(`http://localhost:3000${url}`).then((res) => res.json());