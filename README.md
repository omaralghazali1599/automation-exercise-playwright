# Automation Exercise – Playwright Test Suite

End-to-end UI and API test automation for [automationexercise.com](https://www.automationexercise.com), built with [Playwright](https://playwright.dev/) and TypeScript, following the Page Object Model (POM) pattern.

Covers all 26 UI test cases and all 14 API endpoints from the site's published practice lists.

## Tech stack

- **Playwright Test** (`@playwright/test`) — test runner, browser automation and API request fixture
- **TypeScript**
- **@faker-js/faker** — random test data generation (users, addresses, contact form content)
- **GitHub Actions** — the full suite runs on every push and pull request

## Project structure

```
pages/            Page Object classes — one class per site page/section, exposing locators and user-facing actions
Models/           Data models (User, AddressInfo, PaymentInfo) and API response types (APITypes.ts)
tests/            UI spec files, one per test case
tests/ApiTests/   API spec files, one per endpoint
```

Each page object encapsulates its own locators as private getters and exposes intention-revealing methods (e.g. `FillAddressInfo`, `VerifyAccountCreatedText`) so test specs read as a sequence of user actions and assertions rather than raw selectors.

`baseURL` is set in `playwright.config.ts`, so every spec uses relative paths (`/api/productsList`) rather than repeating the host.

## Implemented UI test cases

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
| 14 | Place order: register while checkout | `TestCase14_PlaceOrderRegisterWhileCheckout.spec.ts` |
| 15 | Place order: register before checkout | `TestCase15_PlaceOrderRegisterBeforeCheckout.spec.ts` |
| 16 | Place order: login before checkout | `TestCase16_PlaceOrderLoginBeforeCheckout.spec.ts` |
| 17 | Remove products from cart | `TestCase17_RemoveProductsFromCart.spec.ts` |
| 18 | View category products | `TestCase18_ViewCategoryProducts.spec.ts` |
| 19 | View brand products | `TestCase19_ViewBrandProducts.spec.ts` |
| 20 | Search products and verify cart after login | `TestCase20_SearchProductsAndVerifyCartAfterLogin.spec.ts` |
| 21 | Add review on product | `TestCase21_AddReviewOnProduct.spec.ts` |
| 22 | Add to cart from recommended items | `TestCase22_AddToCartFromRecommendedItems.spec.ts` |
| 23 | Verify address details in checkout page | `TestCase23_VerifyAddressDetailsInCheckoutPage.spec.ts` |
| 24 | Download invoice after purchase order | `TestCase24_DownloadInvoiceAfterPurchaseOrder.spec.ts` |
| 25 | Verify scroll up using 'Arrow' button and scroll down | `TestCase25_VerifyScrollUpUsingArrowButton.spec.ts` |
| 26 | Verify scroll up without 'Arrow' button and scroll down | `TestCase26_VerifyScrollUpWithoutArrowButton.spec.ts` |

Covers the full [automationexercise.com practice test case list](https://www.automationexercise.com/test_cases).

## Implemented API tests

| # | Endpoint | Method | Expected | Spec file |
|---|----------|--------|----------|-----------|
| 1 | `/api/productsList` | GET | 200 — products list | `API1_GetAllProductsList.spec.ts` |
| 2 | `/api/productsList` | POST | 405 — method not supported | `API2_POSTToAllProductsList.spec.ts` |
| 3 | `/api/brandsList` | GET | 200 — brands list | `API3_GetAllBrandsList.spec.ts` |
| 4 | `/api/brandsList` | PUT | 405 — method not supported | `API4_PUTToAllBrandsList.spec.ts` |
| 5 | `/api/searchProduct` | POST | 200 — searched products list | `API5_POSTToSearchProduct.spec.ts` |
| 6 | `/api/searchProduct` (no `search_product`) | POST | 400 — missing parameter | `API6_POSTToSearchProductWithoutSearch_productParameter.spec.ts` |
| 7 | `/api/verifyLogin` | POST | 200 — user exists | `API7_POSTToVerifyLoginWithValidDetails.spec.ts` |
| 8 | `/api/verifyLogin` (no `email`) | POST | 400 — missing parameter | `API8_POSTToVerifyLoginWithoutEmailParameter.spec.ts` |
| 9 | `/api/verifyLogin` | DELETE | 405 — method not supported | `API9_DELETEToVerifyLogin.spec.ts` |
| 10 | `/api/verifyLogin` (invalid details) | POST | 404 — user not found | `API10_POSTToVerifyLoginWithInvalidDetails.spec.ts` |
| 11 | `/api/createAccount` | POST | 201 — user created | `API11_POSTToCreateRegisterUserAccount.spec.ts` |
| 12 | `/api/deleteAccount` | DELETE | 200 — account deleted | `API12_DELETEToDeleteUserAccount.spec.ts` |
| 13 | `/api/updateAccount` | PUT | 200 — user updated | `API13_PUTToUpdateUserAccount.spec.ts` |
| 14 | `/api/getUserDetailByEmail` | GET | 200 — user detail | `API14_GETUserAccountDetailByEmail.spec.ts` |

Covers the full [automationexercise.com API list](https://www.automationexercise.com/api_list).

### Notes on the API tests

- **The response code lives in the body, not the HTTP status.** This API answers `HTTP 200` even for errors, and reports the real outcome in `responseCode`. So the specs assert `expect(response.status()).toBe(200)` *and* `expect(body.responseCode).toBe(405)`.
- **Account tests are self-contained.** API 12, 13 and 14 each register their own throwaway user via `/api/createAccount` before acting on it, so they hold no shared state and stay correct under `fullyParallel`.
- **The account payload is defined once.** `User.getCreateAccountForm()` returns the 17-field form shared by the create, update, read and delete specs.
- **API 12 verifies the deletion.** After deleting, it looks the account up by the same email and expects `responseCode` 404.
- **Response field names differ from request parameters.** `/api/getUserDetailByEmail` returns `birth_day`, `first_name` and `last_name` where the create form sends `birth_date`, `firstname` and `lastname`, and it does not return `mobile_number` at all. `Models/APITypes.ts` reflects the response shape.

## Running the tests

```bash
npm install
npx playwright install
npx playwright test
```

Run only the API tests (a few seconds, no browser needed):

```bash
npx playwright test tests/ApiTests/
```

Run a single spec:

```bash
npx playwright test tests/TestCase1_RegisterUser.spec.ts
```

View the HTML report after a run:

```bash
npx playwright show-report
```

## Continuous integration

`.github/workflows/playwright.yml` runs the full suite on every push and pull request to `main`/`master`, on `ubuntu-latest`. The HTML report is uploaded as a build artifact and retained for 30 days.

Because CI is Linux, import paths are case-sensitive there even though they resolve on Windows — `Models/APITypes.ts` must be imported as `APITypes`, not `ApiTypes`.

The suite runs against the live automationexercise.com site, so a CI failure can reflect site downtime or changed data rather than a regression in the tests.
