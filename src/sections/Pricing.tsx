import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Check, Sparkles } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  badge?: string;
  features: string[];
  cta: string;
  ctaLink: string;
  featured?: boolean;
}

export default function Pricing() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const plans: PricingPlan[] = [
    {
      name: t('pricing.free.name') as string,
      price: 'R$ 0',
      period: t('pricing.free.period') as string,
      features: [
        t('pricing.free.feature1') as string,
        t('pricing.free.feature2') as string,
        t('pricing.free.feature3') as string,
        t('pricing.free.feature4') as string,
      ],
      cta: t('pricing.free.cta') as string,
      ctaLink: '/cadastro',
    },
    {
      name: t('pricing.pro.name') as string,
      price: 'R$ 69,90',
      period: '/usuário/mês',
      badge: t('pricing.pro.badge') as string,
      features: [
        'Usuários ilimitados',
        'Visitas ilimitadas',
        'Check-in com geolocalização precisa',
        'Relatórios completos',
      ],
      cta: t('pricing.pro.cta') as string,
      ctaLink: '/pagamento',
      featured: true,
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('.pricing-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'expo.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleEnterpriseClick = () => {
    // Open chat widget
    const chatButton = document.querySelector('[aria-label="Abrir chat"]') as HTMLButtonElement;
    if (chatButton) {
      chatButton.click();
    }
  };

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-visity-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-visity-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-visity-secondary tracking-wider mb-4">
            {t('pricing.eyebrow') as string}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-visity-dark dark:text-white mb-6">
            {t('pricing.title') as string}
          </h2>
          <p className="text-lg text-visity-gray dark:text-gray-400 max-w-2xl mx-auto">
            {t('pricing.subtitle') as string}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-center max-w-3xl mx-auto"
        >
          {plans.map((plan, index) => {
            const isFeatured = plan.featured;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;

            return (
              <div
                key={index}
                className={`pricing-card relative ${isFeatured ? 'md:-mt-4' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {plan.badge && (
                  <div className={`absolute -top-7 left-0 w-full flex justify-center ${isHovered ? 'z-30' : 'z-10'}`}>
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-visity-primary to-visity-secondary text-white text-sm font-semibold rounded-full animate-pulse-glow shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full rounded-3xl p-8 lg:p-10 min-w-[340px] lg:min-w-[400px] transition-all duration-300 ease-expo-out shadow-2xl border-2 border-transparent hover:border-visity-secondary ${
                    isFeatured
                      ? 'bg-gradient-to-br from-visity-primary to-visity-secondary text-white shadow-glow-blue'
                      : 'bg-white dark:bg-gray-900 text-visity-dark dark:text-white shadow-lg'
                  } ${isHovered ? 'scale-105 z-20' : ''} ${isOtherHovered ? 'opacity-60 blur-[3px]' : ''}`}
                >
                  <h3 className={`text-2xl font-extrabold mb-4 tracking-wide ${isFeatured ? 'text-white' : 'text-visity-dark dark:text-white'}`}>
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="text-4xl lg:text-5xl font-extrabold whitespace-nowrap">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-base ml-2 font-medium opacity-80">
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5 ${
                          isFeatured ? 'bg-white/20' : 'bg-visity-accent/20'
                        }`}>
                          <Check className={`w-4 h-4 ${isFeatured ? 'text-white' : 'text-visity-accent'}`} />
                        </div>
                        <span className={`text-base ${isFeatured ? 'text-white/90' : 'text-visity-gray dark:text-gray-400'} whitespace-nowrap`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={plan.ctaLink}
                    className={`block w-full py-3 px-6 rounded-full font-bold text-center transition-all duration-200 text-lg shadow-lg ${
                      isFeatured
                        ? 'bg-white text-visity-primary hover:bg-gray-100 hover:scale-105'
                        : 'bg-visity-primary text-white hover:bg-visity-secondary hover:scale-105'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
