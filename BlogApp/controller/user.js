const User = require('../model/user');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const { generateAccessToken } = require('../jwt/auth');
const register = async(req, res)=>{
    const Schema = Joi.object({
        Name: Joi.string()
            .min(5)
            .max(30)
            .required(),
        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .required(),
        password: Joi.string()
            .min(8)
            .max(16)
            .required()
    });
    let payload 
    const validSchema = Schema.validate(req.body)
    if (validSchema.error) {
        // console.log(validSchema.error)
        return res.status(400).json({
            massage: validSchema.error.massage || "Bad Request",
            code: 400
        })
    } 
    else{
        payload = validSchema.value
    }
    try{
        payload = {
            Name: payload.Name,
            Email: payload.Email,
            password: Bcrypt.hashSync(payload.password,10)
        }
        const exits = await User.findOne({ where: { Email: payload.Email } })
        console.log(exits);
        if (exits) {
            return res.status(200).send({
                massage: "user already exits",
                status: 422,
                data: exits

            })
        }
        else {
            const result = await User.create(payload)
            return res.status(201).send({
                massage: "user added successfully",
                status: 201,
                data: result
            })

        }
    }
    catch(err){
        return res.status(500).json({
            massage: 'internal server Error',
            status: 500
        })
    }
    
}

//user login
const user_login = async(req, res)=>{
    const Schema = Joi.object({
        Email: Joi.string()
            .email()
            .min(5)
            .max(50)
            .optional(),
        password: Joi.string()
            .min(8)
            .max(16)
            .optional()
    });
    let payload 
    const validSchema = Schema.validate(req.body)
    if (validSchema.error) {
        return res.status(400).json({
            massage: validSchema.error.massage || "Bad Request",
            code: 400
        })
    } 
    else{
        payload = validSchema.value
    try { 
        const exits = await User.findOne({where:{Email:payload.Email}})
        if(!exits){
            return res.status(404).send({
                massage: "data not found",
                status: 404,
            })
        }
        else{
            let password= await Bcrypt.compareSync(req.body.password,exits.password)
            // console.log(password,".//////////////////////");
            if(password){
                var token = await generateAccessToken(req.body)
                console.log(token);
                return res.cookie("token",token).send(data, "login sucessfully")
                
            }   
            else{
                return res.status(404).send({
                    massage: "password or email invalid",
                    status: 404,
                })
            }
            
        }
    }
    catch(err){
        console.log(err)
        res.send(err)
    }
    
}
}
module.exports= {register, user_login}
