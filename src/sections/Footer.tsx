import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { Linkedin, Instagram, Twitter, Facebook, Send, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (contentRef.current) {
        const columns = contentRef.current.querySelectorAll('.footer-column');
        gsap.fromTo(
          columns,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        const socials = contentRef.current.querySelectorAll('.social-icon');
        gsap.fromTo(
          socials,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.08,
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const productLinks = [
    { label: 'Recursos', href: '/#features' },
    { label: 'Preços', href: '/#pricing' },
    { label: 'Integrações', href: '/documentacao' },
    { label: 'API', href: '/documentacao' },
  ];

  const companyLinks = [
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Blog', href: '/blog' },
    { label: 'Carreiras', href: '/carreiras' },
    { label: 'Contato', href: '/contato' },
  ];

  const supportLinks = [
    { label: 'Central de Ajuda', href: '/ajuda' },
    { label: 'Documentação', href: '/documentacao' },
    { label: 'Status', href: '/status' },
    { label: 'Privacidade', href: '/privacidade' },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-visity-primary dark:bg-gray-900 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-visity-secondary/10 rounded-full blur-3xl" />
      </div>

      <div ref={contentRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          <div className="footer-column col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-7 h-7">
                  <path d="M24 4C16.268 4 10 10.268 10 18C10 28 24 44 24 44C24 44 38 28 38 18C38 10.268 31.732 4 24 4Z" fill="url(#footer-logo-gradient)" />
                  <circle cx="24" cy="18" r="8" fill="white" />
                  <path d="M20 18L23 21L29 15" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  <defs>
                    <linearGradient id="footer-logo-gradient" x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
                      <stop stopColor="white" />
                      <stop offset="1" stopColor="#E0E0E0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Visity</span>
            </Link>

            <p className="text-white/70 mb-6 max-w-sm">
              {t('footer.tagline') as string}. Transforme visitas em fatos jurídicos e economize horas de trabalho administrativo.
            </p>

            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin, label: 'LinkedIn' },
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Facebook, label: 'Facebook' },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href="#"
                    className="social-icon w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-all duration-250 hover:scale-110"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-column">
            <h4 className="text-white font-semibold mb-4">{t('footer.product') as string}</h4>
            <ul className="space-y-3">
              {productLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="text-white font-semibold mb-4">{t('footer.company') as string}</h4>
            <ul className="space-y-3">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="text-white font-semibold mb-4">{t('footer.support') as string}</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-white/70 hover:text-white hover:translate-x-1 inline-block transition-all duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-column border-t border-white/10 pt-8 mb-8">
          <div className="max-w-xl">
            <h4 className="text-white font-semibold mb-2">{t('footer.newsletter.title') as string}</h4>
            <p className="text-white/70 text-sm mb-4">{t('footer.newsletter.subtitle') as string}</p>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.newsletter.placeholder') as string}
                  className="w-full px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-visity-accent/50 transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-200 ${
                  subscribed
                    ? 'bg-visity-accent text-white'
                    : 'bg-white text-visity-primary hover:bg-gray-100 hover:scale-105'
                }`}
              >
                {subscribed ? (
                  <>
                    <Check className="w-4 h-4" />
                    Inscrito!
                  </>
                ) : (
                  <>
                    {t('footer.newsletter.cta') as string}
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="footer-column border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            {t('footer.copyright') as string}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/termos" className="text-white/60 hover:text-white text-sm transition-colors">
              {t('footer.terms') as string}
            </Link>
            <Link to="/privacidade" className="text-white/60 hover:text-white text-sm transition-colors">
              {t('footer.privacy') as string}
            </Link>
            <Link to="/cookies" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
