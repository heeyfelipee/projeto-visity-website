import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'pt' | 'en';

interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  pt: {
    // Navigation
    nav: {
      features: 'Recursos',
      pricing: 'Preços',
      faq: 'FAQ',
      contact: 'Contato',
      freeTrial: 'Teste Grátis',
    },
    // Hero
    hero: {
      headline: 'Gestão de Visitas em Campo Inteligente',
      subheadline: 'Transforme visitas em fatos jurídicos. Economize 4 a 6 horas por semana. Sem achismo. Sem "ele disse, o cliente disse".',
      ctaPrimary: 'Teste Grátis por 7 Dias',
      ctaSecondary: 'Ver Demonstração',
      trust1: '7 dias grátis',
      trust2: 'Contrato sem fidelidade',
      trust3: 'Setup em 5 minutos',
    },
    // Features
    features: {
      eyebrow: 'RECURSOS',
      title: 'Tudo que você precisa para gerenciar visitas',
      subtitle: 'Deixe a papelada de lado. Tenha controle total sem complicação.',
      geo: {
        title: 'Geolocalização Precisa',
        desc: 'Saiba exatamente onde seus técnicos estão em tempo real. Sem dúvidas, sem disputas.',
      },
      checkin: {
        title: 'Check-in/Check-out Inteligente',
        desc: 'Registro automático de entrada e saída com validação de GPS e horário.',
      },
      time: {
        title: 'Economia de Tempo',
        desc: 'Reduza 4 a 6 horas semanais de trabalho administrativo. Foco no que importa.',
      },
      legal: {
        title: 'Proteção Jurídica',
        desc: 'Transforme visitas em fatos comprováveis. Documentação válida em processos.',
      },
      reports: {
        title: 'Relatórios Automáticos',
        desc: 'Gere relatórios completos em um clique. Dados organizados e exportáveis.',
      },
      team: {
        title: 'Gestão de Equipe',
        desc: 'Acompanhe o desempenho da equipe. Identifique gargalos e otimize processos.',
      },
    },
    // FAQ
    faq: {
      eyebrow: 'DÚVIDAS FREQUENTES',
      title: 'O que você precisa saber',
      subtitle: 'Respostas claras para suas perguntas',
      q1: 'Isso não vai virar controle excessivo?',
      a1: 'Não. O Visity organiza fatos, não vigia pessoas. Funcionários gostam porque tira a pressão de "provar" que trabalharam.',
      q2: 'E se o funcionário tentar burlar?',
      a2: 'O sistema cruza GPS, horário e dados obrigatórios. Se falhar, registra a tentativa. Você tem fatos, não acusações.',
      q3: 'Funciona offline?',
      a3: 'Sim. O app sincroniza quando reconecta. Nada se perde.',
      q4: 'Preciso de treinamento?',
      a4: 'Não. Cadastro em 2 campos, importação via Excel. Se precisar de manual, falhamos.',
      q5: 'Tenho embasamento jurídico?',
      a5: 'Sim. Registros de data, hora, local e tentativas são válidos administrativamente. Muito mais forte que WhatsApp ou conversa verbal.',
    },
    // Pricing
    pricing: {
      eyebrow: 'PREÇOS',
      title: 'Escolha o plano ideal para você',
      subtitle: 'Comece grátis. Escale quando precisar.',
      free: {
        name: 'Grátis',
        period: '/7 dias',
        feature1: '1 usuário/funcionário',
        feature2: '100 visitas/mês',
        feature3: 'Geolocalização básica',
        feature4: 'Relatórios simples',
        cta: 'Começar Grátis',
      },
      pro: {
        name: 'Profissional',
        badge: 'Mais Popular',
        period: '/usuário/mês',
        feature1: 'Usuários ilimitados',
        feature2: 'Visitas ilimitadas',
        feature3: 'Geolocalização avançada',
        feature4: 'Relatórios completos',
        feature5: 'Suporte prioritário',
        feature6: 'API de integração',
        cta: 'Assinar Agora',
      },
      enterprise: {
        name: 'Empresarial',
        feature1: 'Tudo do Profissional',
        feature2: 'Onboarding dedicado',
        feature3: 'SLA garantido',
        feature4: 'Treinamento online e acompanhamento',
        feature5: 'Treinamento presencial',
        cta: 'Falar com Vendas',
      },
    },
    // Dashboard Preview
    dashboard: {
      eyebrow: 'DASHBOARD',
      title: 'Controle total em uma tela',
      subtitle: 'Visualize visitas em tempo real, acompanhe métricas e tome decisões baseadas em dados.',
    },
    // Footer
    footer: {
      tagline: 'Gestão de Visitas em Campo',
      newsletter: {
        title: 'Fique por dentro',
        subtitle: 'Novidades e dicas sobre gestão de campo',
        placeholder: 'Seu e-mail',
        cta: 'Inscrever',
      },
      product: 'Produto',
      company: 'Empresa',
      support: 'Suporte',
      copyright: '© 2025 Visity. Todos os direitos reservados.',
      terms: 'Termos de Uso',
      privacy: 'Política de Privacidade',
    },
    // Common
    common: {
      learnMore: 'Saiba mais',
      getStarted: 'Começar',
      contactUs: 'Fale conosco',
    },
  },
  en: {
    // Navigation
    nav: {
      features: 'Features',
      pricing: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact',
      freeTrial: 'Free Trial',
    },
    // Hero
    hero: {
      headline: 'Smart Field Visit Management',
      subheadline: 'Turn visits into legal facts. Save 4 to 6 hours per week. No guesswork. No "he said, client said".',
      ctaPrimary: 'Free 7-Day Trial',
      ctaSecondary: 'Watch Demo',
      trust1: '7 days free',
      trust2: 'No credit card',
      trust3: 'Setup in 5 minutes',
    },
    // Features
    features: {
      eyebrow: 'FEATURES',
      title: 'Everything you need to manage visits',
      subtitle: 'Leave paperwork behind. Have total control without complications.',
      geo: {
        title: 'Precise Geolocation',
        desc: 'Know exactly where your technicians are in real-time. No doubts, no disputes.',
      },
      checkin: {
        title: 'Smart Check-in/Check-out',
        desc: 'Automatic entry and exit registration with GPS and time validation.',
      },
      time: {
        title: 'Time Savings',
        desc: 'Reduce 4 to 6 hours of administrative work weekly. Focus on what matters.',
      },
      legal: {
        title: 'Legal Protection',
        desc: 'Turn visits into provable facts. Valid documentation in legal proceedings.',
      },
      reports: {
        title: 'Automatic Reports',
        desc: 'Generate complete reports in one click. Organized and exportable data.',
      },
      team: {
        title: 'Team Management',
        desc: 'Track team performance. Identify bottlenecks and optimize processes.',
      },
    },
    // FAQ
    faq: {
      eyebrow: 'FAQ',
      title: 'What you need to know',
      subtitle: 'Clear answers to your questions',
      q1: 'Won\'t this become excessive control?',
      a1: 'No. Visity organizes facts, not surveillance. Employees like it because it removes the pressure to "prove" they worked.',
      q2: 'What if an employee tries to cheat?',
      a2: 'The system cross-references GPS, time, and mandatory data. If it fails, it records the attempt. You have facts, not accusations.',
      q3: 'Does it work offline?',
      a3: 'Yes. The app syncs when reconnected. Nothing is lost.',
      q4: 'Do I need training?',
      a4: 'No. Registration in 2 fields, import via Excel. If you need a manual, we failed.',
      q5: 'Do I have legal backing?',
      a5: 'Yes. Date, time, location, and attempt records are administratively valid. Much stronger than WhatsApp or verbal conversation.',
    },
    // Pricing
    pricing: {
      eyebrow: 'PRICING',
      title: 'Choose the perfect plan for you',
      subtitle: 'Start free. Scale when needed.',
      free: {
        name: 'Free',
        period: '/7 days',
        feature1: 'Up to 5 users',
        feature2: '100 visits/month',
        feature3: 'Basic geolocation',
        feature4: 'Simple reports',
        cta: 'Start Free',
      },
      pro: {
        name: 'Professional',
        badge: 'Most Popular',
        period: '/user/month',
        feature1: 'Unlimited users',
        feature2: 'Unlimited visits',
        feature3: 'Advanced geolocation',
        feature4: 'Complete reports',
        feature5: 'Priority support',
        feature6: 'API integration',
        cta: 'Subscribe Now',
      },
      enterprise: {
        name: 'Enterprise',
        feature1: 'Everything in Professional',
        feature2: 'Dedicated onboarding',
        feature3: 'Guaranteed SLA',
        feature4: 'Customizations',
        feature5: 'In-person training',
        cta: 'Contact Sales',
      },
    },
    // Dashboard Preview
    dashboard: {
      eyebrow: 'DASHBOARD',
      title: 'Total control in one screen',
      subtitle: 'Visualize visits in real-time, track metrics, and make data-driven decisions.',
    },
    // Footer
    footer: {
      tagline: 'Field Visit Management',
      newsletter: {
        title: 'Stay updated',
        subtitle: 'News and tips about field management',
        placeholder: 'Your email',
        cta: 'Subscribe',
      },
      product: 'Product',
      company: 'Company',
      support: 'Support',
      copyright: '© 2025 Visity. All rights reserved.',
      terms: 'Terms of Use',
      privacy: 'Privacy Policy',
    },
    // Common
    common: {
      learnMore: 'Learn more',
      getStarted: 'Get Started',
      contactUs: 'Contact us',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string | Translations;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = useCallback(
    (key: string): string | Translations => {
      const keys = key.split('.');
      let value: Translations | string = translations[language];
      
      for (const k of keys) {
        if (typeof value === 'object' && value !== null) {
          value = value[k];
        } else {
          return key;
        }
      }
      
      return value ?? key;
    },
    [language]
  );

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
