import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [showMore, setShowMore] = useState<{ [key: number]: boolean }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);

  // Exemplo de tópicos (pode ajustar conforme necessidade)
  const topics = ["Geral", "Cadastro", "Visitas", "Relatórios", "Usuários"];

  // Exemplo de perguntas com tópicos
  const faqItems: (FAQItem & { topic?: string })[] = [
    { question: t('faq.q1') as string, answer: t('faq.a1') as string, topic: "Geral" },
    { question: t('faq.q2') as string, answer: t('faq.a2') as string, topic: "Cadastro" },
    { question: t('faq.q3') as string, answer: t('faq.a3') as string, topic: "Visitas" },
    { question: t('faq.q4') as string, answer: t('faq.a4') as string, topic: "Relatórios" },
    { question: t('faq.q5') as string, answer: t('faq.a5') as string, topic: "Usuários" },
  ];

  // Filtragem por pesquisa e tópico
  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(search.toLowerCase()) || item.answer.toLowerCase().includes(search.toLowerCase());
    const matchesTopic = selectedTopic ? item.topic === selectedTopic : true;
    return matchesSearch && matchesTopic;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
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

      // FAQ items slide in from left
      if (itemsRef.current) {
        const items = itemsRef.current.querySelectorAll('.faq-item');
        gsap.fromTo(
          items,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: 'expo.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: itemsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-visity-accent/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-visity-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-visity-secondary tracking-wider mb-4">
            {t('faq.eyebrow') as string}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-visity-dark dark:text-white mb-6">
            {t('faq.title') as string}
          </h2>
          <p className="text-lg text-visity-gray dark:text-gray-400">
            {t('faq.subtitle') as string}
          </p>
        </div>

        {/* Campo de pesquisa */}
        <div className="mb-6 flex flex-col gap-4">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Pesquisar dúvida..."
            className="w-full rounded-full border border-visity-accent px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-visity-primary bg-white dark:bg-gray-900 text-visity-dark dark:text-white"
          />
          {/* Botões de tópicos */}
          <div className="flex flex-wrap gap-2 justify-center">
            {topics.map(topic => (
              <button
                key={topic}
                className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border ${selectedTopic === topic ? 'bg-visity-primary text-white border-visity-primary' : 'bg-white dark:bg-gray-800 text-visity-dark dark:text-white border-visity-accent'}`}
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div ref={itemsRef} className="space-y-4">
          {filteredItems.map((item, index) => {
            const isOpen = openIndex === index;
            const answerLong = item.answer.length > 180;
            const showFull = showMore[index];
            return (
              <div
                key={index}
                className={`faq-item rounded-2xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? 'bg-slate-50 dark:bg-gray-800/50 border-l-4 border-visity-accent'
                    : 'bg-white dark:bg-gray-900 border-l-4 border-transparent hover:bg-slate-50 dark:hover:bg-gray-800/30'
                }`}
                style={{
                  boxShadow: isOpen
                    ? '0 4px 20px rgba(76, 175, 80, 0.1)'
                    : '0 2px 10px rgba(0, 0, 0, 0.05)',
                }}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left transition-all duration-200"
                >
                  <span
                    className={`text-lg font-semibold pr-4 transition-colors duration-300 ${
                      isOpen ? 'text-visity-primary dark:text-visity-secondary' : 'text-visity-dark dark:text-white'
                    }`}
                  >
                    {item.question}
                  </span>
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-400 ease-elastic ${
                      isOpen
                        ? 'bg-visity-accent text-white rotate-180'
                        : 'bg-gray-100 dark:bg-gray-800 text-visity-gray dark:text-gray-400'
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-expo-out ${
                    isOpen ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5">
                    <p className="text-visity-gray dark:text-gray-400 leading-relaxed">
                      {answerLong && !showFull ? item.answer.slice(0, 180) + '...' : item.answer}
                    </p>
                    {answerLong && (
                      <button
                        className="mt-2 text-visity-primary font-semibold text-sm underline"
                        onClick={() => setShowMore(prev => ({ ...prev, [index]: !showFull }))}
                      >
                        {showFull ? 'Mostrar menos' : 'Mostrar mais'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
