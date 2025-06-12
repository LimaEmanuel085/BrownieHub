const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res) => {
    const { userEmail, userPassword } = req.body;

    if (!userEmail || !userPassword) {
        return res.status(400).json({ message: 'Preencha todos os campos.' });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
        return res.status(404).json({
            message: 'Usuário não encontrado. Registre-se primeiro.'
        });
    }

    const checkPass = await bcrypt.compare(userPassword, user.password);

    if (!checkPass) {
        return res.status(422).json({ message: 'Senha incorreta.' });
    }

    try{
        const secret = process.env.SECRET_KEY;
        const token = jwt.sign({
            id: user.id
        }, secret)

        res.status(200).json({
            message: 'Autenticação realizada com sucesso.',
            token: token,
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
            userBalance: user.saldo
        })

    } catch (error) {
        return res.status(500).json({ message: 'Erro ao gerar token.', erro: error.message });
    }

}