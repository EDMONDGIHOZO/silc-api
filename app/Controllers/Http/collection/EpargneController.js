"use strict";

const Epargne = use("App/Models/Epargne");

class EpargneController {
  /***  =========================  add epargne value  ====================================  */
  async store({ request, response }) {
    // get the data
    let form = request.only([
      "collectionId",
      "monthlyMinAmount",
      "periodReleasedAmount",
      "monthlyMaxAmount",
      "epargnePerMember",
    ]);

    await Epargne.query().where("collection_id", form.collectionId).delete();

    try {
      const newEpargne = new Epargne();
      newEpargne.collection_id = form.collectionId;
      newEpargne.period_released_amount = form.periodReleasedAmount;
      newEpargne.monthly_min_amount = form.monthlyMinAmount;
      newEpargne.monthly_max_amount = form.monthlyMaxAmount;
      newEpargne.epargne_per_member = form.epargnePerMember;
      await newEpargne.save();

      return response.send({
        message: "saved epargne successfully",
        color: "success",
        data: newEpargne,
      });
    } catch (error) {
      return response.send({ message: "error occured", color: "error", error });
    }
  }
}

module.exports = EpargneController;
