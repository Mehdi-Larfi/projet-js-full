const { Router, response } = require("express");
const { User } = require("./model");
const { isValidObjectId } = require("mongoose");
const { schemaJoiUser } = require("./verification");
const { genSalt, hash } = require("bcrypt");
const { idValid, isValidUser, autorisation } = require("./middleware");

const route = Router();

route.post("/", [isValidUser], async (request, response) => {
  const { body } = request;

  console.log({ body });

  const userRechrche = await User.find({ email: body.email });

  if (userRechrche.length > 0)
    return reponse.status(400).json({ msg: "email déjà pris" });
  // cyptage de mdp

  const salt = await genSalt(10);
  const passwordHashe = await hash(body.password, salt);

  const userACreer = new User({ ...body, password: passwordHashe });

  await userACreer.save();

  console.log("post");

  response.json({ msg: "profile créée" });
});

route.get("/all", [autorisation], async (request, reponse) => {
  const allUsers = await User.find({}).select({ _id: 1, email: 1, role: 1 });
  console.log("get");
  reponse.json(allUsers);
});

route.get("/:id", [idValid], async (request, response) => {
  const usersFind = await User.find({}).select({ id: 1, email: 1, role: 1 });

  console.log("get");
  response.json(usersFind);
});

route.delete("/:id", [idValid, autorisation], async (request, response) => {
  const id = request.params.id;

  if (!isValidObjectId(id))
    return response.status(400).json({ msg: `id ${id} invalide` });

  const utilisateurASupprimer = await User.findByIdAndRemove(id);

  if (!utilisateurASupprimer)
    return response
      .status(404)
      .json({ msg: `profile introuvable avec l'id ${id} mentioné` });
  console.log("delete");
});

route.put(
  "/:id",
  [idValid, isValidUser, autorisation],
  async (request, response) => {
    const id = request.params.id;

    const { body } = request;

    const updateUser = await User.findByIdAndUpdate(id, { $set: body });

    if (!articleUpdated)
      return response
        .status(404)
        .json({ msg: `profile introuvable avec l'id ${id} mentioné` });

    console.log("put");

    response.json(articleUpdated);
  }
);

module.exports = route;
