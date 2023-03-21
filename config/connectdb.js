const mongoose= require("mongoose");
const connect= async () =>{
    try {
        await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("conncted to database...");
    } catch (error) {
        console.log(error);
    }
}


module.exports=connect;