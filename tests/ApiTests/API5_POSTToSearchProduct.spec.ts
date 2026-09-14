import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../../Models/APITypes';
import SearchProduct from '../../APIs/SearchProduct';

test('API 5: POST To Search Product', async ({ request }) => {

const searchProduct = 'top';
const postsearch = new SearchProduct(request)
const response = await postsearch.postSearchProduct(searchProduct);

// HTTP status
expect(response.status()).toBe(200);

const body: ProductsResponse = await response.json();
// console.log(JSON.stringify(body));

expect(body).toHaveProperty('responseCode');

// Response code in the body
expect(body.responseCode).toBe(200);

// The searched products list itself
expect(Array.isArray(body.products)).toBe(true);
expect(body.products.length).toBeGreaterThan(0);

// Shape of all searched products
for (const product of body.products) {
expect(product).toHaveProperty('id');
expect(product).toHaveProperty('name');
expect(product).toHaveProperty('price');
expect(product).toHaveProperty('brand');
expect(product.category).toHaveProperty('category');

// Every returned product matches the search term by name or category
const matchesSearch =
  product.name.toLowerCase().includes(searchProduct) ||
  product.category.category.toLowerCase().includes(searchProduct);
expect(matchesSearch, `${product.name} does not match "${searchProduct}"`).toBe(true);}

});
