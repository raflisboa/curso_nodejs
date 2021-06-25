const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Categoria")
const Categoria = mongoose.model("categorias")
require("../models/Postagem")
const Postagem = mongoose.model("postagens")
const {eAdmin} = require("../helpers/eAdmin")

router.get('/', eAdmin, (req, res) => {
    // res.send('Hello World! - Main Page')
    res.render("admin/index")
})

router.get('/posts', eAdmin, (req, res) => {
    res.send("Página de posts")
})

router.get("/categorias", eAdmin,(req,res)=>{
    Categoria.find().sort({date:"desc"}).then((categorias)=>{
        res.render("admin/categorias", {categorias:categorias.map(categorias => categorias.toJSON())})
    }).catch((err)=>{
        req.flash("error_msg","Houve um erro ao listar as categorias")
        res.redirect("/admin")
    })
})

router.get('/categorias/add', eAdmin,(req, res) => {
    res.render("admin/addcategorias")
})

router.post("/categorias/nova", eAdmin,(req, res) => {
    //validação de erros
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

router.get("/categorias/edit/:id", eAdmin,(req, res) => {
    Categoria.findOne({_id:req.params.id}).then((categoria) => {
        res.render("./admin/editcategorias",  {categoria:categoria.toJSON()})
    }).catch((err) => {
        req.flash("error_msg", "Categoria Inexistente. Tipo de erro -->> "+err)
        res.redirect("/admin/categorias")
    })
})

router.post("/categorias/edit/", eAdmin,(req, res) => {
    Categoria.findOne({_id:req.body.id}).populate("categoria").lean().then((categoria) => {
    //validação de erros
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
        categoria.nome = req.body.nome
        categoria.slug = req.body.slug
            // const postCategoria = new Categoria(categoria);
        categoria.save().then(() => {
            req.flash("success_msg", "Categoria editada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Erro ao Salvar categoria. Tipo de erro -->> "+err)
            res.redirect("/admin/categorias")
        })
    }
    }).catch((err) => {
        req.flash("error_msg", "Erro em editar Categoria. Tipo de erro -->> "+err)
        res.redirect("/admin/categorias")
    })
})

    router.post("/categorias/deletar", eAdmin,(req, res) => {
        Categoria.deleteOne({_id: req.body.id}).then(() => {
            req.flash("success_msg", "Categoria deletada com sucesso!")
            res.redirect("/admin/categorias")
        }).catch((err) => {
            req.flash("error_msg", "Erro em deletar Categoria. Tipo de erro -->> "+err)
            res.redirect("/admin/categorias")
        })
    })

    router.get("/postagens", eAdmin,(req, res) => {
        Postagem.find().populate("categoria").sort({data:"desc"}).lean().then((postagens) =>{
            res.render("admin/postagens", {postagens: postagens})
        // res.render("admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Erro em listar postagens. Tipo de erro -->> "+err)
            res.redirect("/admin")
        })    
    })

    router.get("/postagens/add", eAdmin,(req, res) => {
        Categoria.find().sort({nome: 'asc'}).lean(true).then((categorias)=>{
            res.render('admin/addpostagem', {categorias: categorias})
        }).catch((err)=>{
            req.flash('error_msg', "Houve um erro ao carregar o formulário  Tipo de erro -->> "+err)
            res.redirect('/admin')
          })
    })

    router.post("/postagens/nova", eAdmin,(req, res) => {
        //validação de erros
        var erros = []

        if (req.body.categoria == "0"){
            erros.push({texto: "Categoria inválida"})
        }

        if(erros.length > 0){
            res.render("admin/addpostagem", {erros: erros})
        }else{
            const novaPostagem ={
                titulo: req.body.titulo,
                descricao: req.body.descricao,
                conteudo: req.body.conteudo,
                categoria: req.body.categoria,
                slug: req.body.slug
            }

        new Postagem(novaPostagem).save().then(() => {
            req.flash("success_msg", "Postagem criada com sucesso!")
            res.redirect("/admin/postagens")
        }).catch((err) => {
            req.flash("error_msg", "Houve um erro na postagem  => "+err)
            res.redirect("/admin/postagens")
        })
    }
})

// router.get("/postagens/edit/:id", (req, res) => {
//     Postagem.findOne({_id:req.params.id}).lean().then((postagem) => {
//         Categoria.find().lean().then((categorias)=> {
//             // res.render("./admin/editpostagens",  {categoria: categoria.toJSON(),postagem: postagem.toJSON()})
//             res.render('admin/editpostagens', {categorias: categorias.toJSON, postagem: postagem})
//             // res.render("./admin/editpostagens",  {postagem:postagem.toJSON()})
//         }).catch((err) => {
//             req.flash("error_msg", "Erro ao listar Categorias. Tipo de erro -->> "+err)
//             res.redirect("/admin/postagens")
//         })
//     }).catch((err) => {
//         req.flash("error_msg", "Erro ao listar Postagens. Tipo de erro -->> "+err)
//         res.redirect("/admin/postagens")
//     })
// })

router.get("/postagens/edit/:id", eAdmin,(req, res) => {
Postagem.findOne({_id: req.params.id}).populate("categoria").then((postagem) => {
    Categoria.find({_id: {$ne: postagem.categoria._id}}).lean().sort({nome: 'asc'}).then((categorias) => {
        res.render('admin/editPostagens', {postagem: postagem.toJSON(), categorias: categorias})
        })
            }).catch((err)=>{
                req.flash("error_msg", "Houve um erro ao editar a categoria!")
                res.redirect("/admin/postagens")
            })
})

router.get("/postagens/deletar/:id", eAdmin,(req, res) => {
    Postagem.deleteOne({_id: req.params.id}).then(() =>{
        req.flash("success_msg", "Postagem deletada com sucesso!")
        res.redirect("/admin/postagens")
    }).catch((err)=>{
        req.flash("error_msg", "Houve um erro ao deletar a postagem!")
        res.redirect("/admin/postagens")
    })
})

// router.listen(port, () => 
//     console.log('Example app listening on port port!')
// )

module.exports = router