exports.welcomeController = (req, res) => {
    res.status(200).json({
        message: "Bem vindo ao BrownieHub"
    })
}