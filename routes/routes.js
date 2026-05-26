import express from "express";
import registerAndLoginController from "../controllers/registerAndLoginController.js";

const router = express.Router();

router.post('/register',registerAndLoginController.registerUser);


export default router;