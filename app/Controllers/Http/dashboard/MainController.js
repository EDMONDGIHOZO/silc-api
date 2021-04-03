"use strict";

const Diocese = use("App/Models/Diocese");
const Paroisse = use("App/Models/Paroisse");
const Group = use("App/Models/Groupe");
const Collections = use("App/Models/GeneralRecord");

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
    const cols = await Collections.query()
      .where("latest", true)
      .distinct(["new_boys", "new_girls", "abandoned_girls", "abandoned_boys"])
      .fetch();
    return response.send({ data: cols });
  }
}

module.exports = MainController;
