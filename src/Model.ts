import { Schema } from 'mongoose';
import mongoose from 'mongoose';

const aiDataSchema = new Schema({

    _id: { type: String, required: true },
    name: { type: String, required: false },
    icon_url: { type: String, required: false },
    site_url: { type: String, required: false },
    type: { type: String, required: false },
    plans: { type: String, required: false },
    description: { type: String, required: false },
    content: { type: String, required: false },
    likes: { type: Number, required: false },
    views: { type: Number, required: false },
    created_at: { type: Number, required: false },
    modified_at: { type: Number, required: false },
    seo_description: { type: String, required: false },

});

const accountSchema = new Schema({

    _id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});


export const AiData = mongoose.model("AiData", aiDataSchema)
export const Account = mongoose.model("Account", accountSchema)



