const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer  = require('multer');
const jwtmiddleware = require('../middleware/jwt');
const { PrismaClient } = require('@prisma/client');
const saltRounds=10;

const prisma = new PrismaClient()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/img/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + '-' + file.originalname);
    }
  })
  
const upload = multer({ storage: storage });

router.post("/updateUsername",jwtmiddleware.authenticateToken,async (req,res)=>{
    const user_id = req.body.user_id;
    const username = req.body.username;
    /* handle update to db */
    try {
        const userName = await prisma.user.findUnique({
            where: {
                username:username,
            }
        });
        if(userName){
            throw new Error('Username sudah digunakan');
        }

        const updateUser = await prisma.user.update({
            where: {
              user_id: user_id,
            },
            data: {
              username: username,
            },
          })
        
        const user={
            user_id:updateUser.user_id,
            email:updateUser.email,
            username:updateUser.username,
            profile_picture:updateUser.profile_picture,
            is_admin:updateUser.is_admin,
        }

        const accessToken = jwt.sign(user,process.env.TOKEN_SECRET);
        res.json(accessToken);

    } catch (err) {
        console.error(err.message);
        res.status(409).json({message: err.message});
    }

})
router.post("/updatePassword",jwtmiddleware.authenticateToken,async (req,res)=>{
    const user_id = req.body.user_id;
    const old_password = req.body.old_password;
    const new_password = req.body.new_password;
    /* handle update to db */
    try {
        const userPassword = await prisma.user.findUnique({
            where: {
                user_id:user_id,
            }
        });

        const isMatch= await bcrypt.compare(old_password, userPassword.password)
        if(!isMatch){
            throw new Error('Password lama salah')
        }else{

            const hashedPassword = await bcrypt.hash(new_password, saltRounds);
            const updateUser = await prisma.user.update({
                where: {
                    user_id: user_id,
                },
                data: {
                    password: hashedPassword,
                },
            })
            
            const user={
                user_id:updateUser.user_id,
                email:updateUser.email,
                username:updateUser.username,
                profile_picture:updateUser.profile_picture,
                is_admin:updateUser.is_admin,
            }
            res.json(user);
        }

    } catch (err) {
        console.error(err.message);
        res.status(403).json({message: err.message});
    }

})

router.post("/deleteUser",jwtmiddleware.authenticateToken,async (req,res)=>{
    const user_id = req.body.user_id;
    const password = req.body.password;

    /* handle update to db */
    try {
        const userPassword = await prisma.user.findUnique({
            where: {
                user_id:user_id,
            }
        });

        var isMatch;
        if(userPassword.password){
            isMatch = await bcrypt.compare(password, userPassword.password);
        }else{
            isMatch = true;
        }
        
        if(!isMatch){
            throw new Error('Password lama salah')
        }else{

            const deleteUser = await prisma.user.delete({
                where: {
                    user_id: user_id,
                }
            })
            res.json(deleteUser);
        }

    } catch (err) {
        console.error(err.message);
        res.status(403).json({message: err.message});
    }

})

router.post("/updateUserPhoto",jwtmiddleware.authenticateToken,upload.single('file'),async (req,res)=>{
    const user_id=req.user.user_id;
    const oldImage=req.user.profile_picture;
    const filename=req.file.filename;

    /* handle update to db */
    try {
        
        var fs = require('fs');
        fs.unlink('./storage/img/'+oldImage, function (err) {
            console.log(err);
        });

        const userPic = await prisma.user.update({
            where: {
              user_id: user_id,
            },
            data: {
                profile_picture: filename,
            },
        });
        const user={
            user_id:userPic.user_id,
            email:userPic.email,
            username:userPic.username,
            profile_picture:userPic.profile_picture,
            is_admin:userPic.is_admin,
        }

        const accessToken = jwt.sign(user,process.env.TOKEN_SECRET);
        res.json(accessToken);

    } catch (err) {
        console.error(err.message);
        res.status(403).json({message: err.message});
    }

})



module.exports=router;