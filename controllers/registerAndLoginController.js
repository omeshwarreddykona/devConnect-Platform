import services from "../services/RegisterAndLoginService.js";

export default {

        registerUser(req,res,next){
            services.registerUser(req.body).then(result =>{
                res.status(result.code).json(result)
            }).catch(error =>{
                next(error)
            })
        }
    }