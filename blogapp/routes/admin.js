const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")

router.get('/', (req, res) => {
    // res.send('Hello World! - Main Page')
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send('Hello World! - Posts Page')
})

router.get('/categorias', (req, res) => {
    // res.send('Hello World! - Posts Type Page')
    res.render("admin/categorias")
})

router.get('/categorias/add', (req, res) => {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome inválido"})
    }

    if(!req.body.slug || typeof req.body.slug == undefined || req.body.slug == null){
        erros.push({texto: "Slug inválido"})
    }

    if(req.body.nome.length < 2){
        erros.push({texto: "Tamanho inválido"})
    }

    if(erros.length > 0){
        res.render("admin/addcategorias", {erros: erros})        
    }else{
        const novaCategoria = {
            nome: req.body.nome,
            slug: req.body.slug
        }
    
        new Categoria(novaCategoria).save().then(() => {
            // console.log("Categoria Salva!")
           req.flash("success_msg", "Categoria criada com sucesso!")
           res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro no cadastro")
            res.redirect("/admin")
            // console.log("Erro ao salvar categoria"+err)
        })
    }
})

// router.listen(port, () => 
//     console.log('Example app listening on port port!')
// )

module.exports = router