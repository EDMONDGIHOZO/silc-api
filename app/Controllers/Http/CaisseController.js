"use strict";

const Caisse = use("App/Models/Caisse");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with caisses
 */
class CaisseController {
  /**
   * Show a list of all caisses.
   * GET caisses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response }) {
    const caisses = await Caisse.all();
    if (caisses !== null) {
      return response.send({ message: "found", data: caisses });
    } else {
      return response.send({ message: "not data found" });
    }
  }

  /**
   * Render a form to be used for creating a new caisse.
   * GET caisses/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new caisse.
   * POST caisses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    // get input data
    let form = request.only([
      "collectionId",
      "rapportSold",
      "epargneEntre",
      "creditRembourseCapitalInterest",
      "caisseSolidalite",
      "entrePenalite",
      "autreEntre",
      "totalEntre",
      "sortieCreditActroye",
      "autreSortie",
      "totalSortie",
      "soldePeriode",
    ]);

    await Caisse.query().where("collection_id", form.collectionId).delete();

    try {
      const newCaisse = new Caisse();
      newCaisse.collection_id = form.collectionId;
      newCaisse.rapport_sold = form.rapportSold;
      newCaisse.epargne_entre = form.epargneEntre;
      newCaisse.credit_rembourse_capital_interest =
        form.creditRembourseCapitalInterest;
      newCaisse.caisse_solidalite = form.caisseSolidalite;
      newCaisse.entre_penalite = form.entre_penalite;
      newCaisse.autre_entre = form.autreEntre;
      newCaisse.total_entre = form.totalEntre;
      newCaisse.sortie_credit_actroye = form.sortieCreditActroye;
      newCaisse.autre_sortie = form.autreSortie;
      newCaisse.total_sortie = form.totalSortie;
      newCaisse.solde_periode = form.soldePeriode;

      await newCaisse.save();
      return response.send({ message: "saved data", color: "success" });
    } catch (error) {
      return response.send({ message: "error occured", error });
    }
  }

  /**
   * Display a single caisse.
   * GET caisses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing caisse.
   * GET caisses/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update caisse details.
   * PUT or PATCH caisses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a caisse with id.
   * DELETE caisses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = CaisseController;
