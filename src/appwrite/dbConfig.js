import { Client, Databases, Query, ID } from "appwrite";
import config from '../config/config'

export class Service {
    client = new Client();
    database;
    // setup Appwrite Database and storage
    constructor() {
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.appwrite_projectId)
        this.database = new Databases(this.client)
    }

    // createPost
    async createPost({ title, slug, content, featuredimage, status, userid }) {
        try {
            return await this.database.createDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid
                }
            )
        } catch (error) {
            throw error
            console.log("Appwrite Service Error" + error);
        }
    }

    // updatePost
    async updatePost(slug, { title, content, featuredimage, status }) {
        try {
            return await this.database.updateDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite Service Error" + error);
        }
    }

    async deletePost(slug) {
        try {
            await this.database.deleteDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service Error" + error);
            return false;
        }
    }

    // getSinglePost
    async getPost(slug) {
        try {
            return await this.database.getDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug,
            )
        } catch (error) {
            console.log("Appwrite Service Error" + error);
            return false;
        }
    }

    // getAllPost which active
    async getAllPost(queries = [Query.equal("status", "active")]) {
        try {
            return await this.database.listDocuments(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service Error" + error);
            return false;
        }
    }

}

const appWriteService = new Service();
export default appWriteService