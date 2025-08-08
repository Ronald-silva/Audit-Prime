import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal.jpg";
import logoAP from "@/assets/logo-ap.jpg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3 sm:py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src={isScrolled ? logoAP : logoHorizontal}
                alt="AUDIT PRIME"
                className={`transition-all duration-300 rounded-lg shadow-sm ${
                  isScrolled
                    ? "h-8 w-8 sm:h-10 sm:w-10 object-contain"
                    : "h-10 w-auto max-w-[140px] sm:h-12 sm:max-w-[200px] object-contain"
                }`}
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-8">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-foreground font-medium hover:text-primary transition-colors text-sm xl:text-base"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-foreground font-medium hover:text-primary transition-colors text-sm xl:text-base"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("ferramentas")}
                className="text-foreground font-medium hover:text-primary transition-colors text-sm xl:text-base"
              >
                Calculadoras
              </button>
              <button
                onClick={() => scrollToSection("diferenciais")}
                className="text-foreground font-medium hover:text-primary transition-colors text-sm xl:text-base"
              >
                Diferenciais
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-foreground font-medium hover:text-primary transition-colors text-sm xl:text-base"
              >
                Contato
              </button>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection("contato")}
                className="bg-blue-900 text-white font-semibold px-4 py-2 xl:px-6 xl:py-3 rounded-lg hover:bg-blue-800 transition-colors text-sm xl:text-base"
              >
                Consulta Gratuita
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-foreground" />
              ) : (
                <Menu className="h-6 w-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-white pt-16 sm:pt-20">
          <div className="px-3 sm:px-4 py-4 sm:py-6 space-y-2 sm:space-y-4">
            <button
              onClick={() => scrollToSection("inicio")}
              className="block w-full text-left py-3 px-4 text-base sm:text-lg font-medium text-foreground hover:bg-gray-50 rounded-lg transition-colors min-h-[48px]"
            >
              Início
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="block w-full text-left py-3 px-4 text-base sm:text-lg font-medium text-foreground hover:bg-gray-50 rounded-lg transition-colors min-h-[48px]"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("ferramentas")}
              className="block w-full text-left py-3 px-4 text-base sm:text-lg font-medium text-foreground hover:bg-gray-50 rounded-lg transition-colors min-h-[48px]"
            >
              Calculadoras
            </button>
            <button
              onClick={() => scrollToSection("diferenciais")}
              className="block w-full text-left py-3 px-4 text-base sm:text-lg font-medium text-foreground hover:bg-gray-50 rounded-lg transition-colors min-h-[48px]"
            >
              Diferenciais
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="block w-full text-left py-3 px-4 text-base sm:text-lg font-medium text-foreground hover:bg-gray-50 rounded-lg transition-colors min-h-[48px]"
            >
              Contato
            </button>
            
            {/* Mobile CTA */}
            <div className="pt-4 sm:pt-6">
              <button
                onClick={() => scrollToSection("contato")}
                className="w-full bg-blue-900 text-white font-semibold px-6 py-4 rounded-lg hover:bg-blue-800 transition-colors text-base sm:text-lg min-h-[52px]"
              >
                Consulta Gratuita
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;