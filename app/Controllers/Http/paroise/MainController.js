"use strict";

const Paroisse = use("App/Models/Paroisse");
const Database = use("Database");

class MainController {
  /** --------------------------- SHOW ALL PAROISSES  -------------------------- */
  async index({ response }) {
    const paroisses = await Paroisse.query()
      .withCount("groups as total_groups")
      .withCount("collections")
      .with("diocese")
      .fetch();
    if (paroisses) {
      return response.status(200).send({
        message: "success",
        data: paroisses,
      });
    } else {
      return response.status(404).send({
        message: "empty",
      });
    }
  }

  /** --------------------------- SHOW SINGLE PAROISSE  -------------------------- */
  async show({ params, response }) {
    const paroi = await Paroisse.query()
      .where("id", params.id)
      .withCount("groups")
      .with("groups")
      .with("collections", (builder) => {
        builder.where("latest", true);
        builder.with("epargne");

        builder.with("credit");
      })
      .first();
    if (paroi) {
      return response.status(200).send({
        message: "found",
        data: paroi,
      });
    } else {
      response.status(404).send({
        message: "not found",
      });
    }
  }

  /** --------------------------- CREATE PAROISSE  -------------------------- */
  async store({ request, response }) {
    /** create diocese */
    let { name, dioceseId } = request.only(["name", "dioceseId"]);

    try {
      const paroi = await Paroisse.create({
        name: name,
        diocese_id: dioceseId,
      });

      return response.status(200).send({
        status: "success",
        message: "successfully saved",
      });
    } catch (error) {
      return response.status(404).send({
        message: "error",
        error: error.sqlMessage,
      });
    }
  }

  /** --------------------------- UPDATE  PAROISSE  -------------------------- */
  async update({ request, params, response }) {
    /** get user inputs */
    let { name } = request.only(["name"]);
    const paroi_id = params.id;

    /** find the target paroisse */
    const paroi = await Paroisse.query().where("id", paroi_id).first();

    if (paroi) {
      paroi.name = name;

      await paroi.save();

      return response.status(200).send({
        message: "updated successfully",
      });
    }

    return response.status(400).send({
      message: "failed",
    });
  }

  // ** ------------------------- EDIT PAROISSE DETAILS ---------------------- */
  async update({ params, request, response }) {
    // gather the request info
    let inputs = request.only(["name"]);

    // find the craimed paroisse
    const paroisse = await Paroisse.query().where("id", params.id).first();

    if (paroisse) {
      paroisse.merge({ name: inputs.name });
      await paroisse.save();
      return response.send({ message: "success", data: paroisse });
    } else {
      return response.send({ message: "not Found" });
    }
  }

  /** --------------------------- DELETE  PAROISSE  -------------------------- */
  async destroy({ params, response }) {
    /** get the paroisse */

    try {
      const paroi = await Paroisse.query().where("id", params.id).first();

      if (paroi) {
        await paroi.delete();
        return response.status(200).send({
          message: "deleted",
        });
      }

      return response.status(404).send({
        message: "not found",
      });
    } catch (error) {
      return response.status(404).send({
        error: error,
      });
    }
  }
}

module.exports = MainController;
