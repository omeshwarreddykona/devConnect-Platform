import blackListedToken from "../ulits/tokenBlackList.js";


function  checkBlacklist(req,res,next){
    
    const token = req.headers.authorization;

    if(!token || !token.startsWith("Bearer ")){
        return res.status(401).json({success : false , message : "Token missing or Invalid token"})
    }

    const accessToken = token.split(' ')[1];
    req.accessToken = accessToken;
    if(blackListedToken.has(accessToken)){
        return res.status(401).json({success:false , message : "Token has been loggedout, login again"})
    }

    next();
};

export default checkBlacklist;