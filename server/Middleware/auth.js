const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('authorization');
        if (!token) {
            return res.json({
                message: "NO Authorization token,access denied"
            });
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) {
            return res.json({
                message: "Token verification failed,authorization denied"
            });
        }
        res.user = verified._id;
        next();
    }
    catch {
        return res.json({
            message: "Something went wrong"
        });
    }
}


module.exports = auth;