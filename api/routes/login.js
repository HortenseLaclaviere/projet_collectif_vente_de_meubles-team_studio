var express = require('express');
const { Sequelize } = require('sequelize');
var router = express.Router();
require('dotenv').config();
var bcrypt = require("bcrypt");
const saltRounds = 10;

const sequelize = new Sequelize(process.env.database, process.env.user, process.env.password, {
dialect: 'mysql', host: 'localhost'
});

router.post('/', async(req,res)=>{
    const {email,password} = req.body;
    let sql3 = `SELECT user_email, user_password From user WHERE user_email = '${email}'`
    const checkUser = await sequelize.query(sql3, {
                        type: sequelize.QueryTypes.SELECT
                        }).catch((err)=>{
                        console.log(err)
                        })
    console.log(checkUser)
    if (checkUser.length === 0) {
        return res.status(404).send({message:"User Not Found"})//modif send instead of json
    }else {
        bcrypt.compare(password, checkUser[0]['user_password'], (err, data) => {
                if(err) {return res.send("error verifying credentials")}
                else if (data) {
                    console.log("Login Successful")
                    return  res.send({message:"Login Successful"})
                                .redirect('/furnitures')
                    
                } else {
                    return res.status(400).send({message:"Invalid credentials"})
                }
    })
}})

module.exports = router;