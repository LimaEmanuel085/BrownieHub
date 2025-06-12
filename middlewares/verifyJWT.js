const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }

    try {

        const secret = process.env.SECRET_KEY;
        jwt.verify(token, secret);

        next();

    } catch (error) {
        return res.status(400).json({ message: 'Token inválido.', erro: error.message });
    }
}