const nodemailer = require('nodemailer');

// Configuração do transporte de e-mail (exemplo com Gmail, use variáveis de ambiente em produção)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'seuemailteste@gmail.com',
    pass: process.env.EMAIL_PASS || 'senha-app-teste'
  }
});

/**
 * Endpoint para recuperação de senha
 * Espera { email }
 */
module.exports = async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método não permitido' });
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'E-mail obrigatório' });

  // Aqui você pode validar se o e-mail existe no banco de dados
  // Simulação: aceita qualquer e-mail

  // Gera um token de recuperação (simulado)
  const token = Math.random().toString(36).substr(2);
  const resetLink = `https://visity.com.br/resetar-senha?token=${token}`;

  try {
    await transporter.sendMail({
      from: 'Visity <no-reply@visity.com.br>',
      to: email,
      subject: 'Recuperação de senha - Visity',
      html: `<p>Olá!<br>Recebemos uma solicitação para redefinir sua senha.<br>
      <a href="${resetLink}">Clique aqui para redefinir sua senha</a>.<br><br>
      Se não foi você, ignore este e-mail.</p>`
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    return res.status(500).json({ error: 'Erro ao enviar e-mail de recuperação.' });
  }
};
