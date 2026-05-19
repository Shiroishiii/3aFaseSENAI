import { test, expect } from '@playwright/test'

test('buscar usuarios e renderizar lista', async ({ page }) => {

    await page.goto('http://localhost:5173')

    await page.fill('#username', 'admin')
    await page.fill('#password', 'admin')

    await page.click('.login-button')

    const responsePromise = page.waitForResponse(
        'http://localhost:3000/usuarios'
    )

    await page.click('text=Buscar usuários')

    const response = await responsePromise

    const data = await response.json()

    expect(Array.isArray(data)).toBeTruthy()

    expect(data[0]).toHaveProperty('id')
    expect(data[0]).toHaveProperty('nome')

    await expect(
        page.getByText('1 - Isaac')
    ).toBeVisible()

})