import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logoHorizontal from "@/assets/logo-horizontal.jpg";
import logoAP from "@/assets/logo-ap.jpg";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    // Se não estiver na página inicial, navegar para lá primeiro
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="flex items-center justify-between py-4 sm:py-5 md:py-6">
            {/* Logo - Professional Spacing */}
            <div className="flex items-center py-2">
              <img
                src={isScrolled ? logoAP : logoHorizontal}
                alt="AUDIT PRIME"
                className={`transition-all duration-300 rounded-lg shadow-sm ${
                  isScrolled
                    ? "h-10 w-10 sm:h-12 sm:w-12 object-contain"
                    : "h-12 w-auto max-w-[160px] sm:h-14 sm:max-w-[220px] object-contain"
                }`}
              />
            </div>

            {/* Desktop Navigation - Professional Spacing */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10">
              <button
                onClick={() => scrollToSection("inicio")}
                className="text-foreground font-medium hover:text-black transition-colors text-base xl:text-lg py-2 px-1"
              >
                Início
              </button>
              <button
                onClick={() => scrollToSection("servicos")}
                className="text-foreground font-medium hover:text-black transition-colors text-base xl:text-lg py-2 px-1"
              >
                Serviços
              </button>
              <button
                onClick={() => scrollToSection("ferramentas")}
                className="text-foreground font-medium hover:text-black transition-colors text-base xl:text-lg py-2 px-1"
              >
                Calculadoras
              </button>
              <button
                onClick={() => scrollToSection("diferenciais")}
                className="text-foreground font-medium hover:text-primary transition-colors text-base xl:text-lg py-2 px-1"
              >
                Diferenciais
              </button>
              <button
                onClick={() => navigateToPage("/blog")}
                className="text-foreground font-medium hover:text-primary transition-colors text-base xl:text-lg py-2 px-1"
              >
                Blog
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-foreground font-medium hover:text-primary transition-colors text-base xl:text-lg py-2 px-1"
              >
                Contato
              </button>
            </nav>

            {/* Desktop CTA - Professional Spacing */}
            <div className="hidden lg:block">
              <button
                onClick={() => scrollToSection("contato")}
                className="bg-blue-900 text-white font-semibold px-6 py-3 xl:px-8 xl:py-4 rounded-lg hover:bg-blue-800 transition-colors text-base xl:text-lg shadow-md"
              >
                Consulta Gratuita
              </button>
            </div>

            {/* Mobile Menu Button - Professional Touch Target */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 rounded-md hover:bg-gray-100 transition-colors min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7 text-foreground" />
              ) : (
                <Menu className="h-7 w-7 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Professional Spacing */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[90] bg-white pt-20 sm:pt-24">
          <div className="px-4 sm:px-6 py-6 sm:py-8 space-y-3 sm:space-y-4">
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
              onClick={() => navigateToPage("/blog")}
              className="block w-full text-left py-3 px-4 text-base sm:text-lg font-medium text-foreground hover:bg-gray-50 rounded-lg transition-colors min-h-[48px]"
            >
              Blog
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
