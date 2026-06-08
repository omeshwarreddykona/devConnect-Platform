import emailValidator from 'email-validator';
import PasswordValidator from 'password-validator';
import bcrypt from "bcrypt";
import User from '../models/userModel.js';
import jwt from "jsonwebtoken";
import blackListedToken from '../ulits/tokenBlackList.js';



export default {

    async registerUser(body) {
        try {
            const {
                name,
                email,
                password,
                confirm_password
            } = body;


            const schema = new PasswordValidator();

            schema
                .is().min(6)
                .is().max(100)
                .has().uppercase()
                .has().lowercase()
                .has().symbols(1)
                .has().digits(3)
                .has().not().spaces()
                .is().not().oneOf(['password', 'password123']);

            let isValidPassword = schema.validate(password)

            if (!name) {
                throw { code: 400, message: "name is required" }
            }
            if (!email || !emailValidator.validate(email)) {
                throw { code: 400, message: "Enter the correct email" }
            }
            if (!password || !isValidPassword) {
                throw { code: 400, message: "Enter the  valid password" }
            }
            if (!confirm_password) {
                throw { code: 400, message: "Enter the  correct password" }
            }
            if (password !== confirm_password) {
                throw { code: 400, message: "Check the password properly" }
            }
            let existingUser = await User.findOne({ email });
            if (existingUser) {
                throw { code: 409, message: "user already exists" }
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            let createUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
            return { code: 201, message: "User registered successfully!", data: { id: createUser._id, name: createUser.name, email: createUser.email } }
        } catch (error) {
            console.log(error);
            throw { code: error.code || 500, message: error.message || "Internal Server error" }
        }
    },

    async loginUser(body) {
        try {
            const {
                email,
                password
            } = body;
            if (!email || email.trim() === "") {
                throw { code: 400, message: "email id required" }
            }
            if (!emailValidator.validate(email)) {
                throw { code: 400, message: "Invalid email" }
            }
            if (!password || password.trim() === "") {
                throw { code: 400, message: "password is required" }
            }
            let normalizedEmail = email.trim().toLowerCase();
            let findUser = await User.findOne({ email: normalizedEmail }).select("+password");
            if (!findUser) {
                throw { code: 404, message: "User not found" }
            }
            let comparePassword = await bcrypt.compare(password, findUser.password);
            if (!comparePassword) {
                throw { code: 400, message: "Incorrect  password, try again later" }
            }
            let token = jwt.sign({ user_id: findUser._id, username: findUser.name, email: findUser.email }, process.env.SECRET, { expiresIn: "1d" });
            return { code: 200, message: "User login successfully", token, data: { id: findUser._id, name: findUser.name, email: findUser.email } };
        } catch (error) {
            throw { code: error.code || 500, message: error.message || "Internal Error Error" }
        }
    },

    async getProfile(user_id) {
        try {
            let user = await User.findById(user_id);
            if (!user) {
                throw { code: 404, message: "User not found" }
            }
            return { code: 200, message: "Profile data fetched Successfully", data: { id: user._id, name: user.name, email: user.email } }

        } catch (error) {
            throw { code: error.code || 500, message: error.message || "Internal Server Error" }
        }
    },
    async logOutUser(accessToken) {
        try {
            blackListedToken.add(accessToken)
            return {
                success: true, code: 200, message: "User LogOut Successfully"
            }
        } catch (error) {
            throw { code: error.code || 500, message: error.message || "Internal Server Error" }
        }
    }
}