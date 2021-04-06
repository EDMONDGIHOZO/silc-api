"use strict";

const Groupe = use("App/Models/Groupe");
const crypto = require("crypto-random-string");

class MainController {
  /** ================= update informations for groupe ------------------- */
  async update({ request, params, response }) {
    /** get user inputs */
    let inputs = request.only([
      "name",
      "maxCredit",
      "monthlyInterest",
      "dioceseId",
      "paroisseId",
      "creationDate",
      "girls",
      "boys",
      "startDate",
      "endDate",
    ]);
    const groupe_id = params.id;
    /** generate unique code for group */
    const code = crypto({ length: 4, type: "distinguishable" });

    /** find the target groupe */
    const groupe = await Groupe.query().where("id", groupe_id).first();

    /** update groupe informations */
    if (groupe) {
      groupe.name = inputs.name;
      groupe.credit_group_max_time = inputs.maxCredit;
      groupe.monthly_interest = inputs.monthlyInterest;
      groupe.end_date = inputs.endDate;
      groupe.start_date = inputs.startDate;
      groupe.Date_de_creation = inputs.creationDate;
      groupe.initial_girls_number = inputs.girls;
      groupe.initial_boys_number = inputs.boys;
      groupe.diocese_id = inputs.dioceseId;
      groupe.paroisse_id = inputs.paroisseId;
      await groupe.save();

      return response.status(200).send({
        message: "updated",
      });
    } else {
      return response.status(404).send({
        message: "group not found",
      });
    }
  }

  /** ================= delete informations for groupe ------------------- */

  async destroy({ params, response }) {
    const groupe = await Groupe.query().where("id", params.id).first();

    if (groupe) {
      await groupe.delete();

      return response.status(200).send({
        message: "deleted group",
      });
    } else {
      return response.status(404).send({
        message: "no content",
      });
    }
  }
}

module.exports = MainController;
