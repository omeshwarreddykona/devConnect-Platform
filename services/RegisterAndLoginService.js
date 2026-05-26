import emailValidator from 'email-validator';
import PasswordValidator from 'password-validator';
import bcrypt from "bcrypt";
import User from '../models/userModel.js';

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
            if(password !== confirm_password){
                throw {code : 400, message: "Check the password properly"}
            }
            let existingUser = await User.findOne({email});
            if(existingUser){
                throw {code :409, message : "user already exists"}
            }
            let hashedPassword = await bcrypt.hash(password, 10);
            let createUser = await User.create({
                name: name,
                email: email,
                password: hashedPassword
            });
            return {code : 201, message : "User registered successfully!",data : {id:createUser._id,name:createUser.name,email:createUser.email}}
        } catch (error) {
            console.log(error);
            throw { code: error.code || 500, message: error.message || "Internal Server error" }
        }
    }
}