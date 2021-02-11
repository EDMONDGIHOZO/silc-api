"use strict";

const General = use("App/Models/GeneralRecord");

class GeneralController {
  /** =============== view all collections made ================================= */
  async index({ request, response }) {
    /** work on pagination */
    let { page } = request.all();
    page = page ? page : 1;

    const records = await General.query().paginate(page ? page : 1, 12);

    if (records) {
      return response.status(302).send({
        message: "found data",
        data: records,
      });
    } else {
      return response.status(204).send({
        message: "no data yet",
      });
    }
  }
  /** =============== view single collection ================================= */

  async show({ params, response }) {
    const collection = await General.query()
      .where("id", params.id)
      .with("epargne")
      .with("credit")
      .with("rebursed")
      .with("relation")
      .with("solde")
      .with("groups")
      .with("entraide")
      .with("penalites")
      .first();

    if (collection) {
      return response.status(200).send({
        message: "found",
        data: collection,
      });
    } else {
      return response.status(404).send({
        message: "not found",
      });
    }
  }

  /** =============== Create collection ================================= */

  async store({ request, auth, response }) {
    /** gather the user information */

    let {
      collectionDate,
      groupId,
      debutEpargne,
      finEpargneCycle,
      maximalTimeCredit,
      registeredPreviousMonthGirls,
      registeredPreviousMonthBoys,
      abandonCurrentMonthGirls,
      abandonCurrentMonthBoys,
      newMembersGirls,
      newMembersBoys,
      currentRegisteredGirls,
      currentRegisteredBoys,
      presentBoys,
      presentGirls,
      collectorName,
    } = request.only([
      "collectionDate",
      "groupId",
      "debutEpargne",
      "finEpargneCycle",
      "maximalTimeCredit",
      "registeredPreviousMonthBoys",
      "registeredPreviousMonthGirls",
      "abandonCurrentMonthBoys",
      "abandonCurrentMonthGirls",
      "newMembersBoys",
      "newMembersGirls",
      "currentRegisteredBoys",
      "currentRegisteredGirls",
      "presentGirls",
      "presentBoys",
      "collectorName",
    ]);

    // outdate the latest collection
    const old = await General.query()
      .where("group_id", groupId)
      .where("latest", true)
      .first();

    if (old) {
      old.merge({ latest: false });
      await old.save();
    }

    try {
      const collection = await General.create({
        collection_date: collectionDate,
        group_id: groupId,
        collector_name: collectorName,
        latest: true,
        date_debut_epargne_cycle: debutEpargne,
        date_probable_fin_epargne_cycle: finEpargneCycle,
        dure_maximale_convenue_credit: maximalTimeCredit,
        inscrit_mois_precedent_gils: registeredPreviousMonthGirls,
        inscrit_mois_precedent_boys: registeredPreviousMonthBoys,
        abandons_mois_actuel_gils: abandonCurrentMonthGirls,
        abandons_mois_actuel_boys: abandonCurrentMonthBoys,
        nuveaux_membres_mois_girls: newMembersGirls,
        nuveaux_membres_mois_boys: newMembersBoys,
        membres_actuel_inscrits_girls: currentRegisteredGirls,
        membres_actuel_inscrits_boys: currentRegisteredBoys,
        membres_present_en_reunion_girls: presentGirls,
        membres_present_en_reunion_boys: presentBoys,

      });

      return response.status(200).send({
        status: "success",
        message: "saved",
        data: collection,
      });
    } catch (error) {
      return response.status(501).send({
        message: "not saved",
        error: error,
      });
    }
  }

  /** =============== Update  collection Details ================================= */
  async update({ request, params, response }) {
    /** get inputs */
    let {
      collectionDate,
      collectorName,
      newMembers,
      abandons,
      registeredMembers,
      boysAttended,
      girlsAttended,
    } = request.only([
      "collectionDate",
      "abandons",
      "registeredMembers",
      "boysAttended",
      "girlsAttended",
      "collectorName",
      "newMembers",
    ]);

    /** get targeted collection */

    const collection = await General.query().where("id", params.id).first();

    if (collection) {
      try {
        /** update the collection  */
        collection.collection_date = collectionDate;
        collection.collector_name = collectorName;
        collection.new_members = newMembers;
        collection.abandons = abandons;
        collection.registered_members = registeredMembers;
        collection.boys_attended = boysAttended;
        collection.girls_attended = girlsAttended;

        /** save the updates */
        await collection.save();

        return response.status(200).send({
          message: "collection updated",
        });
      } catch (error) {
        return response.status(404).send({
          message: "failed",
          error: error,
        });
      }
    } else {
      return response.status(404).send({
        message: "no collection found",
      });
    }
  }

  /** =============== delete  collection ================================= */

  async destroy({ params, response }) {
    const collection = await General.query().where("id", params.id).first();

    if (collection) {
      await collection.delete();

      return response.status(200).send({
        message: "deleted collection",
      });
    } else {
      return response.status(404).send({
        message: "already gone",
      });
    }
  }
}

module.exports = GeneralController;
