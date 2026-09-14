import { APIRequestContext } from "@playwright/test";

export default class UserDetail{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async getUserDetailsByEmail(email:string){
        const response = await this.request.get('/api/getUserDetailByEmail', {
            params: { email }
        })
        return response;
    }
}
