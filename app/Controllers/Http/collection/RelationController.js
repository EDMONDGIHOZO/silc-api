"use strict";

const Relation = use("App/Models/InstitutionRelation");

class RelationController {
  /***  =========================  add relation institution value  ====================================  */
  async store({ request, response }) {
    let form = request.only([
      "collectionId",
      "membersOpenedAccounts",
      "membersCredited",
      "creditedAmount",
      "groupBankAccount",
      "groupBankCredit",
    ]);

    await Relation.query().where("collection_id", form.collectionId).delete();

    try {
      const newRel = new Relation();
      newRel.collection_id = form.collectionId;
      newRel.membres_ouvert_compte_bancaire = form.membersOpenedAccounts;
      newRel.membres_contracte_credit_bancaire = form.membersCredited;
      newRel.groupe_ouvert_compte_bancaire = form.groupBankAccount;
      newRel.groupe_ayant_contracte_credit_bancaire = form.groupBankCredit;
      newRel.montant_de_credit_bancaire_contracte = form.creditedAmount;

      await newRel.save();
      return response
        .status(200)
        .send({ message: "saved for first time", color: "success" });
    } catch (error) {
      return response.send({ message: "error occured", color: "error", error });
    }
  }
}

module.exports = RelationController;
