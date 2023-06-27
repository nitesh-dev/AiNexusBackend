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
}
