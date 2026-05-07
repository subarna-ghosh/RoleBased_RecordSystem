require('dotenv').config()
const express=require('express')
const app=express()
const cors=require('cors')
const db=require('./app/config/db')
db();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3002",
//     credentials: true,
//   })
// );

const apiRoutes=require('./app/routes')
app.use(apiRoutes);

const port=3003
app.listen(port,()=>{
    console.log(`server is running on port-->http://localhost:${port}`);
})