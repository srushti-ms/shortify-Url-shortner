import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import UrlRouter from './routes/url.js';
import cors from 'cors';
import UserRouter from './routes/user.js';
import mongoose from 'mongoose';
import Url from './models/url.js';

const app = express();

const port = 5000;

app.use(express.json()); 

app.use(cors());


app.use('/url', UrlRouter);

app.use('/user', UserRouter);

await mongoose.connect(process.env.MONGO_URI);
console.log("connected to database");



setInterval(async () => {
await Url.deleteMany({
  expires: { $lt: new Date() }
});

}, 7 * 24 * 60 * 60 * 1000) // 7 days

app.listen(port, ()=>{
    console.log(`server running on port ${port}`);
}
)