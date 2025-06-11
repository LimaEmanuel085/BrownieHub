const User = require('../models/user');

exports.viewUsers = async (req, res) => {
    const users = await User.find().select('-password');
    res.send(users);
}