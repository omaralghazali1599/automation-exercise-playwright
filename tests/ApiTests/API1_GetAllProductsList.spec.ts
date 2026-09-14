import { test, expect } from '@playwright/test';
import { ProductsResponse } from '../../Models/APITypes';
import ProductList from '../../APIs/ProductList';

test('API 1: Get All Products List', async ({ request }) => {
  const productlist = new ProductList(request);
  const response = await productlist.getProducts();

  // HTTP status
  expect(response.status()).toBe(200);

  const body: ProductsResponse = await response.json();
  // console.log(JSON.stringify(body));
  
  // Response code in the body
  expect(body.responseCode).toBe(200);

  // The products list itself
  expect(Array.isArray(body.products)).toBe(true);
  expect(body.products.length).toBeGreaterThan(0);

  // Shape of all products
  for (const product of body.products) {
  expect(product).toHaveProperty('id');
  expect(product).toHaveProperty('name');
  expect(product).toHaveProperty('price');
  expect(product).toHaveProperty('brand');
  expect(product.category).toHaveProperty('category');}

});
