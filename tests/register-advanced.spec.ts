import { test, expect } from '@playwright/test';

test.setTimeout(60000); // 60 segundos para cada teste

test.describe('Cadastro - Testes Avançados', () => {
  test('Cadastro com e-mail inválido', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await page.getByLabel('E-mail').fill('email-invalido');
    await page.getByLabel('Senha').fill('Senha123!');
    await page.getByRole('button', { name: /Criar conta/i }).click();
    await expect(page.getByText(/e-mail inválido|email inválido/i)).toBeVisible();
  });

  test('Cadastro com senha fraca', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await page.getByLabel('E-mail').fill('teste@exemplo.com');
    await page.getByLabel('Senha').fill('123');
    await page.getByRole('button', { name: /Criar conta/i }).click();
    await expect(page.getByText(/senha muito fraca|fraca/i)).toBeVisible();
  });

  test('Tentativa de SQL Injection', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await page.getByLabel('E-mail').fill("' OR 1=1; --");
    await page.getByLabel('Senha').fill('Senha123!');
    await page.getByRole('button', { name: /Criar conta/i }).click();
    await expect(page.getByText(/e-mail inválido|email inválido|erro/i)).toBeVisible();
  });

  test('Tentativa de XSS', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await page.getByLabel('E-mail').fill('<script>alert(1)</script>');
    await page.getByLabel('Senha').fill('Senha123!');
    await page.getByRole('button', { name: /Criar conta/i }).click();
    await expect(page.getByText(/e-mail inválido|email inválido|erro/i)).toBeVisible();
  });

  test('Brute force: múltiplas tentativas rápidas', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    for (let i = 0; i < 5; i++) {
      await page.getByLabel('E-mail').fill(`user${i}@exemplo.com`);
      await page.getByLabel('Senha').fill('Senha123!');
      await page.getByRole('button', { name: /Criar conta/i }).click();
      await page.waitForTimeout(500);
    }
    await expect(page.getByText(/limite|bloqueado|erro/i)).toBeVisible();
  });

  test('Cadastro social Google', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    const googleBtn = page.getByRole('button', { name: /Google/i });
    await expect(googleBtn).toBeVisible();
    // Não simula login real, mas valida presença e acessibilidade
    await googleBtn.focus();
    await expect(googleBtn).toHaveAttribute('aria-label', 'Entrar com Google');
  });

  test('Feedback UX: loader e toast', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await page.getByLabel('E-mail').fill('teste@exemplo.com');
    await page.getByLabel('Senha').fill('Senha123!');
    await page.getByRole('button', { name: /Criar conta/i }).click();
    await expect(page.locator('.loader')).toBeVisible();
    await expect(page.getByRole('alert')).toBeVisible();
  });
});
