const mongoose = require("mongoose");

//mongoose config
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test", {
    useMongoClient: true
}).then(() =>{
    console.log("MongoDb Connected")
}).catch((err) => {
    console.log("Erro type"+err)
})

//Schema define
const UserSchema = mongoose.Schema({
    Nome:{
        type: String,
        require: true
    },
    sobrenome:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true
    },
    idade:{
        type: Number,
        require: true
    },
    pais:{
        type: String,
        require: true
    }
})

//Create a collection
mongoose.model('users', UserSchema)

const Person = mongoose.model('users')
new Person({
    Nome: "Lorem",
    sobrenome: "Ipsum",
    idade:19,
    email: "lorem@ipsum",
    pais: "br"
}).save().then(() =>{
    console.log("User OK")
}).catch((err) => {
    console.log ("Error type"+err)
})