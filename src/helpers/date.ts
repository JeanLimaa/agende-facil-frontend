import {format, toZonedTime} from "date-fns-tz";
import {ptBR} from "date-fns/locale";

// Função para formatar a data e hora no fuso horário de Brasília (GMT-3)
export const formatDateInBrasiliaTimezone = (date: string | Date) => {
    const brasiliaTimeZone = 'America/Sao_Paulo'; // Fuso horário de Brasília
    const utcDate = toZonedTime(date, brasiliaTimeZone); // Converte para UTC
    return format(utcDate, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR }); // Formato desejado
};