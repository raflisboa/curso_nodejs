const express = require ("express");
const app = express();
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const Post = require('./models/Post');
// const { Post } = require('./models/Post.js');

//Config
    //Template Engine
    // app.set('views', path.join(__dirname, 'views'));
        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

//Body-Parser
    app.use(bodyParser.urlencoded({extended:false}))
    app.use(bodyParser.json())

//new route to form system
app.get("/cadastro", function(req, res){
    res.render('form')
    // res.send("Welcome")
    // res.sendfile(__dirname + "/html/index.html")
});

//redirecting posts
    app.get('/', function (req, res){
        Post.findAll({order: [['id', 'DESC']]}).then(function (posts){
            // res.render('home')
            res.render('home', {posts: posts})
            // res.render('home', {nome: "lorem",sobrenome:"ypsum"})
        })
    })

//rote to update form
app.post("/update_cadastro", function(req, res){
    Post.create({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo,
    }).then(function(){
        res.redirect('/')
    }).catch(function (erro) {
        res.send("Error" +erro)
    })
    // res.send("Texto: "+req.body.titulo+"Conteudo: "+req.body.conteudo)
});

//deletar post do db
    app.get('/deletar/:id', function(req, res){
    Post.destroy({where: {'id': req.params.id}}).then(function(){
        res.send("Postagem deletada com sucesso!")
        // res.redirect("/")
    }).catch(function(erro){
        res.send("Não foi possivel apagar o seu post : "+erro)
    }) 
});  

// app.get("/", function(req, res){
//     // res.send("Welcome")
//     res.sendfile(__dirname + "/html/index.html")
// });

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