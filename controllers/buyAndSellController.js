const User = require('../models/user');
const Brownie = require('../models/brownie');

exports.buyBrownie = async (req, res) => {
    const { userEmail } = req.query;
    const { brownieFlavor, brownieQuantity } = req.body;

    if (!brownieFlavor || !brownieQuantity) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    try {
        const user = await User.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }

        const brownie = await Brownie.findOne({ brownieFlavor });

        if (!brownie) {
            return res.status(404).json({ message: 'Sabor de brownie não encontrado.' });
        }

        if (brownie.brownieQuantity <= 0) {
            return res.status(400).json({ message: 'Brownie esgotado.' });
        }

        if (brownie.brownieQuantity < brownieQuantity) {
            return res.status(400).json({ message: 'Quantidade insuficiente de brownies.' });
        }

        brownie.brownieQuantity -= brownieQuantity;
        user.saldo -= brownie.brownieValue * brownieQuantity;
        await brownie.save();
        await user.save();

        res.status(200).json({ message: 'Compra realizada com sucesso!', user });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao realizar compra.', error: error.message });
    }
}