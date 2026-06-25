import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/ZhongYue|Steel|中粤/i);
});