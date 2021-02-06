"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Diocese extends Model {
  /**
   * To override the 'conventional' model table name.
   */
  static get table() {
    return "dioceses";
  }

  paroisses() {
    return this.hasMany("App/Models/Paroisse", "id", "diocese_id");
  }

  groups() {
    return this.hasMany("App/Models/Groupe", "id", "diocese_id");
  }

  /**
   * Hide/Omit Fields From JSON Output
   */
  static get hidden() {
    return ["created_at", "updated_at"];
  }
}

module.exports = Diocese;
