import { APIRequestContext } from "@playwright/test";
import User from '../Models/User';

export default class VerifyLogin{
    private request:APIRequestContext;

    constructor(request:APIRequestContext){
        this.request = request;
    }

    async postLoginWithValidCred(){
        const user = User.notRandom()
        const response = await this.request.post('/api/verifyLogin',{ form: {
            email: user.getEmail(),
            password: user.getPassword()
        }})
        return response
    }

    async postLoginWithoutEmailParam(){
        const user = User.notRandom()
        const response = await this.request.post('/api/verifyLogin',{ form: {
            password: user.getPassword()
        }})
        return response
    }

    async deleteVerifyLogin(){
        const response = await this.request.delete('/api/verifyLogin')
        return response
    }

    async postLoginWithInvalidCred(){
        const user = User.random()
        const response = await this.request.post('/api/verifyLogin',{ form: {
            email: user.getEmail(),
            password: user.getPassword()
        }})
        return response
    }
}
