import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Award,
  Users,
  MapPin,
  Clock,
  Shield,
  TrendingUp
} from 'lucide-react';

const Differentials = () => {
  const differentials = [
    {
      icon: Award,
      title: 'Especialização Comprovada',
      description: 'Mais de 10 anos de experiência em consultoria empresarial e gestão tributária.'
    },
    {
      icon: Users,
      title: 'Atendimento Personalizado',
      description: 'Cada cliente recebe atenção exclusiva com soluções customizadas para seu negócio.'
    },
    {
      icon: MapPin,
      title: 'Conhecimento Local',
      description: 'Profundo conhecimento do mercado e especificidades tributárias de Fortaleza e região.'
    },
    {
      icon: Clock,
      title: 'Agilidade e Eficiência',
      description: 'Processos otimizados que garantem rapidez na entrega sem comprometer a qualidade.'
    },
    {
      icon: Shield,
      title: 'Segurança Jurídica',
      description: 'Todos os procedimentos seguem rigorosamente a legislação vigente, garantindo total segurança.'
    },
    {
      icon: TrendingUp,
      title: 'Foco no Crescimento',
      description: 'Nossas estratégias são pensadas para impulsionar o crescimento sustentável do seu negócio.'
    }
  ];

  return (
    <section id="diferenciais" className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gradient">
            Por que escolher a AUDIT PRIME?
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-muted-foreground mb-8">
              Nossa missão é ser o parceiro estratégico que sua empresa precisa para prosperar
            </p>
            <div className="bg-white p-8 rounded-2xl shadow-large border-0">
              <h3 className="text-2xl font-bold text-primary mb-4">
                Especialização e Atendimento ao Cliente
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Na AUDIT PRIME, combinamos conhecimento técnico especializado com um atendimento verdadeiramente personalizado. 
                Nossa equipe de profissionais qualificados conhece profundamente o mercado de Fortaleza e as necessidades específicas 
                das pequenas e médias empresas da região. Cada cliente recebe atenção exclusiva, com soluções sob medida que 
                consideram as particularidades do seu negócio e objetivos de crescimento.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {differentials.map((differential, index) => (
            <Card 
              key={index} 
              className="card-hover bg-white border-0 shadow-soft text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-4">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <differential.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {differential.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {differential.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Differentials;