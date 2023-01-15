const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const uploadAvatar = require("./uploadAvatar");
const verify = require("./verify");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
    register,
    login,
    getCurrent,
    logout,
    uploadAvatar,
    verify,
    resendVerifyEmail,
}