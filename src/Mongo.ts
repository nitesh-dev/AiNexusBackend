import mongoose from "mongoose";
import { Account, AiData } from "./Model.js";
import { AiDetail, AccountData } from "./DataType.js";

export default class MongoAPI {

    async connectMongoose(url: string) {
        var isConnected = false
        await mongoose.connect(url)
            .then(() => {
                isConnected = true
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });
 
        return isConnected
    }



    // ------------------ Account -------------------

    async isAdmin(accountId: string) {
        try {
            const account = await Account.findById(accountId)
            if (account != null) return true
        } catch (error) {
            console.log(error)
        }

        return false
    }


    async getAccount(email: string) {
        try {
            const account = await Account.findOne({ email: email }) as AccountData | null;
            return account;

        } catch (error) {
            console.error('Error in account:', error);
            return null
        }
    }




    // ----------------------- protected request ---------------

    async addAi(data: AiDetail) {
        try {
            return await AiData.create(data)

        } catch (error) {
            console.error('Error :', error);
            return null
        }
    }

    async updateAi(data: AiDetail) {
        try {
            return await AiData.findByIdAndUpdate(data._id, {
                name: data.name,
                icon_url: data.icon_url,
                site_url: data.site_url,
                type: data.type,
                plans: data.plans,
                description: data.description,
                content: data.content,
                modified_at: data.modified_at,
                seo_description: data.seo_description
            })

        } catch (error) {
            console.error('Error:', error);
            return null
        }
    }

    async deleteAi(id: string){
        try {
            return await AiData.findByIdAndDelete(id)

        } catch (error) {
            console.error('Error :', error);
            return null
        }
    }



    // ---------------------------- public request -------------------


}
