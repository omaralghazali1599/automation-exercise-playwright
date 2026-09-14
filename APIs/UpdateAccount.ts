import { APIRequestContext } from "@playwright/test";
import User from "../Models/User";

export default class UpdateAccount{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async putUpdateUser(user:User, updatedUser:User){
        const response = await this.request.put('/api/updateAccount', {
            form: {
                ...updatedUser.getCreateAccountForm(),
                email: user.getEmail(),
                password: user.getPassword()
            }
        })
        return response;
    }
}
