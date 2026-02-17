import { test, expect } from '@playwright/test';

test.describe('Página de Cadastro', () => {
  test('Deve exibir campos de e-mail e senha e botões sociais', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await expect(page.getByLabel('E-mail')).toBeVisible();
    await expect(page.getByLabel('Senha')).toBeVisible();
    await expect(page.getByRole('button', { name: /Google/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Microsoft/i })).toBeVisible();
    await expect(page.getByRole('button', { name: /Apple/i })).toBeVisible();
  });

  test('Validação de senha fraca', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await page.getByLabel('E-mail').fill('teste@exemplo.com');
    await page.getByLabel('Senha').fill('123');
    await expect(page.getByText(/Senha muito fraca|fraca/i)).toBeVisible();
  });

  test('Acessibilidade: navegação por tab', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    await page.keyboard.press('Tab');
    // Foco deve estar no campo de e-mail
    const email = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
    expect(email?.toLowerCase()).toContain('e-mail');
  });
});