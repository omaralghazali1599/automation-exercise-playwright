import { test, expect } from '@playwright/test';
import { BrandsResponse } from '../../Models/APITypes';
import BrandList from '../../APIs/BrandList';

test('API 3: Get All Brands List', async ({ request }) => {
const brandlist = new BrandList(request)
const response = await brandlist.getBrandList()

// HTTP status
expect(response.status()).toBe(200);

const body: BrandsResponse = await response.json();
// console.log(JSON.stringify(body));

expect(Array.isArray(body.brands)).toBe(true);
expect(body.brands.length).toBeGreaterThan(0);

expect(body).toHaveProperty('responseCode');
expect(body.responseCode).toBe(200);

// Shape of all brands
for (const brand of body.brands) {
expect(brand).toHaveProperty('id');
expect(brand).toHaveProperty('brand');}
});


