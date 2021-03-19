"use strict";

const Epargne = use("App/Models/Epargne");

class EpargneController {
  /***  =========================  add epargne value  ====================================  */
  async store({ request, response }) {
    // get the data
    let inputs = request.only([
      "collectionId",
      "monthlyMinAmount",
      "periodReleasedAmount",
      "monthlyMaxAmount",
      "epargnePerMember",
    ]);

    // check if there is existing with same collection
    const epargne = await Epargne.query()
      .where("collection_id", inputs.collectionId)
      .first();

    try {
      if (epargne) {
        // update the epargne information
        epargne.merge({
          period_released_amount: inputs.periodReleasedAmount,
          monthly_min_amount: inputs.monthlyMinAmount,
          monthly_max_amount: inputs.monthlyMaxAmount,
          epargne_per_member: inputs.epargnePerMember,
        });
        // save the updates
        await epargne.save();
        return response.status(200).send("saved");
      } else {
        // create the new
        const newEpargne = new Epargne();
        newEpargne.collection_id = inputs.collectionId;
        newEpargne.period_released_amount = inputs.periodReleasedAmount;
        newEpargne.monthly_min_amount = inputs.monthlyMinAmount;
        newEpargne.monthly_max_amount = inputs.monthlyMaxAmount;
        newEpargne.epargne_per_member = inputs.epargnePerMember;
        // save new epargne
        await newEpargne.save();
        return response.status(200).send("saved");
      }
    } catch (error) {
      return response.status(200).send("someting weird happened");
    }
  }
}

module.exports = EpargneController;
