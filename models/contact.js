const { Schema, model } = require("mongoose");
const Joi = require("Joi");
const { handleMongooseError } = require("../helpers");


const contactSchema = new Schema({
     name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    // owner: {
    //   type: SchemaTypes.ObjectId,
    //   ref: 'user',
    // },
}, {versionKey: false, timestamps: true})

contactSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required(),
})

const schemasContact = {
    addSchema,
    updateFavoriteSchema,
}

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemasContact,
};