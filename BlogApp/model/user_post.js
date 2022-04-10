const db = require('../connection/database');
const Sequelize=require('sequelize');
const { date } = require('joi');
const UserPost=db.define("user_post",{
    postId:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    userId:{
        type: Sequelize.STRING
    },
    image:{
        type: Sequelize.STRING
    },
    title:{
        type:Sequelize.STRING},
    discription:{
        type:Sequelize.STRING},
    createdAt:{
        type: Sequelize.DATE,
        default: new Date()
    }
})
module.exports = UserPost;