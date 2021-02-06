"use strict";

const Diocese = use("App/Models/Diocese");
const Paroisse = use("App/Models/Paroisse");
const Group = use("App/Models/Groupe");

class MainController {
  // dashboard home page controllers
  async index({ response }) {
    const dioceses = await Diocese.query().count("id as total");
    const paroisses = await Paroisse.query().count("id as total");
    const groupes = await Group.query().count("id as total");

    return response.send({
      dioceses: dioceses[0],
      paroisses: paroisses[0],
      groupes: groupes[0],
    });
  }

  async diopar({ params, response }) {
    const diopars = await Paroisse.query()
      .where("diocese_id", params.id)
      .fetch();

    if (diopars) {
      return response.status(200).send({
        status: "success",
        data: diopars,
      });
    } else {
      return response.send({
        message: "no data found",
        data: 0,
      });
    }
  }

  async index2({ response }) {
    try {
      const groupes = await Group.query()
        .with("collections", (builder) => {
          builder.where("latest", true);
          builder.with("credit");
          builder.with("epargne");
          builder.orderBy("collection_date", "desc");
        })
        .distinct("id", "name", "group_code")
        .fetch();

      // filter those which are not empty
      if (!groupes) {
        return response.status(404).send({
          message: "no data found",
          status: "error",
        });
      } else {
        return response.status(200).send({
          status: "success",
          data: groupes,
        });
      }
    } catch (error) {
      return response.status(404).send({
        status: "error",
        message: "error occured",
        error: error,
      });
    }
  }
}

module.exports = MainController;
