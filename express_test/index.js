const express = require ("express")
const app = express();
const handlebars = require('express-handlebars');
const Sequelize = require('sequelize')

//Config
    //Template Engine
    // app.set('views', path.join(__dirname, 'views'));
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

//DB Connection
const sequelize = new Sequelize('sistemaDeCadastro','root','facti',{
    host: "localhost",
    dialect: "mysql"
} )

//new rote to posts system
app.get("/cadastro", function(req, res){
    res.render('form')
    // res.send("Welcome")
    // res.sendfile(__dirname + "/html/index.html")
});


app.get("/", function(req, res){
    // res.send("Welcome")
    res.sendfile(__dirname + "/html/index.html")
});

// app.get("/about", function(req, res){
//     // res.send("Loren Ipsum")
//     res.sendfile(__dirname + "/html/about.html")
// });

// app.get("/blog", function(req, res){
//     res.send("Loren Ipsum")
// });

//passar parametros
// app.get("/ola/:cargo/:nome/:cor", function(req, res){
//     res.send("<h1>Loren Ipsum "+req.params.nome+"</h1>"+"<h2> Seu cargo e:"+req.params.cargo+"</h2>")
// });


app.listen (8080, function(){
    console.log("Server is up")
})