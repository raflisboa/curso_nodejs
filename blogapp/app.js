//modules
const express = require ("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require("mongoose")
// const session = require("express-session")
const flash = require("connect-flash")
require("./models/Postagem")
const Postagem = mongoose.model("postagens")
require("./models/Categoria")
const Categoria = mongoose.model("categorias")
const moment = require('moment')
const usuarios = require("./routes/usuario")
mongoose.set('useCreateIndex', true)
const passport = require("passport")
require("./config/auth")(passport)
const db = require("./config/db")
require("dotenv").config();
const session = require('cookie-session')

//config
    //Session
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

    //Middleware
    app.use((req, res, next)=>{
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
        next()
      })

    // app.use((req, res,next ) => {
    //     console.log("Middleware up")
    //     next()
    // })

//config
    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //handlebars
    // app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.engine('handlebars', handlebars({
        defaultLayout: 'main',
        helpers: {
            formatDate: (date) => {
                return moment(date).format('DD/MM/YYYY')
            }
        }
    }))
    app.set('view engine', 'handlebars');
    
    const uri = process.env.MONGODB_URI;
    // mongoose
    // console.log('link de conexão: ' + db.mongoURI')
    mongoose.Promise = global.Promise
    mongoose.set('useUnifiedTopology', true)
    mongoose.connect(db.mongoURI,{useNewUrlParser: true}).then(() => {
    // mongoose.connect(process.env.MONGODB_URI,{useNewUrlParser: true}).then(() => {
        console.log("MongoDB Up -> "+ db.mongoURI)
    }).catch((err) => {
        console.log("Erro durante a conexão ao BD Mongoose -> "+err+ db.mongoURI)
    })

// Public
app.use(express.static(path.join(__dirname, 'public')))

//routes

// app.get("/",(req, res)=>{
//      res.render("")
//     })

app.get("/", function(req, res){
    Postagem.find().populate("categoria").sort({data: 'desc'}).then(function(postagens){
        res.render("index", {postagens: postagens.map((postagem) => postagem.toJSON())});
    }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/404")
        })
    })

    app.get("/postagem/:slug", (req, res) => {
        // Postagem.findOne({slug: req.params.slug}).lean().populate("categoria").then((postagem) =>{
        Postagem.findOne({slug: req.params.slug}).lean().populate("categoria").then((postagem) =>{
            if(postagem){
                res.render("postagem/index", {postagem: postagem})
            }else{
                req.flash("error_msg", "Postagem não existe")
                res.redirect("/")
            }
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro interno")
            res.redirect("/")
        })
    })

    app.get("/categorias", (req, res) => {
        Categoria.find().lean().then((categorias) => {
            // res.render("categorias/index", {categorias: categorias.map(Categoria=> Categoria.toJSON())})
            res.render("categorias/index", {categorias: categorias})
        }).catch((err)=> {
            req.flash("error_msg", "Houve um erro  "+err)
            res.redirect("/")
        })
    })

    app.get("/categorias/:slug", (req, res) => {
        Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
            if(categoria){
                Postagem.find({categoria: categoria._id}).lean().then((postagens) =>{
                    res.render("categorias/postagens", {postagens: postagens, categoria: categoria})
                }).catch((err)=> {
                    req.flash("error_msg", "Houve um erro  "+err)
                    res.redirect("/")
                })
            }else{
                res.flash("error_msg", "Categoria Inexistente  "+err)
                res.redirect("/")
            }
        }).catch((err) =>{
            req.flash("error_msg", "Erro ao carregar categoria  "+err)
            res.redirect("/")
        })
    })

    app.get("/404", (req, res) =>{
        res.send('Erro 404!')
    })

    app.get('/posts', (req, res) => {
        res.send('Posts List')
    })

    app.use('/admin', admin)
    app.use('/usuarios', usuarios)
  
//misc
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando na url http://localhost:8081")
})