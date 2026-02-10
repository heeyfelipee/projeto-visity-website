import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CreditCard, QrCode, Check, Copy, Clock } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const pixCode = '00020126580014BR.GOV.BCB.PIX0136123456789012345678901234567890520400005303986540520.005802BR5925Visity Tecnologia Ltda6009SAO PAULO62140510VISITY20256304';

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-visity-primary to-visity-secondary flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">
            Pagamento confirmado!
          </h2>
          <p className="text-visity-gray dark:text-gray-400 mb-6">
            Sua assinatura foi ativada com sucesso. Enviamos os detalhes por e-mail.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Voltar para o início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-5 gap-8">
          {/* Left - Order Summary */}
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-visity-dark dark:text-white mb-4">
                Resumo do pedido
              </h2>
              <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-visity-gray dark:text-gray-400">Plano</span>
                  <span className="font-medium text-visity-dark dark:text-white">Profissional</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-visity-gray dark:text-gray-400">Usuários</span>
                  <span className="font-medium text-visity-dark dark:text-white">Ilimitados</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-visity-gray dark:text-gray-400">Período</span>
                  <span className="font-medium text-visity-dark dark:text-white">Mensal</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-visity-dark dark:text-white">Total</span>
                <span className="text-2xl font-bold text-visity-primary">R$ 59,90<span className="text-sm font-normal text-visity-gray dark:text-gray-400">/mês</span></span>
              </div>
            </div>
          </div>

          {/* Right - Payment Form */}
          <div className="md:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6">
              <h1 className="text-2xl font-bold text-visity-dark dark:text-white mb-6">
                Escolha a forma de pagamento
              </h1>

              {/* Payment Method Tabs */}
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setPaymentMethod('pix')}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'pix'
                      ? 'border-visity-primary bg-visity-primary/5 dark:bg-visity-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <QrCode className={`w-6 h-6 ${paymentMethod === 'pix' ? 'text-visity-primary' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <div className={`font-semibold ${paymentMethod === 'pix' ? 'text-visity-primary' : 'text-visity-dark dark:text-white'}`}>
                      PIX
                    </div>
                    <div className="text-xs text-green-500">Pagamento Instantâneo</div>
                  </div>
                </button>
                <button
                  onClick={() => setPaymentMethod('card')}
                  className={`flex-1 flex items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-visity-primary bg-visity-primary/5 dark:bg-visity-primary/10'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                  }`}
                >
                  <CreditCard className={`w-6 h-6 ${paymentMethod === 'card' ? 'text-visity-primary' : 'text-gray-400'}`} />
                  <div className="text-left">
                    <div className={`font-semibold ${paymentMethod === 'card' ? 'text-visity-primary' : 'text-visity-dark dark:text-white'}`}>
                      Cartão
                    </div>
                    <div className="text-xs text-gray-400">Crédito ou Débito</div>
                  </div>
                </button>
              </div>

              {/* PIX Payment */}
              {paymentMethod === 'pix' && (
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center">
                    <div className="w-48 h-48 bg-white mx-auto mb-4 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="w-32 h-32 text-visity-dark mx-auto" />
                      </div>
                    </div>
                    <p className="text-sm text-visity-gray dark:text-gray-400 mb-4">
                      Escaneie o QR Code com seu aplicativo bancário
                    </p>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                      <code className="flex-1 text-xs text-gray-500 truncate">{pixCode.substring(0, 40)}...</code>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-1 px-3 py-1.5 bg-visity-primary text-white text-sm rounded-lg hover:bg-visity-secondary transition-colors"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        {copied ? 'Copiado' : 'Copiar'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-visity-gray dark:text-gray-400">
                    <Clock className="w-4 h-4" />
                    O QR Code expira em 30 minutos
                  </div>

                  <button onClick={handleSubmit} className="w-full btn-primary py-4">
                    Já realizei o pagamento
                  </button>
                </div>
              )}

              {/* Card Payment */}
              {paymentMethod === 'card' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      Número do cartão
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="0000 0000 0000 0000"
                        className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                      />
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      Nome no cartão
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nome como está no cartão"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                        Validade
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="MM/AA"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="123"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      Parcelas
                    </label>
                    <select className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all">
                      <option value="1">1x de R$ 59,90 (à vista)</option>
                      <option value="2">2x de R$ 29,95</option>
                      <option value="3">3x de R$ 19,97</option>
                      <option value="6">6x de R$ 9,98</option>
                      <option value="12">12x de R$ 4,99</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full btn-primary py-4">
                    Pagar R$ 59,90
                  </button>

                  <p className="text-xs text-center text-visity-gray dark:text-gray-400">
                    Pagamento processado de forma segura. Seus dados estão protegidos.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
