const { Schema, model, Types } = require("mongoose");

const oeuvreSchema = new Schema({

  nom: String,
  description: String,
  image:  String,
  auteur: String,
  dtCreation: Date,
});

const Oeuvre = model("oeuvres", oeuvreSchema);

const userShema = new Schema({
  email: String,
  motDePasse: String,
  role: { type: String, enum: ['admin', 'redacteur'] },
});

const User = model("users", userShema);

module.exports.Oeuvre = Oeuvre;
module.exports.User = User;
