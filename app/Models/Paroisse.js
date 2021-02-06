"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Paroisse extends Model {
  diocese() {
    return this.belongsTo("App/Models/Diocese", "diocese_id", "id");
  }

  collections() {
    return this.manyThrough("App/Models/Groupe", "collections");
  }

  groups() {
    return this.hasMany("App/Models/Groupe", "id", "paroisse_id");
  }

  /**
   * Hide/Omit Fields From JSON Output
   */
  static get hidden() {
    return ["created_at", "updated_at"];
  }
}

module.exports = Paroisse;
