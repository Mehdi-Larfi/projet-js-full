const { Router, response } = require("express");
const { Oeuvre } = require("./model");
const { schemaJoiOeuvre } = require("./verification");
const { isValidObjectId } = require("mongoose");
const { idValid, isValidOeuvre, autorisation, isAdmin } = require("./middleware");

const route = Router();

route.post("/", [isValidOeuvre], async (request, response) => {
  const { body } = request;
  const nouvelleOeuvre = new Oeuvre({ ...body });

  const oeuvreRecherche = await Oeuvre.find(
    { nom: body.nom } && { auteur: body.auteur }
  );
  if (oeuvreRecherche.length > 0)
    return response.status(400).json({ msg: "cette oeuvre existe déjà" });

  await nouvelleOeuvre.save();
  console.log("post");

  response.json(nouvelleOeuvre);
});

route.get("/all", async (request, response) => {
  const toutesLesOeuvres = await Oeuvre.find().populate(
    "image",
    "nom auteur description dtCreation"
  );
  console.log("get");

  response.json(toutesLesOeuvres);
});

route.get("/oeuvre/:id", idValid, async (request, respomse) => {
  const nomDOeuvre = request.params.id;
  const oeuvreEnQuestion = await Oeuvre.find({ nom: nomDOeuvre }).populate(
    "image",
    "nom auteur description dtCreation"
  );

  if (!oeuvreEnQuestion)
    return respomse
      .status(404)
      .json({ msg: `profile introuvable avec l'id ${id} mentioné` });

  console.log("get");

  respomse.json(oeuvreEnQuestion);
});

route.put("/:id", [idValid, isValidOeuvre, autorisation], async (request, response) => {
  const id = request.params.id;
  const { body } = request;
  const oeuvreUpdatd = await Oeuvre.findByIdAndUpdate(
    id,
    { $set: body },
    { new: true }
  );

  if (!oeuvreUpdatd)
    return response
      .status(404)
      .json({ msg: `profile introuvable avec l'id ${id} mentioné` });

  console.log("put");

  response.json(oeuvreUpdatd);
});

route.delete("/:id", [idValid, isAdmin, autorisation], async (request, response) => {
  const id = request.params.id;
  const reponseMongo = await Oeuvre.findByIdAndDelete(id);

  if (!reponseMongo)
    return response
      .status(404)
      .json({ msg: `profile introuvable avec l'id ${id} mentioné` });

  console.log("delete");

  response.json({ msg: `article ${id} supprimé` });
});

module.exports = route