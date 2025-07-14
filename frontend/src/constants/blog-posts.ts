interface BlogPost {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  link: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Como Aumentar Seu Engajamento no Instagram em 2024",
    description:
      "Descubra as melhores estratégias para impulsionar suas interações e crescer no Instagram.",
    date: "10 de Julho, 2024",
    imageUrl: "https://via.placeholder.com/400x250/FF5733/FFFFFF?text=Blog+Post+1",
    link: "/blog/post-1",
  },
  {
    id: "2",
    title: "TikTok para Negócios: Guia Completo para Iniciantes",
    description:
      "Aprenda a usar o TikTok para promover sua marca e alcançar milhões de potenciais clientes.",
    date: "5 de Julho, 2024",
    imageUrl: "https://via.placeholder.com/400x250/33FF57/FFFFFF?text=Blog+Post+2",
    link: "/blog/post-2",
  },
  {
    id: "3",
    title: "YouTube SEO: Otimize Seus Vídeos para Mais Visualizações",
    description:
      "Dicas essenciais para ranquear seus vídeos no YouTube e atrair mais público.",
    date: "1 de Julho, 2024",
    imageUrl: "https://via.placeholder.com/400x250/3357FF/FFFFFF?text=Blog+Post+3",
    link: "/blog/post-3",
  },
  {
    id: "4",
    title: "A Importância das Métricas nas Redes Sociais",
    description:
      "Entenda como analisar seus dados para tomar decisões estratégicas e otimizar suas campanhas.",
    date: "28 de Junho, 2024",
    imageUrl: "https://via.placeholder.com/400x250/FF33A1/FFFFFF?text=Blog+Post+4",
    link: "/blog/post-4",
  },
];