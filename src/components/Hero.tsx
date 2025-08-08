import heroBackground from "@/assets/hero-background.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(28, 68, 142, 0.9), rgba(28, 68, 142, 0.7)), url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "scroll",
      }}
    >
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 text-center text-white">
        {/* Perfect Responsive Hero Content */}
        <div className="space-y-3 sm:space-y-4 md:space-y-6 lg:space-y-8">
          {/* Company Name - Perfect Scaling */}
          <h1 className="responsive-text text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold animate-fade-in leading-tight tracking-wide px-1 sm:px-2 md:px-4">
            AUDIT PRIME
          </h1>

          {/* Value Proposition - Perfect Scaling */}
          <div className="responsive-text text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold animate-slide-up leading-tight max-w-5xl mx-auto px-1 sm:px-2 md:px-4">
            CUIDANDO DA SAÚDE DO SEU NEGÓCIO
          </div>

          {/* Supporting Text - Perfect Scaling */}
          <p className="responsive-text text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl opacity-95 animate-slide-up leading-relaxed max-w-4xl mx-auto px-1 sm:px-2 md:px-4">
            Sua parceria confiável em consultoria e gestão empresarial em
            Fortaleza
          </p>

          {/* CTA Section - Perfect Responsive */}
          <div className="animate-scale-in pt-3 sm:pt-4 md:pt-6">
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-2xl mx-auto px-1 sm:px-2">
              <button
                onClick={() => scrollToSection("servicos")}
                className="w-full sm:w-auto bg-white text-blue-900 shadow-xl font-semibold px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg min-h-[44px] sm:min-h-[48px] cursor-pointer transition-all duration-200"
                style={{ backgroundColor: "white", color: "#1e3a8a" }}
              >
                Conheça Nossos Serviços
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="w-full sm:w-auto border-2 border-white text-white font-semibold px-3 sm:px-4 md:px-6 lg:px-8 py-3 sm:py-4 text-xs sm:text-sm md:text-base lg:text-lg rounded-lg min-h-[44px] sm:min-h-[48px] cursor-pointer bg-transparent transition-all duration-200"
                style={{
                  borderColor: "white",
                  color: "white",
                  backgroundColor: "transparent",
                }}
              >
                Consulta Gratuita
              </button>
            </div>

            {/* Trust Indicators - Perfect Responsive */}
            <div className="mt-4 sm:mt-6 md:mt-8 text-xs sm:text-sm md:text-base opacity-90 space-y-1 px-1 sm:px-2">
              <p>✓ Mais de 500 empresas atendidas</p>
              <p>✓ Consultoria especializada em PMEs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden sm:block">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
