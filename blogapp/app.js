//modules
const express = require ("express");
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin")
const path = require("path")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
//config
    //Session
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())

    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })

     //Public
    app.use(express.static(path.join(__dirname,"public")))

    // app.use((req, res,next ) => {
    //     console.log("Middleware up")
    //     next()
    // })

//config
    //Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())

    //handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars');

    //mongoose
    mongoose.Promise = global.Promise;
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect("mongodb://localhost/blogapp",{ useNewUrlParser: true }).then(() => {
        console.log("MongoDB Up")
    }).catch((err) => {
        console.log("Erro - Server Down"+err)
    })

//routes
    app.get('/', (req, res) => {
        res.send('Main Route')
    })

    app.get('/posts', (req, res) => {
        res.send('Posts List')
    })

    app.use('/admin', admin)

//misc
const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando na url http://localhost:8081")
})