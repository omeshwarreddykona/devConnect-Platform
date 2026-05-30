import rateLimit from "express-rate-limit";

const registerRateLimiter = rateLimit({

    windowMs : 15 * 60 * 1000,

    max : 3,
    
    message : {
        success : false,
        message : "Too many attempts, register after some time"
    },

    standardHeaders : true,

    legacyHeaders : false

});

export default registerRateLimiter;