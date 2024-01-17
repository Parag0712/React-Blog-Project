import { Client, Account, ID } from "appwrite";
import config from '../config/config'

export class AuthService {
    //class Start

    client = new Client();
    account;

    //when object create then our account create
    //setup account and client

    constructor() {
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.appwrite_projectId)
            
        this.account = new Account(this.client)
    }

    // createAccount Method
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error;
        }
    }

    // login Method
    async login({ email, password }) {
        try {
            const userAccount = await this.account.createEmailSession(email, password)
            return userAccount;
        } catch (error) {
            throw error
        }
    }

    //getUser login or not
    async getCurrentUser() {
        try {
            return await this.account.get()
        } catch (error) {
            // console.log(error.message);
            throw error.message
        }
        return null;
    }


    //logout Method
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            
            console.log("Appwrite Error" + error);
        }
    }
    // class End
}



const authServices = new AuthService();
export default authServices