import { Storage, Client, ID } from "appwrite";
import config from '../config/config'

export class FileService {
    client = new Client();
    storage;

    constructor() {
        this.client
        .setEndpoint(config.appwrite_url)
        .setProject(config.appwrite_projectId)
        this.storage = new Storage(this.client)
    }

    //uploadFile
    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwrite_bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    // deleteFile
    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwrite_bucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    //getFilePreview
    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwrite_bucketId,
            fileId
        )
    }

    //getFileDownload
    getFileDownload(fileId){
        return this.storage.getFileDownload(
            config.appwrite_bucketId,
            fileId
        )
    }

}

const fileService = new FileService()
export default fileService;