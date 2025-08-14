import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Download, Mail, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Tabelas OFICIAIS do Simples Nacional 2024/2025 - Receita Federal do Brasil
// Fonte: Resolução CGSN nº 140/2018 e atualizações posteriores

const ANEXO_I_COMERCIO = [
  { min: 0, max: 180000, aliquota: 0.04, deducao: 0 },
  { min: 180000.01, max: 360000, aliquota: 0.073, deducao: 5940 },
  { min: 360000.01, max: 720000, aliquota: 0.095, deducao: 13860 },
  { min: 720000.01, max: 1800000, aliquota: 0.107, deducao: 22500 },
  { min: 1800000.01, max: 3600000, aliquota: 0.143, deducao: 87300 },
  { min: 3600000.01, max: 4800000, aliquota: 0.19, deducao: 378000 }
];

const ANEXO_II_INDUSTRIA = [
  { min: 0, max: 180000, aliquota: 0.045, deducao: 0 },
  { min: 180000.01, max: 360000, aliquota: 0.078, deducao: 5940 },
  { min: 360000.01, max: 720000, aliquota: 0.10, deducao: 13860 },
  { min: 720000.01, max: 1800000, aliquota: 0.112, deducao: 22500 },
  { min: 1800000.01, max: 3600000, aliquota: 0.147, deducao: 85500 },
  { min: 3600000.01, max: 4800000, aliquota: 0.30, deducao: 720000 }
];

const ANEXO_III_SERVICOS = [
  { min: 0, max: 180000, aliquota: 0.06, deducao: 0 },
  { min: 180000.01, max: 360000, aliquota: 0.112, deducao: 9360 },
  { min: 360000.01, max: 720000, aliquota: 0.135, deducao: 17640 },
  { min: 720000.01, max: 1800000, aliquota: 0.16, deducao: 35640 },
  { min: 1800000.01, max: 3600000, aliquota: 0.21, deducao: 125640 },
  { min: 3600000.01, max: 4800000, aliquota: 0.335, deducao: 648000 }
];

const ANEXO_IV_SERVICOS = [
  { min: 0, max: 180000, aliquota: 0.045, deducao: 0 },
  { min: 180000.01, max: 360000, aliquota: 0.09, deducao: 8100 },
  { min: 360000.01, max: 720000, aliquota: 0.102, deducao: 12420 },
  { min: 720000.01, max: 1800000, aliquota: 0.14, deducao: 39780 },
  { min: 1800000.01, max: 3600000, aliquota: 0.22, deducao: 183780 },
  { min: 3600000.01, max: 4800000, aliquota: 0.335, deducao: 828000 }
];

const ANEXO_V_SERVICOS = [
  { min: 0, max: 180000, aliquota: 0.155, deducao: 0 },
  { min: 180000.01, max: 360000, aliquota: 0.18, deducao: 4500 },
  { min: 360000.01, max: 720000, aliquota: 0.195, deducao: 9900 },
  { min: 720000.01, max: 1800000, aliquota: 0.205, deducao: 17100 },
  { min: 1800000.01, max: 3600000, aliquota: 0.23, deducao: 62100 },
  { min: 3600000.01, max: 4800000, aliquota: 0.305, deducao: 540000 }
];

const ANEXOS_INFO = {
  'anexo-i': {
    nome: 'Anexo I - Comércio',
    descricao: 'Atividades de comércio em geral',
    exemplos: 'Lojas, supermercados, farmácias, distribuidoras',
    tabela: ANEXO_I_COMERCIO
  },
  'anexo-ii': {
    nome: 'Anexo II - Indústria',
    descricao: 'Atividades industriais',
    exemplos: 'Fábricas, indústrias alimentícias, metalúrgicas',
    tabela: ANEXO_II_INDUSTRIA
  },
  'anexo-iii': {
    nome: 'Anexo III - Serviços',
    descricao: 'Serviços em geral',
    exemplos: 'Medicina, odontologia, veterinária, instalação, reparos',
    tabela: ANEXO_III_SERVICOS
  },
  'anexo-iv': {
    nome: 'Anexo IV - Serviços',
    descricao: 'Serviços específicos',
    exemplos: 'Limpeza, vigilância, construção civil, advocacia',
    tabela: ANEXO_IV_SERVICOS
  },
  'anexo-v': {
    nome: 'Anexo V - Serviços',
    descricao: 'Serviços intelectuais',
    exemplos: 'Auditoria, tecnologia, publicidade, engenharia',
    tabela: ANEXO_V_SERVICOS
  }
};

const Tools = () => {
  const [formData, setFormData] = useState({
    revenue: "",
    email: "",
    anexo: "",
  });
  const [calculation, setCalculation] = useState<{
    impostoMensal: number;
    impostoAnual: number;
    aliquotaEfetiva: number;
    anexoInfo: any;
  } | null>(null);
  const { toast } = useToast();

  const handleCalculate = () => {
    const revenue = parseFloat(
      formData.revenue.replace(/[^\d,]/g, "").replace(",", ".")
    );

    if (!revenue || revenue <= 0) {
      toast({
        title: "Erro",
        description: "Por favor, insira um valor de faturamento válido.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.anexo) {
      toast({
        title: "Erro",
        description: "Por favor, selecione o anexo correspondente à sua atividade.",
        variant: "destructive",
      });
      return;
    }

    // Validação dos limites oficiais do Simples Nacional
    if (revenue > 4800000) {
      toast({
        title: "Limite Excedido",
        description:
          "Faturamento acima do limite legal do Simples Nacional (R$ 4.800.000,00/ano). Sua empresa deve optar pelo Lucro Presumido ou Lucro Real.",
        variant: "destructive",
      });
      return;
    }

    // Validação para MEI (Microempreendedor Individual) - contextual por anexo
    if (revenue <= 81000) {
      let meiMessage = "";
      
      switch (formData.anexo) {
        case 'anexo-i':
          meiMessage = "Para comércio com este faturamento, o MEI pode ser uma opção mais vantajosa se sua atividade estiver na lista permitida.";
          break;
        case 'anexo-ii':
          // Indústria geralmente não é elegível para MEI
          meiMessage = "";
          break;
        case 'anexo-iii':
        case 'anexo-iv':
        case 'anexo-v':
          meiMessage = "Para serviços com este faturamento, o MEI (Microempreendedor Individual) pode oferecer tributação mais vantajosa.";
          break;
      }
      
      if (meiMessage) {
        toast({
          title: "Dica - MEI",
          description: meiMessage + " Consulte nossos especialistas para verificar a elegibilidade.",
          variant: "default",
        });
      }
    }

    // Buscar informações do anexo selecionado
    const anexoInfo = ANEXOS_INFO[formData.anexo as keyof typeof ANEXOS_INFO];
    const tabela = anexoInfo.tabela;

    // Encontrar a faixa de faturamento correta
    const faixa = tabela.find(f => revenue >= f.min && revenue <= f.max);
    
    if (!faixa) {
      toast({
        title: "Erro",
        description: "Não foi possível calcular para este valor de faturamento.",
        variant: "destructive",
      });
      return;
    }

    // FÓRMULA OFICIAL DO SIMPLES NACIONAL (Receita Federal do Brasil):
    // Valor devido = (Receita Bruta Acumulada x Alíquota) - Parcela a Deduzir
    // Fonte: Art. 18 da LC 123/2006 e Resolução CGSN nº 140/2018
    
    const impostoAnual = Math.max(0, (revenue * faixa.aliquota) - faixa.deducao);
    const impostoMensal = impostoAnual / 12;
    const aliquotaEfetiva = revenue > 0 ? (impostoAnual / revenue) * 100 : 0;

    // Validação adicional para garantir valores positivos
    if (impostoAnual < 0 || impostoMensal < 0) {
      toast({
        title: "Erro no Cálculo",
        description: "Houve um erro no cálculo. Verifique os valores informados.",
        variant: "destructive",
      });
      return;
    }

    setCalculation({
      impostoMensal,
      impostoAnual,
      aliquotaEfetiva,
      anexoInfo
    });
  };

  const handleEmailSubmit = () => {
    if (!formData.email) {
      toast({
        title: "Erro",
        description:
          "Por favor, insira seu e-mail para receber o resultado detalhado.",
        variant: "destructive",
      });
      return;
    }

    if (!calculation) {
      toast({
        title: "Erro",
        description: "Primeiro calcule o Simples Nacional.",
        variant: "destructive",
      });
      return;
    }

    // Simular envio do e-mail
    toast({
      title: "Sucesso!",
      description:
        "Resultado detalhado enviado para seu e-mail. Nossa equipe entrará em contato em breve!",
    });

    // Reset form
    setFormData({ revenue: "", email: "", anexo: "" });
    setCalculation(null);
  };

  const formatCurrency = (value: string) => {
    const numbers = value.replace(/[^\d]/g, "");
    const formatted = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseInt(numbers) / 100 || 0);
    return formatted;
  };

  const handleRevenueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCurrency(e.target.value);
    setFormData({ ...formData, revenue: formatted });
    // Reset calculation when revenue changes (silent reset for better UX)
    if (calculation) {
      setCalculation(null);
    }
  };

  const handleAnexoChange = (value: string) => {
    // Reset both anexo, revenue, and calculation when anexo changes
    setFormData({ ...formData, anexo: value, revenue: "" });
    setCalculation(null);
  };

  return (
    <section id="ferramentas" className="section-padding bg-white relative">
      <div className="section-container relative">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gradient px-4">
            Ferramentas Úteis
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Para o Seu Dia a Dia Empresarial
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative px-4 sm:px-6">
          <Card className="shadow-xl border border-gray-100 bg-white overflow-visible">
            <CardHeader className="text-center pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
              <div className="mx-auto mb-4 sm:mb-6 p-4 sm:p-5 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl w-fit shadow-sm">
                <Calculator className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
              </div>
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                Calculadora Simples Nacional
              </CardTitle>
              <CardDescription className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
                Calcule o valor estimado dos impostos do seu negócio com base nas tabelas oficiais 2025
              </CardDescription>
            </CardHeader>
            <CardContent className="px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
              <div className="space-y-6 max-w-md mx-auto">
                {/* Seleção do Anexo - Minimalista */}
                <div className="space-y-3">
                  <Label htmlFor="anexo" className="text-sm font-medium text-gray-700">
                    Tipo de Atividade
                  </Label>
                    
                  <Select value={formData.anexo} onValueChange={handleAnexoChange}>
                    <SelectTrigger className="h-12 border border-gray-300 focus:border-primary">
                      <SelectValue placeholder="Selecione o tipo de atividade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="anexo-i">Anexo I - Comércio</SelectItem>
                      <SelectItem value="anexo-ii">Anexo II - Indústria</SelectItem>
                      <SelectItem value="anexo-iii">Anexo III - Serviços Gerais</SelectItem>
                      <SelectItem value="anexo-iv">Anexo IV - Serviços Específicos</SelectItem>
                      <SelectItem value="anexo-v">Anexo V - Serviços Intelectuais</SelectItem>
                    </SelectContent>
                  </Select>
                    

                </div>

                {/* Faturamento - Minimalista */}
                <div className="space-y-3">
                  <Label htmlFor="revenue" className="text-sm font-medium text-gray-700">
                    Faturamento Anual
                  </Label>
                  <Input
                    id="revenue"
                    type="text"
                    placeholder="R$ 0,00"
                    value={formData.revenue}
                    onChange={handleRevenueChange}
                    className="h-12 border border-gray-300 focus:border-primary"
                  />
                </div>

                {/* Botão de Cálculo - Minimalista */}
                <Button
                  onClick={handleCalculate}
                  className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
                  disabled={!formData.anexo || !formData.revenue}
                >
                  Calcular
                </Button>



                {/* Resultados - Minimalista */}
                {calculation && (
                  <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Resultado do Cálculo</h4>
                      
                      <div className="bg-white rounded-lg p-4 mb-4">
                        <div className="text-sm text-gray-600 mb-1">Imposto Mensal</div>
                        <div className="text-2xl font-bold text-primary">
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(calculation.impostoMensal)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Anual</div>
                          <div className="text-lg font-semibold text-gray-900">
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(calculation.impostoAnual)}
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-3">
                          <div className="text-xs text-gray-600 mb-1">Alíquota</div>
                          <div className="text-lg font-semibold text-primary">
                            {calculation.aliquotaEfetiva.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Email - Minimalista */}
                {calculation && (
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-4">
                        Quer uma análise mais detalhada? Deixe seu e-mail.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="h-12 border border-gray-300 focus:border-primary"
                      />
                      <Button
                        onClick={handleEmailSubmit}
                        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium"
                      >
                        Receber Análise Completa
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tools;
