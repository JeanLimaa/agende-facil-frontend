import { confirmationSchema } from "@/schemas/appointment-confirmation";
import { z } from "zod";

export type ConfirmationData = z.infer<typeof confirmationSchema>;