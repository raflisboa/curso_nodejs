const Sequelize = require('sequelize')
const sequelize = new Sequelize('sistemaDeCadastro','root','facti',{
    host: "localhost",
    dialect: "mysql"
} )

// sequelize.authenticate().then(function(){
//     console.log("DB Up")
// }).catch(function (erro){
//     console.log("Falha ao se conectar "+erro)
// })

const Postagem = sequelize.define('postagens', {
    titulo:{
        type: Sequelize.STRING
    },
    conteudo:{
        type: Sequelize.TEXT
    }
})

const Usuario = sequelize.define('usuarios', {
    nome:{
        type: Sequelize.STRING
    },
    sobrenome:{
        type: Sequelize.STRING
    },
    idade:{
        type: Sequelize.INTEGER
    },
    email:{
        type: Sequelize.STRING
    },
})

// usar apenas para sincronizar as tabelas
// Postagem.sync({force:true})
// Usuario.sync({force:true})

Usuario.create({
    nome:"Lorem",
    sobrenome:"ipsum",
    idade:15,
    email:"ipsum@ipsum.co"
})