import { useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, CheckCircle, Clock, Shield, BarChart3, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const featuresData = [
  {
    icon: MapPin,
    titleKey: 'features.geo.title',
    descKey: 'features.geo.desc',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: CheckCircle,
    titleKey: 'features.checkin.title',
    descKey: 'features.checkin.desc',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Clock,
    titleKey: 'features.time.title',
    descKey: 'features.time.desc',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Shield,
    titleKey: 'features.legal.title',
    descKey: 'features.legal.desc',
    color: 'from-red-500 to-red-600',
  },
  {
    icon: BarChart3,
    titleKey: 'features.reports.title',
    descKey: 'features.reports.desc',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Users,
    titleKey: 'features.team.title',
    descKey: 'features.team.desc',
    color: 'from-teal-500 to-teal-600',
  },
];

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
        const cards = cardsRef.current.querySelectorAll('.feature-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'expo.out',
            stagger: 0.1,
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

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-visity-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-visity-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-visity-secondary tracking-wider mb-4">
            {t('features.eyebrow') as string}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-visity-dark dark:text-white mb-6">
            {t('features.title') as string}
          </h2>
          <p className="text-lg text-visity-gray dark:text-gray-400 max-w-2xl mx-auto">
            {t('features.subtitle') as string}
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {featuresData.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <div
                key={index}
                className="feature-card group h-full"
              >
                <div className="relative h-full bg-white dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 transition-all duration-300 ease-expo-out group-hover:-translate-y-2 group-hover:shadow-xl group-hover:border-visity-primary/30 dark:group-hover:border-visity-primary/30">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>

                  <h3 className="text-lg font-semibold text-visity-dark dark:text-white mb-2">
                    {t(feature.titleKey) as string}
                  </h3>
                  <p className="text-sm text-visity-gray dark:text-gray-400 leading-relaxed">
                    {t(feature.descKey) as string}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
