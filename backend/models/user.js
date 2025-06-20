import mongoose from 'mongoose';
import Url from './url.js';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('User', userSchema);
export default User;
