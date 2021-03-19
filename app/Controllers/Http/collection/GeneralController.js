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
      newBoys,
      newGirls,
      prevRegisteredBoys,
      prevRegisteredGirls,
      abandonedGirls,
      abandonedBoys,
      attendedBoys,
      attendedGirls,
      collectorName,
      actualBoys,
      actualGirls,
    } = request.only([
      "collectionDate",
      "groupId",
      "newBoys",
      "newGirls",
      "prevRegisteredBoys",
      "prevRegisteredGirls",
      "abandonedGirls",
      "abandonedBoys",
      "attendedBoys",
      "attendedGirls",
      "collectorName",
      "actualBoys",
      "actualGirls",
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
        verified: false,
        new_girls: newGirls,
        new_boys: newBoys,
        attended_girls: attendedGirls,
        attended_boys: attendedBoys,
        abandoned_boys: abandonedBoys,
        abandoned_girls: abandonedGirls,
        prev_registered_boys: prevRegisteredBoys,
        prev_registered_girls: prevRegisteredGirls,
        actual_girls: actualGirls,
        actual_boys: actualBoys,
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
    let inputs = request.only([
      "collectionDate",
      "verified",
      "newGirls",
      "newBoys",
      "attendedBoys",
      "attendedGirls",
      "abandonedGirls",
      "abandonedBoys",
      "prevRegisteredGirls",
      "prevRegisteredBoys",
      "actualBoys",
      "actualGirls",
      "verified",
    ]);
    /** get targeted collection */

    const collection = await General.query().where("id", params.id).first();

    if (collection) {
      try {
        /** update the collection  */
        collection.collection_date = inputs.collectionDate;
        collection.new_boys = inputs.newBoys;
        collection.new_girls = inputs.newGirls;
        collection.attended_boys = inputs.attendedBoys;
        collection.attended_girls = inputs.attendedGirls;
        collection.abandoned_boys = inputs.abandonedBoys;
        collection.abandoned_girls = inputs.abandonedGirls;
        collection.prev_registered_boys = inputs.prevRegisteredBoys;
        collection.prev_registered_girls = inputs.prevRegisteredGirls;
        collection.actual_boys = inputs.actualBoys;
        collection.actual_girls = inputs.actualGirls;
        collection.verified = inputs.verified
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
