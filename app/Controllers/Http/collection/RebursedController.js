"use strict";

const Rebursed = use("App/Models/Rebursement");

class RebursedController {
  /***  =========================  add rebursement value  ====================================  */
  async store({ request, response }) {
    let {
      collectionId,
      valeurCreditRebursedCapital,
      valeurInteretsCreditRebursed,
      valeurCreditCapitalRestantRebursedFin,
      valeurInteretsCreditRestantRebursed,
      valeurCreditRetard,
    } = request.only([
      "collectionId",
      "valeurCreditRebursedCapital",
      "valeurInteretsCreditRebursed",
      "valeurCreditCapitalRestantRebursedFin",
      "valeurInteretsCreditRestantRebursed",
      "valeurCreditRetard",
    ]);

    // check that the collection exist
    const collection = await Rebursed.query()
      .where("collection_id", collectionId)
      .first();

    if (collection) {
      // update the amount in collection
      collection.merge({
        valeur_de_credit_rembourse_capital: valeurCreditRebursedCapital,
        valeur_des_interets_sur_credit_rembourse: valeurInteretsCreditRebursed,
        valeur_des_credit_capital_restant_rembourse_fin: valeurCreditCapitalRestantRebursedFin,
        valeur_de_interets_credit_restant_rembourse: valeurInteretsCreditRestantRebursed,
        valeur_des_credit_en_retard: valeurCreditRetard,
      });
      await collection.save();

      return response.status(200).send({
        status: "success",
        message: "updated the rebursement amounts",
      });
    }

    try {
      const rebursed = await Rebursed.create({
        collection_id: collectionId,
        valeur_de_credit_rembourse_capital: valeurCreditRebursedCapital,
        valeur_des_interets_sur_credit_rembourse: valeurInteretsCreditRebursed,
        valeur_des_credit_capital_restant_rembourse_fin: valeurCreditCapitalRestantRebursedFin,
        valeur_de_interets_credit_restant_rembourse: valeurInteretsCreditRestantRebursed,
        valeur_des_credit_en_retard: valeurCreditRetard,
      });

      return response.status(200).send({
        status: "success",
        message: "created the rebursement",
      });
    } catch (error) {
      return response.status(200).send({
        message: "something is wrong",
        error: error,
      });
    }
  }
}

module.exports = RebursedController;
