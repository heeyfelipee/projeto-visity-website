import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('visity-cookies-accepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  // Minimizar ao rolar
  useEffect(() => {
    if (!isVisible) return;
    const handleScroll = () => {
      setMinimized(true);
    };
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible]);

  const handleAccept = () => {
    localStorage.setItem('visity-cookies-accepted', 'true');
    setIsVisible(false);
  };


  const handleDecline = () => {
    localStorage.setItem('visity-cookies-accepted', 'false');
    setIsVisible(false);
  };

  const handleMinimize = () => {
    setMinimized(true);
  };

  if (!isVisible) return null;

  if (minimized) {
    // Ícone de cookie fixo, alinhado ao chat assistant (esquerda, ajuste de alinhamento vertical)
    return (
      <div className="fixed bottom-8 left-8 z-40">
        <button
          className="w-12 h-12 bg-[#1856c9] rounded-full flex items-center justify-center shadow-lg"
          onClick={() => setMinimized(false)}
          aria-label="Mostrar banner de cookies"
        >
          <Cookie className="w-6 h-6 text-white" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 ml-2">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center w-full">
              <div className="flex items-start gap-4 w-full">
                <div className="w-12 h-12 bg-visity-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Cookie className="w-7 h-7 text-visity-primary" />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-semibold text-visity-dark dark:text-white mb-1">
                    Valorizamos sua experiência — utilizamos cookies.
                  </h3>
                  <p className="text-sm text-visity-gray dark:text-gray-400 max-w-xl">
                    Este site utiliza cookies para melhorar sua experiência de navegação. 
                    Ao continuar, você concorda com nossa{' '}
                    <Link to="/cookies" className="text-visity-primary hover:underline">
                      Política de Cookies
                    </Link>
                    ,{' '}
                    <Link to="/privacidade" className="text-visity-primary hover:underline">
                      Política de Privacidade
                    </Link>{' '}
                    e{' '}
                    <Link to="/termos" className="text-visity-primary hover:underline">
                      Termos de Uso
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4 ml-0">
                <button
                  onClick={handleMinimize}
                  className="p-2 text-visity-gray dark:text-gray-400 hover:text-visity-dark dark:hover:text-white transition-colors"
                  aria-label="Fechar"
                  style={{ marginRight: 2 }}
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDecline}
                  className="px-4 py-2 text-sm text-visity-gray dark:text-gray-400 hover:text-visity-dark dark:hover:text-white transition-colors"
                >
                  Recusar
                </button>
                <button
                  onClick={handleAccept}
                  className="flex items-center gap-2 px-4 py-2 bg-visity-primary text-white text-sm font-medium rounded-lg hover:bg-visity-secondary transition-colors"
                >
                  <Check className="w-4 h-4" />
                  Aceitar todos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
