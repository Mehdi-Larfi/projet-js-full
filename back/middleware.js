const { isValidObjectId } = require("mongoose");
const {
  schemaJoiUser,
  schemaJoiOeuvre,
  schemaJoiConnexion,
} = require("./verification");
const JWT = require("jsonwebtoken");

function isValidUser(request, response, next) {
  const { body } = request;
  const { error } = schemaJoiUser.validate(body, { abortEarly: false });

  if (error) return response.status(400).json(error.details);
  next();
}

function isValidOeuvre(request, response, next) {
  const { body } = request;
  const { error } = schemaJoiOeuvre.validate(body, { abortEarly: false });

  if (error) return response.status(400).json(error.details);
  next();
}

function isValidConnect(request, response, next) {
  const { body } = request;
  const { error } = schemaJoiConnexion.validate(body, { abortEarly: false });

  if (error) return response.status(400).json(error.details);
  next();
}

function idValid(request, response, next) {
  const id = request.params.id;

  if (!isValidObjectId(id))
    return response
      .status(400)
      .json({ msg: `id ${id} invalide pour MongoDB`, where: "middleware" });
  next();
}

function autorisation(request, response, next) {
  const token = request.header("x-token");

  if (!token)
    return response
      .status(401)
      .json({
        msg: "vous n'avez pas le token JWT necessaire pour cette opération",
      });

  try {
    const payload = JWT.verify(token, process.env.CLE_PRIVEE_JWT);
    next();
  } catch (ex) {
    response.status(400).json({ msg: "JWT invalide" });
  }
}

function isAdmin(request, response, next) {
  if (request.user.role !== "admin")
    return response
      .status(403)
      .json({ msg: "Vous n'avez aucun droit pour effectuer cette action" });
  next();
}

module.exports.idValid = idValid;
module.exports.isValidOeuvre = isValidOeuvre;
module.exports.isValidUser = isValidUser;
module.exports.isValidConnect = isValidConnect;
module.exports.isAdmin = isAdmin;
module.exports.autorisation = autorisation;
