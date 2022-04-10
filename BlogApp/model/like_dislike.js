const db = require('../connection/database');

const Sequelize=require('sequelize')
const UserLike=db.define("like_dislike",{
    postId:{
        type: Sequelize.STRING
    },
    likeId:{
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true, 
    },
    Like:{
        type:Sequelize.BOOLEAN
    },
    Dislike:{
        type:Sequelize.BOOLEAN}
})
module.exports = UserLike;
