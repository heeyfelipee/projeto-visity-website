import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useLanguage } from '@/context/LanguageContext';
import { ArrowLeft, Building2, User, Mail, Phone, MapPin, Check } from 'lucide-react';

export default function Register() {
  // const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    responsibleName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    employeesCount: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else {
      setSubmitted(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-visity-primary to-visity-secondary flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">
            Cadastro realizado com sucesso!
          </h2>
          <p className="text-visity-gray dark:text-gray-400 mb-6">
            Em breve nossa equipe entrará em contato para ativar sua conta.
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
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-visity-dark dark:text-white mb-2">
              Comece seu teste gratuito
            </h1>
            <p className="text-visity-gray dark:text-gray-400">
              Preencha os dados da sua empresa para começar
            </p>
          </div>

          {/* Progress */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= 1 ? 'bg-visity-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              1
            </div>
            <div className={`w-16 h-1 rounded ${step >= 2 ? 'bg-visity-primary' : 'bg-gray-200 dark:bg-gray-700'}`} />
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
              step >= 2 ? 'bg-visity-primary text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              2
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Nome da Empresa
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="Ex: Empresa XYZ"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    CNPJ
                  </label>
                  <input
                    type="text"
                    name="cnpj"
                    value={formData.cnpj}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nome do Responsável
                  </label>
                  <input
                    type="text"
                    name="responsibleName"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="Nome completo"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                      placeholder="email@empresa.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full btn-primary py-4">
                  Continuar
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="Rua, número, bairro"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                      placeholder="Cidade"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      Estado
                    </label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    >
                      <option value="">Selecione</option>
                      <option value="SP">São Paulo</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="PR">Paraná</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="BA">Bahia</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="OUTRO">Outro</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    CEP
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                    placeholder="00000-000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                    Quantidade de funcionários
                  </label>
                  <select
                    name="employeesCount"
                    value={formData.employeesCount}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all"
                  >
                    <option value="">Selecione</option>
                    <option value="1-5">1 a 5</option>
                    <option value="6-20">6 a 20</option>
                    <option value="21-50">21 a 50</option>
                    <option value="51-100">51 a 100</option>
                    <option value="100+">Mais de 100</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 px-6 rounded-full border-2 border-gray-300 dark:border-gray-700 text-visity-dark dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    Voltar
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-4">
                    Finalizar Cadastro
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
