"""Run with python3 src/test/mobile-ux.browser.py against the running preview."""
import asyncio
from playwright.async_api import async_playwright


async def main():
    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)
        for width, height in [(320, 640), (390, 844), (430, 932), (767, 900)]:
            page = await browser.new_page(viewport={"width": width, "height": height})
            await page.goto("http://localhost:8080", wait_until="networkidle")
            # Every visible actionable control must provide the requested 48px height.
            targets = await page.locator("main a, main button, main summary").evaluate_all(
                "els => els.filter(e => e.getClientRects().length).map(e => e.getBoundingClientRect().height)"
            )
            assert targets and min(targets) >= 48, (width, targets)
            for scroll in [0, 1500, 5000]:
                await page.evaluate("y => scrollTo(0, y)", scroll)
                rect = await page.locator(".mobile-contact a").bounding_box()
                assert rect and 0 <= rect["y"] < height
                assert rect["y"] + rect["height"] <= height
            await page.close()
        await browser.close()
    print("Mobile touch-target and always-visible contact rules passed at four widths.")


asyncio.run(main())