import services from "../services/RegisterAndLoginService.js";
import checkBlacklist from "../middelwares/checkBlacklist.js";

export default {

    registerUser(req, res, next) {
        services.registerUser(req.body).then(result => {
            res.status(result.code).json(result)
        }).catch(error => {
            next(error)
        })
    },

    loginUser(req, res, next) {
        services.loginUser(req.body).then(result => {
            res.status(result.code || 200).json(result)
        }).catch(error => {
            next(error)
        })
    },

    async getProfile(req, res, next) {
        try {
            let result = await services.getProfile(req.user._id);
            res.status(200).json(result);
        } catch (error) {
            next(error)
        }
    },

    async logOutUser(req,res,next){
        try{
            let result = await services.logOutUser(req.accessToken);
            res.status(200).json(result)
        }catch(error){
            next(error)
        }
    }
}