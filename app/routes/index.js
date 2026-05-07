const express=require('express')
const Router=express.Router()

const userRoute=require('./UserRoute')
Router.use('/api',userRoute)

const recordRoute=require('./RecordRoute')
Router.use('/record',recordRoute)

module.exports=Router;