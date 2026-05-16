
import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({
                message: "يجب التسجيل أولاً (JWT)"
            });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                message: "توكن غير موجود"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "توكن غير صالح أو منتهي"
        });
    }
};