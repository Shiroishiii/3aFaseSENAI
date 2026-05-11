import { test, expect } from '@playwright/test'

test.describe('Testar tela de login', () => {

    // beforeEach roda antes de cada teste
    test.beforeEach(async ({ page }) => {
        await page.goto("/")
    })

    test("testar o login do usuário com sucesso", async ({ page }) => {
        // configurar o play para prencher os campos
        await page.fill('#username', 'admin')
        await page.fill('#password', 'admin')

        await page.click('button[type=submit]')

        // verificar se transicionou (aceitou login)
        await expect(page.locator('#welcome-title')).toContainText('Bem-vindo, Admin!')
    })

    test("testar com credenciais errada", async ({ page }) => {
        // configurar o play para prencher os campos
        await page.fill('#username', 'admin')
        await page.fill('#password', 'senhaerrada')

        await page.click('button[type=submit]')

        // verificar se a mensagem de erro é exibida
        await expect(page.locator('.error-message')).toContainText('Usuário ou senha inválidos')
    })


    test("testar o fluxo completo com sair e garantir que após sair ele esteja renderizado o login", async ({ page }) => {
        // configurar o play para prencher os campos
        await page.fill('#username', 'admin')
        await page.fill('#password', 'admin')

        await page.click('button[type=submit]')

        // verificar se transicionou (aceitou login)
        await expect(page.locator('#welcome-title')).toContainText('Bem-vindo, Admin!')

        // clicar no botão de sair
        await page.click('button.logout-link')

        // verificar se o login está visível novamente
        await expect(page.locator('#login-container')).toBeVisible()
    })
}
)