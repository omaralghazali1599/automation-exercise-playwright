import { APIRequestContext } from "@playwright/test";

export default class BrandList{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async getBrandList(){
        const response = await this.request.get('/api/brandsList')
        return response;
    }

    async putBrandList(){
        const response = await this.request.put('/api/brandsList')
        return response;
    }
}
