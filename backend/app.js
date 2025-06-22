const dotenv=require('dotenv');
dotenv.config();
const cors=require('cors');
const connectToDB=require('./db/db')
const express=require('express');
const cookieParser=require('cookie-parser');
const mapsRoutes=require('./router/maps.routes')
const userRoutes=require('./router/user.routes');
const rideRoutes=require('./router/ride.routes');
const captainRoutes=require('./router/captain.routes');
const app=express();
app.use(cookieParser());
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({extended:true}));
 connectToDB();

app.get("/",(req,res)=>{
res.send("its me ronish")});
app.use('/maps',mapsRoutes)
app.use('/users',userRoutes);
app.use('/captains',captainRoutes);
app.use('/rides',rideRoutes);
module.exports=app;