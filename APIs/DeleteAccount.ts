import { APIRequestContext } from "@playwright/test";
import User from "../Models/User";

export default class DeleteAccount{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async deleteUser(user:User){
        const response = await this.request.delete('/api/deleteAccount',{
            form: {
                email: user.getEmail(),
                password: user.getPassword()
            }
        })
        return response;
    }
}
