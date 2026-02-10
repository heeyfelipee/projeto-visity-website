import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Check, Play, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

export default function Hero() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const floatingShapesRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePosition({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      tl.fromTo(
        floatingShapesRef.current?.children || [],
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
        0.2
      );

      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        tl.fromTo(
          words,
          { opacity: 0, y: 40, clipPath: 'inset(0 100% 0 0)' },
          { 
            opacity: 1, 
            y: 0, 
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.6, 
            stagger: 0.1 
          },
          0.4
        );
      }

      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.9
      );

      tl.fromTo(
        ctaRef.current?.children || [],
        { opacity: 0, scale: 0.8, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'elastic.out(1, 0.5)' },
        1.1
      );

      tl.fromTo(
        trustRef.current?.children || [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
        1.3
      );

      tl.fromTo(
        dashboardRef.current,
        { opacity: 0, rotateY: 45, rotateX: 15, scale: 0.7 },
        { opacity: 1, rotateY: 0, rotateX: 0, scale: 1, duration: 1.2, ease: 'expo.out' },
        0.8
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const headline = t('hero.headline') as string;
  const words = headline.split(' ');

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 animated-gradient opacity-10 dark:opacity-20" />
      
      <div ref={floatingShapesRef} className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full bg-visity-primary/10 dark:bg-visity-primary/20 backdrop-blur-3xl animate-float-slow"
          style={{ animationDelay: '0s' }}
        />
        <div 
          className="absolute top-[60%] left-[5%] w-24 h-24 rounded-2xl bg-visity-secondary/10 dark:bg-visity-secondary/20 backdrop-blur-3xl animate-float"
          style={{ animationDelay: '1s' }}
        />
        <div 
          className="absolute top-[20%] right-[15%] w-40 h-40 rounded-full bg-visity-teal/10 dark:bg-visity-teal/20 backdrop-blur-3xl animate-float-slow"
          style={{ animationDelay: '2s' }}
        />
        <div 
          className="absolute bottom-[20%] right-[8%] w-28 h-28 rounded-3xl bg-visity-accent/10 dark:bg-visity-accent/20 backdrop-blur-3xl animate-float"
          style={{ animationDelay: '3s' }}
        />
        <div 
          className="absolute top-[40%] left-[20%] w-16 h-16 rounded-full bg-visity-primary/5 dark:bg-visity-primary/10 backdrop-blur-2xl animate-float-slow"
          style={{ animationDelay: '4s' }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-visity-dark dark:text-white leading-tight"
            >
              {words.map((word, index) => (
                <span key={index} className="word inline-block mr-3">
                  {word}
                </span>
              ))}
            </h1>

            <p
              ref={subheadlineRef}
              className="text-lg sm:text-xl text-visity-gray dark:text-gray-400 max-w-xl"
            >
              {t('hero.subheadline') as string}
            </p>

            <div ref={ctaRef} className="flex flex-wrap gap-4">
              <Link 
                to="/cadastro"
                className="btn-primary flex items-center gap-2 group"
              >
                {t('hero.ctaPrimary') as string}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <button 
                className="btn-secondary flex items-center gap-2"
                onClick={() => scrollToSection('dashboard-preview')}
              >
                <Play className="w-4 h-4" />
                {t('hero.ctaSecondary') as string}
              </button>
            </div>

            <div ref={trustRef} className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2 text-sm text-visity-gray dark:text-gray-400">
                <div className="w-5 h-5 rounded-full bg-visity-accent/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-visity-accent" />
                </div>
                {t('hero.trust1') as string}
              </div>
              <div className="flex items-center gap-2 text-sm text-visity-gray dark:text-gray-400">
                <div className="w-5 h-5 rounded-full bg-visity-accent/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-visity-accent" />
                </div>
                {t('hero.trust2') as string}
              </div>
              <div className="flex items-center gap-2 text-sm text-visity-gray dark:text-gray-400">
                <div className="w-5 h-5 rounded-full bg-visity-accent/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-visity-accent" />
                </div>
                {t('hero.trust3') as string}
              </div>
            </div>
          </div>

          <div 
            className="relative lg:pl-8"
            style={{ perspective: '1200px' }}
          >
            <div
              ref={dashboardRef}
              className="relative animate-float"
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 8}deg)`,
                transition: 'transform 0.3s ease-out',
              }}
            >
              <div className="glass-card p-4 sm:p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                      <svg viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path
                          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span className="font-semibold text-visity-dark dark:text-white">Visity Dashboard</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                  {[
                    { label: 'Total Visitas', value: '1,247', color: 'bg-visity-primary' },
                    { label: 'Hoje', value: '42', color: 'bg-visity-secondary' },
                    { label: 'Em Andamento', value: '8', color: 'bg-yellow-500' },
                    { label: 'Concluídas', value: '38', color: 'bg-visity-accent' },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 text-center"
                    >
                      <div className={`w-8 h-8 ${stat.color} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
                        <span className="text-white text-xs font-bold">{stat.value.charAt(0)}</span>
                      </div>
                      <div className="text-lg font-bold text-visity-dark dark:text-white">{stat.value}</div>
                      <div className="text-xs text-visity-gray dark:text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-visity-dark dark:text-white">Mapa de Visitas</span>
                      <span className="text-xs text-visity-accent">Ao vivo</span>
                    </div>
                    <div className="aspect-video bg-gradient-to-br from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 rounded-lg relative overflow-hidden">
                      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-visity-primary rounded-full animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-visity-accent rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
                      <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-visity-secondary rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                      <div className="absolute top-1/4 left-1/4 w-4 h-4 border-2 border-visity-primary rounded-full animate-ping" />
                      <div className="absolute top-1/2 left-1/2 w-4 h-4 border-2 border-visity-accent rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-visity-dark dark:text-white">Atividades Recentes</span>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'Carlos M.', action: 'Check-in', time: '2 min', status: 'success' },
                        { name: 'Ana P.', action: 'Check-out', time: '5 min', status: 'success' },
                        { name: 'João S.', action: 'Em visita', time: '12 min', status: 'pending' },
                      ].map((activity, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-visity-primary to-visity-secondary flex items-center justify-center text-white text-xs font-medium">
                            {activity.name.charAt(0)}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-visity-dark dark:text-white">{activity.name}</div>
                            <div className="text-xs text-visity-gray dark:text-gray-400">{activity.action}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-visity-gray dark:text-gray-400">{activity.time}</span>
                            <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-visity-accent' : 'bg-yellow-500'}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-20 h-20 bg-visity-accent/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-visity-primary/20 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
