import { APIRequestContext } from "@playwright/test";
import User from "../Models/User";

export default class CreateAccount{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async postCreateUser(user:User){
        const response = await this.request.post('/api/createAccount',{
            form: user.getCreateAccountForm()
        })
        return response;
    }
}
