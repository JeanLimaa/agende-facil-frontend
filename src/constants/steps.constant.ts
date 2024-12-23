interface Step {
    stepTitle: string;
    contentTitle: string;
    description: string;
    link: string;
}

export const steps: Step[] = [
    { stepTitle: "Categoria", contentTitle: "Escolha a Categoria", description: "Selecione a categoria do serviço.", link: "categorias" },
    { stepTitle: "Serviço", contentTitle: "Escolha o Serviço", description: "Escolha o serviço desejado.", link: "servicos" },
    { stepTitle: "Profissional", contentTitle: "Escolha o Profissional", description: "Selecione o profissional disponível.", link: "profissional" },
    { stepTitle: "Horário", contentTitle: "Escolha o Horário", description: "Selecione um horário disponível.", link: "horarios", },
    /* { stepTitle: "Pagamento", contentTitle: "Realize o Pagamento", description: "Realize o pagamento.", link: "pagamento" }, */
    { stepTitle: "Confirmação", contentTitle: "Realize a confirmação", description: "Confirme os detalhes do agendamento.", link: "confirmar" },
];