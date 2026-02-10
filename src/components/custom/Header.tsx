import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { gsap } from 'gsap';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'expo.out', delay: 0 }
      );

      if (navLinksRef.current) {
        const links = navLinksRef.current.querySelectorAll('a, button');
        gsap.fromTo(
          links,
          { opacity: 0, y: -20 },
          { 
            opacity: 1, 
            y: 0, 
            duration: 0.4, 
            ease: 'expo.out', 
            stagger: 0.08,
            delay: 0.1 
          }
        );
      }

      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)', delay: 0.4 }
      );
    }, headerRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'features', label: t('nav.features') as string, type: 'scroll' },
    { id: 'pricing', label: t('nav.pricing') as string, type: 'scroll' },
    { id: 'faq', label: t('nav.faq') as string, type: 'scroll' },
  ];

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-expo-out ${
          isScrolled
            ? 'w-[90%] max-w-6xl mx-auto mt-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-2xl rounded-full shadow-pill'
            : 'w-full bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border-b border-white/20 dark:border-white/10'
        }`}
        style={{
          height: isScrolled ? '64px' : '80px',
          transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <div className="h-full px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div 
              ref={logoRef}
              className="relative flex items-center justify-center"
              style={{
                width: isScrolled ? '32px' : '40px',
                height: isScrolled ? '32px' : '40px',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path
                  d="M24 4C16.268 4 10 10.268 10 18C10 28 24 44 24 44C24 44 38 28 38 18C38 10.268 31.732 4 24 4Z"
                  fill="url(#logo-gradient)"
                />
                <circle cx="24" cy="18" r="8" fill="white" />
                <path
                  d="M20 18L23 21L29 15"
                  stroke="#4CAF50"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="logo-gradient" x1="10" y1="4" x2="38" y2="44" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#0D47A1" />
                    <stop offset="0.5" stopColor="#2196F3" />
                    <stop offset="1" stopColor="#009688" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span 
              className="font-bold text-visity-primary dark:text-white"
              style={{
                fontSize: isScrolled ? '1.125rem' : '1.25rem',
                transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
              }}
            >
              Visity
            </span>
          </Link>

          <nav ref={navLinksRef} className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm font-medium text-visity-dark dark:text-gray-300 hover:text-visity-primary dark:hover:text-white transition-colors duration-250 group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-visity-primary transition-all duration-250 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-visity-dark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Globe className="w-4 h-4" />
              <span>{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-visity-dark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
            </button>

            <Link
              to="/cadastro"
              className="hidden md:block btn-primary text-sm"
            >
              {t('nav.freeTrial') as string}
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-visity-dark dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        <div
          className={`absolute right-0 top-0 h-full w-72 bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-400 ease-expo-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="p-6 pt-20">
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-lg font-medium text-visity-dark dark:text-gray-300 hover:text-visity-primary dark:hover:text-white transition-colors py-2"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  {item.label}
                </button>
              ))}
              
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
              
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-2 text-lg font-medium text-visity-dark dark:text-gray-300"
              >
                <Globe className="w-5 h-5" />
                {language === 'pt' ? 'English' : 'Português'}
              </button>
              
              <Link
                to="/cadastro"
                className="btn-primary mt-4 text-center"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t('nav.freeTrial') as string}
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
