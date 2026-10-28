# SauceDemo UI Automation | Playwright + TypeScript

A portfolio project demonstrating end-to-end UI automation for [SauceDemo](https://www.saucedemo.com/) using Playwright Test and TypeScript.

## Project goals

- Automate critical e-commerce user journeys: login, product inventory, cart and checkout.
- Apply Page Object Model (POM) for maintainable page abstractions.
- Cover positive and negative scenarios with readable assertions.
- Run tests across Chromium, Firefox and WebKit.
- Generate HTML reports, screenshots, videos and traces on failure.
- Execute tests automatically through GitHub Actions.

## Tech stack

- Playwright Test
- TypeScript
- Node.js / npm
- GitHub Actions (CI)
- Page Object Model (POM)

## Project structure

```text
.
├── .github/workflows/playwright.yml
├── pages/
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   ├── InventoryPage.ts
│   └── LoginPage.ts
├── tests/
│   ├── fixtures.ts
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── cart-checkout.spec.ts
├── test-cases/
│   └── test-cases.md
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Prerequisites

- Node.js 20+ (Node.js 22 recommended)
- npm
- Git

## Setup

```bash
git clone https://github.com/<your-username>/saucedemo-playwright-automation.git
cd saucedemo-playwright-automation
npm install
npx playwright install
```

## Run tests

```bash
# Run all configured browser projects
npm test

# Run only Chromium
npm run test:chromium

# Run with a visible browser
npm run test:headed

# Open Playwright's interactive UI
npm run test:ui

# Check TypeScript types
npm run typecheck

# Open the latest HTML report
npm run report
```

After a test run, the HTML report is generated in `playwright-report/`. Screenshots, videos and traces are retained for failures according to the Playwright configuration.

## Coverage

| Feature | Example coverage |
|---|---|
| Login | Valid login, invalid password, missing username/password, locked-out user |
| Inventory | Product visibility, add/remove cart item, sort by name and price |
| Cart | Verify selected product, continue shopping |
| Checkout | Successful purchase, required-field validation |
| Cross-browser | Chromium, Firefox, WebKit |
| CI | GitHub Actions on push and pull request |

The included suite has 15 test cases. The test count and pass rate should be confirmed by running the suite in your environment; do not present unverified results as completed execution.

## CI workflow

GitHub Actions runs dependency installation, browser installation, TypeScript type-checking and Playwright tests for pushes and pull requests to `main`/`master`. The report and test artifacts are uploaded even if tests fail.

## Test account

SauceDemo's public demo account used in this project:
- Username: `standard_user`
- Password: `secret_sauce`

The `locked_out_user` account is used for a negative login scenario. Demo-site behavior and availability can change; re-check locators and expected messages if the site is updated.

## Engineering decisions

- Prefer user-facing locators such as role and placeholder where practical.
- Use web-first assertions to wait for UI state rather than fixed sleeps.
- Keep page interactions in page objects and test intent in spec files.
- Use isolated browser contexts provided by Playwright Test.
- Preserve traces and screenshots on failure to support debugging.

## Known scope / next improvements

- Add API tests and API/UI setup combinations.
- Add accessibility checks.
- Add test data builders and environment-based base URLs.
- Add a smoke/regression tag strategy and a richer test matrix.
- Publish report history if the portfolio needs a browsable dashboard.

## CV-ready project description

**SauceDemo E-commerce UI Automation | Playwright, TypeScript**
- Designed and implemented end-to-end UI automation for login, product inventory, cart and checkout flows using Playwright Test and TypeScript.
- Applied Page Object Model (POM), reusable fixtures and web-first assertions to improve test maintainability.
- Covered positive and negative scenarios, including login validation, cart operations, product sorting and checkout form validation.
- Configured cross-browser execution for Chromium, Firefox and WebKit, with HTML reporting and failure artifacts.
- Integrated automated test execution and artifact upload into GitHub Actions CI.

Only list cross-browser/CI execution as verified experience after you have successfully run the workflow and reviewed its results.

## References

- [Playwright documentation](https://playwright.dev/docs/intro)
- [Playwright with TypeScript](https://playwright.dev/docs/test-typescript)
- [Playwright CI](https://playwright.dev/docs/ci-intro)
- [Playwright reporters](https://playwright.dev/docs/test-reporters)
