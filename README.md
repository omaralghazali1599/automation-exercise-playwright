# Automation Exercise – Playwright Test Suite

End-to-end UI test automation for [automationexercise.com](https://www.automationexercise.com), built with [Playwright](https://playwright.dev/) and TypeScript, following the Page Object Model (POM) pattern.

## Tech stack

- **Playwright Test** (`@playwright/test`) — test runner and browser automation
- **TypeScript**
- **@faker-js/faker** — random test data generation (users, addresses, contact form content)

## Project structure

```
pages/     Page Object classes — one class per site page/section, exposing locators and user-facing actions
Models/    Data models (e.g. User, AddressInfo) used to generate and pass test data
tests/     Playwright spec files, one per test case
```

Each page object encapsulates its own locators as private getters and exposes intention-revealing methods (e.g. `FillAddressInfo`, `VerifyAccountCreatedText`) so test specs read as a sequence of user actions and assertions rather than raw selectors.

## Implemented test cases

| # | Test case | Spec file |
|---|-----------|-----------|
| 1 | Register a new user | `TestCase1_RegisterUser.spec.ts` |
| 2 | Login with correct email and password | `TestCase2_LoginUserWithCorrectEmailAndPassword.spec.ts` |
| 3 | Login with incorrect email and password | `TestCase3_LoginUserWithIncorrectEmailAndPassword.spec.ts` |
| 4 | Logout user | `TestCase4_LogoutUser.spec.ts` |
| 5 | Register with an already-existing email | `TestCase5_RegisterUserWithExistingEmail.spec.ts` |
| 6 | Contact Us form submission | `TestCase6_ContactUsForm.spec.ts` |
| 7 | Verify Test Cases page | `TestCase7_VerifyTestCasesPage.spec.ts` |
| 8 | Verify all products and product detail page | `TestCase8_VerifyAllProductsAndProductDetailPage.spec.ts` |
| 9 | Search product | `TestCase9_SearchProduct.spec.ts` |
| 10 | Verify subscription on home page | `TestCase10_VerifySubscriptionInHomePage.spec.ts` |
| 11 | Verify subscription on cart page | `TestCase11_VerifySubscriptionInCartPage.spec.ts` |
| 12 | Add products to cart | `TestCase12_AddProductsInCart.spec.ts` |
| 13 | Verify product quantity in cart | `TestCase13_VerifyProductQuantityInCart.spec.ts` |

> **Note:** This repo currently covers test cases 1–13 of the [automationexercise.com practice test case list](https://www.automationexercise.com/test_cases). It will be updated with the remaining test cases over time.

## Running the tests

```bash
npm install
npx playwright install
npx playwright test
```

Run a single spec:

```bash
npx playwright test tests/TestCase1_RegisterUser.spec.ts
```

View the HTML report after a run:

```bash
npx playwright show-report
```
