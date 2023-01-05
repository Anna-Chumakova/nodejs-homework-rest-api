const { User } = require("../../models");
const fs = require("fs/promises");
const path = require("path");
const Jimp = require("jimp");


const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const uploadAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tmpUpload, originalname } = req.file;
    
    const fileName = `${_id}_${originalname}`;
    
    const resultUpload = path.join(avatarsDir, fileName);
    await fs.rename(tmpUpload, resultUpload);

    Jimp.read(resultUpload, (error, avatar) => {
      if (error) {
        throw error;
      }
      avatar.cover(250, 250).write(resultUpload);
    });
    const avatarUrl = path.join("avatar", fileName);
    
    await User.findByIdAndUpdate(_id, {
        avatarUrl  
    })
    res.json({
        avatarUrl,
    })
}
module.exports = uploadAvatar