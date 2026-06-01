import express from "express";
import registerAndLoginController from "../controllers/registerAndLoginController.js";
import loginRateLimiter from "../middelwares/loginRateLimiter.js";
import registerRateLimiter from "../middelwares/registerRateLimiter.js";
import verifyUser  from "../middelwares/jwtAuth.js";

const router = express.Router();

router.post('/register',registerRateLimiter,registerAndLoginController.registerUser); 
router.post('/login',loginRateLimiter,registerAndLoginController.loginUser);
router.get('/get-profile',verifyUser(),registerAndLoginController.getProfile);

export default router;