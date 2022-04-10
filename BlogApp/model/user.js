const db = require('../connection/database');
const Sequelize=require('sequelize')
const User=db.define("user",{
    userId:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
    Name:{
        type:Sequelize.STRING},
    Email:{
        type:Sequelize.STRING},
    password:{
        type:Sequelize.STRING},
})

module.exports = User;