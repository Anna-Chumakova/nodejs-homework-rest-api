const { User } = require("../../models");
const { HttpError } = require("../../helpers");

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });

    if (!user) {
        throw HttpError(404, "Not found");
    } 
    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: ""});
    res.json({
        message: "Email verify success",
    })
} 
module.exports = verify;   