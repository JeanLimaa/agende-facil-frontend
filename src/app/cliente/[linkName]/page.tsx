import { ActionBtn } from '@/components/actionBtn';
import { AppointmentsProps } from '@/interfaces/appointments/appointments.interface';
import api from '@/services/apiService';

export default async function ClienteIdPage({params}: AppointmentsProps) {
  const response = await api.get(`/company/${params.linkName}`);
  console.log(response);
  if (response.status !== 200) {
    return {
      notFound: true,
    };
  }

  const company = response.data;

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h2>Bem vindo a, {company.name}</h2>
        <h2>Telefone para contato: {company.phone}</h2>
        <h2>Endereço: {company.address}</h2>
        <ActionBtn />
    </div>
  );
}