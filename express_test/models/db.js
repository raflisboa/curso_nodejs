const Sequelize = require('sequelize')

//DB Connection
const sequelize = new Sequelize('postapp','root','facti', {
    host: "localhost",
    dialect: "mysql"
} )

// var db = {};

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize,
}