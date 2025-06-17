exports.verifyAdmin = (req, res, next) => {
    const adminKey = req.headers['x-admin-key'];
    const key = process.env.ADMIN_KEY
    if (adminKey == key) {
        next();
    } else {
        res.status(403).json({ message: 'Acesso negado. Você não é um administrador.'});
    }
};
