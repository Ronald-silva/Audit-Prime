import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Tools from '@/components/Tools';
import Differentials from '@/components/Differentials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Add smooth scrolling to the html element
    document.documentElement.classList.add('scroll-smooth');
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Tools />
        <Differentials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
