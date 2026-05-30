import express from "express";
import registerAndLoginController from "../controllers/registerAndLoginController.js";
import loginRateLimiter from "../middelwares/loginRateLimiter.js";
import registerRateLimiter from "../middelwares/registerRateLimiter.js";

const router = express.Router();

router.post('/register',registerRateLimiter,registerAndLoginController.registerUser); 
router.post('/login',loginRateLimiter,registerAndLoginController.loginUser);

export default router;