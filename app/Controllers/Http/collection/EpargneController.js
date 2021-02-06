"use strict";

const Epargne = use("App/Models/Epargne");

class EpargneController {
  /***  =========================  add epargne value  ====================================  */
  async store({ request, response }) {
    let { collectionId, amount } = request.only(["collectionId", "amount"]);

    // check if the collection id already exist in database
    const collection = await Epargne.query()
      .where("collection_id", collectionId)
      .first();

    if (collection) {
      // update the amount in collection
      collection.merge({ valeur_total_epargne_realise_mois: amount });
      await collection.save();

      return response.status(200).send ({
        status: 'success',
        message: 'updated the amount'
      })
    }

    try {
      const epargne = await Epargne.create({
        collection_id: collectionId,
        valeur_total_epargne_realise_mois: amount,
      });

      return response.status(200).send({
        status: 'success',
        message: 'epargne saved successfully!'
      });
    } catch (error) {
      return response.status(200).send({
        message: "something is wrong",
        error: error,
      });
    }
  }
}

module.exports = EpargneController;
