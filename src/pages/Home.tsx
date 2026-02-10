import { useEffect } from 'react';
import Header from '@/components/custom/Header';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import FAQ from '@/sections/FAQ';
import Pricing from '@/sections/Pricing';
import DashboardPreview from '@/sections/DashboardPreview';
import VideoSection from '@/sections/VideoSection';
import Footer from '@/sections/Footer';

export default function Home() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const element = document.getElementById(href.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <Features />
        <DashboardPreview />
        <VideoSection />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
