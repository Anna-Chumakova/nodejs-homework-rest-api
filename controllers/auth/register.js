const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { HttpError } = require("../../helpers");
const gravatar = require("gravatar");

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (user) {
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);
    const newUser = await User.create({ ...req.body, password: hashPassword, avatarUrl });
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
    })
}

module.exports = register;