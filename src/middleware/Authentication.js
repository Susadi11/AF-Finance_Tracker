const jwt  = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {

    const token = req.headers.authorization;

    import('crypto-random-string').then(({ default: cryptoRandomString }) => {
        const secretKey = cryptoRandomString({ length: 32, type: 'url-safe'});
        console.log('Generated token:', secretKey);

        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                res.status(401).json({error: 'Unauthorized'});
            } else {
                req.user = decoded.username;
                next();
            }
        });
    }).catch((err) => {
        console.error('Error getting authentication token:', err);
        res.status(500).json({error: 'Internal Server Error'});
    });
};

module.exports = authenticateUser;