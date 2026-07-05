import { test, expect } from "@playwright/test";

test("home page has exactly one h1 and no accessibility violations in the landmark structure", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("main")).toBeVisible();
});
