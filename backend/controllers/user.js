import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Url from '../models/url.js';

export async function registerUser(req, res) {
    const {username, password} = req.body;

    if(!username || !password){
        return res.status(400).json({error: 'username and password are required'});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    try{
        const newUser = new User({
            username: username,
            password: hashedPassword,
        })
        await newUser.save();

        const token = jwt.sign(
            {id: newUser._id, username: newUser.username},
            process.env.JWT_SECRET,
            {expiresIn: '3d'}
        )
        return res.json({message : 'user registered sucessfully', token : token});

    }catch(err){
        return res.status(500).json({error: 'error while regestering user'});
    }  
}

export async function loginUser(req, res){
    const {username, password} = req.body;


    if(!username || !password){
        return res.status(400).json({error: 'username and password are required'});
    }

    try { 
        const user = await User.findOne({username});
        if(!user){
            return res.status(404).json({error: 'user not found, please register'});
        }

        // console.log(password,user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // console.log(isPasswordValid);
        if(!isPasswordValid){
            return res.status(409).json({error: 'invalid password'});
        }
        
        const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET, 
        { expiresIn: '1d' });

        return res.status(200).json({message: 'login successful' , token: token})
        
    }
    catch(err){
        return res.status(500).json({error: 'error while logging in'});
    }
}

export async function fetchContent(req, res) {
  try {
    const userId = req.user.id

    const urls = await Url.find({user:userId})

    return res.status(200).json({urls})

  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: 'Error while fetching user urls' });
  }
}
