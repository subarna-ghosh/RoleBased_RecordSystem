const express=require('express')
const Router=express.Router()
const UserController=require('../controllers/AuthController');

// user registers
Router.post('/user/register',UserController.register);
// user login
Router.post('/user/login',UserController.login);

module.exports=Router;