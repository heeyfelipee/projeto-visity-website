import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin, TrendingUp, Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface StatItem {
  label: string;
  value: number;
  suffix: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  icon: React.ElementType;
  color: string;
}

// Brazil Map SVG Component
const BrazilMap = () => {
  const mapRef = useRef<SVGSVGElement>(null);
  const [activeState, setActiveState] = useState<number | null>(null);

  const states = [
    { id: 'SP', name: 'São Paulo', x: 55, y: 65, visits: 342 },
    { id: 'RJ', name: 'Rio de Janeiro', x: 60, y: 72, visits: 156 },
    { id: 'MG', name: 'Minas Gerais', x: 58, y: 60, visits: 198 },
    { id: 'PR', name: 'Paraná', x: 50, y: 75, visits: 124 },
    { id: 'RS', name: 'Rio Grande do Sul', x: 48, y: 82, visits: 89 },
    { id: 'BA', name: 'Bahia', x: 70, y: 50, visits: 76 },
    { id: 'DF', name: 'Brasília', x: 55, y: 52, visits: 112 },
    { id: 'PE', name: 'Pernambuco', x: 78, y: 38, visits: 45 },
    { id: 'CE', name: 'Ceará', x: 75, y: 28, visits: 38 },
    { id: 'AM', name: 'Amazonas', x: 35, y: 25, visits: 67 },
  ];

  useEffect(() => {
    // Animate map pins
    const pins = mapRef.current?.querySelectorAll('.map-pin');
    if (pins) {
      gsap.fromTo(
        pins,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'elastic.out(1, 0.5)',
        }
      );
    }
  }, []);

  return (
    <svg
      ref={mapRef}
      viewBox="0 0 100 100"
      className="w-full h-full"
      style={{ filter: 'drop-shadow(0 4px 20px rgba(13, 71, 161, 0.2))' }}
    >
      {/* Brazil Outline */}
      <path
        d="M25,15 Q30,10 40,12 L50,15 Q60,12 70,18 L80,25 Q85,30 82,40 L85,50 Q88,60 80,70 L75,80 Q70,88 60,85 L50,82 Q40,85 30,80 L20,70 Q15,60 18,50 L15,40 Q12,30 18,25 Z"
        fill="rgba(13, 71, 161, 0.1)"
        stroke="#0D47A1"
        strokeWidth="0.5"
        className="animate-pulse"
        style={{ animationDuration: '4s' }}
      />
      
      {/* State Markers */}
      {states.map((state, index) => (
        <g key={state.id} className="map-pin" style={{ transformOrigin: `${state.x}px ${state.y}px` }}>
          {/* Pulse ring */}
          <circle
            cx={state.x}
            cy={state.y}
            r="3"
            fill="none"
            stroke="#4CAF50"
            strokeWidth="0.5"
            opacity="0.5"
            className="animate-ping"
            style={{ animationDuration: '2s', animationDelay: `${index * 0.2}s` }}
          />
          {/* Pin */}
          <circle
            cx={state.x}
            cy={state.y}
            r="2"
            fill="#4CAF50"
            className="cursor-pointer transition-all hover:r-3"
            onMouseEnter={() => setActiveState(index)}
            onMouseLeave={() => setActiveState(null)}
          />
          {/* Tooltip */}
          {activeState === index && (
            <g>
              <rect
                x={state.x - 15}
                y={state.y - 18}
                width="30"
                height="12"
                rx="2"
                fill="white"
                stroke="#0D47A1"
                strokeWidth="0.3"
              />
              <text
                x={state.x}
                y={state.y - 12}
                textAnchor="middle"
                fontSize="3"
                fill="#0D47A1"
                fontWeight="bold"
              >
                {state.id}
              </text>
              <text
                x={state.x}
                y={state.y - 8}
                textAnchor="middle"
                fontSize="2.5"
                fill="#4CAF50"
              >
                {state.visits} visitas
              </text>
            </g>
          )}
        </g>
      ))}
      
      {/* Legend */}
      <g transform="translate(5, 88)">
        <circle cx="2" cy="2" r="2" fill="#4CAF50" />
        <text x="6" y="3.5" fontSize="3" fill="#607D8B">Visitas ativas</text>
      </g>
    </svg>
  );
};

export default function DashboardPreview() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const dashboardRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);

  const stats: StatItem[] = [
    { label: 'Total de Visitas', value: 1247, suffix: '', trend: 'up', trendValue: '+12%', icon: MapPin, color: 'bg-visity-primary' },
    { label: 'Visitas Hoje', value: 42, suffix: '', trend: 'up', trendValue: '+5%', icon: Clock, color: 'bg-visity-secondary' },
    { label: 'Em Andamento', value: 8, suffix: '', trend: 'neutral', trendValue: '0%', icon: Users, color: 'bg-yellow-500' },
    { label: 'Concluídas', value: 38, suffix: '', trend: 'up', trendValue: '+8%', icon: CheckCircle, color: 'bg-visity-accent' },
  ];

  const activities = [
    { name: 'Carlos Moreira', action: 'Check-in em Cliente ABC', time: '2 min atrás', status: 'success', avatar: 'CM' },
    { name: 'Ana Pereira', action: 'Check-out - Visita concluída', time: '5 min atrás', status: 'success', avatar: 'AP' },
    { name: 'João Silva', action: 'Em visita - Cliente XYZ', time: '12 min atrás', status: 'pending', avatar: 'JS' },
    { name: 'Maria Santos', action: 'Check-in em Cliente DEF', time: '18 min atrás', status: 'success', avatar: 'MS' },
    { name: 'Pedro Costa', action: 'Alerta: GPS desativado', time: '25 min atrás', status: 'alert', avatar: 'PC' },
    { name: 'Fernanda Lima', action: 'Check-in em Cliente GHI', time: '30 min atrás', status: 'success', avatar: 'FL' },
    { name: 'Rafael Souza', action: 'Check-out - Visita concluída', time: '35 min atrás', status: 'success', avatar: 'RS' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        dashboardRef.current,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: dashboardRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
            onEnter: () => setCountersStarted(true),
          },
        }
      );

      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card');
        gsap.fromTo(
          statCards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
            stagger: 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const Counter = ({ value, suffix, started }: { value: number; suffix: string; started: boolean }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!started) return;

      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, [started, value]);

    return <span>{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <section
      id="dashboard-preview"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-visity-primary via-[#0a3d8a] to-[#08306b]" />
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-visity-secondary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-visity-accent/10 rounded-full blur-3xl animate-float-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-visity-secondary tracking-wider mb-4">
            {t('dashboard.eyebrow') as string}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            {t('dashboard.title') as string}
          </h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            {t('dashboard.subtitle') as string}
          </p>
        </div>

        <div ref={dashboardRef} className="relative">
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-slate-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 text-white">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-visity-dark dark:text-white">Dashboard</h3>
                  <p className="text-xs text-visity-gray dark:text-gray-400">Visão Geral</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-xs font-medium text-visity-dark dark:text-white">AD</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={index}
                      className="stat-card bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className={`w-10 h-10 ${stat.color} rounded-xl flex items-center justify-center`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className={`flex items-center gap-1 text-xs ${
                          stat.trend === 'up' ? 'text-visity-accent' : stat.trend === 'down' ? 'text-red-500' : 'text-visity-gray'
                        }`}>
                          {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                          {stat.trendValue}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-visity-dark dark:text-white">
                        <Counter value={stat.value} suffix={stat.suffix} started={countersStarted} />
                      </div>
                      <div className="text-xs text-visity-gray dark:text-gray-400">{stat.label}</div>
                    </div>
                  );
                })}
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Brazil Map */}
                <div className="bg-slate-50 dark:bg-gray-800/50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-visity-dark dark:text-white">Mapa de Visitas - Brasil</span>
                    <span className="flex items-center gap-1.5 text-xs text-visity-accent">
                      <span className="w-2 h-2 bg-visity-accent rounded-full animate-pulse" />
                      Ao vivo
                    </span>
                  </div>
                  <div className="aspect-video rounded-xl relative overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
                    <BrazilMap />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs text-visity-gray dark:text-gray-400">
                    <span>10 estados ativos</span>
                    <span>1.247 visitas no Brasil</span>
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-[rgba(31,41,55,0.5)] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base font-semibold text-white">Atividades Recentes</span>
                    <button className="text-xs text-visity-secondary hover:underline">Ver todas</button>
                  </div>
                  <div className="space-y-1 max-h-[370px] overflow-y-auto scrollbar-thin scrollbar-thumb-visity-secondary/40 scrollbar-track-transparent pr-1">
                    {activities.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[#263143] transition-colors"
                      >
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-visity-primary to-visity-secondary flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                          {activity.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-white truncate">
                            {activity.name}
                          </div>
                          <div className="text-xs text-[#b0b8c9] truncate">
                            {activity.action}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                          <span className="text-xs text-[#b0b8c9]">{activity.time}</span>
                          {activity.status === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {activity.status === 'pending' && <Clock className="w-4 h-4 text-yellow-400" />}
                          {activity.status === 'alert' && <AlertCircle className="w-4 h-4 text-red-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-6 -left-6 w-24 h-24 bg-visity-accent/30 rounded-full blur-2xl" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-visity-secondary/30 rounded-full blur-2xl" />
        </div>
      </div>
    </section>
  );
}
