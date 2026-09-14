import { APIRequestContext } from '@playwright/test';

export default class ProductList{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async getProducts(){
        const response = await this.request.get('/api/productsList');
        return response;
    }

    async postProducts(){
        const response = await this.request.post('/api/productsList');
        return response;
    }
}
