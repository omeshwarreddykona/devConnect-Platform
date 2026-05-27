import jwt, { verify } from "jsonwebtoken";
const secret = process.env.SECRET;


function verifyUser(){
    return (req,res,next) =>{
        const token = req.headers.authorization;
        if(!token || !token.startsWith("Bearer")){
            return res.status(404).json({success:false,message :"Token missing,Access denied"})
        }

        try{
            const verifytoken = token.split(' ')[1];
            const decoded = jwt.verify(verifytoken,secret);

            req.user = {
                _id : decoded.user_id,
                name: decoded.username,
                email:decoded.email
            };
            next();
        }catch(error){
            return res.status(error.code || 500).json({success:false,message: error.message || "Invalid token"})
        }
    }
}