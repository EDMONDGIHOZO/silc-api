"use strict";

const Database = use("Database");

class SoldeController {
  async store({ request, response }) {
    let { montantSolde, collectionId } = request.only([
      "montantSolde",
      "collectionId",
    ]);

    try {
      const solde = await Database.from("soldes")
        .select("collectionId", collectionId)
        .delete();

      const newSolde = await Database.table("soldes").insert({
        montant_solde: montantSolde,
        collection_id: collectionId,
      });

      return response.status(200).send({
        status: "success",
        message: "saved",
      });
    } catch (e) {
      return response.status(404).send({
        status: "error",
        message: "error",
        error: e,
      });
    }
  }
}

module.exports = SoldeController;
