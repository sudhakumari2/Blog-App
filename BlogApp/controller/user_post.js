const UserPost = require('../model/user_post');
const Joi = require('joi');
const UserLike = require('../model/like_dislike');
const User = require('../model/user');
const create_post = async(req, res)=>{
    const Schema = Joi.object({
        userId: Joi.string()
            .required(),
        image: Joi.string()
            .required(),
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        discription: Joi.string()
            .min(5)
            .max(50)
            .required()
    })
    let user_payload
    const validateSchema = Schema.validate(req.body)
    if(validateSchema.error){
        console.log(validateSchema.error);
        return res.status(400).json({
            message: validateSchema.error.message|| "Bad request",
            code: 400
        })

    }
    else{
        user_payload = validateSchema.value
    }
    try{
        user_payload = {
            title: user_payload.title,
            discription: user_payload.discription,
            userId: user_payload.userId,
            image: user_payload.image
        }
        const exits = await UserPost.findOne({where:{title: user_payload.title}})
        if(exits){
            return res.status(200).send({
                massage: "user post already exits",
                status: 422,
                data: exits
            })
        }
        else{
            const result = await UserPost.create(user_payload)
            return res.status(201).send({
                massage: "user post added successfully",
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
// update post
const update_post = async(req, res)=>{
    const Schema = Joi.object({
        userId: Joi.string()
            .required(),
        image: Joi.string()
            .required(),
        title: Joi.string()
            .min(5)
            .max(50)
            .required(),
        discription: Joi.string()
            .min(5)
            .max(50)
            .required()
    })
    let user_payload
    const validateSchema = Schema.validate(req.body)
    if(validateSchema.error){
        console.log(validateSchema.error);
        return res.status(400).json({
            message: validateSchema.error.message|| "Bad request",
            code: 400
        })

    }
    else{
        user_payload = validateSchema.value
    }
    try{
        const result = await UserPost.update(user_payload,{
            where:{userId: req.params.userId}
        })
        return res.status(200).send({
            message: "userPost updated successfully",
            status: 200,
            data: result
        })
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
// get all data 
const getdata = async (req, res)=>{
    try{
        const data = await UserPost.findAll()
        console.log(data)
        if(data){
            return res.status(200).send({
                massage:"all data",
                status: 200,
                deta:data
            })
        }else{
            return res.status(400).json({
                massage: 'Data not found ' || "Bad Request",
                status: 400
            })
        }
    }catch{
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}
// delete data
const delete_post = async(req, res)=>{
    try{
        const data = await UserPost.destroy({where:{userId: req.params.userId}})
        if(data){
            return res.status(200).send({
                massage:"user post deleted",
                status: 200,
            })
        }
        else{
            return res.status(400).json({
                message: "data not found",
                status:400
            })
        }
    }
    catch{
        return res.status(500).json({
            message: "internal server error",
            status: 400
        })
    }
}

// joining table 
const getData = async (req, res)=>{
    try{
        User.hasMany(UserPost, {foreignKey:'userId'})
        User.belongsTo(UserPost,{foreignKey:'userId'})
        UserPost.hasMany(UserLike,{foreignKey:'postId'})
        UserPost.belongsTo(UserLike,{foreignKey:"postId"})
        const exist =await User.findAll({where:{userId:req.params.userId},include:[{model:UserPost,include:[UserLike]}]})
        if (exist) {
            // console.log(exits);
            return res.status(200).send({
                status: 200,
                data: exist
            })
        }else{
            return res.status(400).json({
                massage: 'Data  not found ' || "Bad Request",
                status: 400
            })
        }
    }
    catch(err) {
        console.log(err);
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
}


module.exports = {create_post, update_post, getdata, delete_post, getData}