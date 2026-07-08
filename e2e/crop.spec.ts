import path from "node:path";
import { expect, test } from "@playwright/test";

test("crop flow: pick a photo, choose a preset ratio, download the result", async ({ page }) => {
  await page.goto("/crop");

  await page
    .locator('input[type="file"]')
    .setInputFiles(path.join(__dirname, "fixtures/sample.png"));

  const originalOption = page.getByRole("button", { name: "Original" });
  await expect(originalOption).toBeVisible();
  await expect(originalOption).toHaveAttribute("aria-pressed", "true");

  const downloadButton = page.getByRole("button", { name: "Download" });
  await expect(downloadButton).toBeEnabled({ timeout: 5000 });

  const squareOption = page.getByRole("button", { name: /^Square/ });
  await squareOption.click();
  await expect(squareOption).toHaveAttribute("aria-pressed", "true");

  const downloadPromise = page.waitForEvent("download");
  await downloadButton.click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toContain("cropped");
});
