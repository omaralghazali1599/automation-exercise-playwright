import { APIRequestContext } from "@playwright/test";

export default class SearchProduct{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async postSearchProduct(product:string){
        const response = await this.request.post('/api/searchProduct', { form: { search_product: product } })
        return response;
    }

    async postSearchProductWithoutParameter(){
        const response = await this.request.post('/api/searchProduct')
        return response;
    }
}
