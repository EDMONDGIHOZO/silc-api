"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class GeneralRecord extends Model {
  epargne() {
    return this.hasOne("App/Models/Epargne", "id", "collection_id");
  }

  credit() {
    return this.hasOne("App/Models/Credit", "id", "collection_id");
  }

  groups() {
    return this.belongsTo("App/Models/Groupe", "group_id", "id");
  }

  solde() {
    return this.hasOne("App/Models/Solde", "id", "collection_id");
  }

  entraide() {
    return this.hasOne("App/Models/Entraide", "id", "collection_id");
  }

  penalites() {
    return this.hasOne("App/Models/Penalite", "id", "collection_id");
  }

  rebursed() {
    return this.hasOne("App/Models/Rebursement", "id", "collection_id");
  }
  relation() {
    return this.hasOne("App/Models/InstitutionRelation", "id", "collection_id");
  }
}

module.exports = GeneralRecord;
