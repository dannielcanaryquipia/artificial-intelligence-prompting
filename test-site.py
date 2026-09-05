from playwright.sync_api import sync_playwright
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "test-screenshots")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def screenshot(page, name):
    path = os.path.join(OUTPUT_DIR, f"{name}.png")
    page.screenshot(path=path, full_page=True)
    print(f"  [screenshot] {name}.png")

def test_site():
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 800})
        page = context.new_page()

        # Capture console errors
        errors = []
        page.on("console", lambda msg: errors.append(msg.text) if msg.type == "error" else None)

        print("\n=== 1. HOME PAGE ===")
        page.goto("http://localhost:5174")
        page.wait_for_load_state("networkidle")
        assert "Prompting 101" in page.title() or "prompting" in page.url().lower(), "Home page did not load"
        screenshot(page, "01-home-light")
        print(f"  Title: {page.title()}")
        print(f"  URL: {page.url}")

        # Check nav links exist
        nav_links = page.locator("nav a").all()
        print(f"  Nav links found: {len(nav_links)}")
        for link in nav_links:
            text = link.inner_text().strip()
            if text:
                print(f"    - {text}")

        print("\n=== 2. NAVIGATION TEST ===")
        routes = [
            ("/lesson", "02-lesson-light"),
            ("/case-studies", "03-case-studies-light"),
            ("/activity", "04-activity-light"),
            ("/about", "05-about-light"),
            ("/resources", "06-resources-light"),
        ]
        for route, screenshot_name in routes:
            page.goto(f"http://localhost:5174{route}")
            page.wait_for_load_state("networkidle")
            screenshot(page, screenshot_name)
            h1 = page.locator("h1").first
            if h1.is_visible():
                print(f"  {route} -> h1: {h1.inner_text()}")
            else:
                print(f"  {route} -> NO h1 FOUND")

        print("\n=== 3. DARK MODE TOGGLE ===")
        page.goto("http://localhost:5174")
        page.wait_for_load_state("networkidle")

        # Find the theme toggle button
        theme_btn = page.locator("button").filter(has=page.locator("svg")).last
        # Try clicking the theme toggle
        theme_buttons = page.locator("header button").all()
        print(f"  Header buttons found: {len(theme_buttons)}")

        # Click the last button in header (theme toggle)
        if len(theme_buttons) >= 2:
            theme_buttons[-1].click()
            page.wait_for_timeout(300)
            screenshot(page, "07-theme-dropdown")

            # Look for Dark option in dropdown
            dark_option = page.get_by_text("Dark", exact=True)
            if dark_option.is_visible():
                dark_option.click()
                page.wait_for_timeout(500)
                screenshot(page, "08-home-dark")
                print("  Dark mode activated")

                # Check if html has .dark class
                has_dark = page.evaluate("document.documentElement.classList.contains('dark')")
                print(f"  .dark class on <html>: {has_dark}")

                # Navigate to other pages in dark mode
                for route, _ in routes[:3]:
                    page.goto(f"http://localhost:5174{route}")
                    page.wait_for_load_state("networkidle")
                    name = route.strip("/").replace("-", "-") + "-dark"
                    screenshot(page, f"09-{name}")
                    print(f"  {route} dark mode rendered")
            else:
                print("  Dark option not found in dropdown")
                # Try System option
                system_option = page.get_by_text("System", exact=True)
                if system_option.is_visible():
                    print("  System option found instead")

        print("\n=== 4. ACTIVITY CHIPS INTERACTION ===")
        page.goto("http://localhost:5174/activity")
        page.wait_for_load_state("networkidle")

        # Reset to light mode for this test
        has_dark = page.evaluate("document.documentElement.classList.contains('dark')")
        if has_dark:
            theme_buttons = page.locator("header button").all()
            if len(theme_buttons) >= 2:
                theme_buttons[-1].click()
                page.wait_for_timeout(300)
                light_option = page.get_by_text("Light", exact=True)
                if light_option.is_visible():
                    light_option.click()
                    page.wait_for_timeout(300)

        screenshot(page, "10-activity-initial")

        # Click all 4 chips
        chips = page.locator("button[aria-pressed]").all()
        print(f"  Activity chips found: {len(chips)}")
        for i, chip in enumerate(chips):
            chip.click()
            page.wait_for_timeout(200)
            print(f"  Clicked chip {i+1}: {chip.inner_text()}")

        screenshot(page, "11-activity-all-selected")

        # Look for "See the improved version" button
        see_fix_btn = page.get_by_text("See the improved version")
        if see_fix_btn.is_visible():
            see_fix_btn.click()
            page.wait_for_timeout(500)
            screenshot(page, "12-activity-improved-revealed")
            print("  Improved prompt revealed")
        else:
            print("  'See the improved version' button not visible")

        print("\n=== 5. PROMPT COMPARISON (Lesson page) ===")
        page.goto("http://localhost:5174/lesson")
        page.wait_for_load_state("networkidle")
        screenshot(page, "13-lesson-initial")

        # Find Weak Prompt / Improved Prompt toggle buttons
        weak_btn = page.get_by_text("Weak Prompt", exact=False).first
        improved_btn = page.get_by_text("Improved Prompt", exact=False).first

        if weak_btn.is_visible() and improved_btn.is_visible():
            print("  Toggle buttons found")
            improved_btn.click()
            page.wait_for_timeout(600)
            screenshot(page, "14-lesson-improved")
            print("  Switched to improved prompt")

            weak_btn.click()
            page.wait_for_timeout(600)
            screenshot(page, "15-lesson-weak")
            print("  Switched back to weak prompt")
        else:
            print("  Toggle buttons not found")

        print("\n=== 6. FRAMEWORK TIMELINE INTERACTION ===")
        # Click on framework steps
        framework_btns = page.locator("button[aria-expanded]").all()
        print(f"  Framework step buttons: {len(framework_btns)}")
        for i, btn in enumerate(framework_btns):
            btn.click()
            page.wait_for_timeout(300)
            screenshot(page, f"16-lesson-step-{i+1}")
            print(f"  Expanded step {i+1}")
            btn.click()  # collapse
            page.wait_for_timeout(200)

        print("\n=== 7. MOBILE VIEWPORT ===")
        context_mobile = browser.new_context(viewport={"width": 375, "height": 812})
        page_mobile = context_mobile.new_page()

        page_mobile.goto("http://localhost:5174")
        page_mobile.wait_for_load_state("networkidle")
        screenshot(page_mobile, "17-mobile-home")

        # Find hamburger menu
        hamburger = page_mobile.locator("header button").last
        if hamburger.is_visible():
            hamburger.click()
            page_mobile.wait_for_timeout(400)
            screenshot(page_mobile, "18-mobile-nav-open")
            print("  Mobile nav opened")

            # Click a nav link in mobile
            mobile_links = page_mobile.locator("[role='dialog'] a").all()
            for link in mobile_links:
                text = link.inner_text().strip()
                if "Lesson" in text:
                    link.click()
                    page_mobile.wait_for_load_state("networkidle")
                    screenshot(page_mobile, "19-mobile-lesson")
                    print(f"  Navigated to {text} via mobile nav")
                    break

        context_mobile.close()

        print("\n=== 8. ABOUT PAGE (Credentials) ===")
        page.goto("http://localhost:5174/about")
        page.wait_for_load_state("networkidle")
        screenshot(page, "20-about-page")
        badges = page.locator("[class*='badge'], [class*='Badge']").all()
        print(f"  Credential badges found: {len(badges)}")

        print("\n=== 9. RESOURCES PAGE ===")
        page.goto("http://localhost:5174/resources")
        page.wait_for_load_state("networkidle")
        screenshot(page, "21-resources-page")
        links = page.locator("a[target='_blank']").all()
        print(f"  External links found: {len(links)}")

        print("\n=== 10. CONSOLE ERRORS ===")
        if errors:
            print(f"  ERRORS found: {len(errors)}")
            for err in errors[:10]:
                print(f"    - {err}")
        else:
            print("  No console errors detected")

        print("\n=== TEST COMPLETE ===")
        print(f"  Screenshots saved to: {OUTPUT_DIR}")

        context.close()
        browser.close()

if __name__ == "__main__":
    test_site()
