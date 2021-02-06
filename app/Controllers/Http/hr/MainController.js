"use strict";

const Database = use("Database");

class MainController {
  async penCreate({ request, response }) {
    // gather the inputs
    let { collectionId, punishedMembers, amountPaid } = request.only([
      "collectionId",
      "punishedMembers",
      "amountPaid",
    ]);
    // finding the exsting
    const pen = await Database.from("penalites")
      .where("collection_id", collectionId)
      .delete();
    // check if they are valid
    try {
      const penalite = await Database.table("penalites").insert({
        collection_id: collectionId,
        Membres_punis: punishedMembers,
        Montant_des_penalites_payees: amountPaid,
      });

      return response.status(200).send({
        status: "success",
        message: "bien enregistres",
        data: penalite,
      });
    } catch (e) {
      return response.status(404).send({
        status: "error",
        message: "pas enregistres",
        error: e.code,
      });
    }
  }

  async enCreate({ request, response }) {
    // gather the inputs
    let { collectionId, income, outgoing, soutenus } = request.only([
      "collectionId",
      "income",
      "outgoing",
      "soutenus",
    ]);
    // finding the exsting
    const pen = await Database.from("entraides")
      .where("collection_id", collectionId)
      .delete();
    // check if they are valid
    try {
      const penalite = await Database.table("entraides").insert({
        collection_id: collectionId,
        valeur_entrees: income,
        valeur_sorties: outgoing,
        membres_soutenus: soutenus,
      });

      return response.status(200).send({
        status: "success",
        message: "bien enregistres",
        data: penalite,
      });
    } catch (e) {
      return response.status(404).send({
        status: "error",
        message: "pas enregistres",
        error: e.code,
      });
    }
  }

  async penUpdate({ request, response }) {}

  async enUpdate({ request, response }) {}
}

module.exports = MainController;
