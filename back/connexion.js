const { Router } = require("express");
const { schemaJoiConnexion } = require("./verification");
const { User } = require("./model");
const { compare } = require("bcrypt");
const JWT = require("jsonwebtoken");
const { isValidConnect } = require("./middleware");

const route = Router();

route.post("/login", [isValidConnect], async (request, response) => {
  const { body } = request;

  const userSearch = await User.findOne({ email: body.email });
  if (!userSearch)
    return response
      .status(404)
      .json({ msg: "ce profil n'existe pas avec ces identifiants" });

  console.log("post");

  const verif = await compare(body.motDePasse, userSearch.motDePasse);
  if (!verif)
    return response
      .status(404)
      .json({ msg: "aucun profil trouvé trouvé avec ces identifiant" });

  console.log("verifie");

  const profilSansMotPass = {
    _id: userSearch._id,
    email: userSearch.email,
    role: userSearch.role ? userSearch.role : "redacteur",
  };

  const token = JWT.sign(profilSansMotPass, process.env.CLE_PRIVEE_JWT);

  console.log("token");

  response.json({ msg: "bienvenu ", token: token });
});

module.exports = route;
