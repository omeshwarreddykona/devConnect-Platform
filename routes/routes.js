import express from "express";
import registerAndLoginController from "../controllers/registerAndLoginController.js";
import loginRateLimiter from "../middelwares/loginRateLimiter.js";
import registerRateLimiter from "../middelwares/registerRateLimiter.js";
import verifyUser  from "../middelwares/jwtAuth.js";
import checkBlacklist from "../middelwares/checkBlacklist.js";

const router = express.Router();

router.post('/register',registerRateLimiter,registerAndLoginController.registerUser); 
router.post('/login',loginRateLimiter,registerAndLoginController.loginUser);
router.get('/get-profile',checkBlacklist,verifyUser(),registerAndLoginController.getProfile);
router.post('/logout',checkBlacklist,verifyUser(),registerAndLoginController.logOutUser);

export default router;