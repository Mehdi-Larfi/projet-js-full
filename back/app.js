const express = require("express");
const routeOeuvre = require("./oeuvres-musee");
const routeUser = require("./users");
const routeConnexion = require("./connexion")
const { connect } = require("mongoose");
require("dotenv").config();
console.log("ligne 6");

const URI = process.env.BDD_PROD;

console.log("ligne 13");

connect(URI)
  .then(() => console.log("connexion á mongo DB réussie"))
  .catch((ex) => console.log(ex));

console.log("ligne 19");

const PORT = 4003;

const app = express();

app.use(express.json());

console.log("ligne 27");

app.use("/user", routeUser);
app.use(routeOeuvre);
app.use(routeConnexion);

console.log("ligne 33");


app.listen(PORT, () => console.log(`express start sur port ${PORT}`));