const Sequelize = require('sequelize');
const db = new Sequelize("BlogApp", "root","Sudha@123",{
    host: "localhost",
    dialect: "mysql",
    pool:{
        max: 5,
        min: 0,
        acquire: "30000",
        idle: "10000"
    }
})
module.exports = db;