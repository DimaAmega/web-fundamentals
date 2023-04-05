// @ts-check
const { test, expect } = require('@playwright/test')

test('the header of the first level should contain the line "Hello, World!"', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('h1')).toHaveText('Hello, World!')
})

test('pixel match', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveScreenshot('pixel-match-1.png', { maxDiffPixels: 100 })
})
