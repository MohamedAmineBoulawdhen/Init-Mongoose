const mongoose=require("mongoose");

//create schema
const schema = mongoose.Schema;

//Create a person schema
const personSchema= new schema({
name:{
    type : String,
    required:true,
    unique: true, /* just to avoid multiple document while I use nodemon*/
},
age:{
type : Number,
},
favoriteFood:{
type: [{type: String}],
}
})

//create model
const Person= mongoose.model("person",personSchema);

module.exports=Person;