const User = require('../models/user');
const bcrypt = require('bcrypt');


exports.registerUser = async (req, res) => {
    const { userName, userPassword, confirmedPassword, userEmail } = req.body;

    if (!userName || !userEmail || !userPassword || !confirmedPassword) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    if (userPassword !== confirmedPassword) {
        return res.status(422).json({ message: 'As senhas não conferem' });
    }

    const userExists = await User.findOne({ email: userEmail });
    if (userExists) {
        return res.status(409).json({ message: 'Usuário já cadastrado' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(userPassword, salt);

    const user = new User({
        name: userName,
        password: passwordHash,
        email: userEmail,
        saldo: 0
    })

    try {
        await user.save();
        res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (e) {
        res.status(500).json({ message: "Ops, algo deu errado no servidor, tente novamente.", error: e })
    }

}

exports.deleteUser = async (req, res) => {
    const { userEmail } = req.body;
    if (!userEmail) {
        return res.status(422).json({ message: 'Preencha o campo de email' });
    }
    try {

        await User.deleteOne({ email: userEmail })
        const users = await User.find().select('-password');
        res.status(200).json({ message: "Usuário deletado com sucesso", users: users });

    } catch (e) {
        return res.status(500).json({ message: 'Ops, algo deu errado no servidor, tente novamente.' });
    }
}

exports.updateUser = async (req, res) => {

    const { userEmail } = req.query;

    const { newName, newPassword, confirmedPassword } = req.body;

    if (!userEmail || !newName || !newPassword || !confirmedPassword) {
        return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    if (newPassword !== confirmedPassword) {
        return res.status(422).json({ message: 'As senhas não conferem' });
    }

    const userExists = await User.findOne({ email: userEmail });

    if (!userExists) {
        return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    await User.updateOne(
        { email: userEmail },
        {
            $set: {
                name: newName,
                password: newPassword ? await bcrypt.hash(newPassword, 10) : undefined
            }
        }
    );

    res.status(200).json({
        message: 'Usuário atualizado com sucesso',
        user: {
            email: userEmail,
            name: newName
        }
    });
}

exports.viewUser = async (req, res) => {
    const { userEmail } = req.params;

    try {
        const user = await User.findOne({ email: userEmail });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(user);
    } catch (e) {
        res.status(400).json({ message: "Ops, algo de errado aconteceu, tente novamente mais tarde." });
    }
}