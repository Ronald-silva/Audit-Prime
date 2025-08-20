import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin,
  Instagram,
  Facebook,
  Linkedin
} from 'lucide-react';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="section-container">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="mb-4 sm:mb-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-wider">
                AUDIT PRIME
              </h3>
            </div>
            <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90 leading-relaxed">
              CUIDANDO DA SAÚDE DO SEU NEGÓCIO
            </p>
            <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-4 sm:mb-6">
              Especialistas em consultoria e gestão empresarial para pequenas e médias empresas em Fortaleza. 
              Oferecemos soluções completas em contabilidade, planejamento tributário e consultoria financeira.
            </p>
            
            {/* Social Media */}
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Links Rápidos</h4>
            <ul className="space-y-3">
              <li>
                <button 
                  onClick={() => scrollToSection('inicio')}
                  className="text-base opacity-80 hover:opacity-100 transition-opacity"
                >
                  Início
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('servicos')}
                  className="text-base opacity-80 hover:opacity-100 transition-opacity"
                >
                  Serviços
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('ferramentas')}
                  className="text-base opacity-80 hover:opacity-100 transition-opacity"
                >
                  Ferramentas
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('diferenciais')}
                  className="text-base opacity-80 hover:opacity-100 transition-opacity"
                >
                  Diferenciais
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="text-base opacity-80 hover:opacity-100 transition-opacity"
                >
                  Contato
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 opacity-80" />
                <a 
                  href="tel:+5585987076054" 
                  className="text-base opacity-80 hover:opacity-100 transition-opacity"
                >
                  (85) 98707-6054
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 opacity-80" />
                <a 
                  href="mailto:auditprime.ce@gmail.com" 
                  className="text-base opacity-80 hover:opacity-100 transition-opacity"
                >
                  auditprime.ce@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 opacity-80 mt-0.5" />
                <div className="text-base opacity-80">
                  <p>Fortaleza - CE</p>
                  <p className="text-sm opacity-70 mt-1">
                    Segunda a Sexta: 8h às 18h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/20 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <p className="text-sm sm:text-base opacity-80 text-center sm:text-left">
              © {currentYear} AUDIT PRIME. Todos os direitos reservados.
            </p>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm opacity-80">
              <button className="hover:opacity-100 transition-opacity">
                Política de Privacidade
              </button>
              <button className="hover:opacity-100 transition-opacity">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;