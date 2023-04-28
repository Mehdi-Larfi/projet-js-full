const Joi = require("joi");

const schemaJoiOeuvre = Joi.object({
  nom: Joi.string().min(5).max(255).required(),
  description: Joi.string().min(5).max(10000).required(),
  image: Joi.string().min(5).max(600).required(),
  auteur: Joi.string().min(5).max(255).required(),
  dtCreation: Joi.date().required(),
});

const schemaJoiUser = Joi.object({
  email: Joi.string().min(5).max(255).required(),
  motDePasse: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .required(),
  role: Joi.string().valid("admin", "redacteur").required(),
});

const schemaJoiConnexion = Joi.object({
  email: Joi.string().min(5).max(255).required(),
  motDePasse: Joi.string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)
    .required(),
});

module.exports.schemaJoiOeuvre = schemaJoiOeuvre;
module.exports.schemaJoiUser = schemaJoiUser;
module.exports.schemaJoiConnexion = schemaJoiConnexion;
