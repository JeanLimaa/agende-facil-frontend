//import { notFound } from 'next/navigation';
import { NotFoundCompany } from "./not-found-company";

export default async function ClienteIdPage({ params }: { params: { linkName: string } }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/${params.linkName}`);

  if (!response.ok) {
    if (response.status === 404) {
      return <NotFoundCompany />;
    }

    throw new Error('Erro ao buscar dados da empresa');
  }

  // Extrai os dados da empresa
  const company = await response.json();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h2>Bem vindo a, {company.name}</h2>
      <h2>Telefone para contato: {company.phone}</h2>
      <h2>Endereço: {company.address}</h2>
    </div>
  );
}
