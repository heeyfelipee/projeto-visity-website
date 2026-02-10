import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Cookie, X, Check } from 'lucide-react';

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('visity-cookies-accepted');
    if (!hasAccepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('visity-cookies-accepted', 'true');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('visity-cookies-accepted', 'false');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-visity-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Cookie className="w-5 h-5 text-visity-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-visity-dark dark:text-white mb-1">
                Utilizamos cookies
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
          <div className="flex items-center gap-3">
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
            <button
              onClick={handleAccept}
              className="p-2 text-visity-gray dark:text-gray-400 hover:text-visity-dark dark:hover:text-white transition-colors"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
