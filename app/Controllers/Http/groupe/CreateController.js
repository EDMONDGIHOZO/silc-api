"use strict";

const Groupe = use("App/Models/Groupe");
const crypto = require("crypto-random-string");

class CreateController {
  /** ------------------ Create the groupe---------- */
  async store({ request, response }) {
    /** gather the groupe info from user  */
    let inputs = request.only([
      "name",
      "girls",
      "boys",
      "dioceseId",
      "paroisseId",
      "maxCredit",
      "monthlyInterest",
      "startDate",
      "endDate",
      "minimumMonthlyAmountEpargne",
      "maximumMonthlyAmountEpargne",
      "creationDate",
    ]);

    try {
      /** generate unique code for group */
      const code = crypto({ length: 4, type: "distinguishable" });
      /** combine group name with code given */
      const groupCode = code;
      /** save group data to db */
      const groupe = await Groupe.create({
        name: inputs.name,
        group_code: groupCode,
        initial_girls_number: inputs.girls,
        initial_boys_number: inputs.boys,
        diocese_id: inputs.dioceseId,
        paroisse_id: inputs.paroisseId,
        credit_group_max_time: inputs.maxCredit,
        monthly_interest: inputs.monthlyInterest,
        start_date: inputs.startDate,
        end_date: inputs.endDate,
        Date_de_creation: inputs.creationDate,
        montant_minimum_epargne_chaque_mois: inputs.minimumMonthlyAmountEpargne,
        montant_maximal_epargne_chaque_mois: inputs.maximumMonthlyAmountEpargne,
      });

      return response.status(200).send({
        status: "success",
        message: "well saved",
        data: groupe.group_code,
      });
    } catch (error) {
      return response.status(404).send({
        message: "error",
        error: error,
      });
    }
  }
}

module.exports = CreateController;
