import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  Calculator, 
  Users, 
  TrendingUp, 
  FileText, 
  PiggyBank,
  Receipt
} from 'lucide-react';

const Services = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      icon: Building2,
      title: 'Abertura de Empresas',
      description: 'Processo completo para formalização do seu negócio com agilidade e segurança jurídica.'
    },
    {
      icon: Calculator,
      title: 'Planejamento Tributário',
      description: 'Estratégias para otimizar a carga tributária e reduzir custos legalmente.'
    },
    {
      icon: Users,
      title: 'Folha de Pagamento',
      description: 'Gestão completa de RH, cálculos trabalhistas e obrigações previdenciárias.'
    },
    {
      icon: TrendingUp,
      title: 'Cálculo de Lucro Presumido e Real',
      description: 'Análise e apuração dos regimes tributários mais vantajosos para sua empresa.'
    },
    {
      icon: FileText,
      title: 'Simples Nacional',
      description: 'Gestão completa do regime simplificado para micro e pequenas empresas.'
    },
    {
      icon: PiggyBank,
      title: 'Consultoria Financeira',
      description: 'Análise financeira e estratégias para crescimento sustentável do seu negócio.'
    },
    {
      icon: Receipt,
      title: 'Declaração IRPF',
      description: 'Elaboração da declaração de imposto de renda pessoa física com precisão.'
    }
  ];

  return (
    <section id="servicos" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções que Impulsionam seu Negócio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="card-hover bg-white border-0 shadow-soft"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-muted-foreground leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => scrollToSection('contato')}
            className="btn-audit-primary text-lg px-10 py-4"
          >
            Entenda como podemos ajudar sua empresa
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;