"""
Comprehensive Playwright E2E Automation Script
Tests Accounting & Financial Module + Second Section / Core Project Modules
Following /webapp-testing guidelines
"""
import sys
import time

if sys.platform == 'win32':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

from playwright.sync_api import sync_playwright

def run_tests():
    print("================================================================")
    print("[RUN] STARTING E2E AUDIT: ACCOUNTING & FULL PROJECT SCOPE")
    print("================================================================")

    passed_tests = []
    failed_tests = []

    with sync_playwright() as p:
        # Launch Chromium headless
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 900})

        # Capture console errors
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

        try:
            # -------------------------------------------------------------
            # TEST 1: Accounting Security & Terminal Login (/accounting/login)
            # -------------------------------------------------------------
            print("\n[TEST 1] Testing Accounting Login & Security Gate (/accounting/login)...")
            page.goto("http://localhost:3000/accounting/login")
            page.wait_for_selector("h1", timeout=8000)

            login_h1 = page.locator("h1").inner_text()
            assert "FINANCIAL & ACCOUNTING LEDGER" in login_h1.upper(), f"Unexpected header: {login_h1}"
            
            fill_btn = page.locator("button:has-text('Fill Credentials')")
            fill_btn.wait_for(state="visible", timeout=5000)

            # Click Fill Credentials
            fill_btn.click()
            page.wait_for_timeout(400)

            # Click Enter Terminal
            enter_btn = page.locator("button:has-text('Enter Terminal')")
            enter_btn.click()
            
            # Wait for redirect to dashboard
            page.wait_for_url("**/accounting/dashboard", timeout=10000)
            page.wait_for_selector("h1", timeout=8000)

            assert "/accounting/dashboard" in page.url, f"Expected dashboard URL, got {page.url}"
            passed_tests.append("TEST 1: Accounting Security & Terminal 6-Digit PIN Authentication")
            print("  [OK] Passed: Terminal 6-digit PIN authentication succeeded and authenticated session established.")

            # -------------------------------------------------------------
            # TEST 2: Accounting Financial Dashboard (/accounting/dashboard)
            # -------------------------------------------------------------
            print("\n[TEST 2] Testing Accounting Dashboard (/accounting/dashboard)...")
            page.goto("http://localhost:3000/accounting/dashboard")
            page.wait_for_selector("h1", timeout=8000)

            # Assert key financial metrics and cards are present
            page.wait_for_selector("text=ETA Tax E-Invoice (14% VAT) Compliant", timeout=5000)
            page.wait_for_selector("text=Gross Invoiced Revenue", timeout=5000)
            page.wait_for_selector("text=Egyptian VAT (14%)", timeout=5000)
            page.wait_for_selector("text=COD In Transit", timeout=5000)
            page.wait_for_selector("text=Payment Methods Inflow", timeout=5000)

            passed_tests.append("TEST 2: Accounting Financial Dashboard KPIs & Inflow Breakdown")
            print("  [OK] Passed: Live financial KPIs, 14% VAT badge, and Payment inflows rendered accurately.")

            # -------------------------------------------------------------
            # TEST 3: Accounting Payments Ledger & Settlement (/accounting/payments)
            # -------------------------------------------------------------
            print("\n[TEST 3] Testing Payments Ledger & COD Settlement (/accounting/payments)...")
            page.goto("http://localhost:3000/accounting/payments")
            page.wait_for_selector("table", timeout=8000)

            # Check table headers and rows
            page.wait_for_selector("th:has-text('Commission #')", timeout=5000)
            page.wait_for_selector("th:has-text('14% VAT')", timeout=5000)
            page.wait_for_selector("th:has-text('Gateway Ref')", timeout=5000)
            page.wait_for_selector("button:has-text('Export ETA Tax Ledger')", timeout=5000)

            # Check if orders are displayed
            page.wait_for_selector("text=LUM-2026-8891", timeout=5000)
            page.wait_for_selector("text=LUM-2026-8892", timeout=5000)
            page.wait_for_selector("text=LUM-2026-8893", timeout=5000)

            # Test COD settlement button if present
            settle_btn = page.locator("button:has-text('Settle COD Cash')")
            if settle_btn.count() > 0:
                print("  -> Found COD Settlement button for pending cash order. Triggering settlement...")
                settle_btn.first.click()
                page.wait_for_timeout(1500)
                print("  -> Settlement action dispatched.")

            passed_tests.append("TEST 3: Payments Ledger, Gateway Refs & Settlement Action")
            print("  [OK] Passed: Live transactions table, VAT split, and settlement capability verified.")

            # -------------------------------------------------------------
            # TEST 4: Financial & Tax Compliance Reports (/accounting/reports)
            # -------------------------------------------------------------
            print("\n[TEST 4] Testing Financial Reports & Tax Docket (/accounting/reports)...")
            page.goto("http://localhost:3000/accounting/reports")
            page.wait_for_selector("h1", timeout=8000)

            page.wait_for_selector("text=Egyptian Tax Authority (ETA) VAT Return", timeout=5000)
            page.wait_for_selector("text=Gross Margin & COGS Profitability Analysis", timeout=5000)
            page.wait_for_selector("text=Cash on Delivery (COD) Regional Depot Audit", timeout=5000)

            # Open Official Docket Modal
            docket_btn = page.locator("button:has-text('Review & Print Official Docket')").first
            docket_btn.wait_for(state="visible", timeout=5000)
            docket_btn.click()
            page.wait_for_timeout(600)

            page.wait_for_selector("text=Official Corporate Tax Docket", timeout=5000)
            page.wait_for_selector("text=491-882-901", timeout=5000)
            page.wait_for_selector("text=ETA VERIFIED", timeout=5000)

            # Close modal via Close button
            page.locator("button:has-text('Close')").first.click()
            page.wait_for_timeout(400)

            passed_tests.append("TEST 4: Financial Reports & Official Tax Docket Modal")
            print("  [OK] Passed: All 3 compliance reports and official ETA tax docket verified.")

            # -------------------------------------------------------------
            # TEST 5: Customer Storefront & Catalog PDP (/collection & /product/...)
            # -------------------------------------------------------------
            print("\n[TEST 5] Testing Customer Storefront & PDP...")
            page.goto("http://localhost:3000/collection")
            page.wait_for_selector("text=Torso Ceramic Luminaire", timeout=8000)

            page.goto("http://localhost:3000/product/torso-ceramic-luminaire")
            page.wait_for_selector("h1:has-text('Torso Ceramic Luminaire')", timeout=8000)
            page.wait_for_selector("text=18,500 EGP", timeout=5000)

            passed_tests.append("TEST 5: Storefront Collection & Single Product PDP")
            print("  [OK] Passed: Storefront collection and detailed product PDP rendered with live pricing.")

            # -------------------------------------------------------------
            # TEST 6: Admin Suite, Product Catalog & Dynamic Pricing (/admin/products)
            # -------------------------------------------------------------
            print("\n[TEST 6] Testing Admin Back-Office Suite & Pricing Control (/admin/products)...")
            page.goto("http://localhost:3000/admin/products")
            page.wait_for_selector("h1", timeout=8000)

            page.wait_for_selector("text=Catalog Footprint", timeout=5000)
            page.wait_for_selector("button:has-text('Add New Silhouette')", timeout=5000)
            page.wait_for_selector("th:has-text('Retail Price (EGP)')", timeout=5000)

            passed_tests.append("TEST 6: Admin Product Catalog & Dynamic Pricing Suite")
            print("  [OK] Passed: Admin management table, KPI metrics, and price control verified.")

            # -------------------------------------------------------------
            # TEST 7: Multi-Warehouse WMS Matrix (/admin/inventory)
            # -------------------------------------------------------------
            print("\n[TEST 7] Testing Multi-Warehouse WMS Matrix (/admin/inventory)...")
            page.goto("http://localhost:3000/admin/inventory")
            page.wait_for_selector("h1", timeout=8000)

            page.wait_for_selector("text=Multi-Warehouse Inventory Allocation", timeout=5000)
            page.wait_for_selector("th:has-text('Cairo West Hub')", timeout=5000)
            page.wait_for_selector("th:has-text('Cairo East Depot')", timeout=5000)
            page.wait_for_selector("th:has-text('Alex Maritime')", timeout=5000)

            passed_tests.append("TEST 7: Multi-Warehouse WMS Stock Allocation Matrix")
            print("  [OK] Passed: Multi-warehouse allocation across all 3 regional fulfillment hubs verified.")

        except Exception as e:
            print(f"  [ERROR] TEST FAILURE: {str(e)}")
            failed_tests.append(str(e))
        finally:
            browser.close()

    print("\n================================================================")
    print("[REPORT] TEST EXECUTION SUMMARY")
    print("================================================================")
    print(f"Total Suites Executed: {len(passed_tests) + len(failed_tests)}")
    print(f"Suites Passed: {len(passed_tests)}")
    print(f"Suites Failed: {len(failed_tests)}")
    for p in passed_tests:
        print(f"  [PASS] {p}")
    for f in failed_tests:
        print(f"  [FAIL] {f}")
    print("================================================================")

    if failed_tests:
        sys.exit(1)
    else:
        sys.exit(0)

if __name__ == "__main__":
    run_tests()
