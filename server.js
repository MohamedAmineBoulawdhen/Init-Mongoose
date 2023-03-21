const express =require ("express");
const app=express();
// const  PORT=5000;
require("dotenv").config();
const PORT = process.env.PORT;

app.use(express.json());

//connect to database
const connect =require("./config/connectdb.js")
connect();

// app.get("/",(req,res)=>{
// res.end("yayy")
// })

//creating and saving person instance
const Person = require("./models/person");
const person = new Person({
    name:"John",
    age:25,
    favoriteFood:["pizza","burger"]
})
person.save()
.then((collection)=>{console.log('Collection is created!');})
.catch((err)=>{console.log("err to add one person!!");});
//save is no longer accepet callback function the same for Model.create
/* in recent versions of Mongoose, this feature has been removed in favor of using Promises 
or async/await syntax to handle asynchronous operations*/


//creating an array of people
const arrayOfPeople =[
    {name: 'Mary', age: 30, favoriteFood: ["burrito", "tacos"] },
    { name: 'Joe', age: 35, favoriteFood: ["steak", "chicken"] },
    { name: 'Alice', age: 28, favoriteFood: ["pasta", "salad"] },
]
//create multiple people using Model.create()
//Person.create(arrayOfPeople) or to aviod error:
Person.create(arrayOfPeople)
.then((data)=>{console.log("data is added")})
.catch((err)=>{console.log("err to add multiple people!!")})

//Finding all people with a given name using Model.find()
Person.find({name:"Mary"})  
.then((people) => {
    console.log(`Found ${people.length} people with the name Mary.`);
    console.log(people)
  })
  .catch((err) => {
    console.error(err);
  });

//find one person with a certain food in thier favoritefood using Model.findOne()
Person.findOne({favoriteFood:"burrito"})
.then((person)=>{console.log("founded!!");
console.log(person);})
.catch((err)=>{console.error(err);})

//Finding a person by _id and updating their favoriteFoods using classic update method
const personId = '64198fd73e59ac63ce46f5a0';
Person.findById(personId)
.then((person)=>{
    person.favoriteFood.push("Hamburgerrrr")
    return person.save();
})
.then((personupdated)=>{console.log(personupdated);})
.catch((err)=>{console.error(err);});
//Perform new updates on a document using model.findOneAndUpdate()
const personName="Mary";
Person.findOneAndUpdate({name:personName},{age:20},{new:true})
.then((data)=>{
    console.log(data);
})
.catch((err)=>{console.error(err);})

//Delete one document using model.findByIdAndDelete()
const personIdDelete="64198fd73e59ac63ce46f59f"
Person.findByIdAndDelete(personIdDelete)
.then((data)=>{
    console.log(data,"deleted successfully");
}).catch((err)=>{console.error(err);})

//Deleting all people with a given name with model.deleteMany()
Person.deleteMany({name:"Joe"})
.then((data)=>{
    console.log("joe's docs are deleted successfully");
})
.catch((err)=>{console.error(err);});

//Chain search query helpers to narrow search results where find in first verion doesn't return promise
// async function searchPersons(){
//     try{
//         const data = await Person.find({favoriteFood: "pizza" })
//         .sort("name")
//         .limit(2)
//         .select("-age")
//         .exec();
//         console.log("----search---\n",data,"\n----search---");
//     }
//     catch(err){
// console.error(err);
//     }
// }
// searchPersons();
//Chain search query helpers to narrow search results
Person.find({ favoriteFoods: 'Burritos' })
  .sort('name')
  .limit(2)
  .select('-age')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });


app.listen(PORT,()=>{
    console.log(`listening on port http://localhost:${PORT}`)

})
