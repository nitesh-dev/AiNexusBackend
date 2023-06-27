import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const aiDataSchema = new Schema({

    _id: { type: String, required: true },
    name: { type: String, required: true },
    icon_url: { type: String, required: true },
    site_url: { type: String, required: true },
    type: { type: String, required: true },
    plans: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, required: true },
    views: { type: Number, required: true },
    created_at: { type: Number, required: true },
    modified_at: { type: Number, required: true },
    seo_description: { type: String, required: true },

});

const accountSchema = new Schema({

    _id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});


export const AiData = mongoose.model("AiData", aiDataSchema)
export const Account = mongoose.model("Account", accountSchema)



