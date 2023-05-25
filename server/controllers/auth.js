import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"

/* Register User*/
export const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        const salt = await bycrypt.genSalt(); // to incrypt the password
        const passwordHash = await bycrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(math.random() * 1000), //dummy data
            impressions: Math.floor(math.random() * 1000 )
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser); // send the user a status of 201 meaning its created, create a json version of the saved user so frontend can recive this response

    } catch (err) {
        res.status(500).json({error: err.message});// if something goes wrong send a status 500 with an error message that db return

    }
};

/* Logging IN*/
export const login = async (req, res) =>{
    try{
        const{email, password} = req.body;
        const user = await user.findOne({email: email});
        if(!user) return res.status(400).json ({msg :"User does not exist. "});

        const isMatch = await bycrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({msg: "Invalid credentials. "});

        const token = jwt.sign({id: user._id}, process.env.JWR_SECRET);
        delete user.password;
        res.status(200).json({token, user})

    }catch (err){
        res.status(500).json({error: res.message});
    }
}