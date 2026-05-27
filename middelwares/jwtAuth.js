import jwt from "jsonwebtoken";
const secret = process.env.SECRET;

if (!secret) {
    throw new Error("JWT Secret is missing")
}

function verifyUser() {
    return (req, res, next) => {
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