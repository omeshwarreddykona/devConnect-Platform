import services from "../services/RegisterAndLoginService.js";

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
    }
}