import jwt from "jsonwebtoken";


function verifyUser() {
    return (req, res, next) => {
        const secret = process.env.SECRET;

        if (!secret) {
            throw { code: 404, message: "Jwt secret is missing" }
        }
        const token = req.headers.authorization;
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "Token missing,Access denied" })
        }

        try {
            const accessToken = token.split(' ')[1];
            const decoded = jwt.verify(accessToken, secret);

            req.user = {
                _id: decoded.user_id,
                name: decoded.username,
                email: decoded.email
            };
            next();
        } catch (error) {
            return res.status(401).json({ success: false, message: "Invalid or expired token" })
        }
    }
}


export default verifyUser;