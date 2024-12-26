import { z } from "zod";

export const confirmationSchema = z.object({
    name: z.string().min(1, "O nome é obrigatório").max(100, "O nome não pode exceder 100 caracteres"),
    phone: z.string().regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Informe um telefone válido no formato (99) 99999-9999"),
});