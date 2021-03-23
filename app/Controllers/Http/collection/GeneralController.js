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
      .with("relation")
      .with("group")
      .with("entraide")
      .with("penalites")
      .with("caisse")
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

    let form = request.only([
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

    try {
      const newCol = new General();
      newCol.collection_date = form.collectionDate;
      newCol.group_id = form.groupId;
      newCol.collector_name = form.collectorName;
      newCol.latest = false;
      newCol.verified = false;
      newCol.new_boys = form.newBoys;
      newCol.new_girls = form.newGirls;
      newCol.prev_registered_girls = form.prevRegisteredGirls;
      newCol.prev_registered_boys = form.prevRegisteredBoys;
      newCol.abandoned_boys = form.abandonedBoys;
      newCol.abandoned_girls = form.abandonedGirls;
      newCol.attended_boys = form.attendedBoys;
      newCol.attended_girls = form.attendedGirls;
      newCol.actual_boys = form.actualBoys;
      newCol.actual_girls = form.actualGirls;
      // save
      await newCol.save();

      return response
        .status(200)
        .send({ message: "saved", color: "success", data: newCol });
    } catch (error) {
      return response.send({
        message: "failed to save",
        color: "error",
        error,
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
        collection.verified = inputs.verified;
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
