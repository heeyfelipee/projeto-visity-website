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
      price: 'R$ 59,90',
      period: t('pricing.pro.period') as string,
      badge: t('pricing.pro.badge') as string,
      features: [
        t('pricing.pro.feature1') as string,
        t('pricing.pro.feature2') as string,
        t('pricing.pro.feature3') as string,
        t('pricing.pro.feature4') as string,
        t('pricing.pro.feature5') as string,
        t('pricing.pro.feature6') as string,
      ],
      cta: t('pricing.pro.cta') as string,
      ctaLink: '/pagamento',
      featured: true,
    },
    {
      name: t('pricing.enterprise.name') as string,
      price: 'Personalizado',
      features: [
        t('pricing.enterprise.feature1') as string,
        t('pricing.enterprise.feature2') as string,
        t('pricing.enterprise.feature3') as string,
        t('pricing.enterprise.feature4') as string,
        t('pricing.enterprise.feature5') as string,
      ],
      cta: t('pricing.enterprise.cta') as string,
      ctaLink: '#chat',
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
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start"
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
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-visity-primary to-visity-secondary text-white text-sm font-semibold rounded-full animate-pulse-glow">
                      <Sparkles className="w-4 h-4" />
                      {plan.badge}
                    </div>
                  </div>
                )}

                <div
                  className={`relative h-full rounded-3xl p-6 lg:p-8 transition-all duration-300 ease-expo-out ${
                    isFeatured
                      ? 'bg-gradient-to-br from-visity-primary to-visity-secondary text-white shadow-glow-blue'
                      : 'bg-white dark:bg-gray-900 text-visity-dark dark:text-white shadow-lg'
                  } ${isHovered ? 'scale-105' : ''} ${isOtherHovered ? 'opacity-70 blur-[2px]' : ''}`}
                >
                  <h3 className={`text-xl font-semibold mb-4 ${isFeatured ? 'text-white' : 'text-visity-dark dark:text-white'}`}>
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className={`${plan.price === 'Personalizado' ? 'text-2xl lg:text-3xl' : 'text-4xl lg:text-5xl'} font-bold ${isFeatured ? 'text-white' : 'text-visity-dark dark:text-white'}`}>
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className={`text-sm ${isFeatured ? 'text-white/80' : 'text-visity-gray dark:text-gray-400'}`}>
                        {plan.period}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          isFeatured ? 'bg-white/20' : 'bg-visity-accent/20'
                        }`}>
                          <Check className={`w-3 h-3 ${isFeatured ? 'text-white' : 'text-visity-accent'}`} />
                        </div>
                        <span className={`text-sm ${isFeatured ? 'text-white/90' : 'text-visity-gray dark:text-gray-400'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {plan.ctaLink === '#chat' ? (
                    <button
                      onClick={handleEnterpriseClick}
                      className={`w-full py-3 px-6 rounded-full font-semibold transition-all duration-200 ${
                        isFeatured
                          ? 'bg-white text-visity-primary hover:bg-gray-100 hover:scale-105'
                          : 'bg-visity-primary text-white hover:bg-visity-secondary hover:scale-105'
                      }`}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <Link
                      to={plan.ctaLink}
                      className={`block w-full py-3 px-6 rounded-full font-semibold text-center transition-all duration-200 ${
                        isFeatured
                          ? 'bg-white text-visity-primary hover:bg-gray-100 hover:scale-105'
                          : 'bg-visity-primary text-white hover:bg-visity-secondary hover:scale-105'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
