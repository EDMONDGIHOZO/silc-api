"use strict";

const Caisse = use("App/Models/Caisse");
const Database = use("Database");
const SpreadSheet = use("SpreadSheet");

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
    const caisses = await Caisse.query().with("collections").fetch();
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
      "groupId",
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
      "sortieSolidalite",
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
      newCaisse.entre_penalite = form.entrePenalite;
      newCaisse.autre_entre = form.autreEntre;
      newCaisse.total_entre = form.totalEntre;
      newCaisse.sortie_credit_actroye = form.sortieCreditActroye;
      newCaisse.autre_sortie = form.autreSortie;
      newCaisse.total_sortie = form.totalSortie;
      newCaisse.solde_periode = form.soldePeriode;
      newCaisse.sortie_solidalite = form.sortieSolidalite;
      await newCaisse.save();

      //save the new collection as latest
      const newCollection = await Database.table("general_records")
        .where("id", form.collectionId)
        .update("latest", true);

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

  async download({ params, response }) {
    const ss = new SpreadSheet(response, params.format);
    const laCaisse = await Caisse.query()
      .where("collection_id", params.id)
      .with("collections")
      .fetch();
    const data = [];

    data.push([
      "identifiant de la collection",
      "date de collecte",
      "collecté par",
      "Report du solde de la période /mois passé (Frw)",
      "Entrées des épargnes au cours de la période /mois (Frw)",
      "Entrées des crédits remboursés (capital + intérêts) au cours de la période /mois (Frw)",
      "Entrées de la caisse de solidarité au cours de la période /mois (Frw) ",
      "Entrées des pénalités au cours de la période /mois (Frw)",
      "Autres entrées (crédit bancaire, autre) au cours de la période /mois (Frw)",
      "Total des entrées (Frw)",
      "Sorties pour crédits octroyés au cours de la période /mois (Frw)",
      "Sorties dans la caisse de solidarité au cours de la période /mois ( (Frw)",
      "Autres sorties (frais bancaires, autres) au cours de la période /mois ((Frw)",
      "Total des sorties (Frw)",
      "Solde de la période / mois (Frw)",
    ]);

    laCaisse.toJSON().forEach((caisse) => {
      data.push([
        caisse.collections.id,
        caisse.collections.collection_date,
        caisse.collections.collector_name,
        caisse.rapport_sold,
        caisse.epargne_entre,
        caisse.credit_rembourse_capital_interest,
        caisse.caisse_solidalite,
        caisse.entre_penalite,
        caisse.autre_entre,
        caisse.sortie_credit_actroye,
        caisse.total_entre,
        caisse.autre_sortie,
        caisse.sortie_solidalite,
        caisse.total_sortie,
        caisse.solde_periode,
      ]);
    });

    console.log(laCaisse);

    const title = `${params.date} - groupe - ${params.code}`;

    ss.addSheet(title, data);
    ss.download(title);
  }
}

module.exports = CaisseController;
