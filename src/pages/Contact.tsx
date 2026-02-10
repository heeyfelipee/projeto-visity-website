import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-hero flex items-center justify-center">
                <svg viewBox="0 0 48 48" className="w-6 h-6">
                  <path d="M24 4C16.268 4 10 10.268 10 18C10 28 24 44 24 44C24 44 38 28 38 18C38 10.268 31.732 4 24 4Z" fill="white"/>
                  <circle cx="24" cy="18" r="8" fill="#0D47A1"/>
                  <path d="M20 18L23 21L29 15" stroke="#4CAF50" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-visity-dark dark:text-white">Visity</span>
            </Link>
            <Link to="/" className="flex items-center gap-2 text-visity-gray dark:text-gray-400 hover:text-visity-primary transition-colors">
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-visity-primary to-visity-secondary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Contato</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Entre em contato conosco.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-visity-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-7 h-7 text-visity-primary" />
            </div>
            <h3 className="font-semibold text-visity-dark dark:text-white mb-2">E-mail</h3>
            <p className="text-visity-gray dark:text-gray-400">contato@visity.com.br</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-visity-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Phone className="w-7 h-7 text-visity-primary" />
            </div>
            <h3 className="font-semibold text-visity-dark dark:text-white mb-2">Telefone</h3>
            <p className="text-visity-gray dark:text-gray-400">(11) 4000-1234</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 bg-visity-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-7 h-7 text-visity-primary" />
            </div>
            <h3 className="font-semibold text-visity-dark dark:text-white mb-2">Endereço</h3>
            <p className="text-visity-gray dark:text-gray-400">São Paulo, SP - Brasil</p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-6 text-center">
              Envie uma mensagem
            </h2>
            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-visity-dark dark:text-white mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-visity-gray dark:text-gray-400">
                  Responderemos em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    Nome
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    Empresa
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="Nome da empresa"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    Mensagem
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all resize-none"
                    placeholder="Como podemos ajudar?"
                  />
                </div>
                <button type="submit" className="w-full btn-primary py-4 flex items-center justify-center gap-2">
                  <Send className="w-5 h-5" />
                  Enviar mensagem
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
