import { useState } from 'react';
import { isEmail, isCNPJ, isCEP } from '../lib/validator';
import cidades from '../lib/cidades-brasil.json';
function maskCNPJ(value: string) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .slice(0, 18);
}

function AutocompleteCidade({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [input, setInput] = useState(value || '');
  const [show, setShow] = useState(false);
  // cidades é um array de objetos, cada um tem .nome
  const filtered = input.length < 2 ? [] : cidades.filter((c: any) => c.nome.toLowerCase().includes(input.toLowerCase()));
  return (
    <div className="relative">
      <input
        type="text"
        value={input}


        import { useState, useRef, useEffect } from 'react';
        // Apple Sign-In SDK loader
        function useAppleSignIn(onSuccess: (idToken: string) => void) {
          useEffect(() => {
            if (document.getElementById('appleid-signin')) return;
            const script = document.createElement('script');
            script.src = 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js';
            script.id = 'appleid-signin';
            script.async = true;
            script.onload = () => {
              if (window.AppleID) {
                window.AppleID.auth.init({
                  clientId: 'SEU_CLIENT_ID_APPLE', // Substitua pelo seu client_id Apple
                  scope: 'name email',
                  redirectURI: 'http://localhost:4000/auth/apple',
                  usePopup: true,
                });
              }
            };
            document.body.appendChild(script);
            window.handleAppleSignIn = (response) => {
              if (response?.authorization?.id_token) {
                onSuccess(response.authorization.id_token);
              }
            };
            return () => {
              document.body.removeChild(script);
            };
          }, [onSuccess]);
        }
          // Apple Sign-In integração
          const appleFormRef = useRef<HTMLFormElement>(null);
          useAppleSignIn((idToken: string) => {
            if (appleFormRef.current) {
              (appleFormRef.current.querySelector('#apple_id_token') as HTMLInputElement).value = idToken;
              appleFormRef.current.submit();
            }
          });
        import { Link, useNavigate } from 'react-router-dom';
        import { ArrowLeft, Check } from 'lucide-react';

        function getPasswordStrength(password: string) {
          if (!password) return 0;
          let score = 0;
          if (password.length >= 8) score++;
          if (/[A-Z]/.test(password)) score++;
          if (/[0-9]/.test(password)) score++;
          if (/[^A-Za-z0-9]/.test(password)) score++;
          return score;
        }

        function Toast({ message, type, onClose }: { message: string; type: 'success' | 'error'; onClose: () => void }) {
          return (
            <div className={`fixed top-6 left-1/2 z-50 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg text-white font-semibold transition-all animate-fade-in ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}
              role="alert">
              {message}
              <button className="ml-4 text-white/80 hover:text-white" onClick={onClose}>&times;</button>
            </div>
          );
        }

        export default function Register() {
          const navigate = useNavigate();
          const [form, setForm] = useState({ email: '', password: '' });
          const [error, setError] = useState<string | null>(null);
          const [loading, setLoading] = useState(false);
          const [submitted, setSubmitted] = useState(false);
          const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
          const emailRef = useRef<HTMLInputElement>(null);
          const passwordRef = useRef<HTMLInputElement>(null);

          const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setForm({ ...form, [e.target.name]: e.target.value });
            setError(null);
          };

          const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            setError(null);
            // Validação instantânea frontend
            if (!form.email || !form.password) {
              setError('Preencha e-mail e senha.');
              setToast({ message: 'Preencha e-mail e senha.', type: 'error' });
              if (!form.email && emailRef.current) emailRef.current.focus();
              else if (!form.password && passwordRef.current) passwordRef.current.focus();
              return;
            }
            if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)) {
              setError('E-mail inválido.');
              setToast({ message: 'E-mail inválido.', type: 'error' });
              emailRef.current?.focus();
              return;
            }
            if (form.password.length < 8 || !/[A-Z]/.test(form.password) || !/[0-9]/.test(form.password) || !/[^A-Za-z0-9]/.test(form.password)) {
              setError('Senha muito fraca. Use 8+ caracteres, maiúscula, número e símbolo.');
              setToast({ message: 'Senha muito fraca. Use 8+ caracteres, maiúscula, número e símbolo.', type: 'error' });
              passwordRef.current?.focus();
              return;
            }
            setLoading(true);
            // Garantir loader visível antes do fetch
            setTimeout(async () => {
              try {
                const res = await fetch('http://localhost:4000/api/cadastro', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(form)
                });
                if (!res.ok) {
                  const data = await res.json();
                  setError(data.error || 'Erro ao cadastrar.');
                  setToast({ message: data.error || 'Erro ao cadastrar.', type: 'error' });
                  setLoading(false);
                  if (data.error?.toLowerCase().includes('e-mail')) emailRef.current?.focus();
                  else if (data.error?.toLowerCase().includes('senha')) passwordRef.current?.focus();
                  return;
                }
                setSubmitted(true);
                setToast({ message: 'Cadastro realizado com sucesso!', type: 'success' });
                setTimeout(() => navigate('/dashboard'), 2000);
              } catch (err) {
                setError('Erro ao conectar ao servidor.');
                setToast({ message: 'Erro ao conectar ao servidor.', type: 'error' });
                setLoading(false);
              }
            }, 100); // Pequeno delay para garantir loader
          };

          // Limpar toast após 3s
          // Garante que múltiplos toasts não se sobreponham
          useEffect(() => {
            if (toast) {
              const t = setTimeout(() => setToast(null), 3000);
              return () => clearTimeout(t);
            }
          }, [toast]);

          if (submitted) {
            return (
              <div className="min-h-screen bg-gradient-to-br from-visity-primary to-visity-secondary flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-md w-full text-center">
                  <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Check className="w-10 h-10 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-visity-dark dark:text-white mb-4">
                    Cadastro realizado!
                  </h2>
                  <p className="text-visity-gray dark:text-gray-400 mb-6">
                    Bem-vindo à Visity! Aproveite seu teste grátis de 7 dias.<br />Redirecionando para o dashboard...
                  </p>
                </div>
              </div>
            );
          }

          const passwordStrength = getPasswordStrength(form.password);

          return (
            <div className="min-h-screen bg-gradient-to-br from-visity-primary to-visity-secondary flex items-center justify-center p-2 sm:p-4">
              {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-4 sm:p-8 max-w-md w-full">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center gap-2 text-visity-gray dark:text-gray-400 hover:text-visity-primary transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                    Voltar
                  </Link>
                  <span className="text-xl font-bold text-visity-dark dark:text-white">Visity</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-visity-dark dark:text-white mb-2 text-center">Crie sua conta grátis</h1>
                <p className="text-visity-gray dark:text-gray-400 text-center mb-6 sm:mb-8 text-sm sm:text-base">Acesse agora e ganhe 7 dias grátis para testar todos os recursos!</p>


                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-left text-sm sm:text-base">
                    <label htmlFor="register-email" className="block text-sm font-medium text-visity-dark dark:text-white mb-1">E-mail</label>
                    <input
                      id="register-email"
                      ref={emailRef}
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${error?.toLowerCase().includes('e-mail') ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-4 focus:ring-visity-primary/40 focus:border-visity-primary focus:shadow-lg focus:scale-[1.03] transition-all duration-200 ease-in-out hover:shadow-xl`}
                      placeholder="E-mail"
                      autoComplete="email"
                      aria-label="E-mail"
                    />
                  </div>
                  <div className="text-left text-sm sm:text-base">
                    <label htmlFor="register-password" className="block text-sm font-medium text-visity-dark dark:text-white mb-1">Senha</label>
                    <input
                      id="register-password"
                      ref={passwordRef}
                      type="password"
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 rounded-xl border ${error?.toLowerCase().includes('senha') ? 'border-red-500 animate-shake' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-4 focus:ring-visity-primary/40 focus:border-visity-primary focus:shadow-lg focus:scale-[1.03] transition-all duration-200 ease-in-out hover:shadow-xl`}
                      placeholder="Senha"
                      autoComplete="new-password"
                      aria-label="Senha"
                    />
                    {form.password && (
                      <div className="mt-2 flex items-center gap-2">
                        <div className={`h-2 w-24 rounded-full ${passwordStrength === 0 ? 'bg-gray-200' : passwordStrength === 1 ? 'bg-red-400' : passwordStrength === 2 ? 'bg-yellow-400' : passwordStrength === 3 ? 'bg-blue-400' : 'bg-green-500'}`}></div>
                        <span className="text-xs text-gray-400">
                          {passwordStrength === 0 ? '' : passwordStrength === 1 ? 'Fraca' : passwordStrength === 2 ? 'Média' : passwordStrength === 3 ? 'Boa' : 'Forte'}
                        </span>
                      </div>
                    )}
                  </div>
                  <button type="submit" className="w-full btn-primary py-3 sm:py-4 flex items-center justify-center gap-2 transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-95 focus:ring-4 focus:ring-visity-primary/40 text-base sm:text-lg" disabled={loading}>
                    {loading && <span className="loader border-white border-2" />}
                    {loading ? 'Cadastrando...' : 'Criar conta grátis'}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-2">
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                  <span className="text-xs text-gray-400">ou cadastre-se com</span>
                  <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
                </div>
                <div className="flex flex-col gap-3">
                  <a
                    href="http://localhost:4000/auth/google"
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold text-visity-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-visity-primary"
                    tabIndex={0}
                    aria-label="Entrar com Google"
                    role="button"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="w-5 h-5" />
                    Google
                  </a>
                  <a
                    href="http://localhost:4000/auth/microsoft"
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold text-visity-dark dark:text-white focus:outline-none focus:ring-2 focus:ring-visity-primary"
                    tabIndex={0}
                    aria-label="Entrar com Microsoft"
                    role="button"
                  >
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg" alt="Microsoft" className="w-5 h-5" />
                    Microsoft
                  </a>
                  <form
                    ref={appleFormRef}
                    action="http://localhost:4000/auth/apple"
                    method="POST"
                    className="w-full"
                    tabIndex={0}
                    aria-label="Entrar com Apple"
                  >
                    <input type="hidden" name="id_token" id="apple_id_token" />
                    <button
                      type="button"
                      className="w-full flex items-center justify-center gap-3 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all font-semibold text-visity-dark dark:text-white focus:outline-none focus:ring-4 focus:ring-visity-primary/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 ease-in-out"
                      aria-label="Entrar com Apple"
                      onClick={() => window.AppleID?.auth?.signIn()}
                    >
                      <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg" alt="Apple" className="w-5 h-5" />
                      Apple
                    </button>
                  </form>
                </div>
                <p className="text-xs text-gray-400 text-center mt-8">Ao criar sua conta, você concorda com nossos <Link to="/terms" className="underline">Termos de Uso</Link> e <Link to="/privacy" className="underline">Política de Privacidade</Link>.</p>
              </div>
            </div>
          );
        }

        // Loader e animação CSS
        // Adicione no seu CSS global:
        // .loader { border-radius: 9999px; border-top: 2px solid #3b82f6; width: 1.25rem; height: 1.25rem; animation: spin 1s linear infinite; }
        // @keyframes spin { to { transform: rotate(360deg); } }
        // .animate-shake { animation: shake 0.3s; }
        // @keyframes shake { 10%, 90% { transform: translateX(-2px); } 20%, 80% { transform: translateX(4px); } 30%, 50%, 70% { transform: translateX(-8px); } 40%, 60% { transform: translateX(8px); } }
                  <div>
                    <label className="block text-sm font-medium text-visity-dark dark:text-white mb-2">
                      Estado
                    </label>
                    <AutocompleteEstado
                      value={formData.state}
                      onChange={value => {
                        setFormData({ ...formData, state: value });
                        setFieldErrors({ ...fieldErrors, state: '' });
                      }}
                    />
                    {fieldErrors.state && <div className="text-red-500 text-xs mt-1">{fieldErrors.state}</div>}
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
                    className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.zipCode ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all`}
                    placeholder="00000-000"
                  />
                  {fieldErrors.zipCode && <div className="text-red-500 text-xs mt-1">{fieldErrors.zipCode}</div>}
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
                    className={`w-full px-4 py-3 rounded-xl border ${fieldErrors.employeesCount ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} bg-white dark:bg-gray-800 text-visity-dark dark:text-white focus:ring-2 focus:ring-visity-primary focus:border-transparent transition-all`}
                  >
                    <option value="">Selecione</option>
                    <option value="1-5">1 a 5</option>
                    <option value="6-20">6 a 20</option>
                    <option value="21-50">21 a 50</option>
                    <option value="51-100">51 a 100</option>
                    <option value="100+">Mais de 100</option>
                  </select>
                  {fieldErrors.employeesCount && <div className="text-red-500 text-xs mt-1">{fieldErrors.employeesCount}</div>}
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-4 px-6 rounded-full border-2 border-gray-300 dark:border-gray-700 text-visity-dark dark:text-white font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
                  >
                    Voltar
                  </button>
                  <button type="submit" className="flex-1 btn-primary py-4" disabled={loading}>
                    {loading ? 'Enviando...' : 'Finalizar Cadastro'}
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
