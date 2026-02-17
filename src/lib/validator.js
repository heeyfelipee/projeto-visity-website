// Validações utilitárias para o frontend
export function isEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
export function isCNPJ(cnpj) {
  cnpj = cnpj.replace(/\D/g, '');
  if (cnpj.length !== 14) return false;
  // Validação básica de formato
  return true;
}
export function isCEP(cep) {
  return /^\d{5}-?\d{3}$/.test(cep);
}
