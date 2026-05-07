const express=require('express');
const Router=express.Router();
const RecordController=require('../controllers/RecordController');
const authCheck=require('../middleware/authCheck');
const allowRoles=require('../middleware/allowRoles');

Router.post('/create/record',authCheck,allowRoles("admin","manager","employee"),RecordController.create);

module.exports=Router;