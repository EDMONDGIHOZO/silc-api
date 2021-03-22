"use strict";

const Credit = use("App/Models/Credit");

class CreditController {
  /***  =========================  add credit value  ====================================  */
  async store({ request, response }) {
    let form = request.only([
      "collectionId",
      "creditedGirls",
      "creditedBoys",
      "grantedCredit",
      "grantedCapital",
      "interestForGrants",
      "moyenneAmountCredit",
      "rebursedValueCapital",
      "rebursedInterestValue",
      "rebursedCapitalInterest",
      "remainingCreditCapitalValue",
      "interestRemainingCredit",
      "creditCapitalInterestRemaining",
      "capitalCreditRemaining",
      "risky",
    ]);

    await Credit.query().where("collection_id", form.collectionId).delete();
    
    try {
      const newCredit = new Credit();
      newCredit.collection_id = form.collectionId;
      newCredit.credite_girls = form.creditedGirls;
      newCredit.credite_boys = form.creditedBoys;
      newCredit.granted_credit = form.grantedCredit;
      newCredit.granted_capital = form.grantedCapital;
      newCredit.interest_for_grants = form.interestForGrants;
      newCredit.moyenne_amount_credit = form.moyenneAmountCredit;
      newCredit.capital_interest = form.capitalInterest;
      newCredit.rebursed_value_capital = form.rebursedValueCapital;
      newCredit.rebursed_interest_value = form.rebursedInterestValue;
      newCredit.rebursed_capital_interest = form.rebursedCapitalInterest;
      newCredit.remaining_credit_capital = form.remainingCreditCapitalValue;
      newCredit.interest_remaining_credit = form.interestRemainingCredit;
      newCredit.credit_capital_interest_remaining =
        form.creditCapitalInterestRemaining;
      newCredit.capital_credit_remaining = form.capitalCreditRemaining;
      newCredit.risky = form.risky;

      // save it
      await newCredit.save();
      return response.status(200).send({ message: "success", data: newCredit });
    } catch (error) {
      return response.send({ message: "error occured", error: error });
    }
  }
}

module.exports = CreditController;
