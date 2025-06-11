const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.depositMoney = async (req, res) => {

    const { userEmail } = req.query;

    const { valor, passwordUser } = req.body;

    const user = await User.findOne({ email: userEmail });

    if (!user) return res.status(404).json({ message: "Usuário não encontrado" });

    const checkPass = await bcrypt.compare(passwordUser, user.password)

    if (!checkPass) return res.status(422).json({ message: "Senha incorreta" });

    if (!valor || valor <= 0) return res.status(400).json({ message: "Insira no mínimo R$ 1,00 para depósito" });

    if (valor > 1000) return res.status(400).json({ message: "Valor máximo de depósito é R$ 1000,00" });

    try {
        user.saldo += Number(valor);
        await user.save();
        res.status(200).json({ message: "Depósito realizado com sucesso", newBalance: user.saldo });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao realizar depósito", error: error.message });
    }

}

exports.transferMoney = async (req, res) => {
    const { userEmail } = req.query;
    const { valor, destinatario, passwordUser } = req.body;

    if (!userEmail || !valor || !destinatario || !passwordUser) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios" });
    }

    const user = await User.findOne({ email: userEmail });

    const checkPass = await bcrypt.compare(passwordUser, user.password)

    if (!checkPass) return res.status(422).json({ message: "Senha incorreta" });

    if (!user) {
        return res.status(404).json({ message: "usuário não encontrado" })
    }

    const destinatarioUser = await User.findOne({ email: destinatario });
    if (!destinatarioUser) {
        return res.status(404).json({ message: "destinatário não encontrado" })
    }

    if (userEmail === destinatario) {
        return res.status(400).json({ message: "Você não pode transferir dinheiro para si mesmo" });
    }

    if (valor <= 0) {
        return res.status(400).json({ message: "Valor inválido para transferência" });
    }

    if (valor > user.saldo) {
        return res.status(400).json({ message: "Saldo insuficiente para transferência" });
    }

    try {
        user.saldo -= Number(valor);
        destinatarioUser.saldo += Number(valor);
        await user.save();
        await destinatarioUser.save();
        res.status(200).json({ message: "Transferência realizada com sucesso", newBalance: user.saldo });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao realizar transferência", error: error.message });
    }

}