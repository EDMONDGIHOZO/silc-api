"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Caisse extends Model {
  static get table() {
    return "caisses";
  }

  collections() {
    return this.belongsTo("App/Models/GeneralRecord", "collection_id", "id");
  }
}

module.exports = Caisse;
