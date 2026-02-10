import { useEffect, useRef } from 'react';
import { Play, Volume2, Maximize } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function VideoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        videoRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-visity-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-sm font-semibold text-visity-secondary tracking-wider mb-4">
            CONHEÇA O SISTEMA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-visity-dark dark:text-white mb-6">
            Veja o Visity em ação
          </h2>
          <p className="text-lg text-visity-gray dark:text-gray-400 max-w-2xl mx-auto">
            Assista à apresentação completa do sistema e descubra como o Visity pode transformar sua gestão de visitas
          </p>
        </div>

        <div
          ref={videoRef}
          className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Video Placeholder - Substitua pelo seu vídeo */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-visity-primary/20 to-visity-secondary/20">
            <div className="text-center">
              <div className="w-24 h-24 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer hover:scale-110 transition-transform group">
                <Play className="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" />
              </div>
              <p className="text-white/80 text-lg">Clique para assistir</p>
              <p className="text-white/60 text-sm mt-2">Apresentação do sistema Visity</p>
            </div>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Play className="w-5 h-5 text-white" />
              </button>
              
              {/* Progress Bar */}
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-visity-primary rounded-full" />
              </div>
              
              <span className="text-white/80 text-sm">05:23 / 15:00</span>
              
              <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Volume2 className="w-5 h-5 text-white" />
              </button>
              
              <button className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <Maximize className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="absolute top-4 left-4 w-20 h-20 border-l-2 border-t-2 border-white/20 rounded-tl-3xl" />
          <div className="absolute top-4 right-4 w-20 h-20 border-r-2 border-t-2 border-white/20 rounded-tr-3xl" />
          <div className="absolute bottom-16 left-4 w-20 h-20 border-l-2 border-b-2 border-white/20 rounded-bl-3xl" />
          <div className="absolute bottom-16 right-4 w-20 h-20 border-r-2 border-b-2 border-white/20 rounded-br-3xl" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-visity-gray dark:text-gray-400 text-sm">
            🎥 Substitua este placeholder pelo seu vídeo de apresentação
          </p>
        </div>
      </div>
    </section>
  );
}
