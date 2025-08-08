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
import { Calculator, Download, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Tools = () => {
  const [formData, setFormData] = useState({
    revenue: "",
    email: "",
  });
  const [calculation, setCalculation] = useState<number | null>(null);
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

    if (revenue > 4800000) {
      toast({
        title: "Atenção",
        description:
          "Faturamento acima do limite do Simples Nacional (R$ 4.800.000). Consulte nossos especialistas.",
        variant: "destructive",
      });
      return;
    }

    // Cálculo CORRETO do Simples Nacional 2024 - Anexo I (Comércio)
    // Fórmula: (Receita Bruta x Alíquota) - Parcela a Deduzir
    let aliquota = 0;
    let parcelaDeducao = 0;

    if (revenue <= 180000) {
      aliquota = 0.04; // 4%
      parcelaDeducao = 0;
    } else if (revenue <= 360000) {
      aliquota = 0.073; // 7,3%
      parcelaDeducao = 5940;
    } else if (revenue <= 720000) {
      aliquota = 0.095; // 9,5%
      parcelaDeducao = 13860;
    } else if (revenue <= 1800000) {
      aliquota = 0.107; // 10,7%
      parcelaDeducao = 22500;
    } else if (revenue <= 3600000) {
      aliquota = 0.143; // 14,3%
      parcelaDeducao = 87300;
    } else if (revenue <= 4800000) {
      aliquota = 0.19; // 19%
      parcelaDeducao = 378000;
    }

    // Cálculo anual correto
    const impostoAnual = revenue * aliquota - parcelaDeducao;
    const impostoMensal = impostoAnual / 12;

    setCalculation(impostoMensal);
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
    setFormData({ revenue: "", email: "" });
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
  };

  return (
    <section id="ferramentas" className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Ferramentas Úteis
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Para o Seu Dia a Dia Empresarial
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="shadow-large border-0">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <Calculator className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold text-foreground">
                Calculadora Simples Nacional
              </CardTitle>
              <CardDescription className="text-lg">
                Calcule o valor estimado dos impostos do seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="revenue" className="text-base font-medium">
                  Faturamento Anual Estimado
                </Label>
                <Input
                  id="revenue"
                  type="text"
                  placeholder="R$ 0,00"
                  value={formData.revenue}
                  onChange={handleRevenueChange}
                  className="text-lg py-3"
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="btn-audit-primary w-full text-lg py-3"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Simples Nacional
              </Button>

              {calculation && (
                <div className="bg-primary/5 p-6 rounded-lg border-l-4 border-primary">
                  <h4 className="font-semibold text-lg mb-4 text-primary">
                    Resultado Estimado - Anexo I (Comércio)
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Imposto Mensal:
                      </span>
                      <span className="text-2xl font-bold text-foreground">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(calculation)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Imposto Anual:
                      </span>
                      <span className="text-lg font-semibold text-foreground">
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(calculation * 12)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">
                        Alíquota Efetiva:
                      </span>
                      <span className="text-sm font-semibold">
                        {(
                          ((calculation * 12) /
                            parseFloat(
                              formData.revenue
                                .replace(/[^\d,]/g, "")
                                .replace(",", ".")
                            )) *
                          100
                        ).toFixed(2)}
                        %
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-xs text-muted-foreground">
                      *Cálculo baseado no Anexo I (Comércio) do Simples Nacional
                      2024. Para atividades de serviços ou indústria, as
                      alíquotas podem ser diferentes. Consulte nossos
                      especialistas para uma análise completa.
                    </p>
                  </div>
                </div>
              )}

              {calculation && (
                <div className="space-y-4 pt-4 border-t">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      E-mail para receber resultado detalhado
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="text-lg py-3"
                    />
                  </div>

                  <Button
                    onClick={handleEmailSubmit}
                    className="btn-audit-outline w-full text-lg py-3"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Receber Análise Completa
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tools;
