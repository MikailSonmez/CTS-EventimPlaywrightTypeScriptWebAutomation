# CTS EVENTIM – Playwright TypeScript Automation Framework

> Production-level E2E & API test automation with TDD, CI/CD, and AI-powered QA.

---

## 📁 Project Structure

```
├── tests/
│   ├── e2e/          # End-to-end UI tests (POM-based)
│   ├── api/          # API-level integration tests
│   ├── smoke/        # Fast smoke suite (critical paths)
│   └── regression/   # Full regression coverage
├── pages/            # Page Object Model classes
├── components/       # Reusable UI component abstractions
├── services/         # API service wrappers (BookingService, AuthService)
├── fixtures/         # Static test data (users.json, events.json)
├── utils/            # Logger, MetricsCollector, RetryStrategy, TestDataBuilder
├── core/             # baseTest, config, selectors
├── ai/               # FlakyDetector, TestGenerator
└── .github/          # CI/CD workflows
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install

# Copy environment config
cp .env.example .env
```

---

## 🧪 Running Tests

```bash
# All tests
npm test

# E2E only
npm run test:e2e

# Smoke tests
npm run test:smoke

# API tests
npm run test:api

# Regression suite
npm run test:regression

# Headed (visible browser)
npm run test:headed

# View HTML report
npm run report
```

---

## 🔴 TDD Workflow

1. **Red** – Write a failing test in `tests/e2e/`
2. **Green** – Implement the page object in `pages/`
3. **Refactor** – Clean up and extract reusable logic

---

## ⚙️ Configuration

| Variable            | Description                    | Default                      |
|---------------------|--------------------------------|------------------------------|
| `BASE_URL`          | Target application URL         | `https://www.eventim.de`     |
| `API_BASE_URL`      | API base URL                   | `https://api.eventim.de`     |
| `TEST_USER_EMAIL`   | Test account email             | See `.env.example`           |
| `TEST_USER_PASSWORD`| Test account password          | See `.env.example`           |
| `RETRY_COUNT`       | Retry count for flaky tests    | `2`                          |
| `CI`                | Enables CI mode (auto-set)     | `false`                      |

---

## 🤖 AI Layer

- **`ai/flakyDetector.ts`** — Identifies tests with >2 failures alongside passes; generates a flaky report
- **`ai/testGenerator.ts`** — Converts structured user journeys into Playwright test code; suggests missing coverage

---

## 📊 Reporting

- **HTML Report**: `playwright-report/index.html` → `npm run report`
- **JSON Results**: `reports/results.json`
- **CI Artifacts**: Uploaded automatically on each pipeline run

---

## 🔁 CI/CD

GitHub Actions runs on every push/PR:
- **Smoke** → fast gate, chromium only
- **E2E** → chromium + firefox in parallel
- **API** → isolated, no browser required

---

## 🏗️ Key Design Decisions

- **POM (Page Object Model)** — All selectors and interactions encapsulated in `pages/`
- **`data-testid` selectors** — Stable, implementation-agnostic locators throughout
- **Service layer** — `BookingService` / `AuthService` wrap API calls, keeping tests readable
- **`baseTest.ts`** — Custom fixtures auto-inject page objects + emit metrics on every test
- **`core/selectors.ts`** — Single source of truth for all element selectors
