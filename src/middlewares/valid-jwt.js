import jwt from 'jsonwebtoken';
import User from '../user/user.model.js';  

export const validateJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: "There is not a token",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user) {
            return res.status(401).json({
                msg: 'User does not exists in the database'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token is not valid - user with state:false'
            });
        }

        req.user = user;

        next();
    } catch (e) {
        console.log(e);
        res.status(401).json({
            msg: "Token is not valid",
        });
    }
}
