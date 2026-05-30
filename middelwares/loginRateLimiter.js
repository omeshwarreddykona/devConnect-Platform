import rateLimit from "express-rate-limit";


const loginRateLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,

    max : 5,

    message : {
        success : false,
        message : "Too many attempts, Please try again later"
    },

    standardHeaders : true,

    legacyHeaders : false
});


export default loginRateLimiter;