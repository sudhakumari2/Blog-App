const express = require("express")
const Joi = require('joi');
const Sequelize = require('sequelize')
const { generateToken,authenticateToken}=require('../jwt/auth')
const UserLike = require('../model/like_dislike');
const like = async(req, res)=>{
    const Schema = Joi.object({
        postId: Joi.string()
            .required(),
        Like: Joi.boolean(),
        Dislike: Joi.boolean()
    })
    let user_payload 
    try{
        user_payload = {
            postId: req.body.postId,
            Like: req.body.Like,
            Dislike: req.body.Dislike
        }
        const exits = await UserLike.findOne({ where: { postId:user_payload.postId } })
        console.log(exits);
        if (exits) {
            return res.status(200).send({
                massage: "user postId already exits",
                status: 422,
                data: exits

            })
        }
        else{
            const result = await UserLike.create(user_payload)
            return res.status(201).send({
                massage: "user like post  successfully",
                status: 201,
                data: result
            })
        }
              
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500,
            data: err
    
        })
    }



}
 // edit the like post
 const edit_like = async(req, res)=>{
    const Schema = Joi.object({
        postId: Joi.string()
            .required(),
        Like: Joi.boolean(),
        Dislike: Joi.boolean()
    })
    let user_payload 
    try{
        user_payload = {
            postId: req.body.postId,
            Like: req.body.Like,
            Dislike: false
        }
        const exits = await UserLike.findOne({ where: { postId:user_payload.postId } })
        console.log(exits);
        if (exits) {
            return res.status(200).send({
                massage: "user postId already exits",
                status: 422,
                data: exits

            })
        }
        else{
            const result = await UserLike.update(user_payload,{where:{ postId: req.params.postId }})
            return res.status(201).send({
                massage: "user liked this post",
                status: 201,
                data: result
            })
            }
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500,
            data: err
    
        })
    }
}
// 
const edit_dislike = async(req, res)=>{
    const Schema = Joi.object({
        postId: Joi.string()
            .required(),
        Like: Joi.boolean(),
        Dislike: Joi.boolean()
    })
    let user_payload 
    try{
        user_payload = {
            postId: req.body.postId,
            Dislike: req.body.Dislike,
            Like: false
        }
        const exits = await UserLike.findOne({ where: { postId:user_payload.postId } })
        console.log(exits);
        if (exits) {
            return res.status(200).send({
                massage: "user postId already exits",
                status: 422,
                data: exits

            })
        }
        else{
            const result = await UserLike.update(user_payload,{where:{ postId: req.params.postId }})
                return res.status(201).send({
                    massage: "user Disliked this post",
                    status: 201,
                    data: result
                })
            }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500,
            data: err
    
        })
    }
}

module.exports = {like, edit_like, edit_dislike}