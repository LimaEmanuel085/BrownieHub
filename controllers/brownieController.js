const Brownie = require('../models/brownie')

exports.viewBrownies = async (req, res) => {
    try {
        const brownies = await Brownie.find();
        res.status(200).json(brownies);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar brownies.', error: error.message });
    }
}

exports.addBrownieFlavor = async (req, res) => {
    const { flavor, quantity } = req.body;
    if (!flavor || !quantity) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {

        const brownie = new Brownie({
            brownieFlavor: flavor,
            brownieValue: 4.50,
            brownieQuantity: quantity
        });

        await brownie.save();
        res.status(201).json({ message: 'Brownie adicionado com sucesso!', brownie });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar brownie.', error: error.message });
    }
}

exports.addBrownie = async (req, res) => {
    const { flavor, quantity } = req.body;
    if (!flavor || !quantity) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const brownie = await Brownie.findOne({ brownieFlavor: flavor });
        if (!brownie) {
            return res.status(404).json({ message: 'Sabor de brownie não encontrado.' });
        }

        brownie.brownieQuantity += quantity;
        await brownie.save();
        res.status(201).json({ message: 'Brownie adicionado com sucesso!', brownie });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar brownie.', error: error.message });
    }
}

exports.deleteBrownie = async (req, res) => {
    const { flavor } = req.body;
    if (!flavor) {
        return res.status(400).json({ message: 'O campo sabor é obrigatório.' });
    }
    try {
        const brownie = await Brownie.findOneAndDelete({ brownieFlavor: flavor });
        if (!brownie) {
            return res.status(404).json({ message: 'Sabor de brownie não encontrado.' });
        }
        res.status(200).json({ message: 'Brownie deletado com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar brownie.', error: error.message });
    }
}

exports.updateBrownie = async (req, res) => {
    const { flavor, quantity } = req.body;
    if (!flavor || !quantity) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }
    try {
        const brownie = await Brownie.findOne({ brownieFlavor: flavor });
        if (!brownie) {
            return res.status(404).json({ message: 'Sabor de brownie não encontrado.' });
        }

        brownie.brownieQuantity = quantity;
        await brownie.save();
        res.status(200).json({ message: 'Brownie atualizado com sucesso!', brownie });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao atualizar brownie.', error: error.message });
    }
}