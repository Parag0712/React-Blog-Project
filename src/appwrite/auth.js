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
    async updateName(userId, newName) {
        try {
            // Assuming you have a method to update the name in your authentication service
            await this.account.updateName(userId, newName);
            return true; // Return true on successful name update
        } catch (error) {
            throw error
        }
    }

    async updateProfile({ name, email, password }) {
        try {
            // Update name if provided
            if (name) {
                const nameUpdateResult = await this.account.updateName(name, password);
            }
            // Update email if provided
            if (email) {
                const emailUpdateResult = await this.account.updateEmail(email, password);
            }
            return true;
        } catch (error) {
            console.error('Error updating profile:', error);
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


    async googleAuth() {
        try {
            this.account.createOAuth2Session("google", "success url", "failure url")
        } catch (error) {
            console.log("Appwrite Error" + error);
        }
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