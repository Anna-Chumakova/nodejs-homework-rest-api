const { Schema, model } = require("mongoose");
const Joi = require("Joi");

const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        unique: true,
        required: true,
        
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    token: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
  },
    verificationToken: {
        type: String,
  },
    avatarUrl: {
        type: String,
        required: true,
    }
}, { versionKey: false, timestamps: true })

userSchema.post("save", handleMongooseError)

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

const loginSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().min(6).required(),
})

emailSchema = Joi.object({
    email: Joi.string().required(),
})
const schemasUser = {
    registerSchema,
    loginSchema,
    emailSchema,
};

const User = model("user", userSchema);

module.exports = {
    User,
    schemasUser,
};