import { useState, useEffect, useMemo } from "react";
import { ArrowRight, ArrowLeft, Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Layout from "@/components/Layout";

// Função para calcular tempo de leitura baseado em melhores práticas
const calculateReadingTime = (content: string): string => {
  // Remove tags HTML para contar apenas o texto
  const textContent = content.replace(/<[^>]*>/g, "");

  // Conta palavras (separadas por espaços, quebras de linha, etc.)
  const words = textContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;

  // Velocidade média de leitura em português: 200-250 palavras por minuto
  // Usamos 220 como média otimizada para conteúdo técnico/profissional
  const wordsPerMinute = 220;

  // Calcula tempo em minutos
  const minutes = Math.ceil(wordCount / wordsPerMinute);

  // Retorna formatação adequada
  if (minutes === 1) {
    return "1 min";
  } else if (minutes < 60) {
    return `${minutes} min`;
  } else {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}min`;
    }
  }
};

// Função para obter estatísticas detalhadas do artigo
const getArticleStats = (content: string) => {
  const textContent = content.replace(/<[^>]*>/g, "");
  const words = textContent
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const wordCount = words.length;
  const charCount = textContent.length;
  const readingTime = calculateReadingTime(content);

  return {
    wordCount,
    charCount,
    readingTime,
    estimatedReadingSpeed: 220, // palavras por minuto
  };
};

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPost, setSelectedPost] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Artigos essenciais e focados
  const blogPosts = [
    {
      id: 1,
      title:
        "Simples Nacional 2025: O Guia Definitivo para Empresas em Fortaleza",
      excerpt:
        "Descomplique o Simples Nacional! Entenda o que é, quem pode optar, as tabelas e anexos atualizados para 2025 e como sua empresa em Fortaleza pode se beneficiar.",
      date: "2025-08-14",
      category: "Tributário",
      featured: true,
      content: `
        <h2>O que é o Simples Nacional?</h2>
        <p>O Simples Nacional é um regime tributário facilitado e simplificado, criado em 2006 pela Lei Complementar nº 123. Seu principal objetivo é reduzir a burocracia e os custos para pequenos empresários, unificando o recolhimento de oito impostos diferentes em uma única guia de pagamento: o Documento de Arrecadação do Simples Nacional (DAS).</p>
        
        <h3>Os tributos unificados no DAS são:</h3>
        <ul>
          <li>IRPJ (Imposto de Renda da Pessoa Jurídica)</li>
          <li>CSLL (Contribuição Social sobre o Lucro Líquido)</li>
          <li>PIS/Pasep</li>
          <li>Cofins (Contribuição para o Financiamento da Seguridade Social)</li>
          <li>IPI (Imposto sobre Produtos Industrializados)</li>
          <li>ICMS (Imposto sobre Circulação de Mercadorias e Serviços) - de competência estadual</li>
          <li>ISS (Imposto sobre Serviços) - de competência municipal</li>
          <li>CPP (Contribuição Patronal Previdenciária)</li>
        </ul>
        
        <h3>Quem pode optar pelo Simples Nacional em 2025?</h3>
        <p>Para aderir ao regime, a empresa precisa se enquadrar em alguns pré-requisitos, sendo o principal deles o limite de faturamento:</p>
        <ul>
          <li><strong>Microempresa (ME):</strong> Receita bruta anual igual ou inferior a R$ 360.000,00</li>
          <li><strong>Empresa de Pequeno Porte (EPP):</strong> Receita bruta anual superior a R$ 360.000,00 e igual ou inferior a R$ 4.800.000,00</li>
        </ul>
        
        <h3>Como Funcionam os Anexos e as Alíquotas?</h3>
        <p>A alíquota do imposto não é fixa. Ela varia de acordo com o faturamento da empresa e a atividade exercida. As atividades são separadas em cinco anexos:</p>
        <ul>
          <li><strong>Anexo I:</strong> Comércio</li>
          <li><strong>Anexo II:</strong> Indústria</li>
          <li><strong>Anexo III:</strong> Prestadores de Serviço (como instalação, reparos, agências de viagens)</li>
          <li><strong>Anexo IV:</strong> Prestadores de Serviço (como limpeza, vigilância, obras, advocacia)</li>
          <li><strong>Anexo V:</strong> Prestadores de Serviço (como auditoria, tecnologia, publicidade, engenharia)</li>
        </ul>
        
        <h3>Vantagens de ser do Simples Nacional para o empresário fortalezense</h3>
        <ul>
          <li><strong>Simplificação:</strong> Pagar 8 tributos em uma única guia economiza tempo e reduz a chance de erros</li>
          <li><strong>Carga Tributária Reduzida:</strong> Para muitas empresas, especialmente no início, a alíquota do Simples pode ser significativamente menor</li>
          <li><strong>Facilidades em Licitações:</strong> A lei prevê critérios de desempate favoráveis a empresas do Simples em licitações públicas</li>
          <li><strong>Menos Obrigações Acessórias:</strong> A complexidade da contabilidade é menor, simplificando a gestão do negócio</li>
        </ul>
        
        <h3>Planeje seu futuro com a AUDIT PRIME</h3>
        <p>O Simples Nacional é uma excelente opção, mas nem sempre é a mais vantajosa. Um planejamento tributário cuidadoso pode revelar que, dependendo do seu faturamento, margem de lucro e tipo de atividade, o Lucro Presumido pode ser mais econômico.</p>
        
        <p>Nós, da AUDIT PRIME, somos especialistas em contabilidade e gestão para empresas em Fortaleza. Analisamos a fundo a sua operação para garantir que você esteja no regime tributário mais benéfico, otimizando seus lucros e garantindo sua conformidade com a lei.</p>
        
        <p><strong>Sua empresa está pagando o imposto correto? Vamos descobrir juntos. Entre em contato conosco e agende uma consultoria diagnóstica!</strong></p>
      `,
    },
    {
      id: 2,
      title:
        "BPO Financeiro: A Arma Secreta para Empresas em Fortaleza Crescerem com Foco e Lucratividade",
      excerpt:
        "O que é BPO Financeiro e como ele pode transformar a gestão da sua empresa? Descubra como terceirizar suas finanças economiza tempo, dinheiro e impulsiona o crescimento.",
      date: "2025-08-14",
      category: "Gestão",
      featured: false,
      content: `
        <h2>O que é, na prática, o BPO Financeiro?</h2>
        <p>BPO Financeiro é a terceirização completa da gestão financeira da sua empresa. Em vez de contratar um funcionário ou tentar fazer tudo sozinho, você contrata uma empresa especializada, como a AUDIT PRIME, para cuidar de todas as suas rotinas financeiras.</p>
        
        <h3>Isso inclui tarefas como:</h3>
        <ul>
          <li><strong>Gestão de Contas a Pagar e a Receber:</strong> Controle de vencimentos, emissão de boletos e cobranças</li>
          <li><strong>Conciliação Bancária:</strong> Garantir que todas as entradas e saídas do seu extrato bancário correspondam aos seus registros internos</li>
          <li><strong>Emissão de Notas Fiscais:</strong> Cuidar de toda a burocracia de emissão e envio de notas fiscais de serviço ou produto</li>
          <li><strong>Gestão do Fluxo de Caixa:</strong> Monitorar e projetar a saúde financeira da sua empresa para evitar surpresas desagradáveis</li>
          <li><strong>Elaboração de Relatórios Gerenciais:</strong> Fornecer dados claros e precisos (DRE, balancetes) para que você tome decisões baseadas em números, e não em achismos</li>
        </ul>
        
        <h3>3 Sinais de que sua empresa precisa de um BPO Financeiro URGENTE</h3>
        
        <h4>1. Você passa mais tempo com planilhas do que com clientes</h4>
        <p>Se a gestão financeira consome horas preciosas do seu dia, você não está focando no core business do seu negócio.</p>
        
        <h4>2. Falta de clareza sobre os números</h4>
        <p>Você não sabe ao certo qual sua margem de lucro, quais são seus maiores custos ou se a empresa realmente deu lucro no mês passado? Isso é um sinal de perigo.</p>
        
        <h4>3. Pagamento de multas e juros por atraso</h4>
        <p>Perder prazos de pagamento de contas ou impostos é um vazamento de dinheiro que pode e deve ser estancado.</p>
        
        <h3>As Vantagens de Terceirizar seu Financeiro em Fortaleza</h3>
        <ul>
          <li><strong>Redução de Custos:</strong> Contratar um serviço de BPO é significativamente mais barato do que manter um departamento financeiro interno</li>
          <li><strong>Expertise Especializada:</strong> Você ganha acesso a uma equipe de especialistas em finanças, contabilidade e tributação</li>
          <li><strong>Tomada de Decisão Estratégica:</strong> Com relatórios precisos e análises profissionais, você passa a tomar decisões que realmente impulsionam o crescimento</li>
          <li><strong>Mais Tempo e Foco:</strong> Libere sua agenda para focar em vendas, inovação, atendimento ao cliente e na estratégia do seu negócio</li>
        </ul>
        
        <h3>AUDIT PRIME: Seu Departamento Financeiro de Alta Performance</h3>
        <p>Aqui na AUDIT PRIME, não oferecemos apenas um serviço, mas uma parceria estratégica. Atuamos como o seu departamento financeiro de alta performance, utilizando tecnologia de ponta e conhecimento especializado para trazer ordem, clareza e previsibilidade para as finanças da sua empresa.</p>
        
        <p>Deixe a burocracia conosco e dedique-se a fazer o que você faz de melhor: crescer.</p>
        
        <p><strong>Quer saber como o BPO Financeiro pode se aplicar na prática ao seu negócio? Fale com um de nossos especialistas e solicite um diagnóstico gratuito!</strong></p>
      `,
    },
    {
      id: 3,
      title:
        "Planejamento Tributário em Fortaleza: 5 Estratégias Legais para Pagar Menos Impostos em 2025",
      excerpt:
        "Pagar menos impostos legalmente é possível! Conheça 5 estratégias de planejamento tributário que empresas em Fortaleza podem aplicar para aumentar sua lucratividade.",
      date: "2025-08-14",
      category: "Tributário",
      featured: false,
      content: `
        <h2>Por que o Planejamento Tributário é Essencial?</h2>
        <p>Para qualquer empresário em Fortaleza, a carga tributária é um dos maiores desafios. Muitos acreditam que não há o que fazer a não ser pagar a conta, mas a realidade é bem diferente. Com um bom planejamento tributário, é possível reduzir significativamente o valor dos impostos de forma totalmente legal.</p>
        
        <p>Isso não é sobre sonegação (que é crime), mas sobre elisão fiscal: o uso de meios legais e estratégicos para diminuir o peso dos tributos sobre a sua operação.</p>
        
        <h3>5 Estratégias que podem ser aplicadas por empresas em Fortaleza:</h3>
        
        <h4>1. Escolha Correta do Regime Tributário (A Decisão Mais Importante)</h4>
        <p>A escolha entre Simples Nacional, Lucro Presumido e Lucro Real é a fundação de todo planejamento.</p>
        <ul>
          <li>O <strong>Simples Nacional</strong> é ideal para muitas PMEs, mas se sua margem de lucro é baixa ou sua folha de pagamento é alta, ele pode não ser o mais vantajoso</li>
          <li>O <strong>Lucro Presumido</strong> pode ser excelente para empresas de serviço com alta lucratividade</li>
          <li>O <strong>Lucro Real</strong> é obrigatório para empresas com faturamento acima de R$ 78 milhões, mas pode ser uma opção para negócios que operam com prejuízo</li>
        </ul>
        <p><strong>Ação:</strong> Realize um estudo tributário anual para simular qual regime seria mais econômico para o cenário projetado da sua empresa.</p>
        
        <h4>2. Análise de Créditos Fiscais (ICMS e PIS/Cofins)</h4>
        <p>Empresas no Lucro Presumido e, principalmente, no Lucro Real, podem se creditar de impostos pagos na compra de insumos e mercadorias. Muitas empresas, por falta de conhecimento, deixam de aproveitar esses créditos de ICMS, PIS e Cofins.</p>
        <p><strong>Ação:</strong> Faça uma revisão fiscal com um especialista para identificar todas as oportunidades de crédito na sua operação.</p>
        
        <h4>3. Distribuição de Lucros x Pró-labore</h4>
        <p>A forma como os sócios são remunerados tem um impacto tributário direto.</p>
        <ul>
          <li><strong>Pró-labore:</strong> É o "salário" do sócio. Sobre ele incide INSS e Imposto de Renda na fonte</li>
          <li><strong>Distribuição de Lucros:</strong> É isenta de Imposto de Renda para o sócio</li>
        </ul>
        <p><strong>Ação:</strong> Estruture um pró-labore em um valor razoável para cobrir as contribuições previdenciárias e remunere os sócios majoritariamente através da distribuição dos lucros apurados.</p>
        
        <h4>4. Aproveitamento de Incentivos Fiscais Estaduais e Municipais</h4>
        <p>O estado do Ceará e a prefeitura de Fortaleza frequentemente oferecem programas de incentivos fiscais para setores específicos, como tecnologia, indústria e turismo.</p>
        <p><strong>Ação:</strong> Monitore constantemente junto à sua contabilidade a existência de novos incentivos fiscais que se apliquem ao seu setor de atuação.</p>
        
        <h4>5. Reorganização Societária</h4>
        <p>Em alguns casos, a estrutura da empresa pode ser otimizada. A criação de uma holding, a cisão de atividades em CNPJs diferentes ou outras formas de reorganização podem proteger o patrimônio e otimizar a carga tributária.</p>
        <p><strong>Ação:</strong> Consulte um especialista para avaliar se a sua estrutura societária atual é a mais eficiente do ponto de vista tributário e patrimonial.</p>
        
        <h3>Não Deixe Dinheiro na Mesa</h3>
        <p>Cada real pago em impostos desnecessários é um real a menos no seu caixa para investir, crescer e gerar lucro. Um planejamento tributário proativo e inteligente não é um custo, é um dos investimentos mais rentáveis que sua empresa pode fazer.</p>
        
        <p>A AUDIT PRIME é especialista em encontrar essas oportunidades para empresas em Fortaleza. Nossa equipe mergulha na sua realidade para construir um plano tributário sob medida, garantindo máxima economia com total segurança jurídica.</p>
        
        <p><strong>Quer descobrir o potencial de economia escondido na sua empresa? Agende uma análise tributária com nossos consultores e comece a lucrar mais!</strong></p>
      `,
    },
  ];

  // Calcular tempo de leitura e estatísticas automaticamente para cada post
  const postsWithReadingTime = useMemo(() => {
    return blogPosts.map((post) => {
      const stats = getArticleStats(post.content);
      return {
        ...post,
        readTime: stats.readingTime,
        wordCount: stats.wordCount,
        charCount: stats.charCount,
        stats,
      };
    });
  }, [blogPosts]);

  // Filtrar posts com busca aprimorada
  const filteredPosts = postsWithReadingTime.filter((post) => {
    if (!searchTerm.trim()) return true;

    const searchLower = searchTerm.toLowerCase();
    return (
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.category?.toLowerCase().includes(searchLower) ||
      post.content.toLowerCase().includes(searchLower)
    );
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  // Efeito para controlar estado de busca
  useEffect(() => {
    setIsSearching(searchTerm.trim().length > 0);
  }, [searchTerm]);

  const handleReadArticle = (postId: number) => {
    setSelectedPost(postId);
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlog = () => {
    setSelectedPost(null);
    // Scroll suave para o topo
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Se um artigo está selecionado, mostrar apenas ele
  if (selectedPost) {
    const post = postsWithReadingTime.find((p) => p.id === selectedPost);
    if (!post) return null;

    return (
      <Layout>
        <div className="bg-white">
          <article className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Navegação Superior - Mobile Friendly */}
              <div className="relative z-0 mb-8 pt-4 sm:pt-8">
                {/* Mobile: Layout Vertical */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    onClick={handleBackToBlog}
                    className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-all duration-200 hover:translate-x-[-2px] self-start"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar ao Blog
                  </button>

                  {/* Breadcrumb */}
                  <div className="text-sm text-gray-500 self-start sm:self-auto">
                    <span>Blog</span>
                    <span className="mx-2">/</span>
                    <span className="text-primary font-medium">Artigo</span>
                  </div>
                </div>
              </div>

              {/* Cabeçalho do Artigo - Mobile Optimized */}
              <header className="mb-8 sm:mb-12">
                {/* Metadados - Mobile: Layout Horizontal Compacto */}
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                  <div
                    className="bg-primary/10 rounded-lg px-3 py-2 sm:px-4 cursor-help"
                    title="Data de publicação do artigo"
                  >
                    <div className="flex items-center gap-2 sm:flex-col sm:gap-0 sm:text-center">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wide sm:mb-1">
                        {new Date(post.date)
                          .toLocaleDateString("pt-BR", { month: "short" })
                          .replace(".", "")}{" "}
                        {new Date(post.date).getFullYear()}
                      </div>
                      <div className="text-lg sm:text-xl font-bold text-primary">
                        {new Date(post.date).getDate()}
                      </div>
                    </div>
                  </div>

                  <div
                    className="text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg cursor-help"
                    title={`Tempo estimado baseado em ${post.wordCount} palavras (220 palavras/min)`}
                  >
                    📖 {post.readTime}
                  </div>

                  {post.category && (
                    <div className="text-xs bg-primary text-white px-3 py-2 rounded-full font-medium">
                      {post.category}
                    </div>
                  )}
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight text-center mb-4 sm:mb-6 px-2">
                  {post.title}
                </h1>

                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed text-center max-w-3xl mx-auto px-4">
                  {post.excerpt}
                </p>
              </header>

              {/* Conteúdo do Artigo */}
              <div
                className="prose prose-lg max-w-none prose-headings:text-primary prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-ul:text-gray-700 prose-li:mb-2 prose-strong:text-primary"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* Estatísticas do Artigo */}
              <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  📊 Estatísticas do Artigo
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {post.wordCount}
                    </div>
                    <div className="text-xs text-gray-500">Palavras</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {post.readTime}
                    </div>
                    <div className="text-xs text-gray-500">
                      Tempo de Leitura
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-primary">220</div>
                    <div className="text-xs text-gray-500">Palavras/min</div>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <div className="text-2xl font-bold text-primary">
                      {Math.round(post.charCount / 1000)}k
                    </div>
                    <div className="text-xs text-gray-500">Caracteres</div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4 text-center">
                  * Tempo de leitura calculado automaticamente baseado na
                  velocidade média de leitura em português
                </p>
              </div>

              {/* Call to Action */}
              <div className="mt-16 p-8 bg-primary/5 rounded-lg text-center">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Precisa de ajuda com sua empresa?
                </h3>
                <p className="text-lg text-gray-600 mb-6">
                  Entre em contato com a AUDIT PRIME e descubra como podemos
                  ajudar sua empresa a crescer.
                </p>
                <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                  Falar com Especialista
                </button>
              </div>
            </div>
          </article>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-white">
        {/* Hero Minimalista */}
        <section className="pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6">
              Blog
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 mb-12">
              Insights práticos sobre contabilidade e gestão empresarial
            </p>

            {/* Busca Aprimorada */}
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Buscar por título, categoria ou conteúdo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-lg py-4 pl-12 pr-12 border-2 border-gray-200 rounded-full focus:border-primary focus:ring-0 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Indicador de resultados */}
              {isSearching && (
                <div className="mt-4 text-sm text-gray-600 text-center">
                  {filteredPosts.length === 0
                    ? "Nenhum resultado encontrado"
                    : `${filteredPosts.length} ${
                        filteredPosts.length === 1
                          ? "artigo encontrado"
                          : "artigos encontrados"
                      }`}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Artigo em Destaque */}
        {featuredPost && !isSearching && (
          <section className="py-16 border-t border-gray-100">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <Card className="border-0 shadow-none">
                <CardHeader className="text-center pb-8">
                  <div className="flex items-center justify-center gap-4 mb-6">
                    <div
                      className="bg-primary/10 rounded-lg px-4 py-2 cursor-help"
                      title="Data de publicação do artigo"
                    >
                      <div className="text-xs font-semibold text-primary uppercase tracking-wide mb-1">
                        {new Date(featuredPost.date)
                          .toLocaleDateString("pt-BR", { month: "short" })
                          .replace(".", "")}{" "}
                        {new Date(featuredPost.date).getFullYear()}
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {new Date(featuredPost.date).getDate()}
                      </div>
                    </div>
                    <div
                      className="text-sm text-gray-500 cursor-help"
                      title={`${featuredPost.wordCount} palavras • Tempo calculado automaticamente`}
                    >
                      📖 {featuredPost.readTime}
                    </div>
                    {featuredPost.category && (
                      <div className="text-xs bg-primary text-white px-3 py-1 rounded-full font-medium">
                        {featuredPost.category}
                      </div>
                    )}
                  </div>
                  <CardTitle className="text-3xl sm:text-4xl font-bold text-primary leading-tight">
                    {featuredPost.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  <button
                    onClick={() => handleReadArticle(featuredPost.id)}
                    className="inline-flex items-center text-primary font-semibold text-lg hover:text-primary/80 transition-colors"
                  >
                    Ler artigo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Lista de Artigos */}
        <section className="py-16 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            {/* Cabeçalho da seção com filtros */}
            {isSearching && filteredPosts.length > 0 && (
              <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-primary mb-2">
                  Resultados da Busca
                </h2>
                <p className="text-gray-600">
                  Encontramos {filteredPosts.length}{" "}
                  {filteredPosts.length === 1 ? "artigo" : "artigos"} para "
                  {searchTerm}"
                </p>
              </div>
            )}

            {filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <div className="mb-4">
                  <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Nenhum artigo encontrado
                </h3>
                <p className="text-gray-500 mb-6">
                  Tente buscar por outros termos ou navegue pelos artigos
                  disponíveis.
                </p>
                {isSearching && (
                  <button
                    onClick={clearSearch}
                    className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Ver Todos os Artigos
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6 sm:space-y-8 lg:space-y-12">
                {/* Mostrar artigo em destaque nos resultados de busca se encontrado */}
                {isSearching && featuredPost && (
                  <article className="group bg-gradient-to-r from-primary/5 to-primary/10 border-l-4 border-primary rounded-r-xl p-6 mb-8">
                    {/* Layout Mobile-First para Artigo em Destaque */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
                      {/* Data e Metadados - Mobile: Horizontal, Desktop: Vertical */}
                      <div className="flex items-center justify-between mb-4 lg:mb-0 lg:flex-col lg:flex-shrink-0 lg:w-32">
                        <div className="flex items-center gap-3 lg:flex-col lg:gap-0 lg:bg-primary/10 lg:rounded-lg lg:p-4 lg:text-center lg:border lg:border-primary/20 lg:w-full">
                          {/* Data */}
                          <div
                            className="flex items-center gap-2 lg:flex-col lg:gap-0 cursor-help"
                            title="Data de publicação do artigo"
                          >
                            <div className="text-xs font-semibold text-primary uppercase tracking-wide lg:mb-2">
                              {new Date(featuredPost.date)
                                .toLocaleDateString("pt-BR", { month: "short" })
                                .replace(".", "")}
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-primary lg:mb-1">
                              {new Date(featuredPost.date).getDate()}
                            </div>
                            <div className="text-xs text-gray-500 lg:mb-3">
                              {new Date(featuredPost.date).getFullYear()}
                            </div>
                          </div>

                          {/* Tempo de Leitura */}
                          <div
                            className="text-xs text-primary font-medium lg:mb-2 cursor-help"
                            title={`${featuredPost.wordCount} palavras • Tempo calculado automaticamente`}
                          >
                            📖 {featuredPost.readTime}
                          </div>
                        </div>

                        {/* Badge Destaque */}
                        <div className="text-xs bg-primary text-white px-3 py-1 rounded-full font-medium lg:mt-2 lg:w-full lg:text-center">
                          DESTAQUE
                        </div>
                      </div>

                      {/* Conteúdo Principal */}
                      <div className="flex-1">
                        <h2
                          onClick={() => handleReadArticle(featuredPost.id)}
                          className="text-xl sm:text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors leading-tight cursor-pointer"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {featuredPost.title}
                        </h2>
                        <p
                          className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {featuredPost.excerpt}
                        </p>
                        <button
                          onClick={() => handleReadArticle(featuredPost.id)}
                          className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors text-sm sm:text-base"
                        >
                          Ler mais
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                )}

                {regularPosts.map((post) => (
                  <article
                    key={post.id}
                    className="group bg-white border border-gray-100 rounded-xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    {/* Layout Mobile-First: Bloco Vertical */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
                      {/* Data e Metadados - Mobile: Horizontal, Desktop: Vertical */}
                      <div className="flex items-center justify-between mb-4 lg:mb-0 lg:flex-col lg:flex-shrink-0 lg:w-32">
                        <div className="flex items-center gap-3 lg:flex-col lg:gap-0 lg:bg-gray-50 lg:rounded-lg lg:p-4 lg:text-center lg:border lg:border-gray-100 lg:group-hover:border-primary/20 lg:transition-colors lg:w-full">
                          {/* Data */}
                          <div
                            className="flex items-center gap-2 lg:flex-col lg:gap-0 cursor-help"
                            title="Data de publicação do artigo"
                          >
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide lg:mb-2">
                              {new Date(post.date)
                                .toLocaleDateString("pt-BR", { month: "short" })
                                .replace(".", "")}
                            </div>
                            <div className="text-xl lg:text-2xl font-bold text-primary lg:mb-1">
                              {new Date(post.date).getDate()}
                            </div>
                            <div className="text-xs text-gray-500 lg:mb-3">
                              {new Date(post.date).getFullYear()}
                            </div>
                          </div>

                          {/* Tempo de Leitura */}
                          <div
                            className="text-xs text-gray-400 font-medium lg:mb-2 cursor-help"
                            title={`${post.wordCount} palavras • Tempo calculado automaticamente`}
                          >
                            📖 {post.readTime}
                          </div>
                        </div>

                        {/* Categoria - Mobile: Direita, Desktop: Abaixo */}
                        {post.category && (
                          <div className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full font-medium lg:mt-2 lg:w-full lg:text-center">
                            {post.category}
                          </div>
                        )}
                      </div>

                      {/* Conteúdo Principal */}
                      <div className="flex-1">
                        <h2
                          onClick={() => handleReadArticle(post.id)}
                          className="text-xl sm:text-2xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors leading-tight cursor-pointer"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.title}
                        </h2>
                        <p
                          className="text-gray-600 text-base sm:text-lg leading-relaxed mb-4"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                          }}
                        >
                          {post.excerpt}
                        </p>
                        <button
                          onClick={() => handleReadArticle(post.id)}
                          className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-all duration-200 hover:translate-x-1 text-sm sm:text-base"
                        >
                          Ler mais
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Minimalista */}
        <section className="py-20 border-t border-gray-100 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Receba nossos insights
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Dicas práticas direto no seu e-mail, sem spam.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 py-3 px-4 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-0"
              />
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
