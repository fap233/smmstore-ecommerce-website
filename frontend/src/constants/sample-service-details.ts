export const sampleServiceDetails = {
  id: "1",
  title: "Seguidores Instagram (Pacotes)",
  description:
    "Escolha o pacote ideal para impulsionar seu perfil no Instagram.",
  packages: [
    {
      id: "p1",
      quantity: 500,
      price: 1.99,
      features: [
        "Entrega Rápida (1h)",
        "Garantia de Queda",
        "Suporte 24/7",
        "Usuários Reais",
      ],
    },
    {
      id: "p2",
      quantity: 1000,
      price: 2.99,
      features: [
        "Entrega Rápida (1h)",
        "Garantia de Queda",
        "Suporte 24/7",
        "Usuários Reais",
        "Mais Visibilidade",
      ],
    },
    {
      id: "p3",
      quantity: 2500,
      price: 5.99,
      features: [
        "Entrega Rápida (30min)",
        "Garantia de Queda",
        "Suporte 24/7",
        "Usuários Reais",
        "Maior Engajamento",
        "Suporte Prioritário",
      ],
    },
  ],
  howToUse: [
    {
      step: 1,
      title: "Selecione o Plano",
      description:
        "Escolha a quantidade de seguidores que você deseja para o seu perfil.",
    },
    {
      step: 2,
      title: "Informe seu Usuário",
      description:
        "Digite seu nome de usuário do Instagram e confirme as informações do perfil.",
    },
    {
      step: 3,
      title: "Finalize a Compra",
      description:
        "Prossiga para o pagamento seguro e aguarde a entrega dos seguidores.",
    },
  ],
  // Adicione uma propriedade para indicar o tipo de exibição, se for usar o formulário direto
  displayType: "packages_and_form", // 'packages_only', 'form_only', 'packages_and_form'
};
