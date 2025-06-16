import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },

    redirectUrl: {
        type: String,
        required: true,
    },

    visitHistory: [{
        timestamp: {
            type: Number
        }
    }],

    expires: {
        type: Date
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }    
});

const Url = mongoose.model('Url', urlSchema);

export default Url;