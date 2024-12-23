import api from "@/services/apiService";

type reqType = "get" | "post" | "put" | "delete";
export const fetcher = (url: string, reqType: reqType = "get") => api[reqType](url).then((res) => res.data);