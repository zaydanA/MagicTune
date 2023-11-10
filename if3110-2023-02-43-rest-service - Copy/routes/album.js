const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer  = require('multer');
const jwtmiddleware = require('../middleware/jwt');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'storage/imgalbum/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,  uniqueSuffix + '-' + file.originalname);
    }
  })
  
const upload = multer({ storage: storage });

router.get("/allAlbum",jwtmiddleware.authenticateToken,async (req,res)=>{

    /* handle update to db */
    try {
        
        const albums= await prisma.album.findMany({
            include:{
                user:{
                    select:{
                        username:true,
                    },
                },
            }
        })
        
        res.status(200).json(albums);
    } catch (err) {
        console.error(err.message);
        res.status(403).json({message: err.message});
    }

})

router.post("/userAlbum",jwtmiddleware.authenticateToken,async (req,res)=>{
    /* handle update to db */
    try {
        
        const albums= await prisma.album.findMany({
            where:{
                user_id:req.body.user_id
            },

            include:{
                user:{
                    select:{
                        username:true,
                    },
                },
            }
        })

        // console.log(albums);
        res.status(200).json(albums);
    } catch (err) {
        console.error(err.message);
        res.status(404).json({message: err.message});
    }

})

router.post("/addAlbum",jwtmiddleware.authenticateToken,upload.single('file'),async (req,res)=>{


    const judul=req.body.judul;
    const year=parseInt(req.body.year);
    const user_id=req.user.user_id;
    const image=req.file.filename;
    /* handle update to db */
    try {
        
        const new_album = await prisma.album.create({
            data:{
                judul: judul,
                image: image,
                year: year,
                user_id:user_id
            }
        })
        

        res.status(200).json(new_album);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: err.message});
    }

})

router.post("/deleteAlbum",jwtmiddleware.authenticateToken,async (req,res)=>{

    // console.log(req.body);
    
    /* handle update to db */
    try {
        var fs = require('fs');
        fs.unlink('./storage/imgalbum/'+req.body.image, function (err) {
            console.log(err);
        });

        const delete_album = await prisma.album.delete({
            where:{
                album_id:req.body.album_id,
            }
        })

        res.status(200).json({})
    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: err.message});
    }

})


module.exports=router;