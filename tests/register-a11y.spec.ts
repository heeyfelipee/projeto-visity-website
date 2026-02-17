import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Acessibilidade - Cadastro', () => {
  test('Página de cadastro deve ser acessível', async ({ page }) => {
    await page.goto('http://localhost:5175/register');
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
