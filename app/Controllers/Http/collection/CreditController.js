"use strict";

const Credit = use("App/Models/Credit");

class CreditController {
  /***  =========================  add credit value  ====================================  */
  async store({ request, response }) {
    let {
      collectionId,
      creditedGirls,
      creditedBoys,
      grantedCredit,
      grantedCapital,
      interestForGrants,
    } = request.only([
      "collectionId",
      "creditedGirls",
      "creditedBoys",
      "grantedCredit",
      "grantedCapital",
      "interestForGrants",
    ]);

    // check if the credit exist
    const collection = await Credit.query()
      .where("collection_id", collectionId)
      .first();

    if (collection) {
      collection.merge({
        membres_contracte_un_credit_girls: creditedGirls,
        membres_contracte_un_credit_boys: creditedBoys,
        nombres_total_credit_actroyes: grantedCredit,
        valeur_de_credit_actroyes_capital: grantedCapital,
        valeur_des_interets_sur_credit_actroyes: interestForGrants,
      });
      await collection.save();
      return response.status(200).send({
        status: "success",
        message: "updated the credits",
      });
    }

    try {
      const credit = await Credit.create({
        collection_id: collectionId,
        membres_contracte_un_credit_girls: creditedGirls,
        membres_contracte_un_credit_boys: creditedBoys,
        nombres_total_credit_actroyes: grantedCredit,
        valeur_de_credit_actroyes_capital: grantedCapital,
        valeur_des_interets_sur_credit_actroyes: interestForGrants,
      });

      return response.status(200).send({
        status: "success",
        message: "saved the credits",
      });
    } catch (error) {
      return response.status(200).send({
        message: "something is wrong",
        error: error,
      });
    }
  }
}

module.exports = CreditController;
