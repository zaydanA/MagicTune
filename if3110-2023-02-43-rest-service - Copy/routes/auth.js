const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { PrismaClient } = require('@prisma/client');
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const saltRounds=10;

const prisma = new PrismaClient();
// const tempUser=[{
//     user_id:1,
//     email:"zaydanathallah@gmail.com",
//     username:"jedan",
//     password:"$2b$10$i.DC4m1on5HWsJU9gsFHVeUxZOhLRUT3hwWgVamy.uGF2ZVSlBFyO",
//     profile_picture:"image1.png",
//     is_admin:false
// },
// ]


router.post("/login",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    
    /* handle login to db */
    try {
        
        const loginUser = await prisma.user.findUnique({
            where: {
                email:email,
            }
        });
        if(!loginUser){
            throw new Error('Email tidak ditemukan');
        }
        console.log(loginUser);
        const isPasswordCorrect = await bcrypt.compare(password, loginUser.password);
        
        if(!isPasswordCorrect){
            throw new Error('Incorrect Password');
        }
        
        const user={
            user_id:loginUser.user_id,
            email:loginUser.email,
            username:loginUser.username,
            profile_picture:loginUser.profile_picture,
            is_admin:loginUser.is_admin,
        }
    
        const accessToken = jwt.sign(user,process.env.TOKEN_SECRET);
        res.json(accessToken);
    } catch (err) {
        console.error(`Error logging in user: `, err.message);
        res.status(401).json({message: err.message});
    }

})

router.post("/register",async (req,res)=>{
    console.log(req.body);
    const email = req.body.email;
    const username = req.body.username; 
    const password = req.body.password; 

    try {
        
        const userName = await prisma.user.findUnique({
            where: {
                username:username,
            }
        });
        if(userName){
            throw new Error('Username sudah digunakan');
        }
        
        const emailUser = await prisma.user.findUnique({
            where: {
                email:email,
            }
        });
        if(emailUser){
            throw new Error('Email sudah digunakan');
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        
        const new_user = await prisma.user.create({
            data:{
                email:email,
                username:username,
                password:hashedPassword
            }
        })

        console.log(new_user);

        const user={
            user_id:new_user.user_id,
            email:new_user.email,
            username:new_user.username,
            profile_picture:new_user.profile_picture,
            is_admin:new_user.is_admin,
        }
        const accessToken = jwt.sign(user,process.env.TOKEN_SECRET);
        res.json(accessToken);
    } catch (err) {
        console.error(`Error logging in user: `, err.message);
        res.status(401).json({message: err.message});
    }
})

router.post("/google",async (req,res)=>{
    const email = req.body.email;
    const username = req.body.username;

    try {
        
        const emailUser = await prisma.user.findUnique({
            where: {
                email:email,
            }
        });
        if(!emailUser){
            const random = crypto.randomBytes(5).toString('hex');
            const new_user = await prisma.user.create({
                data:{
                    email:email,
                    username:username + random,
                }
            })
            const user={
                user_id:new_user.user_id,
                email:new_user.email,
                username:new_user.username,
                profile_picture:new_user.profile_picture,
                is_admin:new_user.is_admin,
            }

            const accessToken = jwt.sign(new_user,process.env.TOKEN_SECRET);
            res.json(accessToken);
        }else{
            const user2={
                    user_id:emailUser.user_id,
                    email:emailUser.email,
                    username:emailUser.username,
                    profile_picture:emailUser.profile_picture,
                    is_admin:emailUser.is_admin,
                }
                const accessToken2 = jwt.sign(user2,process.env.TOKEN_SECRET);
                res.json(accessToken2);
            }
    } catch (err) {
        console.error(`Error logging in user: `, err.message);
        res.status(401).json({message: err.message});
    }
})
module.exports=router;