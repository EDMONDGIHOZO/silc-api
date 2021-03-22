"use strict";

const Database = use("Database");

const Entraide = use("App/Models/Entraide");
const Penalite = use("App/Models/Penalite");

class MainController {
  async penCreate({ request, response }) {
    // gather the inputs
    let form = request.only(["collectionId", "punishedMembers", "amountPaid"]);

    await Penalite.query().where("collection_id", form.collectionId).delete();

    try {
      const newPen = new Penalite();
      newPen.collection_id = form.collectionId;
      newPen.Membres_punis = form.punishedMembers;
      newPen.Montant_des_penalites_payees = form.amountPaid;

      await newPen.save();

      return response.status(200).send({
        message: "saved for first time",
        color: "success",
        data: newPen,
      });
    } catch (error) {
      return response.send({
        message: "the hell appeared",
        color: "error",
        error,
      });
    }
  }

  async enCreate({ request, response }) {
    // gather the inputs
    let form = request.only(["collectionId", "income", "outgoing", "soutenus"]);

    await Entraide.query().where("collection_id", form.collectionId).delete();

    try {
      const newEnt = new Entraide();
      newEnt.collection_id = form.collectionId;
      newEnt.valeur_entrees = form.income;
      newEnt.valeur_sorties = form.outgoing;
      newEnt.membres_soutenus = form.soutenus;
      await newEnt.save();
      return response.status(200).send({
        message: "saved for first time",
        color: "success",
        data: newEnt,
      });
    } catch (error) {
      return response.send({ message: "error occured", color: "error", error });
    }
  }

  async penUpdate({ request, response }) {}

  async enUpdate({ request, response }) {}
}

module.exports = MainController;
